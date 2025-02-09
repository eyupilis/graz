import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="animate-fadeIn py-12">
      <div className="container px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <p className="flex items-center gap-3">
                  <Phone className="text-secondary" size={20} />
                  <span>+1 234 567 890</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="text-secondary" size={20} />
                  <span>info@petshop.com</span>
                </p>
                <p className="flex items-center gap-3">
                  <MapPin className="text-secondary" size={20} />
                  <span>123 Pet Street, City</span>
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Business Hours</h2>
              <div className="space-y-2">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-2">Message</label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Send Message
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;