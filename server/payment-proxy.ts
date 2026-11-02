import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

dotenv.config();

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

const app = express();
const port = 3001; // Backend proxy port

// Middleware for raw body (needed for Razorpay webhooks)
app.use(express.json({
  verify: (req: any, res, buf) => {
    req.rawBody = buf;
  }
}));

const key_id = process.env.VITE_RAZORPAY_KEY_ID;
const key_secret = process.env.RAZORPAY_KEY_SECRET;

let razorpay: Razorpay | null = null;

if (key_id && key_secret) {
  razorpay = new Razorpay({
    key_id,
    key_secret,
  });
} else {
  console.warn('Razorpay keys missing. Payment integration will run in placeholder mode.');
}

// Create Razorpay Order
app.post('/api/payment/order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;
    
    if (!razorpay) {
      // Return a mock order if keys are missing for development/demo
      return res.json({ 
        success: true, 
        isMock: true,
        order: { id: `order_mock_${Date.now()}`, amount: amount * 100, currency } 
      });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    console.error('Razorpay Order Error:', error);
    res.status(500).json({ success: false, error: 'Failed to create payment order' });
  }
});

// Verify Payment Signature
app.post('/api/payment/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, isMock } = req.body;
    
    if (isMock || !razorpay) {
      return res.json({ success: true, message: 'Mock payment verified' });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      res.json({ success: true, message: 'Payment verified' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Verification Error:', error);
    res.status(500).json({ success: false, error: 'Verification failed' });
  }
});

// Webhook Handler
app.post('/api/payment/webhook', (req: any, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || '';
    const signature = req.headers['x-razorpay-signature'];

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(req.rawBody.toString())
      .digest('hex');

    if (expectedSignature === signature) {
      const event = req.body.event;
      const payload = req.body.payload;
      
      console.log('Razorpay Webhook Received:', event);
      
      if (event === 'payment.captured' || event === 'order.paid') {
        const razorpayOrderId = payload.order ? payload.order.entity.id : payload.payment.entity.order_id;
        
        // Find order in Firestore
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('razorpayOrderId', '==', razorpayOrderId));
        const querySnap = await getDocs(q);
        
        if (!querySnap.empty) {
          const orderDoc = querySnap.docs[0];
          await updateDoc(doc(db, 'orders', orderDoc.id), {
            status: 'paid',
            razorpayPaymentId: payload.payment.entity.id,
            paidAt: new Date().toISOString()
          });
          
          console.log(`Order ${orderDoc.id} marked as PAID via webhook.`);
          
          // MOCK EMAIL LOG
          console.log(`[SIMULATED EMAIL] Sending confirmation to ${orderDoc.data().buyerEmail}`);
          console.log(`[SIMULATED EMAIL] Download Link: http://localhost:3000/api/download?orderId=${orderDoc.id}&token=${orderDoc.data().token}`);
        }
      }
      
      res.json({ status: 'ok' });
    } else {
      res.status(400).json({ status: 'invalid signature' });
    }
  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(500).json({ status: 'error' });
  }
});

// Secure Download Endpoint
app.get('/api/download', async (req, res) => {
  try {
    const { orderId, token } = req.query;
    
    if (!orderId || !token) {
      return res.status(400).send("Missing orderId or token.");
    }

    const orderSnap = await getDoc(doc(db, 'orders', orderId as string));
    
    if (!orderSnap.exists()) {
      return res.status(404).send("Order not found.");
    }

    const order = orderSnap.data();
    
    if (order.token !== token) {
      return res.status(403).send("Invalid token.");
    }

    if (order.status !== 'paid') {
      return res.status(403).send("Order has not been paid yet.");
    }

    // Fetch Book info to get fileUrl
    const bookSnap = await getDoc(doc(db, 'books', order.bookId));
    if (!bookSnap.exists()) {
      return res.status(404).send("Book file not found.");
    }

    const book = bookSnap.data();
    
    if (!book.fileUrl) {
      return res.status(404).send("Book file has not been uploaded yet.");
    }

    // In a real production app, we would use Firebase Admin SDK to generate a signed URL
    // but here we'll redirect to the storage URL (which should be protected by rules)
    // or just return the URL. For this applet, redirect is simpler.
    res.redirect(book.fileUrl);

  } catch (error) {
    console.error("Download Error:", error);
    res.status(500).send("Internal server error.");
  }
});

app.listen(port, () => {
  console.log(`Payment proxy running at http://localhost:${port}`);
});
