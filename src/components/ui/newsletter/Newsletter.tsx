import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { Fingerprint, Scan, Dog, Cat, Sparkles, X } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Parmak izi animasyonu
  const fingerprintSpring = useSpring({
    opacity: email.length > 0 ? 1 : 0.5,
    transform: email.length > 0 ? 'scale(1.1)' : 'scale(1)',
  });

  // Retina tarama animasyonu
  const scanSpring = useSpring({
    opacity: isScanning ? 1 : 0.5,
    transform: isScanning ? 'translateY(-5px)' : 'translateY(0px)',
  });

  // Neural network bağlantıları
  const NeuralNetwork = () => {
    const nodes = Array.from({ length: 30 });
    
    return (
      <div className="absolute inset-0 overflow-hidden">
        {nodes.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#e7dbc3] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
              filter: ['blur(0px)', 'blur(2px)', 'blur(0px)']
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsScanning(true);
    
    setTimeout(() => {
      setIsScanning(false);
      setShowSuccess(true);
    }, 2000);
  };

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-[#142444] via-[#18243c] to-[#142444]">
      {/* Arkaplan Efektleri */}
      <div className="absolute inset-0">
        <NeuralNetwork />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#142444]/80 to-[#142444]" />
        
        {/* Dekoratif Çizgiler */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-[#e7dbc3]/20 to-transparent"
              style={{
                top: `${(i + 1) * 5}%`,
                left: 0,
                right: 0,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scaleX: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Başlık */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring" }}
              className="inline-block mb-8"
            >
              <Sparkles className="w-20 h-20 text-[#e7dbc3]" />
            </motion.div>

            <motion.h2
              className="text-6xl font-bold text-[#ffffff] mb-6 relative"
              animate={{
                textShadow: [
                  '0 0 0px rgba(231, 219, 195, 0.5)',
                  '0 0 20px rgba(231, 219, 195, 0.5)',
                  '0 0 0px rgba(231, 219, 195, 0.5)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            >
              <motion.span className="relative">
                Subscribe to Our Newsletter
                <motion.div
                  className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-[#e7dbc3]/0 via-[#e7dbc3] to-[#e7dbc3]/0"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </motion.span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xl text-[#bfc3cc]"
            >
              Stay updated with our latest products, special offers, and pet care tips.
            </motion.p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative">
            {/* Email Input */}
            <motion.div
              className="relative mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-8 py-6 bg-[#ffffff]/5 rounded-2xl text-[#ffffff] text-lg
                         placeholder-[#ffffff]/30 border-2 border-[#e7dbc3]/10
                         focus:border-[#e7dbc3]/30 outline-none transition-all
                         backdrop-blur-sm"
              />
              <animated.div
                style={fingerprintSpring}
                className="absolute right-6 top-1/2 -translate-y-1/2"
              >
                <Fingerprint className="w-8 h-8 text-[#e7dbc3]" />
              </animated.div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <animated.button
                style={scanSpring}
                type="submit"
                disabled={isScanning || showSuccess}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative w-full py-6 rounded-2xl text-lg font-medium
                         text-[#142444] transition-all disabled:opacity-50
                         overflow-hidden"
              >
                {/* Button Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#e7dbc3] to-[#ffffff]"
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Button Content */}
                <motion.div
                  className="relative flex items-center justify-center gap-3"
                  animate={{
                    y: isScanning ? -30 : 0,
                    opacity: isScanning ? 0 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.div>

                {/* Scanning Animation */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{
                    y: isScanning ? 0 : 30,
                    opacity: isScanning ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Scan className="w-6 h-6 animate-pulse" />
                </motion.div>
              </animated.button>
            </motion.div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#142444]/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-[#ffffff] to-[#e7dbc3] p-12 rounded-3xl text-center
                       shadow-2xl relative overflow-hidden"
            >
              {/* Success Icon */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="mb-8"
              >
                <Dog className="w-24 h-24 text-[#142444]" />
              </motion.div>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-3xl font-bold text-[#142444]">
                  Welcome!
                </h3>
                <p className="text-lg text-[#142444]/80">
                  Thank you for joining our family.
                </p>
              </motion.div>

              {/* Close Button */}
              <motion.button
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 p-2 rounded-full
                         hover:bg-[#142444]/10 transition-colors"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <X className="w-6 h-6 text-[#142444]" />
              </motion.button>

              {/* Dekoratif Parçacıklar */}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#142444]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dekoratif Parçacıklar */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[#e7dbc3]/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </section>
  );
};

export default Newsletter; 