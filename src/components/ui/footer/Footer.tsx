import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { 
  Cat, 
  Dog, 
  Rocket, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
  CreditCard,
  Truck,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const particleSpring = useSpring({
    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
    config: { tension: 150, friction: 10 }
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gray-50 text-[#142444] overflow-hidden">
      {/* Arka plan görseli için alan */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/images/hero-bg.jpg" 
          alt="Background" 
          className="absolute w-full h-full object-cover opacity-[0.25]"
          style={{
            filter: 'grayscale(30%)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-gray-50/60 to-gray-50/70" />
      </div>

      {/* Üst Kısım - Hizmet Özellikleri */}
      <div className="border-b border-[#142444]/20 relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 bg-white/50 p-6 rounded-xl hover:bg-white/80 transition-all duration-300"
            >
              <CreditCard className="w-12 h-12 text-[#18243c]" />
              <div>
                <h4 className="font-bold text-lg text-[#18243c]">Secure Payment</h4>
                <p className="text-[#142444]/90">256-bit SSL security</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4 bg-white/50 p-6 rounded-xl hover:bg-white/80 transition-all duration-300"
            >
              <Truck className="w-12 h-12 text-[#18243c]" />
              <div>
                <h4 className="font-bold text-lg text-[#18243c]">Fast Delivery</h4>
                <p className="text-[#142444]/90">Within 2-3 business days</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 bg-white/50 p-6 rounded-xl hover:bg-white/80 transition-all duration-300"
            >
              <ShieldCheck className="w-12 h-12 text-[#18243c]" />
              <div>
                <h4 className="font-bold text-lg text-[#18243c]">Quality Guarantee</h4>
                <p className="text-[#142444]/90">100% original products</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 bg-white/50 p-6 rounded-xl hover:bg-white/80 transition-all duration-300"
            >
              <HeartHandshake className="w-12 h-12 text-[#18243c]" />
              <div>
                <h4 className="font-bold text-lg text-[#18243c]">24/7 Support</h4>
                <p className="text-[#142444]/90">Always by your side</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ana Footer İçeriği */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Kurumsal */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#18243c]">Corporate</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-[#142444]/90 hover:text-[#18243c] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-[#142444]/90 hover:text-[#18243c] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-[#142444]/90 hover:text-[#18243c] transition-colors">
                  Our Stores
                </a>
              </li>
              <li>
                <a href="#" className="text-[#142444]/90 hover:text-[#18243c] transition-colors">
                  Sustainability
                </a>
              </li>
            </ul>
          </div>

          {/* Kategoriler */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#18243c]">Categories</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-[#142444]/90 hover:text-[#18243c] transition-colors">
                  Cat Products
                </a>
              </li>
              <li>
                <a href="#" className="text-[#142444]/90 hover:text-[#18243c] transition-colors">
                  Dog Products
                </a>
              </li>
              <li>
                <a href="#" className="text-[#142444]/90 hover:text-[#18243c] transition-colors">
                  Premium Food
                </a>
              </li>
              <li>
                <a href="#" className="text-[#142444]/90 hover:text-[#18243c] transition-colors">
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Müşteri Hizmetleri */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#18243c]">Customer Service</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-[#142444]/90 hover:text-[#18243c] transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-[#142444]/90 hover:text-[#18243c] transition-colors">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#" className="text-[#142444]/90 hover:text-[#18243c] transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-[#142444]/90 hover:text-[#18243c] transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#18243c]">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#18243c] mt-1" />
                <span className="text-[#142444]/90">
                  Ahmediye St. İskenderpasa District 6/3<br />
                  FATIH/ISTANBUL
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#18243c] mt-1" />
                <div className="text-[#142444]/90">
                  <p>+90 212 638 48 26-27</p>
                  <p>+90 532 164 00 71</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#18243c]" />
                <span className="text-[#142444]/90">
                  info@grazingpet.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#18243c] mt-1" />
                <div className="text-[#142444]/90">
                  <p>Monday - Friday</p>
                  <p>9:00 AM - 5:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Sosyal Medya ve Bülten */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <img 
                src="/images/navbar/logo (1).png" 
                alt="Grazing Logo" 
                className="h-16 w-auto"
              />
            </div>
            <h3 className="text-xl font-bold text-[#18243c]">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#18243c] flex items-center justify-center hover:bg-[#142444] transition-colors">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#18243c] flex items-center justify-center hover:bg-[#142444] transition-colors">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#18243c] flex items-center justify-center hover:bg-[#142444] transition-colors">
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#18243c] flex items-center justify-center hover:bg-[#142444] transition-colors">
                <Youtube className="w-5 h-5 text-white" />
              </a>
            </div>

            <div className="pt-6 border-t border-[#142444]/20">
              <h4 className="text-lg font-bold mb-4 text-[#18243c]">Our Mobile App</h4>
              <div className="flex gap-4">
                <a href="#" className="flex-1">
                  <img src="/images/app-store.png" alt="App Store" className="w-full" />
                </a>
                <a href="#" className="flex-1">
                  <img src="/images/google-play.png" alt="Google Play" className="w-full" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Bilgi ve Telif Hakkı */}
        <div className="mt-16 pt-8 border-t border-[#142444]/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-[#142444]/90 text-sm">
              © 2024 Grazing Pet. All rights reserved.
            </div>
            <div className="flex justify-center gap-6">
              <img src="/images/payment/visa.png" alt="Visa" className="h-8" />
              <img src="/images/payment/mastercard.png" alt="Mastercard" className="h-8" />
              <img src="/images/payment/paypal.png" alt="PayPal" className="h-8" />
            </div>
            <div className="flex justify-end gap-4 text-sm">
              <a href="#" className="text-[#142444]/90 hover:text-[#18243c] transition-colors">
                Terms of Use
              </a>
              <span className="text-[#142444]/50">|</span>
              <a href="#" className="text-[#142444]/90 hover:text-[#18243c] transition-colors">
                GDPR
              </a>
              <span className="text-[#142444]/50">|</span>
              <a href="#" className="text-[#142444]/90 hover:text-[#18243c] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Yukarı Çık Butonu */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-4 bg-[#18243c] rounded-full
                   hover:bg-[#142444] transition-colors text-white shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Rocket className="w-6 h-6" />
      </motion.button>

      {/* AI Chat Widget */}
      <div className="fixed bottom-8 left-8">
        <motion.button
          onClick={() => setShowChat(!showChat)}
          className="p-4 bg-[#18243c] rounded-full hover:bg-[#142444] transition-colors text-white shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>

        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-20 left-0 w-80 bg-white rounded-lg shadow-lg p-4 border border-[#142444]/20"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Cat className="w-6 h-6 text-[#18243c]" />
                <span className="font-medium text-[#18243c]">Pet AI Assistant</span>
              </div>
              <div className="h-64 overflow-y-auto bg-gray-50 rounded p-4 mb-4">
                <p className="text-[#142444]">Hello! How can I help you today?</p>
              </div>
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full px-4 py-2 bg-gray-50 border border-[#142444]/20 rounded-lg 
                           focus:border-[#18243c] outline-none text-[#142444]
                           placeholder-[#142444]/50"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dekoratif Arka Plan */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#18243c]/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer; 