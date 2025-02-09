import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Hero from '../components/ui/hero/Hero'
import Features from '../components/ui/features/Features'
import Categories from '../components/ui/categories/Categories'
import Newsletter from '../components/ui/newsletter/Newsletter';
import Footer from '../components/ui/footer/Footer';

const Home = () => {
  return (
    <div className="animate-fade-in">
      <Hero />
      <div id="features">
        <Features />
      </div>
      <Categories />
      {/* Hero Section with Video Background */}
      <section className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          >
            <source
              src="/videos/hero-background.mp4"
              type="video/mp4"
            />
          </video>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative h-full container mx-auto">
          <div className="flex flex-col justify-center h-full max-w-2xl space-y-8">
            <div className="animate-fade-in space-y-4">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md text-white/90 border border-white/20 hover:bg-white/20 transition-all duration-500">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                <span className="text-lg">Premium Pet Products</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white space-y-4">
                <span className="block animate-slide-up opacity-0 [animation-delay:300ms]">
                  Give Your Pet
                </span>
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent animate-slide-up opacity-0 [animation-delay:600ms]">
                  The Best Life
                </span>
              </h1>
              
              <p className="text-xl text-white/80 animate-slide-up opacity-0 [animation-delay:900ms] max-w-xl">
                Discover our curated collection of premium pet products, designed to bring joy and comfort to your furry friends.
              </p>
              
              <div className="flex gap-4 animate-slide-up opacity-0 [animation-delay:1200ms]">
                <Link
                  to="/catalog"
                  className="group inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-full transition-all duration-500 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1"
                >
                  Shop Now 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-4 rounded-full transition-all duration-500 border border-white/20"
                >
                  Contact Us
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Featured Products Slider */}
      <section className="py-24 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-soft-purple/30 via-soft-pink/20 to-soft-peach/30"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-vibrant-purple/20 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute top-1/3 -left-20 w-72 h-72 bg-vibrant-pink/20 rounded-full mix-blend-multiply filter blur-xl animate-float [animation-delay:2s]"></div>
          <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-soft-peach/40 rounded-full mix-blend-multiply filter blur-xl animate-float [animation-delay:4s]"></div>
        </div>

        <div className="container relative">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm shadow-xl">
              <Sparkles className="w-5 h-5 text-vibrant-purple animate-pulse" />
              <span className="text-lg font-medium bg-gradient-to-r from-vibrant-purple to-vibrant-pink bg-clip-text text-transparent">
                Featured Collection
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-vibrant-purple via-vibrant-secondary to-vibrant-tertiary bg-clip-text text-transparent">
              Trending Products
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.name}
                className="group relative bg-white/70 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {product.discount && (
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <span className="px-4 py-2 rounded-full bg-accent/90 backdrop-blur-md text-white font-medium animate-pulse shadow-lg">
                        -{product.discount}% OFF
                      </span>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="relative p-6 space-y-4">
                  {/* Product details with glass effect */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-text line-clamp-2 group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold bg-gradient-to-r from-vibrant-purple to-vibrant-pink bg-clip-text text-transparent">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-text/50 line-through text-sm">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add to cart button with animation */}
                  <button className="w-full bg-gradient-to-r from-vibrant-purple to-vibrant-pink text-white py-3 rounded-full hover:shadow-lg hover:shadow-accent/20 transition-all duration-500 transform hover:scale-105 flex items-center justify-center gap-2 group">
                    <span>Add to Cart</span>
                    <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  </button>
                </div>

                {/* Corner sparkle */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -rotate-12 group-hover:rotate-0">
                  <Sparkles className="w-6 h-6 text-white animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
  );
};

const featuredProducts = [
  {
    name: "Premium Cat Food",
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  },
  {
    name: "Dog Chew Toy",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
  },
  {
    name: "Cat Bed",
    price: 49.99,
    originalPrice: 59.99,
    discount: 15,
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  },
  {
    name: "Dog Collar",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
  },
];

export default Home;
