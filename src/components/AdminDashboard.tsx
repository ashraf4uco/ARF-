import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthProvider';
import { db, storage, handleFirestoreError, OperationType } from '../utils/firebase';
import { collection, query, getDocs, addDoc, updateDoc, doc, deleteDoc, orderBy, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Plus, Edit, Trash2, BookOpen, Package, DollarSign, Users, Eye, Image as ImageIcon, FileText, X, Upload } from 'lucide-react';
import { Ebook } from '../data/books';

export const AdminDashboard: React.FC = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [books, setBooks] = useState<Ebook[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'stats'>('inventory');
  const [isEditing, setIsEditing] = useState<Ebook | null>(null);

  useEffect(() => {
    if (!authLoading && isAdmin) {
      fetchData();
    }
  }, [authLoading, isAdmin]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Books
      const booksSnap = await getDocs(query(collection(db, 'books'), orderBy('createdAt', 'desc')));
      const booksData = booksSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setBooks(booksData);

      // Fetch Orders
      const ordersSnap = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc')));
      const ordersData = ordersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
    } catch (error) {
      console.error("Data fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) return;

    try {
      const bookData = {
        ...isEditing,
        price: Number(isEditing.price),
        updatedAt: serverTimestamp(),
        createdAt: isEditing.createdAt || serverTimestamp(),
      };

      if (isEditing.id) {
        await updateDoc(doc(db, 'books', isEditing.id), bookData);
      } else {
        await addDoc(collection(db, 'books'), { ...bookData, isPublished: false });
      }
      
      setIsEditing(null);
      fetchData();
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save book.");
    }
  };

  const handleFileUpload = async (file: File, type: 'cover' | 'file') => {
    try {
      const storageRef = ref(storage, `books/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      
      if (type === 'cover') {
        setIsEditing(prev => prev ? { ...prev, coverImage: url } : null);
      } else {
        setIsEditing(prev => prev ? { ...prev, fileUrl: url } : null);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed.");
    }
  };

  if (authLoading || loading) return <div className="min-h-screen flex items-center justify-center font-serif italic text-neutral-400">Loading Dashboard...</div>;
  if (!isAdmin) return <div className="min-h-screen flex items-center justify-center text-rose-500 font-bold tracking-widest uppercase">Unauthorized Access</div>;

  const totalSales = orders.filter(o => o.status === 'paid').reduce((acc, o) => acc + o.amount, 0);

  return (
    <div className="min-h-screen bg-[#FAF9F6] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-neutral-950">Store Dashboard</h1>
            <p className="text-sm text-neutral-400">Manage your digital publishing empire.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsEditing({} as any)}
              className="px-5 py-2 bg-neutral-950 text-white rounded-full text-[11px] font-bold uppercase tracking-widest flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Ebook
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-950">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Total Sales</p>
              <p className="text-xl font-serif font-bold text-neutral-950">${totalSales.toFixed(2)}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-950">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Orders</p>
              <p className="text-xl font-serif font-bold text-neutral-950">{orders.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-950">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Total Books</p>
              <p className="text-xl font-serif font-bold text-neutral-950">{books.length}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-200 gap-8">
          {['inventory', 'orders', 'stats'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-4 text-[11px] font-bold uppercase tracking-widest transition-all relative ${
                activeTab === tab ? 'text-neutral-950' : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-950" />}
            </button>
          ))}
        </div>

        {/* Inventory View */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-neutral-50 border-b border-neutral-100">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Book</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Category</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Price</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {books.map((book) => (
                  <tr key={book.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={book.coverImage} className="w-8 aspect-[3/4] rounded object-cover" />
                        <span className="text-[13px] font-serif font-bold text-neutral-950">{book.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[12px] text-neutral-500">{book.category}</td>
                    <td className="px-6 py-4 text-[12px] font-bold tabular-nums">${book.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                        book.isPublished ? 'bg-emerald-50 text-emerald-600' : 'bg-neutral-100 text-neutral-400'
                      }`}>
                        {book.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => setIsEditing(book)} className="p-2 text-neutral-400 hover:text-neutral-950 transition-colors"><Edit className="w-4 h-4" /></button>
                        <button className="p-2 text-neutral-400 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Orders View */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-neutral-50 border-b border-neutral-100">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Customer</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Book</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-serif font-bold text-neutral-950">{order.buyerName}</span>
                        <span className="text-[10px] text-neutral-400">{order.buyerEmail}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[12px] text-neutral-500">{order.bookId}</td>
                    <td className="px-6 py-4 text-[12px] font-bold tabular-nums">${order.amount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                        order.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[10px] text-neutral-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-[#FAF9F6] w-full max-w-2xl rounded-3xl border border-neutral-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-neutral-200 bg-white flex items-center justify-between">
                <h3 className="text-xl font-serif font-bold text-neutral-950">
                  {isEditing.id ? 'Edit Ebook' : 'New Ebook'}
                </h3>
                <button onClick={() => setIsEditing(null)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSaveBook} className="p-8 overflow-y-auto space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Title</label>
                    <input 
                      type="text" 
                      required
                      value={isEditing.title || ''} 
                      onChange={e => setIsEditing({...isEditing, title: e.target.value})}
                      className="w-full px-4 py-2 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Category</label>
                    <input 
                      type="text" 
                      value={isEditing.category || ''} 
                      onChange={e => setIsEditing({...isEditing, category: e.target.value})}
                      className="w-full px-4 py-2 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Short Description</label>
                  <textarea 
                    value={isEditing.description || ''} 
                    onChange={e => setIsEditing({...isEditing, description: e.target.value})}
                    className="w-full px-4 py-2 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950 min-h-[80px]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Price ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      value={isEditing.price || ''} 
                      onChange={e => setIsEditing({...isEditing, price: Number(e.target.value)})}
                      className="w-full px-4 py-2 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Status</label>
                    <div className="flex items-center gap-4 py-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={isEditing.isPublished} 
                          onChange={e => setIsEditing({...isEditing, isPublished: e.target.checked})}
                          className="w-4 h-4 rounded border-neutral-200 text-neutral-950"
                        />
                        <span className="text-sm">Published</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                      <ImageIcon className="w-3 h-3" /> Cover Image
                    </label>
                    <div className="flex flex-col gap-3">
                      {isEditing.coverImage && (
                        <img src={isEditing.coverImage} className="w-20 aspect-[3/4] rounded-lg object-cover border border-neutral-200" />
                      )}
                      <label className="cursor-pointer px-4 py-2 bg-white border border-neutral-200 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-50 transition-colors inline-flex items-center gap-2 w-max">
                        <Upload className="w-3.5 h-3.5" /> Upload Cover
                        <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'cover')} />
                      </label>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                      <FileText className="w-3 h-3" /> Ebook File (PDF/EPUB)
                    </label>
                    <div className="flex flex-col gap-3">
                      {isEditing.fileUrl && (
                        <div className="text-[10px] text-emerald-600 font-bold uppercase flex items-center gap-1">
                          <Eye className="w-3 h-3" /> File Uploaded
                        </div>
                      )}
                      <label className="cursor-pointer px-4 py-2 bg-white border border-neutral-200 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-50 transition-colors inline-flex items-center gap-2 w-max">
                        <Upload className="w-3.5 h-3.5" /> Upload File
                        <input type="file" accept=".pdf,.epub" className="hidden" onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'file')} />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-100">
                  <button type="submit" className="w-full py-4 bg-neutral-950 text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all shadow-lg active:scale-[0.98]">
                    Save Ebook
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
