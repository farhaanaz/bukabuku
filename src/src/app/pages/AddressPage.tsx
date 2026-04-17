import { motion } from 'motion/react';
import { CheckoutStepper } from '../components/CheckoutStepper';
import { MapPin, Plus, X } from 'lucide-react';
import { useState, useContext } from 'react';
import { NavigationContext } from '../App';

interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

export function AddressPage() {
  const { navigate } = useContext(NavigationContext);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    province: '',
    postalCode: '',
  });

  const handleSaveAddress = () => {
    if (!formData.name || !formData.phone || !formData.street || !formData.city) {
      return;
    }

    const newAddress: Address = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      street: formData.street,
      city: formData.city,
      province: formData.province,
      postalCode: formData.postalCode,
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, newAddress]);
    setSelectedAddress(newAddress.id);
    setIsAddingNew(false);
    setFormData({
      name: '',
      phone: '',
      street: '',
      city: '',
      province: '',
      postalCode: '',
    });
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    if (selectedAddress === id) {
      setSelectedAddress(null);
    }
  };

  const handleEditAddress = (address: Address) => {
    setFormData({
      name: address.name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      province: address.province,
      postalCode: address.postalCode,
    });
    handleDeleteAddress(address.id);
    setIsAddingNew(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <CheckoutStepper currentPath="address" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold">Shipping Address</h2>

          <p className="text-muted-foreground">
            {addresses.length > 0
              ? 'Select an address or add a new one'
              : 'Please add your shipping address'}
          </p>

          {/* Add New Address Form */}
          {isAddingNew ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-white rounded-xl border-2 border-primary space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">New Address</h3>
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="p-1 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary outline-none"
                    placeholder="e.g., 628123456789"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Street Address *</label>
                <textarea
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary outline-none resize-none"
                  rows={2}
                  placeholder="Street address, building, apartment, etc."
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary outline-none"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Province</label>
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary outline-none"
                    placeholder="Province"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Postal Code</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary outline-none"
                    placeholder="12345"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveAddress}
                className="w-full bg-primary text-primary-foreground py-3 rounded-full font-medium hover:shadow-lg transition-shadow"
              >
                Save Address
              </motion.button>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.01 }}
              onClick={() => setIsAddingNew(true)}
              className="w-full p-4 border-2 border-dashed border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New Address
            </motion.button>
          )}

          {/* Address List */}
          {addresses.length > 0 && (
            <div className="space-y-4">
              {addresses.map((address, index) => (
                <motion.div
                  key={address.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedAddress(address.id)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedAddress === address.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-white hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{address.name}</h3>
                        {address.isDefault && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 text-muted-foreground text-sm">
                        <p className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>
                            {address.street}
                            {address.city && `, ${address.city}`}
                            {address.province && `, ${address.province}`}
                            {address.postalCode && `, ${address.postalCode}`}
                          </span>
                        </p>
                        <p className="ml-6">Phone: {address.phone}</p>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditAddress(address);
                          }}
                          className="text-sm text-primary font-medium hover:underline"
                        >
                          Edit
                        </button>
                        <span className="text-muted-foreground">|</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAddress(address.id);
                          }}
                          className="text-sm text-destructive font-medium hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedAddress === address.id
                          ? 'border-primary'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {selectedAddress === address.id && (
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pickup Option */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-xl border border-border bg-muted/30"
          >
            <h3 className="font-semibold mb-2">Pick Up in Store</h3>
            <p className="text-muted-foreground mb-3">
              You can also pick up your order at our store location
            </p>
            <p className="text-sm">
              <strong>BookHaven Store</strong>
              <br />
              Cempaka Putih, Jakarta Pusat, Jakarta, Indonesia
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('shipping')}
            disabled={!selectedAddress}
            className={`w-full py-4 rounded-full font-medium transition-all ${
              selectedAddress
                ? 'bg-primary text-primary-foreground hover:shadow-lg'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            Continue to Shipping
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
