import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Page } from '../App';

interface Step {
  label: string;
  page: Page;
}

const steps: Step[] = [
  { label: 'Cart', page: 'checkout' },
  { label: 'Address', page: 'address' },
  { label: 'Shipping', page: 'shipping' },
  { label: 'Payment', page: 'payment' },
  { label: 'Confirm', page: 'confirmation' },
];

export function CheckoutStepper({ currentPath }: { currentPath: Page }) {
  const currentIndex = steps.findIndex(step => step.page === currentPath);

  return (
    <div className="w-full py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div key={step.page} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.1 : 1,
                      backgroundColor: isCompleted || isCurrent ? '#A5C7F1' : '#e5e7eb',
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isCompleted || isCurrent
                        ? 'text-primary-foreground'
                        : 'text-muted-foreground bg-muted'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="font-medium">{index + 1}</span>
                    )}
                  </motion.div>
                  <span className={`text-xs mt-2 font-medium ${
                    isCurrent ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2 bg-muted relative">
                    <motion.div
                      initial={false}
                      animate={{
                        width: isCompleted ? '100%' : '0%',
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute h-full bg-primary"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
