import { motion } from 'motion/react';
import { CheckoutStepper } from '../components/CheckoutStepper';
import { Truck, Package } from 'lucide-react';
import { useState, useContext } from 'react';
import { NavigationContext } from '../App';

const shippingOptions = [
  {
    id: 'standard',
    name: 'Standard',
    provider: 'Lion Parcel',
    duration: '3-6 business days',
    price: 58000,
  },
  {
    id: 'express',
    name: 'Express',
    provider: 'JNE Express',
    duration: '1-2 business days',
    price: 95000,
  },
  {
    id: 'cargo',
    name: 'Cargo',
    provider: 'Lion Parcel Bigpack',
    duration: '6-7 business days',
    price: 110000,
  },
];

export function ShippingPage() {
  const { navigate } = useContext(NavigationContext);
  const [selectedShipping, setSelectedShipping] = useState('standard');

  return (
    <div className="min-h-screen bg-background">
      <CheckoutStepper currentPath="shipping" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold">Shipping Method</h2>

          <p className="text-muted-foreground">
            Select your preferred shipping option
          </p>

          {/* Economy Option (Disabled) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-border bg-muted/30 opacity-50"
          >
            <div className="flex items-center gap-4">
              <Package className="w-6 h-6" />
              <div className="flex-1">
                <h3 className="font-semibold">Economy</h3>
                <p className="text-sm text-muted-foreground">Not Available</p>
              </div>
            </div>
          </motion.div>

          {/* Shipping Options */}
          <div className="space-y-3">
            {shippingOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedShipping(option.id)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedShipping === option.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-white hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Truck className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">{option.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {option.provider} - {option.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-semibold">Rp {option.price.toLocaleString()}</span>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedShipping === option.id
                          ? 'border-primary'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {selectedShipping === option.id && (
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pickup Option (Disabled) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-xl border border-border bg-muted/30 opacity-50"
          >
            <div className="flex items-center gap-4">
              <Package className="w-6 h-6" />
              <div className="flex-1">
                <h3 className="font-semibold">Pick Up in Store</h3>
                <p className="text-sm text-muted-foreground">Not Available</p>
              </div>
            </div>
          </motion.div>

          {/* Important Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-xl bg-blue-50 border border-blue-200"
          >
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Due to postal service updates, shipping times may vary. We'll notify you once your order is shipped.
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('payment')}
            className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium hover:shadow-lg transition-shadow"
          >
            Continue to Payment
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
