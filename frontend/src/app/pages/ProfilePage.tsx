import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, LogIn, LogOut } from 'lucide-react';
import { useContext, useState, useEffect } from 'react';
import { NavigationContext, AuthContext } from '../App';

export function ProfilePage() {
  const { navigate } = useContext(NavigationContext);
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || 'Farhan Ahmad Zamzami',
    email: user?.email || 'farhan@example.com',
    phone: user?.phone || '6285855246645',
    dateOfBirth: '1995-08-15',
    gender: 'Male',
    address: {
      street: 'Jl. Raya Dadapalangu, Ponggok',
      city: 'Kabupaten Blitar',
      province: 'Jawa Timur',
      postalCode: '66153',
    },
  });

  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone || prev.phone,
      }));
    }
  }, [user]);

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
  };

  const handleChange = (field: string, value: string) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleAddressChange = (field: string, value: string) => {
    setProfileData({
      ...profileData,
      address: { ...profileData.address, [field]: value },
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-muted rounded-full mb-6">
            <User className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Silakan Masuk</h2>
          <p className="text-muted-foreground mb-6">
            Anda harus masuk terlebih dahulu untuk mengakses halaman profil
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('login')}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-shadow mx-auto"
          >
            <LogIn className="w-5 h-5" />
            Masuk Sekarang
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Profil Saya</h1>
                <p className="text-muted-foreground">Kelola informasi akun Anda</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className={`px-6 py-2 rounded-full font-medium flex items-center gap-2 transition-colors ${
                isEditing
                  ? 'bg-primary text-primary-foreground hover:shadow-lg'
                  : 'border border-border hover:bg-muted'
              }`}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4" />
                  Simpan Perubahan
                </>
              ) : (
                <>
                  <Edit2 className="w-4 h-4" />
                  Edit Profil
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-white rounded-xl border border-border space-y-6"
          >
            <h3 className="text-xl font-semibold mb-4">Informasi Pribadi</h3>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Nama Lengkap
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary outline-none"
                />
              ) : (
                <p className="text-muted-foreground">{profileData.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Alamat Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary outline-none"
                />
              ) : (
                <p className="text-muted-foreground">{profileData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Nomor Telepon
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary outline-none"
                />
              ) : (
                <p className="text-muted-foreground">{profileData.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Tanggal Lahir
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary outline-none"
                />
              ) : (
                <p className="text-muted-foreground">
                  {new Date(profileData.dateOfBirth).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Jenis Kelamin</label>
              {isEditing ? (
                <select
                  value={profileData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary outline-none"
                >
                  <option value="Male">Laki-laki</option>
                  <option value="Female">Perempuan</option>
                  <option value="Other">Lainnya</option>
                  <option value="Prefer not to say">Lebih baik tidak disebutkan</option>
                </select>
              ) : (
                <p className="text-muted-foreground">{profileData.gender}</p>
              )}
            </div>
          </motion.div>

          {/* Address Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-white rounded-xl border border-border space-y-6"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Informasi Alamat
            </h3>

            <div>
              <label className="block text-sm font-medium mb-2">Alamat Jalan</label>
              {isEditing ? (
                <textarea
                  value={profileData.address.street}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary outline-none resize-none"
                  rows={2}
                />
              ) : (
                <p className="text-muted-foreground">{profileData.address.street}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Kota</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.address.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary outline-none"
                />
              ) : (
                <p className="text-muted-foreground">{profileData.address.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Provinsi</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.address.province}
                  onChange={(e) => handleAddressChange('province', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary outline-none"
                />
              ) : (
                <p className="text-muted-foreground">{profileData.address.province}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Kode Pos</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.address.postalCode}
                  onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary outline-none"
                />
              ) : (
                <p className="text-muted-foreground">{profileData.address.postalCode}</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid md:grid-cols-3 gap-4"
        >
          <button
            onClick={() => navigate('wishlist')}
            className="p-4 bg-white rounded-xl border border-border hover:border-primary hover:shadow-md transition-all text-left"
          >
            <h4 className="font-semibold mb-1">Daftar Keinginan Saya</h4>
            <p className="text-sm text-muted-foreground">Lihat buku tersimpan</p>
          </button>
          <button
            onClick={() => navigate('tracking')}
            className="p-4 bg-white rounded-xl border border-border hover:border-primary hover:shadow-md transition-all text-left"
          >
            <h4 className="font-semibold mb-1">Lacak Pesanan</h4>
            <p className="text-sm text-muted-foreground">Cek status pesanan</p>
          </button>
          <button
            onClick={() => navigate('address')}
            className="p-4 bg-white rounded-xl border border-border hover:border-primary hover:shadow-md transition-all text-left"
          >
            <h4 className="font-semibold mb-1">Kelola Alamat</h4>
            <p className="text-sm text-muted-foreground">Alamat tersimpan</p>
          </button>
        </motion.div>

        {/* Account Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 p-6 bg-white rounded-xl border border-border"
        >
          <h3 className="text-xl font-semibold mb-4">Pengaturan Akun</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted transition-colors">
              Ubah Kata Sandi
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted transition-colors">
              Preferensi Notifikasi
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted transition-colors">
              Pengaturan Privasi
            </button>
            <div className="border-t border-border my-2" />
            <button
              onClick={logout}
              className="w-full text-left px-4 py-3 rounded-lg text-orange-600 hover:bg-orange-50 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Keluar dari Akun
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
              Hapus Akun
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
