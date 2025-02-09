import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, MessageCircle, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'

const menuItems = [
  { title: 'Home', path: '/' },
  { title: 'Cat Products', path: '/cat-products' },
  { title: 'Dog Products', path: '/dog-products' },
  { title: 'Contact', path: '/contact' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const location = useLocation()

  // Scroll efekti
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // React Spring animasyonları
  const navSpring = useSpring({
    background: scrolled 
      ? 'rgba(255, 255, 255, 0.95)' 
      : 'rgba(255, 255, 255, 0.85)',
    backdropFilter: scrolled ? 'blur(12px)' : 'blur(8px)',
    boxShadow: scrolled 
      ? '0 10px 30px -10px rgba(20, 36, 68, 0.1)' 
      : '0 0px 0px 0px rgba(20, 36, 68, 0)',
    height: scrolled ? '70px' : '80px',
    config: { mass: 1, tension: 280, friction: 60 }
  })

  // Sol ve sağ menü öğelerini ayır
  const leftMenuItems = menuItems.slice(0, 2)
  const rightMenuItems = menuItems.slice(2)

  return (
    <animated.nav 
      style={navSpring}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-6">
        <div className="relative flex items-center justify-between h-full">
          {/* Sol Menü */}
          <div className="hidden lg:flex items-center space-x-8">
            {leftMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-4 py-2 text-[#142444] font-medium group"
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className="relative z-10">{item.title}</span>
                <motion.div
                  className="absolute inset-0 bg-[#142444]/5 rounded-lg -z-0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: hoveredItem === item.path ? 1 : 0,
                    opacity: hoveredItem === item.path ? 1 : 0
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-[#142444] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: location.pathname === item.path || hoveredItem === item.path ? "100%" : "0%"
                  }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </div>

          {/* Logo */}
          <motion.div
            className="flex items-center justify-center bg-white rounded-full p-2 overflow-hidden shadow-lg"
            initial={{ scale: 0.8, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >
            <div className="relative flex items-center justify-center">
              <img
                src="/images/navbar/logo (1).png"
                alt="Grazing Logo"
                className="h-14 w-auto relative z-10"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#142444]/5 via-[#142444]/10 to-[#142444]/5"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          </motion.div>

          {/* Sağ Menü */}
          <div className="hidden lg:flex items-center space-x-8">
            {rightMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-4 py-2 text-[#142444] font-medium group"
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className="relative z-10">{item.title}</span>
                <motion.div
                  className="absolute inset-0 bg-[#142444]/5 rounded-lg -z-0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: hoveredItem === item.path ? 1 : 0,
                    opacity: hoveredItem === item.path ? 1 : 0
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-[#142444] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: location.pathname === item.path || hoveredItem === item.path ? "100%" : "0%"
                  }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}

            {/* Arama Butonu */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="relative p-2"
            >
              <Search className="w-5 h-5 text-[#142444]" />
              <motion.div
                className="absolute inset-0 bg-[#142444]/5 rounded-full -z-10"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>

          {/* Mobil Logo */}
          <div className="lg:hidden flex items-center justify-center">
            <motion.div
              className="bg-white rounded-full p-2 overflow-hidden shadow-lg"
              initial={{ scale: 0.8, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
            >
              <div className="relative flex items-center justify-center">
                <img
                  src="/images/navbar/logo (1).png"
                  alt="Grazing Logo"
                  className="h-12 w-auto relative z-10"
                />
              </div>
            </motion.div>
          </div>

          {/* Mobil Menü Butonu */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative p-2"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-[#142444]" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-[#142444]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Arama Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 p-4 bg-white shadow-lg rounded-b-2xl
                       border-t border-[#142444]/10 backdrop-blur-lg"
            >
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-6 py-4 rounded-xl bg-[#142444]/5 text-[#142444]
                           border border-[#142444]/20 focus:border-[#142444]/40 
                           placeholder-[#142444]/50 outline-none transition-colors"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#142444]/40" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobil Menü */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg 
                       rounded-b-2xl overflow-hidden border-t border-[#142444]/10"
            >
              <div className="p-4 space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-[#142444] rounded-lg hover:bg-[#142444]/5
                               transition-colors relative overflow-hidden group"
                    >
                      <span className="relative z-10">{item.title}</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#142444]/0 via-[#142444]/5 to-[#142444]/0"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </animated.nav>
  )
}

export default Navbar 