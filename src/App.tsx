import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/navbar/Navbar";
import Features from "./components/ui/features/Features";
import Hero from "./components/ui/hero/Hero";
import Categories from "./components/ui/categories/Categories";
import CatProducts from "./pages/CatProducts";
import CatProductDetail from "./pages/CatProductDetail";
import Newsletter from "./components/ui/newsletter/Newsletter";
import Footer from "./components/ui/footer/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <div className="bg-gradient-animated">
                <Hero />
                <Features />
                <Categories />
                <Newsletter />
              </div>
            } />
            <Route path="/cat-products" element={<CatProducts />} />
            <Route path="/cat-products/:productId" element={<CatProductDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;