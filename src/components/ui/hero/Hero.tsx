import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Stars, Float, PerspectiveCamera } from '@react-three/drei'
import { ArrowDown, Sparkles, Heart, Star, ShoppingBag, Zap, ArrowRight, Cat, Dog, Bone, Fish, PawPrint } from 'lucide-react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { useSpring, animated, to } from '@react-spring/web'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// Özel Cursor Bileşeni
const CustomCursor = () => {
  const cursorRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setTargetPosition({ x: e.clientX, y: e.clientY })
      const target = e.target
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer')
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const followMouse = () => {
      setPosition(prev => ({
        x: prev.x + (targetPosition.x - prev.x) * 0.15,
        y: prev.y + (targetPosition.y - prev.y) * 0.15
      }))
      requestAnimationFrame(followMouse)
    }
    
    followMouse()
  }, [targetPosition])

  return (
    <motion.div
      ref={cursorRef}
      className="fixed w-8 h-8 pointer-events-none z-50"
      style={{
        x: position.x - 16,
        y: position.y - 16,
      }}
      animate={{
        scale: isPointer ? 1.2 : 1,
        rotate: isPointer ? 15 : 0,
      }}
      transition={{
        type: "tween",
        duration: 0.2,
        ease: "easeOut"
      }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 0px 1px rgba(255,255,255,0.7))' }}>
        <g>
          <path d="M16 8C17.1046 8 18 7.10457 18 6C18 4.89543 17.1046 4 16 4C14.8954 4 14 4.89543 14 6C14 7.10457 14.8954 8 16 8Z" fill="#142444"/>
          <path d="M24 12C25.1046 12 26 11.1046 26 10C26 8.89543 25.1046 8 24 8C22.8954 8 22 8.89543 22 10C22 11.1046 22.8954 12 24 12Z" fill="#142444"/>
          <path d="M8 12C9.10457 12 10 11.1046 10 10C10 8.89543 9.10457 8 8 8C6.89543 8 6 8.89543 6 10C6 11.1046 6.89543 12 8 12Z" fill="#142444"/>
          <path d="M16 28C20.4183 28 24 24.4183 24 20C24 15.5817 20.4183 12 16 12C11.5817 12 8 15.5817 8 20C8 24.4183 11.5817 28 16 28Z" fill="#142444"/>
        </g>
      </svg>
    </motion.div>
  )
}

// Gelişmiş Parçacık Sistemi
const ParticleSystem = () => {
  const count = 1000
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const scales = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50

    colors[i * 3] = Math.random() * 0.5 + 0.5
    colors[i * 3 + 1] = Math.random() * 0.5 + 0.5
    colors[i * 3 + 2] = Math.random()

    scales[i] = Math.random()
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={count}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Animasyonlu Başlık
const AnimatedTitle = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <div className={`flex flex-wrap justify-center ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ 
            opacity: 0,
            y: Math.random() * 100 - 50,
            x: Math.random() * 100 - 50,
            rotate: Math.random() * 360,
            scale: 0
          }}
          animate={{ 
            opacity: 1,
            y: 0,
            x: 0,
            rotate: 0,
            scale: 1
          }}
          transition={{
            duration: 1.2,
            delay: index * 0.1,
            type: "spring",
            stiffness: 100,
            damping: 10
          }}
          whileHover={{
            scale: 1.2,
            rotate: Math.random() * 30 - 15,
            transition: { duration: 0.2 }
          }}
          className="text-7xl md:text-9xl font-bold inline-block tracking-widest relative"
          style={{
            color: '#e7dbc3',
            textShadow: '0 0 20px rgba(231, 219, 195, 0.5)',
            marginRight: char === ' ' ? '1rem' : '0.2rem'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
          <motion.div
            className="absolute -inset-2 bg-[#e7dbc3]/10 rounded-lg -z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: index * 0.1 + 0.5,
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
          />
        </motion.span>
      ))}
    </div>
  )
}

// Slogan Animasyonu
const AnimatedSlogan = ({ text }: { text: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
      className="relative"
    >
      <motion.p
        initial={{ opacity: 0, y: 20, letterSpacing: "0.2em" }}
        animate={{ opacity: 1, y: 0, letterSpacing: "0.5em" }}
        transition={{ duration: 1.2, delay: 2 }}
        className="text-3xl text-[#bfc3cc] tracking-[0.5em] font-light relative z-10"
      >
        {text}
      </motion.p>
      
      {/* Glow Efekti */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#e7dbc3]/0 via-[#e7dbc3]/20 to-[#e7dbc3]/0"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 2,
          delay: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1
        }}
      />
    </motion.div>
  )
}

// Gelişmiş Floating Icons
const FloatingIcon = ({ Icon, delay, x, y }) => {
  const [spring, api] = useSpring(() => ({
    from: { y: 0, rotate: 0 },
    to: async (next) => {
      while (true) {
        await next({ y: 10, rotate: 10 })
        await next({ y: -10, rotate: -10 })
      }
    },
    config: { mass: 1, tension: 120, friction: 14 },
    delay
  }))

  return (
    <animated.div
      style={{
        ...spring,
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: spring.rotate.to(r => `rotate(${r}deg)`)
      }}
      className="text-[#e7dbc3]/30 hover:text-[#e7dbc3]/60 transition-colors duration-300"
    >
      <Icon size={32} />
    </animated.div>
  )
}

// Loading Sayfası Bileşeni
interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#1e3a6d] flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo Container */}
      <motion.div
        className="relative"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 1.1], opacity: [0, 1] }}
        transition={{
          duration: 0.8,
          times: [0, 1],
          ease: "easeOut"
        }}
      >
        <img
          src="/images/navbar/logo (1).png"
          alt="Grazing Logo"
          className="w-48 h-48 object-contain"
          style={{ filter: 'brightness(1.5) contrast(1.2)' }}
        />
      </motion.div>

      {/* Buhar Efektleri */}
      <motion.div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[300px] h-[300px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ 
              scale: 0,
              opacity: 0,
              filter: 'blur(20px)',
            }}
            animate={{
              scale: [1, 1.5, 0],
              opacity: [0, 0.4, 0],
              filter: ['blur(20px)', 'blur(30px)', 'blur(20px)'],
            }}
            transition={{
              duration: 1,
              delay: i * 0.01,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

// Ana Hero Bileşeni
const Hero = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const containerRef = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10])

  const { rotateX, rotateY } = useSpring({
    rotateX: mousePosition.y / 20,
    rotateY: mousePosition.x / 20,
    config: { mass: 1, tension: 180, friction: 60 }
  })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleDiscoverClick = () => {
    const element = document.getElementById('features');
    if (element) {
      const yOffset = -80; // Navbar yüksekliği kadar offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }

  const handleLearnMoreClick = () => {
    navigate('/contact', { replace: true });
  }

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        ) : (
          <motion.section
            ref={containerRef}
            className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#142444] via-[#18243c] to-[#142444]"
            style={{ opacity, scale }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Perde Efekti */}
            <motion.div
              className="absolute inset-0 z-40 flex"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                className="w-1/2 h-full bg-[#142444]"
                initial={{ x: 0 }}
                animate={{ x: "-100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.div
                className="w-1/2 h-full bg-[#142444]"
                initial={{ x: 0 }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Video Arka Plan */}
            <motion.div 
              className="absolute inset-0 z-0"
              style={{ y }}
            >
              <motion.video
                ref={videoRef}
                initial={{ scale: 1.2, filter: "blur(10px)" }}
                animate={{ scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src="/videos/vecteezy_a-dog-and-cat-eating-food-from-a-bowl_52372495.mov"
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={() => setVideoLoaded(true)}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'brightness(0.8)' }}
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-gradient-to-b from-[#142444]/60 via-[#18243c]/40 to-[#142444]/60" 
              />
            </motion.div>

            {/* 3D Arka Plan */}
            <div className="absolute inset-0 z-10">
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <Stars
                  radius={100}
                  depth={50}
                  count={5000}
                  factor={4}
                  saturation={0}
                  fade
                  speed={1}
                />
                <Float
                  speed={1.5}
                  rotationIntensity={1}
                  floatIntensity={2}
                >
                  <ParticleSystem />
                </Float>
              </Canvas>
            </div>

            {/* Floating Icons */}
            <div className="absolute inset-0 z-20 overflow-hidden">
              <FloatingIcon Icon={PawPrint} delay={0} x={20} y={30} />
              <FloatingIcon Icon={Bone} delay={500} x={80} y={20} />
              <FloatingIcon Icon={Cat} delay={1000} x={70} y={70} />
              <FloatingIcon Icon={Fish} delay={1500} x={30} y={60} />
              <FloatingIcon Icon={Dog} delay={2000} x={50} y={40} />
            </div>

            {/* Ana İçerik */}
            <animated.div
              style={{
                transform: to([rotateX, rotateY], (x, y) => `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`)
              }}
              className="relative z-30 min-h-screen flex flex-col items-center justify-center px-6"
            >
              {/* Buhar Efekti */}
              <motion.div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-[500px] h-[500px] rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(231, 219, 195, 0.15) 0%, rgba(231, 219, 195, 0) 70%)',
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    initial={{ 
                      scale: 0,
                      opacity: 0,
                      filter: 'blur(20px)',
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0, 0.3, 0],
                      filter: ['blur(20px)', 'blur(40px)', 'blur(20px)'],
                    }}
                    transition={{
                      duration: 8 + Math.random() * 4,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, filter: "blur(30px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 2, delay: 0.5 }}
                className="text-center space-y-16"
              >
                {/* Ana Başlık */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 1 }}
                >
                  <motion.h1 
                    className="text-8xl font-bold text-[#e7dbc3] tracking-wider"
                    initial={{ letterSpacing: "2em", filter: "blur(20px)" }}
                    animate={{ letterSpacing: "0.2em", filter: "blur(0px)" }}
                    transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
                  >
                    GRAZING
                  </motion.h1>
                </motion.div>

                {/* Alt Başlık */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 2 }}
                >
                  <motion.p 
                    className="text-3xl text-[#bfc3cc] tracking-[0.5em] font-light"
                    initial={{ letterSpacing: "1em", filter: "blur(10px)" }}
                    animate={{ letterSpacing: "0.5em", filter: "blur(0px)" }}
                    transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
                  >
                    PREMIUM PET PRODUCTS
                  </motion.p>
                </motion.div>
                
                {/* Butonlar */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 3 }}
                  className="flex justify-center gap-6"
                >
                  <motion.button
                    onClick={handleDiscoverClick}
                    whileHover={{ 
                      scale: 1.05,
                      textShadow: "0 0 8px rgb(231, 219, 195)",
                      boxShadow: "0 0 15px rgba(231, 219, 195, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-12 py-5 bg-[#e7dbc3] text-[#142444] rounded-xl
                             font-semibold shadow-lg hover:shadow-xl tracking-widest
                             transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
                  >
                    <span className="relative z-10">DISCOVER</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.button>
                  <motion.button
                    onClick={handleLearnMoreClick}
                    whileHover={{ 
                      scale: 1.05,
                      textShadow: "0 0 8px rgb(231, 219, 195)",
                      boxShadow: "0 0 15px rgba(231, 219, 195, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-12 py-5 bg-transparent border-2 border-[#e7dbc3]
                             text-[#e7dbc3] rounded-xl font-semibold tracking-widest
                             hover:bg-[#e7dbc3]/10 transition-all duration-300 backdrop-blur-sm
                             relative overflow-hidden"
                  >
                    <span className="relative z-10">LEARN MORE</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e7dbc3]/30 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Scroll İndikatörü */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 3.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
              >
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex flex-col items-center gap-2 backdrop-blur-sm"
                >
                  <span className="text-[#e7dbc3] text-sm tracking-widest">SCROLL</span>
                  <ArrowDown className="w-6 h-6 text-[#e7dbc3]" />
                </motion.div>
              </motion.div>
            </animated.div>

            {/* Dekoratif Efektler */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 z-20 pointer-events-none"
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-[#e7dbc3] rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.5, 0],
                    scale: [0, 1.5, 0],
                    filter: ['blur(0px)', 'blur(4px)', 'blur(0px)']
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}

export default Hero 