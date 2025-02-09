import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Heart, Shield, Star, ArrowRight, Sparkles, Info } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from '@react-spring/web';
import { catProducts } from '../data/products';

// Animasyon varyantları
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

// Özel Bileşenler
const FeatureCard = ({ icon: Icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { scale, shadow } = useSpring({
    scale: isHovered ? 1.05 : 1,
    shadow: isHovered ? 20 : 10,
    config: { mass: 1, tension: 200, friction: 20 }
  });

  return (
    <animated.div
      style={{
        transform: scale.to(s => `scale(${s})`),
        boxShadow: shadow.to(s => `0 ${s}px ${s * 2}px rgba(139, 92, 246, 0.1)`)
      }}
      className="bg-white rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-violet-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </animated.div>
  );
};

const ProductCard = ({ product, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [isHovered, setIsHovered] = useState(false);
  const cardSpring = useSpring({
    transform: isHovered 
      ? 'scale(1.02) translateY(-10px)'
      : 'scale(1) translateY(0px)',
    boxShadow: isHovered
      ? '0 30px 60px rgba(0,0,0,0.12)'
      : '0 10px 30px rgba(0,0,0,0.08)',
    config: { mass: 1, tension: 200, friction: 20 }
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={itemVariants}
      custom={index}
    >
      <Link to={`/cat-products/${product.id}`}>
        <animated.div
          style={cardSpring}
          className="bg-white rounded-3xl overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Ürün Görseli */}
          <div className="relative aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Ürün Bilgileri */}
          <div className="p-8 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-violet-100 text-violet-600 rounded-full text-sm font-medium">
                {product.details.ageRange}
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>

            <div className="pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-violet-600">
                <Info className="w-5 h-5" />
                <span className="font-medium">Detaylı Bilgi</span>
              </div>
              <ArrowRight className="w-5 h-5 text-violet-600" />
            </div>
          </div>
        </animated.div>
      </Link>
    </motion.div>
  );
};

const CatProducts = () => {
  const [activeTab, setActiveTab] = useState('all');
  const headerRef = useRef(null);

  // Paralaks efekti için scroll takibi
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const scrolled = window.scrollY;
        headerRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Bölümü */}
      <div className="relative h-[80vh] overflow-hidden">
        {/* Arkaplan Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="/videos/hero-background.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        </div>

        {/* Hero İçerik */}
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Premium Kedi Mamaları
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white/90 mb-8"
            >
              Evcil dostlarınız için özenle seçilmiş, yüksek kaliteli ve besleyici mamalar
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <button className="px-8 py-4 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors">
                Hemen Keşfet
              </button>
              <button className="px-8 py-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm">
                Daha Fazla Bilgi
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll İndikatörü */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="flex flex-col items-center"
          >
            <ChevronDown className="w-6 h-6 text-white" />
          </motion.div>
        </motion.div>
      </div>

      {/* Ana İçerik */}
      <div className="container mx-auto px-4 py-24">
        {/* Özellikler Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
        >
          <FeatureCard
            icon={Shield}
            title="Premium Kalite"
            description="En yüksek kalite standartlarında üretim"
          />
          <FeatureCard
            icon={Heart}
            title="Sağlıklı İçerik"
            description="Doğal ve besleyici içeriklerle formüle edilmiş"
          />
          <FeatureCard
            icon={Sparkles}
            title="Özel Formül"
            description="Her yaş ve ihtiyaca özel formülasyon"
          />
          <FeatureCard
            icon={Star}
            title="Lezzet Garantisi"
            description="Kedilerin severek tükettiği özel lezzet"
          />
        </motion.div>

        {/* Ürünler Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {catProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Bilgi Bölümü */}
      <section className="py-24 bg-violet-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Neden Premium Mama?
            </h2>
            <p className="text-xl text-gray-600">
              Kedilerinizin sağlığı ve mutluluğu için en iyi besinleri sunuyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Doğal İçerikler",
                description: "Tamamen doğal ve saf içeriklerle üretilmiştir"
              },
              {
                title: "Bilimsel Formül",
                description: "Veteriner hekimler tarafından geliştirilmiş formül"
              },
              {
                title: "Yaşam Boyu Destek",
                description: "Her yaş dönemine uygun besin değerleri"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CatProducts;