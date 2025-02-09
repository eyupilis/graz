import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, PerspectiveCamera, Html, Float } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSpring, animated } from '@react-spring/web'
import * as THREE from 'three'
import { Leaf, Beaker, Shield, Heart, ArrowRight, Sparkles } from 'lucide-react'
import Lottie from 'lottie-react'
import { useInView } from 'react-intersection-observer'

// GSAP ScrollTrigger'ı kaydet
gsap.registerPlugin(ScrollTrigger)

interface Product {
  name: string
  position: [number, number, number]
}

interface Category {
  id: string
  title: string
  description: string
  products: Product[]
  bgPattern: string
}

// Kategori verileri
const categories: Category[] = [
  {
    id: 'cat-products',
    title: 'Kedi Ürünleri',
    description: 'Kedileriniz için özel tasarlanmış premium ürünler',
    products: [
      { name: 'Tırmalama Direği', position: [1, 0, 1] },
      { name: 'Oyun Topu', position: [-1, 1, 0] },
      { name: 'Kedi Yatağı', position: [0, -1, 1] },
    ],
    bgPattern: '/patterns/cat-pattern.svg',
  },
  {
    id: 'dog-products',
    title: 'Köpek Ürünleri',
    description: 'Köpekleriniz için profesyonel bakım ürünleri',
    products: [
      { name: 'Köpek Tasması', position: [1, 1, 0] },
      { name: 'Oyuncak Kemik', position: [-1, 0, 1] },
      { name: 'Köpek Yatağı', position: [0, -1, -1] },
    ],
    bgPattern: '/patterns/dog-pattern.svg',
  },
]

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<'granted' | 'denied'>
}

// Gyroscope Hook
const useGyroscope = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta && event.gamma) {
        setRotation({
          x: event.beta * 0.1, // Yatay eksen
          y: event.gamma * 0.1, // Dikey eksen
        })
      }
    }

    const initGyroscope = async () => {
      if ('DeviceOrientationEvent' in window) {
        const DeviceOrientationEventiOS = DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
        if (typeof DeviceOrientationEventiOS.requestPermission === 'function') {
          try {
            const permission = await DeviceOrientationEventiOS.requestPermission()
            if (permission === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation)
            }
          } catch (error) {
            console.error('Gyroscope permission denied:', error)
          }
        } else {
          window.addEventListener('deviceorientation', handleOrientation)
        }
      }
    }

    initGyroscope()

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [])

  return rotation
}

// 3D Model Bileşenleri
const CatModel = () => {
  const groupRef = useRef<THREE.Group>()
  const gyroscope = useGyroscope()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Desktop rotasyonu
      if (window.innerWidth > 768) {
        groupRef.current.rotation.y = clock.getElapsedTime() * 0.5
      }
      // Mobil gyroscope rotasyonu
      else {
        groupRef.current.rotation.x = gyroscope.x
        groupRef.current.rotation.y = gyroscope.y
      }
    }
  })

  return (
    <group ref={groupRef}>
      {/* Gövde */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.5}
          roughness={0.2}
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Kulaklar */}
      <group position={[0, 0.8, 0]}>
        <mesh position={[-0.4, 0.3, 0]}>
          <coneGeometry args={[0.2, 0.4, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0.4, 0.3, 0]}>
          <coneGeometry args={[0.2, 0.4, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Holografik Efekt */}
      <mesh scale={[1.1, 1.1, 1.1]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#4fc3f7"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

const DogModel = () => {
  const groupRef = useRef<THREE.Group>()
  const gyroscope = useGyroscope()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Desktop rotasyonu
      if (window.innerWidth > 768) {
        groupRef.current.rotation.y = clock.getElapsedTime() * 0.5
      }
      // Mobil gyroscope rotasyonu
      else {
        groupRef.current.rotation.x = gyroscope.x
        groupRef.current.rotation.y = gyroscope.y
      }
    }
  })

  return (
    <group ref={groupRef}>
      {/* Gövde */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.5, 1, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.5}
          roughness={0.2}
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Baş */}
      <mesh position={[0, 0.8, 0.5]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Kulaklar */}
      <group position={[0, 1.1, 0.5]}>
        <mesh position={[-0.3, 0, 0]}>
          <coneGeometry args={[0.15, 0.3, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0.3, 0, 0]}>
          <coneGeometry args={[0.15, 0.3, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Holografik Efekt */}
      <group>
        <mesh scale={[1.1, 1.1, 1.1]} position={[0, 0, 0]}>
          <capsuleGeometry args={[0.55, 1.1, 32, 32]} />
          <meshStandardMaterial
            color="#4fc3f7"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh scale={[1.1, 1.1, 1.1]} position={[0, 0.8, 0.5]}>
          <sphereGeometry args={[0.44, 32, 32]} />
          <meshStandardMaterial
            color="#4fc3f7"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  )
}

// Holografik Text Bileşeni
interface HolographicTextProps {
  text: string
  delay?: number
}

const HolographicText: React.FC<HolographicTextProps> = ({ text, delay = 0 }) => {
  const characters = text.split('')
  
  return (
    <div className="flex">
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.05,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          className="text-white text-5xl font-bold filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  )
}

// Paralaks Arkaplan
interface ParallaxBackgroundProps {
  pattern: string
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ pattern }) => {
  const [{ offset }, api] = useSpring(() => ({ offset: [0, 0] }))
  const gyroscope = useGyroscope()
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth > 768) {
        const x = (e.clientX / window.innerWidth) * 50
        const y = (e.clientY / window.innerHeight) * 50
        api.start({ offset: [x, y] })
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [api])

  useEffect(() => {
    if (window.innerWidth <= 768) {
      api.start({ offset: [gyroscope.y * 20, gyroscope.x * 20] })
    }
  }, [gyroscope, api])

  return (
    <animated.div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `url(${pattern})`,
        backgroundSize: '400px',
        transform: offset.to((x, y) => `translate(${x}px, ${y}px)`),
      }}
    />
  )
}

// Quantum Tunnel Efekti
const QuantumTunnel = () => {
  const tunnelRef = useRef<THREE.Group>()
  const particlesCount = 1000
  const positions = useMemo(() => {
    const pos = []
    for (let i = 0; i < particlesCount; i++) {
      pos.push(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      )
    }
    return new Float32Array(pos)
  }, [])

  useFrame(({ clock }) => {
    if (tunnelRef.current) {
      tunnelRef.current.rotation.z = clock.getElapsedTime() * 0.2
      tunnelRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2
    }
  })

  return (
    <group ref={tunnelRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#4fc3f7"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

// Holografik Projeksiyon Efekti
const HologramEffect = ({ children }: { children: React.ReactNode }) => {
  const materialRef = useRef<THREE.ShaderMaterial>()
  
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh scale={[1.1, 1.1, 1.1]}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        uniforms={{
          time: { value: 0 },
        }}
        vertexShader={`
          varying vec3 vNormal;
          varying vec2 vUv;
          void main() {
            vNormal = normal;
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          varying vec3 vNormal;
          varying vec2 vUv;
          void main() {
            float scanline = sin(vUv.y * 30.0 + time * 2.0) * 0.1;
            float edge = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 color = vec3(0.3, 0.8, 1.0);
            gl_FragColor = vec4(color, (0.1 + scanline + edge * 0.5) * 0.5);
          }
        `}
      />
      {children}
    </mesh>
  )
}

// Lottie Animasyonları
const dnaAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  assets: [],
  layers: [{
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "DNA",
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { 
        a: 1,
        k: [
          { t: 0, s: [0] },
          { t: 30, s: [180] },
          { t: 60, s: [360] }
        ]
      },
      p: { a: 0, k: [50, 50, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] }
    },
    shapes: [{
      ty: "gr",
      it: [{
        ty: "rc",
        d: 1,
        s: { a: 0, k: [40, 40] },
        p: { a: 0, k: [0, 0] },
        r: { a: 0, k: 0 }
      }]
    }]
  }]
}

// PawIcon bileşeni
const PawIcon = () => (
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
    className="text-[#e7dbc3]"
  >
    <path d="M12 2a3 3 0 0 0-3 3c0 1.7 1.3 3 3 3s3-1.3 3-3a3 3 0 0 0-3-3z"/>
    <path d="M19 8a3 3 0 0 0-3 3c0 1.7 1.3 3 3 3s3-1.3 3-3a3 3 0 0 0-3-3z"/>
    <path d="M5 8a3 3 0 0 0-3 3c0 1.7 1.3 3 3 3s3-1.3 3-3a3 3 0 0 0-3-3z"/>
    <path d="M12 14a3 3 0 0 0-3 3c0 1.7 1.3 3 3 3s3-1.3 3-3a3 3 0 0 0-3-3z"/>
  </svg>
)

interface Feature {
  title: string
  description: string
  image: string
  direction: 'left' | 'right'
  icon: React.ElementType
  bgColor: string
}

const features: Feature[] = [
  {
    title: "Premium Products",
    description: "High quality products selected for the health and happiness of your pets.",
    image: "/images/features/premium_pet_products.jpg",
    direction: 'right',
    icon: PawIcon,
    bgColor: 'bg-white'
  },
  {
    title: "Natural Ingredients",
    description: "Premium quality natural ingredients selected for optimal pet nutrition.",
    image: "/images/features/dogal_icerikler.jpg",
    direction: 'left',
    icon: Leaf,
    bgColor: 'bg-[#142444]'
  },
  {
    title: "Scientific Formula",
    description: "Research-backed formulations developed by veterinary experts.",
    image: "/images/features/bilimsel_formul.jpg", 
    direction: 'right',
    icon: Beaker,
    bgColor: 'bg-white'
  },
  {
    title: "Quality Guarantee",
    description: "100% satisfaction guarantee on all our products.",
    image: "/images/hero-bg.jpg",
    direction: 'left',
    icon: Shield,
    bgColor: 'bg-[#142444]'
  }
]

// Parçacık Sistemi
const ParticleField = () => {
  const count = 500
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30

    colors[i * 3] = Math.random()
    colors[i * 3 + 1] = Math.random()
    colors[i * 3 + 2] = Math.random()
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
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

// Nöral Ağ Bağlantı Çizgisi
const NeuralConnection = ({ startX, startY, endX, endY, progress }) => {
  const pathRef = useRef(null)
  const [length, setLength] = useState(0)

  useEffect(() => {
    if (pathRef.current) {
      setLength(pathRef.current.getTotalLength())
    }
  }, [startX, startY, endX, endY])

  const curve = `M ${startX} ${startY} C ${startX} ${(startY + endY) / 2}, ${endX} ${(startY + endY) / 2}, ${endX} ${endY}`

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <path
        ref={pathRef}
        d={curve}
        stroke="url(#neural-gradient)"
        strokeWidth="2"
        fill="none"
        className="neural-path"
        style={{
          strokeDasharray: length,
          strokeDashoffset: length - (length * progress),
          filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.3))'
        }}
      />
      <defs>
        <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(139, 92, 246, 0.5)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.5)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

interface TypewriterTextProps {
  text: string
  delay?: number
  className?: string
  onComplete?: () => void
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  delay = 0, 
  className = "",
  onComplete 
}) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 50) // Yazma hızı

      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, onComplete])

  return (
    <span className={`relative ${className}`}>
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="absolute -right-1 top-0 w-0.5 h-full bg-[#142444]"
        />
      )}
    </span>
  )
}

interface RopeEffectProps {
  children: React.ReactNode
}

const RopeEffect: React.FC<RopeEffectProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ y: -1000, rotate: -10 }}
      animate={{ 
        y: 0,
        rotate: [10, -5, 3, -2, 0],
        transition: {
          y: { duration: 1.5, ease: [0.215, 0.61, 0.355, 1] },
          rotate: { duration: 2, ease: "easeOut", times: [0, 0.2, 0.4, 0.6, 0.8, 1] }
        }
      }}
      className="relative"
    >
      <motion.div
        className="absolute left-1/2 -top-[1000px] w-0.5 h-[1000px] bg-gradient-to-b from-[#e7dbc3] to-[#142444] origin-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1, delay: 1.5, ease: "easeInOut" }}
      />
      {children}
    </motion.div>
  )
}

interface FeatureCardProps {
  feature: Feature
  index: number
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const isDark = feature.bgColor === 'bg-[#142444]'

  // Dalga animasyonu için özel spring animasyonu
  const [{ y }, api] = useSpring(() => ({ 
    y: 0,
    config: {
      mass: 1,
      tension: 170,
      friction: 26
    }
  }))

  useEffect(() => {
    // Sürekli dalga animasyonu
    const interval = setInterval(() => {
      api.start({
        from: { y: 0 },
        to: [
          { y: -10 },
          { y: 0 }
        ],
        config: {
          mass: 1,
          tension: 170,
          friction: 26
        },
        delay: index * 100 // Her kart için farklı gecikme
      })
    }, 2000 + (index * 100)) // Toplam animasyon süresi

    return () => clearInterval(interval)
  }, [api, index])

  return (
    <animated.div
      ref={ref}
      style={{
        transform: y.to(value => `translateY(${value}px)`)
      }}
      className="relative group h-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        className={`relative w-full h-full rounded-3xl overflow-hidden shadow-xl transition-all duration-500 
                    ${isDark ? 'bg-[#142444]' : 'bg-white'} hover:shadow-2xl`}
      >
        {/* Görsel */}
        <div className="relative w-full h-[200px] overflow-hidden">
          <motion.img
            src={feature.image}
            alt={feature.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-[#142444] via-[#142444]/50 to-transparent' : 'bg-gradient-to-t from-white via-white/50 to-transparent'}`} />
        </div>

        {/* İçerik */}
        <div className="relative p-8">
          <motion.h3
            className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#142444]'}`}
          >
            {feature.title}
          </motion.h3>

          <motion.p
            className={`text-base mb-8 ${isDark ? 'text-white/80' : 'text-[#142444]/80'}`}
          >
            {feature.description}
          </motion.p>

          <motion.button
            className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300
                     ${isDark ? 'bg-white text-[#142444] hover:bg-gray-100' : 'bg-[#142444] text-white hover:bg-[#1a2d5a]'}
                     flex items-center justify-center gap-2 group/button`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Learn More</span>
            <ArrowRight className="w-5 h-5 group-hover/button:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Dekoratif Çizgi */}
        <motion.div 
          className={`absolute bottom-0 left-0 h-1 ${isDark ? 'bg-white/20' : 'bg-[#142444]/20'}`}
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </animated.div>
  )
}

// Video Geçiş Bileşeni
const VideoTransition = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 1.5])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#142444]"
      style={{
        opacity
      }}
    >
      {/* Video Container */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale
        }}
      >
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            inset: 0,
            backdropFilter: 'blur(5px)'
          }}
          animate={{
            backdropFilter: ['blur(10px)', 'blur(0px)', 'blur(10px)']
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.7)' }}
        >
          <source src="/videos/vecteezy_a-large-dog-and-a-kitten-eat-together-from-the-same-bowl_37338109.mp4" type="video/mp4" />
        </video>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#142444]/50 via-transparent to-[#142444]/50" />
      </motion.div>

      {/* İçerik */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 p-8"
        >
          <motion.h2
            className="text-6xl md:text-8xl font-bold text-white"
            animate={{
              textShadow: [
                "0 0 20px rgba(231, 219, 195, 0.5)",
                "0 0 40px rgba(231, 219, 195, 0.5)",
                "0 0 20px rgba(231, 219, 195, 0.5)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Mutlu Dostlar
          </motion.h2>
          <motion.p
            className="text-2xl text-[#e7dbc3] max-w-2xl mx-auto"
            animate={{
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Evcil dostlarınızın mutluluğu bizim önceliğimiz
          </motion.p>

          {/* Dekoratif İkonlar */}
          <div className="flex justify-center gap-8">
            {[Heart, Sparkles].map((Icon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.3,
                  type: "spring"
                }}
                className="text-[#e7dbc3]"
              >
                <Icon size={40} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Parçacık Efekti */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[#e7dbc3]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </motion.div>
  )
}

// Ana Features Bileşeni
const Features = () => {
  return (
    <section id="features" className="relative py-32 bg-gradient-to-b from-[#142444] via-[#18243c] to-[#142444]">
      {/* Arka Plan */}
      <div className="absolute inset-0">
        <img 
          src="/images/features/Untitled design.svg" 
          alt="Features Background" 
          className="w-full h-full object-cover"
        />
        
        {/* Hafif Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#5B8C5A]/10 via-transparent to-[#5B8C5A]/10" />
      </div>

      {/* Ana İçerik */}
      <div className="relative z-10">
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
            <PawIcon />
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
                  Premium Products
                </motion.span>
              </motion.h2>
              
              {/* Animasyonlu altçizgi */}
              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-[#e7dbc3]/0 via-[#e7dbc3] to-[#e7dbc3]/0"
                initial={{ width: "0%" }}
                whileInView={{ width: "200px" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </div>
            <p className="text-xl text-[#142444]/80 max-w-3xl mx-auto">
              Discover our high-quality selection of premium pet products, crafted with care 
              for your beloved companions.
            </p>
          </div>
        </motion.div>

        {/* Özellik kartları */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Stil tanımlamaları için global CSS ekleyin
const styles = `
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .preserve-3d {
    transform-style: preserve-3d;
  }
  
  .backface-hidden {
    backface-visibility: hidden;
  }
  
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
  
  .group:hover .group-hover\\:rotate-y-180 {
    transform: rotateY(180deg);
  }
`

// Stilleri head'e ekleyin
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}

export default Features