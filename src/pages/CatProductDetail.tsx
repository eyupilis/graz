import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, Shield, Heart, Sparkles, Info, Package, Clock, Target } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { catProducts } from '../data/products';

interface NutritionalInfo {
  [key: string]: string;
}

interface NutritionalChartProps {
  nutritionalInfo: NutritionalInfo;
}

const NutritionalChart: React.FC<NutritionalChartProps> = ({ nutritionalInfo }) => {
  const chartRef = useRef(null);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Besin Değerleri</h3>
      <div className="space-y-4">
        {Object.entries(nutritionalInfo).map(([key, value]) => (
          <div key={key} className="relative">
            <div className="flex justify-between mb-1">
              <span className="text-gray-600 capitalize">{key}</span>
              <span className="text-gray-800 font-medium">{value}</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-500 rounded-full"
                style={{ width: value }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { transform, opacity } = useSpring({
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    opacity: isHovered ? 1 : 0.8,
    config: { tension: 300, friction: 20 }
  });

  return (
    <animated.div
      style={{ transform, opacity }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-violet-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </animated.div>
  );
};

const CatProductDetail = () => {
  const { productId } = useParams();
  const product = catProducts.find(p => p.id === productId);
  const [selectedSize, setSelectedSize] = useState(product?.details.packageSizes[0]);
  const [activeTab, setActiveTab] = useState('ingredients');

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ürün Bulunamadı</h2>
          <Link to="/cat-products" className="text-violet-600 hover:text-violet-700">
            Kedi Ürünlerine Geri Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Bölümü */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <Link
              to="/cat-products"
              className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Kedi Ürünlerine Geri Dön
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              {product.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90"
            >
              {product.slogan}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sol Kolon - Ürün Detayları */}
          <div className="lg:col-span-2 space-y-12">
            {/* Özellikler Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                icon={Package}
                title="Özel Paketleme"
                description="Tazeliği korumak için özel paketleme"
              />
              <FeatureCard
                icon={Target}
                title="Hedefli Beslenme"
                description="Yaş ve ihtiyaca özel formülasyon"
              />
            </div>

            {/* Detay Sekmeleri */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="flex border-b">
                {['ingredients', 'benefits', 'features'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      flex-1 px-6 py-4 text-sm font-medium
                      ${activeTab === tab
                        ? 'text-violet-600 border-b-2 border-violet-600'
                        : 'text-gray-500 hover:text-gray-700'
                      }
                    `}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'ingredients' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {product.details.ingredients.map((ingredient) => (
                      <div
                        key={ingredient}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <Shield className="w-5 h-5 text-violet-600" />
                        {ingredient}
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'benefits' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {product.details.benefits.map((benefit) => (
                      <div
                        key={benefit}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <Heart className="w-5 h-5 text-violet-600" />
                        {benefit}
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'features' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {product.details.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <Sparkles className="w-5 h-5 text-violet-600" />
                        {feature}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Sağ Kolon - Besin Değerleri ve Sipariş */}
          <div className="space-y-8">
            {/* Besin Değerleri */}
            <NutritionalChart nutritionalInfo={product.details.nutritionalInfo} />

            {/* Paket Seçimi */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Paket Seçimi</h3>
              <div className="grid grid-cols-3 gap-4">
                {product.details.packageSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${selectedSize === size
                        ? 'bg-violet-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* İletişim Butonu */}
            <button className="w-full py-4 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors text-lg font-semibold">
              İletişime Geç
            </button>

            {/* Bilgi Kartı */}
            <div className="bg-violet-50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-violet-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Önemli Bilgi
                  </h4>
                  <p className="text-gray-600">
                    Bu ürün veteriner hekimler tarafından geliştirilmiş olup, 
                    kedilerinizin sağlığı için özel olarak formüle edilmiştir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatProductDetail; 