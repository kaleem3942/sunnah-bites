  import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  Phone, 
  CheckCircle, 
  Star, 
  ShieldCheck, 
  Truck, 
  Heart, 
  Menu, 
  ExternalLink,
  MessageCircle,
  Leaf,
  Info,
  ChevronRight,
  Filter
} from 'lucide-react';

// Store phone number for WhatsApp integration
const STORE_WHATSAPP_NUMBER = "923260055877"; // Replace with real phone number (international format without +)
const CURRENCY = "PKR";

// Product Catalog Data
const PRODUCTS = [
  {
    id: 1,
    name: "Pistachio Kunafa Chocolate Dates",
    category: " dubai dates",
    price: 3200,
    unit: "12 pieces",
    rating: 4.9,
    reviewsCount: 128,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9I6XodVv9iA9P27ONDLpn1jV_o762afVZTyIqA5jEdQ&s=10",
    description: "Dubai chocolate dates are a viral dessert trend combining sweet Medjool or Segai dates with a crispy pistachio-kunafa (kataifi) filling and a smooth chocolate shell.If you’ve been loving the Dubai chocolate trend lately then you need to try my Dubai Chocolate Dates.",
    benefits: "Heart health support, natural boost of energy, rich in antioxidants."
  },
  {
    id: 2,
    name: "Stuffed Chocholates Covered Dates",
    category: "stuffed dates",
    price: 2200,
    unit: "12 pieces",
    rating: 5.0,
    reviewsCount: 210,
    image: "https://www.everylastbite.com/wp-content/uploads/2017/03/Frozendates-15-3-1.jpg",
    description: "Raw, unpasteurized, and unheated pure Sidr honey harvested from natural wild Sidr trees. Rich amber color with rich therapeutic properties.",
    benefits: "Immune system booster, soothing for throat, high antibacterial properties."
  },
  {
    id: 3,
    name: "Pista Chocolate Covered Dates",
    category: "covered dates",
    price: 1850,
    unit: "12 pieces",
    rating: 4.8,
    reviewsCount: 94,
    image: "https://olivesnthyme.com/wp-content/uploads/2025/02/Chocolate-Covered-Dates-15.jpg",
    description: "Chocolate covered dates are an easy and healthy dessert or snack made using pitted medjool dates covered with your favorite melted chocolate",
    benefits: "Respiratory health, skin radiance, metabolic and immune wellness."
  },
  {
    id: 4,
    name: "Peanut Butter Chocolate Dates",
    category: "Butter dates",
    price: 2600,
    unit: "12 pieces",
    rating: 4.9,
    reviewsCount: 156,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDyaUnsrkAC7X3jFi0jtjEvGnDuGezGd3HkL4C1jPTdA&s=10",
    description: "If you’re looking for a naturally sweet, chocolaty treat that’s easy to make and packed with flavor, you’ll love these Peanut Butter-Stuffed Chocolate-Covered Dates! ",
    benefits: "Promotes cardiovascular health, rich in polyphenols and healthy fats."
  },
  {
    id: 5,
    name: "Coconut Chocholates Dates",
    category: "coconuts",
    price: 2100,
    unit: "12 pieces",
    rating: 4.7,
    reviewsCount: 82,
    image: "https://gourmandeinthekitchen.com/wp-content/uploads/2025/01/Chocolate-Coconut-Dates.jpg",
    description: "Coconut, dates, and chocolate combine to make popular sweet treats, homemade no-bake snacks, and store-bought candies like Chocodate Coconut.Stuffed with coconut and coated in rich chocolate, these dates are perfect for dessert or as a homemade gift",
    benefits: "Aids digestive health, supports bone strength with natural calcium."
  },
  {
    id: 6,
    name: "Tahini and Walnuts Chocolate Covered Dates",
    category: "tahini & walnuts",
    price: 2800,
    unit: "Luxury Gift Set",
    rating: 4.8,
    reviewsCount: 67,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV_tvuF6k3bsEqlGqGw7gMPvuoVrD_GTctmDGQN_jOhw&s=10",
    description: "These chocolate-covered dates offer a healthier alternative to indulge your sweet tooth. Experiment, enjoy, and share the joy of the delightful combination between dates, chocolate, tahini, and walnuts.",
    benefits: "Brain health boosters, rich in Omega-3 fatty acids and protein."
  },
  {
    id: 7,
    name: "Almond Stuffed Chocolate Covered Dates",
    category: "almonds",
    price: 2500,
    unit: "12 pieces",
    rating: 5.0,
    reviewsCount: 340,
    image: "https://www.nestandglow.com/wp-content/uploads/2016/12/almond-medula-dates-vegan-chocolate.jpg",
    description: "Medjool dates on their own are a delicious healthy natural fudge but add a crunchy almond or two and coat in a crispy layer of rich dark chocolate for the perfect healthy chocolate sweet.",
    benefits: "Blessed water rich in naturally balanced calcium and magnesium salts."
  },
  {
    id: 8,
    name: "Candy Chocholates Dates",
    category: "Sunnah Bundles",
    price: 3000,
    unit: "Luxury Gift Set",
    rating: 5.0,
    reviewsCount: 112,
    image: "https://tastythriftytimely.com/wp-content/uploads/2021/06/Chocolate-PB-Dates-Better-Than-A-Candy-Bar-8.jpg",
    description: "Chocolate dipped peanut butter filled dates!! I cannot express how much I want you to make these right now! They are so much fun. So incredibly decadent.",
    benefits: "Ideal prophetic sunnah health package for family, Ramadan, & special occasions."
  }
];

const CATEGORIES = ["All", "Dates", "Chocholates dates", "Coconuts dates", "Almonds dates", "Candy dates", "Covered dates"];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home"); // home, products, about, contact
  
  // Toast notification state
  const [toastMessage, setToastMessage] = useState("");

  // Customer Details Form for Checkout
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  // Trigger Toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Cart Functions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    showToast(`Added "${product.name}" to your cart!`);
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    showToast("Item removed from cart");
  };

  const totalCartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const subtotalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const deliveryFee = subtotalPrice > 0 ? (subtotalPrice >= 5000 ? 0 : 250) : 0;
  const totalPrice = subtotalPrice + deliveryFee;

  // Filter products by Search & Category
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle WhatsApp Order Direct Forwarding
  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your shopping cart is empty!");
      return;
    }
    if (!customerName.trim() || !customerAddress.trim() || !customerPhone.trim()) {
      alert("Please fill in your Name, Contact Number, and Delivery Address.");
      return;
    }

    // Build plain text order template
    let itemsText = cart.map((item, idx) => 
      `${idx + 1}. *${item.name}* (${item.unit})\n   Qty: ${item.quantity} x ${item.price} ${CURRENCY} = ${item.quantity * item.price} ${CURRENCY}`
    ).join('\n');

    let message = `🌿 *NEW ORDER - SUNNAH BITES* 🌿\n\n` +
      `*Customer Details:*\n` +
      `👤 Name: ${customerName}\n` +
      `📞 Phone: ${customerPhone}\n` +
      `📍 Delivery Address: ${customerAddress}\n` +
      (customerNotes ? `📝 Note: ${customerNotes}\n` : '') +
      `\n-----------------------------\n` +
      `*Order Details:*\n` +
      `${itemsText}\n` +
      `-----------------------------\n` +
      `Subtotal: ${subtotalPrice.toLocaleString()} ${CURRENCY}\n` +
      `Delivery Fee: ${deliveryFee === 0 ? "FREE" : deliveryFee + ' ' + CURRENCY}\n` +
      `*Total Payable: ${totalPrice.toLocaleString()} ${CURRENCY}*\n\n` +
      `Please confirm my order and share delivery estimated time. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans flex flex-col selection:bg-emerald-800 selection:text-amber-100">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-amber-100 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-amber-400/30 animate-bounce">
          <CheckCircle className="w-5 h-5 text-amber-400" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Announcement */}
      <div className="bg-emerald-950 text-amber-200 text-xs sm:text-sm py-2 px-4 text-center font-medium tracking-wide border-b border-amber-500/20 flex justify-center items-center gap-2">
        <Leaf className="w-4 h-4 text-amber-400 animate-pulse" />
        <span>Free Shipping across Pakistan on orders above 5,000 PKR!</span>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-50 bg-black text-white backdrop-blur-md text-amber-50 border-b border-amber-500/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo & Brand Name */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("home")}>
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-emerald-950 shadow-md font-bold text-xl border border-amber-200">
                SB
              </div>
              <div>
                <span className="text-2xl font-serif font-bold tracking-tight text-amber-100 block leading-none">
                  Sunnah Bites
                </span>
                <span className="text-[10px] text-amber-300/80 uppercase tracking-widest block mt-1 font-sans">
                  Pure • Organic • Prophetic
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 font-medium text-sm">
              <button 
                onClick={() => setActiveTab("home")} 
                className={`transition-colors duration-200 hover:text-amber-300 ${activeTab === "home" ? "text-amber-400 font-semibold border-b-2 border-amber-400 pb-1" : "text-amber-100/90"}`}>
                Home
              </button>
              <button 
                onClick={() => setActiveTab("products")} 
                className={`transition-colors duration-200 hover:text-amber-300 ${activeTab === "products" ? "text-amber-400 font-semibold border-b-2 border-amber-400 pb-1" : "text-amber-100/90"}`}>
                Products
              </button>
              <button 
                onClick={() => setActiveTab("about")} 
                className={`transition-colors duration-200 hover:text-amber-300 ${activeTab === "about" ? "text-amber-400 font-semibold border-b-2 border-amber-400 pb-1" : "text-amber-100/90"}`}>
                Sunnah Benefits
              </button>
              <button 
                onClick={() => setActiveTab("contact")} 
                className={`transition-colors duration-200 hover:text-amber-300 ${activeTab === "contact" ? "text-amber-400 font-semibold border-b-2 border-amber-400 pb-1" : "text-amber-100/90"}`}>
                Contact Us
              </button>
            </nav>

            {/* Action Controls */}
            <div className="flex items-center gap-4">
              {/* WhatsApp Quick Link */}
              <a 
                href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-amber-200 text-xs px-3 py-2 rounded-lg transition-all border border-amber-500/30"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+92 3260055877</span>
              </a>

              {/* Shopping Cart Button */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-amber-100 hover:text-amber-300 bg-emerald-800/60 hover:bg-emerald-800 rounded-full transition-all border border-amber-500/20"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-6 h-6" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-emerald-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-amber-100 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-emerald-950 border-b border-amber-500/20 px-4 pt-2 pb-6 space-y-3 font-medium text-sm">
            <button 
              onClick={() => { setActiveTab("home"); setIsMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-amber-100 hover:text-amber-300 border-b border-emerald-900">
              Home
            </button>
            <button 
              onClick={() => { setActiveTab("products"); setIsMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-amber-100 hover:text-amber-300 border-b border-emerald-900">
              Shop All Products
            </button>
            <button 
              onClick={() => { setActiveTab("about"); setIsMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-amber-100 hover:text-amber-300 border-b border-emerald-900">
              Sunnah Health Benefits
            </button>
            <button 
              onClick={() => { setActiveTab("contact"); setIsMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-amber-100 hover:text-amber-300">
              Contact & Support
            </button>
          </div>
        )}
      </header>

      {/* Main Content Pages */}
      <main className="flex-1">

        {/* TAB 1: HOME PAGE */}
        {activeTab === "home" && (
          <>
            {}
            <section className="relative bg-gradient-to-b from-amber-900 via-amber-850 to-stone-900 text-amber-50 py-16 lg:py-24 overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs sm:text-sm px-4 py-1.5 rounded-full backdrop-blur-sm">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>100% Pure, Authentic & Sunnah Inspired</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight tracking-tight text-amber-100">
                    Nourish Your Body With <span className="text-amber-400 italic">Prophetic Wisdom</span> & Wholesome Taste
                  </h1>
                  
                  <p className="text-stone-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                    Discover our handpicked collection of all types dates, premium Ajwa dates from Medina, pure and fresh dates, and organic dried fruits delivered right to your doorstep.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                    <button 
                      onClick={() => {
                        setActiveTab("products");
                        window.scrollTo({ top: 500, behavior: "smooth" });
                      }}
                      className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-emerald-950 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2 text-base"
                    >
                      <span>Explore Our Store</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    <a 
                      href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto bg-emerald-800/80 hover:bg-emerald-800 border border-amber-400/40 text-amber-200 font-medium px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-base"
                    >
                      <MessageCircle className="w-5 h-5 text-emerald-400" />
                      <span>Quick WhatsApp Inquiry</span>
                    </a>
                  </div>

                  {/* Highlights Badge */}
                  <div className="pt-6 border-t border-amber-500/20 grid grid-cols-3 gap-4 text-center sm:text-left">
                    <div>
                      <p className="text-2xl font-serif font-bold text-amber-300">100%</p>
                      <p className="text-xs text-stone-300">Organic & Natural</p>
                    </div>
                    <div>
                      <p className="text-2xl font-serif font-bold text-amber-300">Fast</p>
                      <p className="text-xs text-stone-300">Nationwide Shipping</p>
                    </div>
                    <div>
                      <p className="text-2xl font-serif font-bold text-amber-300">4.9/5</p>
                      <p className="text-xs text-stone-300">Customer Rating</p>
                    </div>
                  </div>
                </div>

                {/* Hero Feature Card Grid */}
                <div className="relative flex justify-center">
                  <div className="w-full max-w-md bg-stone-900/60 p-4 rounded-3xl border border-amber-500/30 backdrop-blur-md shadow-2xl space-y-4">
                    <div className="relative rounded-2xl overflow-hidden h-72 group">
                      <img 
                        src="https://pocketsofbeige.com/cdn/shop/files/8151C808-A36E-4D75-A556-E6D385C538C8.jpg?v=1740733342&width=1946" 
                        alt="Ajwa Chocholates Dates" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                        <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">Best Seller</span>
                        <h3 className="text-white text-xl font-serif font-bold">Medina Ajwa Dates</h3>
                        <p className="text-stone-300 text-xs">Directly imported from blessed Medina groves</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-emerald-950/80 p-3 rounded-xl border border-amber-500/20 flex items-center gap-3">
                        <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-amber-100">Pure Quality</p>
                          <p className="text-[10px] text-stone-400">No Preservatives</p>
                        </div>
                      </div>

                      <div className="bg-emerald-950/80 p-3 rounded-xl border border-amber-500/20 flex items-center gap-3">
                        <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-amber-100">Safe Delivery</p>
                          <p className="text-[10px] text-stone-400">Cash on Delivery</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-emerald-800 text-xs font-bold uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
                  Blessed Wholesome Choices
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-3">
                  Our Sunnah Products
                </h2>
                <p className="text-stone-600 text-sm mt-2">
                  Carefully selected organic products enriched with natural nutrition and tradition.
                </p>
              </div>

              {/* Search Bar & Category Filter Controls */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-stone-200">
                
                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search dates, honey, oils..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-stone-50 rounded-xl text-sm border border-stone-200 focus:outline-none focus:border-emerald-700 transition"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Horizontal Category Scroll */}
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                  <Filter className="w-4 h-4 text-emerald-800 shrink-0 hidden sm:block mr-1" />
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                        selectedCategory === cat
                          ? "bg-emerald-900 text-amber-200 shadow-md"
                          : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Display Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 shadow-sm">
                  <Info className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-stone-800">No matching products found</h3>
                  <p className="text-stone-500 text-sm mt-1">Try adjusting your search or category filter.</p>
                  <button 
                    onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }} 
                    className="mt-4 bg-emerald-900 text-amber-200 px-5 py-2 rounded-xl text-xs font-semibold"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id}
                      className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                    >
                      {/* Product Image */}
                      <div className="relative h-56 bg-stone-100 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <span className="absolute top-3 left-3 bg-emerald-900/90 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm border border-amber-400/30">
                          {product.category}
                        </span>
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-stone-800 flex items-center gap-1 shadow-sm">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      {/* Product Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="text-xs text-stone-400 font-medium">{product.unit}</div>
                          <h3 className="font-serif font-bold text-stone-900 text-lg group-hover:text-emerald-900 transition-colors leading-tight mt-0.5">
                            {product.name}
                          </h3>
                          <p className="text-stone-600 text-xs mt-2 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* Health Benefit Badge */}
                        <div className="bg-amber-50 border border-amber-200/60 p-2 rounded-lg text-[11px] text-amber-900 flex items-start gap-1.5">
                          <Leaf className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{product.benefits}</span>
                        </div>

                        {/* Price & Cart Actions */}
                        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                          <div>
                            <span className="text-xs text-stone-400 block leading-none">Price</span>
                            <span className="text-xl font-bold text-emerald-950 font-sans">
                              {product.price.toLocaleString()} <span className="text-xs text-emerald-800 font-medium">{CURRENCY}</span>
                            </span>
                          </div>

                          <button 
                            onClick={() => addToCart(product)}
                            className="bg-emerald-900 hover:bg-emerald-800 text-amber-200 p-2.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5 text-xs font-semibold"
                            aria-label="Add to Cart"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {}
            <section className="bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100/50 py-16 border-y border-amber-200/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h2 className="text-3xl font-serif font-bold text-emerald-950">
                    Why Choose Sunnah Bites?
                  </h2>
                  <p className="text-stone-600 text-sm mt-2">
                    We bring you authentic prophetic nutritional heritage with uncompromising purity.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  
                  <div className="bg-white p-6 rounded-2xl border border-amber-200/70 shadow-sm text-center space-y-3">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-900 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                      <ShieldCheck className="w-6 h-6 text-emerald-800" />
                    </div>
                    <h3 className="font-serif font-bold text-stone-900">100% Pure & Organic</h3>
                    <p className="text-stone-600 text-xs leading-relaxed">
                      Guaranteed no additives, artificial colors, or preservatives. Pure nature in every bite.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-amber-200/70 shadow-sm text-center space-y-3">
                    <div className="w-12 h-12 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                      <Leaf className="w-6 h-6 text-amber-800" />
                    </div>
                    <h3 className="font-serif font-bold text-stone-900">Sunnah Inspired</h3>
                    <p className="text-stone-600 text-xs leading-relaxed">
                      Sourced with reverence to ancient tradition and Islamic prophetic health teachings.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-amber-200/70 shadow-sm text-center space-y-3">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-900 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                      <Truck className="w-6 h-6 text-emerald-800" />
                    </div>
                    <h3 className="font-serif font-bold text-stone-900">Fast Express Delivery</h3>
                    <p className="text-stone-600 text-xs leading-relaxed">
                      Quick nationwide dispatch with fresh protective food-grade packaging.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-amber-200/70 shadow-sm text-center space-y-3">
                    <div className="w-12 h-12 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                      <Phone className="w-6 h-6 text-amber-800" />
                    </div>
                    <h3 className="font-serif font-bold text-stone-900">Easy WhatsApp Checkout</h3>
                    <p className="text-stone-600 text-xs leading-relaxed">
                      Direct 1-click order placing on WhatsApp with live customer service updates.
                    </p>
                  </div>

                </div>
              </div>
            </section>

            {}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-serif font-bold text-stone-900">
                  What Our Customers Say
                </h2>
                <p className="text-stone-500 text-sm mt-1">Trusted by thousands of families across the country.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Dr. Hamza Siddiqui",
                    role: "Verified Buyer",
                    comment: "The Sidr honey and Medina Ajwa dates were of top tier quality. The packaging was completely sealed and fresh. Highly recommended!",
                    rating: 5
                  },
                  {
                    name: "Fatima Noor",
                    role: "Verified Buyer",
                    comment: "Ordering via WhatsApp was extremely fast and convenient. Received my black seed oil within 2 days. JazakAllah Khair!",
                    rating: 5
                  },
                  {
                    name: "Usman Ali",
                    role: "Verified Buyer",
                    comment: "The Sunnah Gift Box made a perfect present for my parents. Genuine Zamzam water and premium quality dry fruits.",
                    rating: 5
                  }
                ].map((testimonial, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex text-amber-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-stone-600 text-xs italic leading-relaxed">"{testimonial.comment}"</p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-stone-100">
                      <p className="text-sm font-bold text-stone-900">{testimonial.name}</p>
                      <p className="text-[11px] text-emerald-700 font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* TAB 2: PRODUCTS PAGE (Direct list View) */}
        {activeTab === "products" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
              <h1 className="text-3xl font-serif font-bold text-emerald-950">All Sunnah Bites Products</h1>
              <p className="text-stone-600 text-sm mt-1">Explore our full range of prophetic health foods and bundles.</p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-stone-200 mb-8">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Filter products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-stone-50 rounded-xl text-sm border border-stone-200 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                      selectedCategory === cat ? "bg-emerald-900 text-amber-200" : "bg-stone-100 text-stone-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="relative h-52 bg-stone-100">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-emerald-900 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-serif font-bold text-stone-900">{product.name}</h3>
                      <p className="text-stone-500 text-xs mt-1">{product.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                      <span className="font-bold text-emerald-950 text-base">{product.price.toLocaleString()} {CURRENCY}</span>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-emerald-900 text-amber-200 text-xs px-3 py-2 rounded-xl font-medium"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ABOUT / SUNNAH BENEFITS PAGE */}
        {activeTab === "about" && (
          <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
            <div className="text-center space-y-3">
              <h1 className="text-4xl font-serif font-bold text-emerald-950">Prophetic Health & Wisdom</h1>
              <p className="text-stone-600 text-sm max-w-2xl mx-auto leading-relaxed">
                Learn why dates,chocholates,and dry friuts have been cherished for centuries as timeless sources of health and vitality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
                <h3 className="text-xl font-serif font-bold text-emerald-950 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-amber-600" /> Ajwa Dates (Dates of Medina)
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Mentioned in authentic Hadith traditions for their unique protective qualities, Ajwa dates are rich in natural fructose, dietary fibers, magnesium, and essential antioxidants.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
                <h3 className="text-xl font-serif font-bold text-emerald-950 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-amber-600" /> Pistachio Kunafa Dates
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed">
                
Key Ingredients

• Dates: Fresh Medjool or organic Segai dates.
• Filling: Toasted shredded kataifi (kunafa dough) mixed with pistachio cream or pistachio butter.
• Shell: Melted dark, milk, or single-origin chocolate.
• Topping: Crushed pistachios and flaky sea salt.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
                <h3 className="text-xl font-serif font-bold text-amber-950 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-amber-600" /> Stuffed Covered Dates
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed">
                • Dates: Soft Medjool dates work best because of their large size and natural fudge-like texture.
• Filling: Nut butter (peanut butter, almond butter, cashew butter, or pistachio paste), whole roasted nuts (almonds, walnuts, pistachios), or cookie butter.
• Chocolate: Dark, milk, or semi-sweet chocolate bars or chips.
• Optional Add-ins: A small amount of coconut oil or olive oil (to make the melted chocolate smooth and glossy), and toppings like flaky sea salt, crushed nuts, or shredded coconut.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
                <h3 className="text-xl font-serif font-bold text-amber-950 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-amber-600" /> Peanut butter chocolate dates
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed">
            
Ingredients

• 12 Medjool dates (pitted)
• 3–4 tablespoons peanut butter (creamy or crunchy)
• 1 cup dark or semi-sweet chocolate chips
• 1–2 teaspoons coconut oil (to help melt the chocolate smoothly)
• Optional toppings: Flaky sea salt, crushed peanuts, or chopped nuts.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CONTACT PAGE */}
        {activeTab === "contact" && (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8 space-y-6">
              <h1 className="text-3xl font-serif font-bold text-amber-950 text-center">Contact Sunnah Bites</h1>
              <p className="text-center text-stone-600 text-sm max-w-lg mx-auto">
                Have questions regarding custom gift bundles, bulk order pricing, or product authenticity? Reach out directly via WhatsApp or phone.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <a 
                  href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-4 p-5 bg-amber-50 rounded-2xl border border-amber-200 hover:bg-amber-100 transition"
                >
                  <div className="p-3 bg-emerald-900 text-amber-200 rounded-xl">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 text-sm">WhatsApp Live Chat</h4>
                    <p className="text-xs text-stone-600 mt-0.5">Click to open chat instantly</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-5 bg-amber-50 rounded-2xl border border-amber-200">
                  <div className="p-3 bg-emerald-600 text-white rounded-xl">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">Customer Phone Support</h4>
                    <p className="text-xs text-stone-600 mt-0.5">+92 3260055877</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity">
          
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
            
            {/* Cart Header */}
            <div className="p-5 bg-black-950 text-amber-100 flex items-center justify-between border-b border-amber-500/20">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-serif font-bold">Your Shopping Bag ({totalCartCount})</h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-1 hover:bg-emerald-900 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Content / Checkout Form */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {cart.length === 0 ? (
                <div className="text-center py-20 space-y-3">
                  <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto" />
                  <p className="text-stone-700 font-bold">Your cart is currently empty</p>
                  <p className="text-stone-400 text-xs">Add your favorite Sunnah products to get started.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 bg-emerald-900 text-amber-200 px-6 py-2.5 rounded-xl text-xs font-semibold"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Item List */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">Items in Bag</h3>
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 bg-stone-50 p-3 rounded-xl border border-stone-200">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                        
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-stone-900">{item.name}</h4>
                          <p className="text-[11px] text-stone-500">{item.price} {CURRENCY} / {item.unit}</p>
                          
                          {/* Quantity adjustments */}
                          <div className="flex items-center gap-2 mt-2">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 bg-white border border-stone-300 rounded hover:bg-stone-100"
                            >
                              <Minus className="w-3 h-3 text-stone-700" />
                            </button>
                            <span className="text-xs font-bold text-stone-800 w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 bg-white border border-stone-300 rounded hover:bg-stone-100"
                            >
                              <Plus className="w-3 h-3 text-stone-700" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xs font-bold text-emerald-950">
                            {(item.price * item.quantity).toLocaleString()} {CURRENCY}
                          </p>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 p-1 mt-2 inline-block"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Customer Information Form for WhatsApp Order */}
                  <form onSubmit={handleWhatsAppCheckout} className="space-y-3 pt-4 border-t border-stone-200">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">Delivery Details</h3>
                    
                    <div>
                      <label className="text-[11px] font-semibold text-stone-600 block mb-1">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Muhammad Ahmad"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:border-emerald-800"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-stone-600 block mb-1">WhatsApp / Contact Number *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="e.g. 0300 1234567"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:border-emerald-800"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-stone-600 block mb-1">Complete Delivery Address *</label>
                      <textarea 
                        required
                        rows={2}
                        placeholder="House / Street / Area / City"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:border-emerald-800 resize-none"
                      ></textarea>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-stone-600 block mb-1">Order Notes (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="Special instructions for delivery"
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:border-emerald-800"
                      />
                    </div>

                    {/* Order Summary Calculation */}
                    <div className="bg-emerald-50 p-4 rounded-xl space-y-2 text-xs border border-emerald-200/60 mt-4">
                      <div className="flex justify-between text-stone-600">
                        <span>Subtotal</span>
                        <span>{subtotalPrice.toLocaleString()} {CURRENCY}</span>
                      </div>
                      <div className="flex justify-between text-stone-600">
                        <span>Delivery Charges</span>
                        <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `${deliveryFee} ${CURRENCY}`}</span>
                      </div>
                      <div className="flex justify-between text-stone-900 font-bold text-sm pt-2 border-t border-emerald-200">
                        <span>Total Payable</span>
                        <span className="text-emerald-950">{totalPrice.toLocaleString()} {CURRENCY}</span>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-emerald-800 hover:bg-emerald-900 text-amber-200 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition active:scale-98"
                    >
                      <MessageCircle className="w-5 h-5 text-emerald-400 fill-emerald-400" />
                      <span>Order via WhatsApp Now</span>
                    </button>
                  </form>
                </>
              )}

            </div>
          </div>
        </div>
      )}

      {}
      <footer className="bg-black text-amber-100 border-t border-amber-500/20 pt-12 pb-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-emerald-900">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-emerald-950 font-bold flex items-center justify-center text-sm">
                SB
              </div>
              <span className="text-xl font-serif font-bold text-amber-100">Sunnah Bites</span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Your trusted partner for 100% pure, natural, and organic Sunnah food items delivered with care.
            </p>
          </div>

          <div>
            <h4 className="font-serif font-bold text-amber-300 text-sm mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li><button onClick={() => setActiveTab("home")} className="hover:text-amber-400">Home</button></li>
              <li><button onClick={() => setActiveTab("products")} className="hover:text-amber-400">All Products</button></li>
              <li><button onClick={() => setActiveTab("about")} className="hover:text-amber-400">Health Benefits</button></li>
              <li><button onClick={() => setActiveTab("contact")} className="hover:text-amber-400">Contact Us</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-amber-300 text-sm mb-3">Categories</h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li><button onClick={() => { setSelectedCategory("Dates"); setActiveTab("products"); }} className="hover:text-amber-400">Medina Dates</button></li>
              <li><button onClick={() => { setSelectedCategory("Honey"); setActiveTab("products"); }} className="hover:text-amber-400">Pure Sidr Honey</button></li>
              <li><button onClick={() => { setSelectedCategory("Oils & Seeds"); setActiveTab("products"); }} className="hover:text-amber-400">Black Seed & Olive Oil</button></li>
              <li><button onClick={() => { setSelectedCategory("Sunnah Bundles"); setActiveTab("products"); }} className="hover:text-amber-400">Sunnah Gift Sets</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif font-bold text-amber-300 text-sm mb-1">Customer Support</h4>
            <p className="text-xs text-stone-300">Need help with your order? Send us a message on WhatsApp!</p>
            <a 
              href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
              
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-amber-200 text-xs px-4 py-2.5 rounded-xl border border-amber-500/30 transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Chat on WhatsApp</span>
            </a>
           
<a
  href="https://www.instagram.com/sunnah_bites_official/"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white text-xs px-4 py-2.5 rounded-xl transition"
>
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Instagram" role="img" > <rect x="3" y="3" width="18" height="18" rx="5" /> <circle cx="12" cy="12" r="4" /> <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" /> </svg>
</a>

          </div>

        </div>
    

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Sunnah Bites Online Store. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 text-[11px]">Designed for Pure Wholesome Nutrition</p>
        </div>
      </footer>

    </div>
  );
}