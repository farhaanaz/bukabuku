import { motion } from 'motion/react';
import { CheckoutStepper } from '../components/CheckoutStepper';
import { CreditCard, Building2 } from 'lucide-react';
import { useState, useContext } from 'react';
import { NavigationContext } from '../App';

const paymentMethods = [
  {
    id: 'bca',
    name: 'Transfer BCA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png',
  },
  {
    id: 'mandiri',
    name: 'Transfer Mandiri',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png',
  },
  {
    id: 'bri',
    name: 'Transfer BRI',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/BRI_2020.svg/2560px-BRI_2020.svg.png',
  },
  {
    id: 'bni',
    name: 'Transfer BNI',
    logo: 'https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/2560px-BNI_logo.svg.png',
  },
];

export function PaymentPage() {
  const { navigate } = useContext(NavigationContext);
  const [selectedMethod, setSelectedMethod] = useState('bca');

  return (
    <div className="min-h-screen bg-background">
      <CheckoutStepper currentPath="payment" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold">Payment Method</h2>

          <p className="text-muted-foreground">
            Choose your preferred payment method
          </p>

          {/* COD Option (Disabled) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-border bg-muted/30 opacity-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">Cash on Delivery (COD)</h3>
                  <p className="text-sm text-muted-foreground">Not Available</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bank Transfer */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Bank Transfer
            </h3>

            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-white hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-10 bg-white rounded border border-border flex items-center justify-center p-2">
                      <img
                        src={method.logo}
                        alt={method.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="font-medium">{method.name}</span>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === method.id
                        ? 'border-primary'
                        : 'border-muted-foreground'
                    }`}
                  >
                    {selectedMethod === method.id && (
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* PayPal (Disabled) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-xl border border-border bg-muted/30 opacity-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-10 bg-white rounded border border-border flex items-center justify-center p-2">
                  <span className="text-blue-600 font-bold">PayPal</span>
                </div>
                <div>
                  <h3 className="font-semibold">PayPal</h3>
                  <p className="text-sm text-muted-foreground">Not Available</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('confirmation')}
            className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium hover:shadow-lg transition-shadow"
          >
            Continue to Confirmation
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
