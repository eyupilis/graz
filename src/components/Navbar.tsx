
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Online Catalog', path: '/catalog' },
    { name: 'Cat Products', path: '/cat-products' },
    { name: 'Dog Products', path: '/dog-products' },
    { name: 'Contact', path: '/contact' },
  ];

  const leftNavItems = navItems.slice(0, Math.ceil(navItems.length / 2));
  const rightNavItems = navItems.slice(Math.ceil(navItems.length / 2));

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-vibrant-purple via-vibrant-secondary to-vibrant-tertiary shadow-xl backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-accent transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Left Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {leftNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-white hover:text-accent transition-all duration-300 hover:-translate-y-0.5 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Centered Logo */}
          <Link 
            to="/" 
            className="relative group"
          >
            <img 
              src="/lovable-uploads/a959c00d-29ee-4d8e-a380-43dac2ab889c.png"
              alt="Grazing Premium Pet Products"
              className="h-12 transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Right Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {rightNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-white hover:text-accent transition-all duration-300 hover:-translate-y-0.5 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-6">
            <button className="text-white hover:text-accent transition-all duration-300 hover:scale-110">
              <User size={24} />
            </button>
            <button className="text-white hover:text-accent transition-all duration-300 hover:scale-110">
              <ShoppingCart size={24} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="py-4 px-4">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-full border border-white/20 focus:outline-none focus:border-accent transition-colors bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed inset-0 bg-gradient-to-br from-vibrant-purple to-vibrant-pink backdrop-blur-lg z-50 md:hidden">
            <div className="container px-4 py-6">
              <div className="space-y-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block text-lg text-white hover:text-accent transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex justify-center space-x-8">
                <button className="text-white hover:text-accent transition-colors duration-300">
                  <User size={24} />
                </button>
                <button className="text-white hover:text-accent transition-colors duration-300">
                  <ShoppingCart size={24} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
