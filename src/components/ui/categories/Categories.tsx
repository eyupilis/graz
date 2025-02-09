import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Cat, Dog, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, PerspectiveCamera, Html, Float } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSpring, animated } from '@react-spring/web'
import * as THREE from 'three'
import { Leaf, Beaker, Shield, Heart, ArrowRight } from 'lucide-react'
import Lottie from 'lottie-react'
import { useInView } from 'react-intersection-observer'

const categories = [
  {
    id: 'cat-products',
    title: 'Cat Products',
    description: 'Premium products specially designed for your cats',
    icon: Cat,
    color: 'from-transparent to-transparent',
    route: '/cat-products',
    image: '/images/categories/Untitled design.svg',
    products: [
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.28.56.jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.00 (1).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.00 (2).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.00.jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.01 (1).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.01 (2).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.01.jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.02 (1).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.02 (2).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.02 (3).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.02.jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.03 (1).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.03 (2).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.03 (3).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.03.jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.04 (1).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.04 (2).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.04 (3).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.04.jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.05 (1).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.05 (2).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.05.jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.06 (1).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.06 (2).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.06 (3).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.06.jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.07 (1).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.07 (2).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.07.jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.11.jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.14.jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.15 (1).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.15.jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.16 (1).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.16 (2).jpeg',
      '/images/categories/cat products/WhatsApp Image 2025-02-06 at 21.29.16.jpeg'
    ]
  },
  {
    id: 'dog-products',
    title: 'Dog Products',
    description: 'High quality products for your dogs',
    icon: Dog,
    color: 'from-[#14243c] to-[#16243c]',
    route: '/dog-products',
    image: '/images/categories/dog products/kopek_3.png',
    products: [
      '/images/categories/dog products/kopek_1.png',
      '/images/categories/dog products/kopek_2.png',
      '/images/categories/dog products/kopek_3.png',
      '/images/categories/dog products/kopek_4.png',
      '/images/categories/dog products/kopek_5.png',
      '/images/categories/dog products/kopek_1.png',
      '/images/categories/dog products/kopek_2.png',
      '/images/categories/dog products/kopek_3.png',
      '/images/categories/dog products/kopek_4.png',
      '/images/categories/dog products/kopek_5.png',
      '/images/categories/dog products/kopek_1.png',
      '/images/categories/dog products/kopek_2.png',
      '/images/categories/dog products/kopek_3.png',
      '/images/categories/dog products/kopek_4.png',
      '/images/categories/dog products/kopek_5.png'
    ]
  }
]

// PawIcon bileşeni
interface PawIconProps {
  className?: string;
}

const PawIcon: React.FC<PawIconProps> = ({ className = "text-[#e7dbc3]" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2a3 3 0 0 0-3 3c0 1.7 1.3 3 3 3s3-1.3 3-3a3 3 0 0 0-3-3z"/>
    <path d="M19 8a3 3 0 0 0-3 3c0 1.7 1.3 3 3 3s3-1.3 3-3a3 3 0 0 0-3-3z"/>
    <path d="M5 8a3 3 0 0 0-3 3c0 1.7 1.3 3 3 3s3-1.3 3-3a3 3 0 0 0-3-3z"/>
    <path d="M12 14a3 3 0 0 0-3 3c0 1.7 1.3 3 3 3s3-1.3 3-3a3 3 0 0 0-3-3z"/>
  </svg>
)

// Özel Pati İmleci
const PawCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      const target = e.target
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer')
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.div
      className="fixed w-8 h-8 pointer-events-none z-50"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isPointer ? 1.2 : 1,
        opacity: isPointer ? 0.8 : 0.5
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.5
      }}
    >
      <img src="/images/paw-cursor.png" alt="Pati İmleci" className="w-full h-full" />
    </motion.div>
  )
}

const ProductGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const containerRef = useRef(null)
  const navigate = useNavigate()

  // Tüm ürünleri birleştir
  const allProducts = [
    ...categories[0].products.map(image => ({ image, type: 'Cat Product', route: '/cat-products' })),
    ...categories[1].products.map(image => ({ image, type: 'Dog Product', route: '/dog-products' }))
  ]

  const handleDragStart = (e) => {
    setIsDragging(true)
    setDragStart(e.clientX)
  }

  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    const currentPosition = e.clientX;
    const difference = dragStart - currentPosition;
    
    // Yeni index hesaplama
    const newIndex = Math.round(difference / (window.innerWidth / 4));
    let targetIndex = currentIndex + newIndex;
    
    // Sınırları kontrol et
    if (targetIndex < 0) {
      targetIndex = 0;
    } else if (targetIndex > allProducts.length - 4) {
      targetIndex = allProducts.length - 4;
    }
    
    setCurrentIndex(targetIndex);
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => {
      const nextIndex = prev + 4;
      return nextIndex >= allProducts.length - 4 ? prev : nextIndex;
    });
  }, [allProducts.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => {
      const prevIndex = prev - 4;
      return prevIndex < 0 ? 0 : prevIndex;
    });
  }, []);

  const handleProductClick = (route) => {
    navigate(route, { state: { animation: true } });
  };

  return (
    <section className="py-32 bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef]">
      {/* Başlık */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-block mb-6"
        >
          <PawIcon className="w-24 h-24 text-[#18243c]" />
        </motion.div>
        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-[#18243c] mb-4 relative"
          >
            <motion.span
              className="inline-block"
              animate={{
                textShadow: [
                  "0 0 0px rgba(24, 36, 60, 0.3)",
                  "0 0 20px rgba(24, 36, 60, 0.3)",
                  "0 0 0px rgba(24, 36, 60, 0.3)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Products
            </motion.span>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#e7dbc3]/0 via-[#e7dbc3] to-[#e7dbc3]/0"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#495057] text-lg relative"
          >
            <motion.span
              className="inline-block"
              animate={{
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Explore our wide range of pet products, carefully selected for your furry friends.
            </motion.span>
          </motion.p>
        </div>
      </motion.div>

      {/* Galeri */}
      <div className="container mx-auto px-4">
        <motion.div
          ref={containerRef}
          className="relative h-[600px] overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleDragEnd();
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
        >
          <motion.div
            className="absolute inset-0 flex gap-10"
            animate={{
              x: `-${currentIndex * 25}%`
            }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 20,
              mass: 0.8
            }}
          >
            {allProducts.map((product, index) => (
              <motion.div
                key={index}
                className="relative min-w-[350px] h-full group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  zIndex: 20,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="w-full h-full rounded-3xl overflow-hidden relative"
                  whileHover={{
                    boxShadow: "0 20px 60px rgba(24, 36, 60, 0.15)",
                  }}
                >
                  {/* Görsel */}
                  <motion.img
                    src={product.image}
                    alt={product.type}
                    className="w-full h-full object-cover"
                    whileHover={{ 
                      scale: 1.1,
                      filter: "brightness(0.8)",
                    }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Hover Overlay ve Buton */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <motion.button
                      onClick={() => handleProductClick(product.route)}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(24, 36, 60, 0.2)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white text-[#142444] rounded-xl font-semibold
                               transform transition-all duration-300 relative overflow-hidden"
                    >
                      <span className="relative z-10">Explore</span>
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Kontrol Butonları */}
          {currentIndex > 0 && (
            <motion.button
              className="absolute left-8 top-1/2 -translate-y-1/2 p-4 rounded-full 
                       bg-white shadow-lg hover:bg-[#f8f9fa] 
                       transition-colors z-50 group pointer-events-auto"
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-8 h-8 text-[#18243c] transform group-hover:-translate-x-1 transition-transform" />
            </motion.button>
          )}
          {currentIndex < allProducts.length - 4 && (
            <motion.button
              className="absolute right-8 top-1/2 -translate-y-1/2 p-4 rounded-full 
                       bg-white shadow-lg hover:bg-[#f8f9fa] 
                       transition-colors z-50 group pointer-events-auto"
              onClick={nextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-8 h-8 text-[#18243c] transform group-hover:translate-x-1 transition-transform" />
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  )
}

const CategoryCard = ({ category, index }) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    navigate(category.route, {
      state: { animation: true }
    })
  }

  // Kategori kartları için farklı yönlerden gelen animasyonlar
  const slideAnimations = {
    0: { x: -100, y: 0 },  // İlk kart soldan gelsin
    1: { x: 100, y: 0 }    // İkinci kart sağdan gelsin
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ 
          opacity: 0,
          x: slideAnimations[index]?.x || 0,
          y: slideAnimations[index]?.y || 0
        }}
        whileInView={{ 
          opacity: 1,
          x: 0,
          y: 0
        }}
        viewport={{ 
          once: true,
          amount: 0.2  // Kartın %20'si görünür olduğunda animasyon başlar
        }}
        transition={{
          duration: 1.5,  // Animasyon süresi 1.5 saniye
          delay: index * 0.4,  // Her kart arasında 0.4 saniye gecikme
          type: "spring",
          bounce: 0.3
        }}
        whileHover={{ scale: 1.02 }}
        className="relative h-[600px] rounded-3xl overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Görsel Container */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* İçerik */}
        <div className="absolute inset-0 p-12 flex flex-col justify-end">
          <motion.div
            animate={{
              y: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0.9
            }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* İkon */}
            <motion.div
              animate={{
                scale: isHovered ? 1.2 : 1,
                rotate: isHovered ? 360 : 0
              }}
              transition={{ duration: 0.5 }}
              className="text-[#e7dbc3]"
            >
              <category.icon size={48} />
            </motion.div>

            {/* Başlık */}
            <motion.h3
              className="text-3xl font-bold text-[#ffffff]"
              animate={{
                scale: isHovered ? 1.1 : 1,
                opacity: isHovered ? 1 : 0
              }}
            >
              {category.title}
            </motion.h3>

            {/* Açıklama */}
            <motion.p
              className="text-lg text-[#eaebee]"
              animate={{
                opacity: isHovered ? 1 : 0
              }}
            >
              {category.description}
            </motion.p>

            {/* Keşfet Butonu */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20
              }}
              className="px-8 py-4 bg-[#e7dbc3] text-[#142444] rounded-xl
                       font-semibold tracking-wider"
            >
              Explore
            </motion.button>
          </motion.div>
        </div>

        {/* Dekoratif Elementler */}
        <AnimatePresence>
          {isHovered && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-8 left-8"
              >
                <Star className="w-12 h-12 text-[#e7dbc3]" />
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute bottom-8 right-8"
              >
                <Sparkles className="w-12 h-12 text-[#e7dbc3]" />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

const Categories = () => {
  return (
    <>
      <PawCursor />
      <section className="relative py-32 bg-gradient-to-b from-[#142444] via-[#18243c] to-[#142444]">
        {/* Video Arka Plan */}
        <div className="absolute inset-0 z-0">
          <video
            src="/images/categories/Untitled design.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-90"
            style={{
              filter: 'brightness(0.7) contrast(1.1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#142444]/70 via-[#18243c]/50 to-[#142444]/70" />
        </div>

        {/* Başlık */}
        <motion.div 
          className="text-center mb-24 relative z-10"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, type: "spring" }}
            className="inline-block mb-12"
          >
            <PawIcon className="w-24 h-24 text-[#e7dbc3]" />
          </motion.div>

          <div className="space-y-8">
            <div className="relative">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-6xl font-bold text-[#ffffff] relative z-10"
              >
                <motion.span
                  className="inline-block"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(231, 219, 195, 0.2)",
                      "0 0 40px rgba(231, 219, 195, 0.4)",
                      "0 0 20px rgba(231, 219, 195, 0.2)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  Product Categories
                </motion.span>
              </motion.h2>
              
              {/* Animasyonlu altçizgi */}
              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-[#e7dbc3]/0 via-[#e7dbc3] to-[#e7dbc3]/0"
                initial={{ width: "0%" }}
                whileInView={{ width: "300px" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl text-[#bfc3cc] max-w-4xl mx-auto relative"
            >
              <motion.span
                className="inline-block"
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                Explore our wide range of pet products, carefully selected for your furry friends.
              </motion.span>
              
              {/* Dekoratif parçacıklar */}
              <motion.div
                className="absolute -inset-4 -z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-[#e7dbc3]/20"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.2, 0.5, 0.2],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </motion.div>
            </motion.p>
          </div>
        </motion.div>

        {/* Kategori Kartları */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>

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
      <ProductGallery />
    </>
  )
}

export default Categories 