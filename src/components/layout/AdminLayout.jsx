import { useState, useEffect } from "react"
import { LogOut, Search, Menu, X, ChevronDown, Bookmark, Code, GraduationCap, Award, Construction, Users, Target, Briefcase, TrendingUp, CheckCircle } from 'lucide-react'

// Under Construction Component
function UnderConstruction() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8 relative">
          <Construction className="w-32 h-32 mx-auto text-red-500 animate-bounce" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 bg-red-100 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Under Construction
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          This module is currently being developed and will be available soon.
        </p>
      </div>
    </div>
  )
}

// Home Page Component
function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/SourabhRollingMills2.png",
      title: "Welcome to Sourabh Rolling Mill",
      description: "मजबूती  और विश्वास का नया नाम"
    },
    {
      image: "/Squarepipe.png",
      title: "Sagar Pipes",
      description: "A Product By Pankaj Group"
    },
    {
      image: "/Billet.png",
      title: "Sagar Billet",
      description: "A Product By Pankaj Group"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full">
      {/* Hero Slider */}
      <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-2xl text-white">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl animate-fade-in delay-100">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      </div>

      {/* About Us Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              About Us
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Sourabh Rolling Mills Pvt. Ltd., a premium manufacturing unit of Pankaj Group,
              is located in Village Kanhera, Urla Industrial Area, Raipur, Chhattisgarh.
              As one of the leading companies within Pankaj Group,
              Sourabh Rolling Mills is synonymous with quality and innovation in the steel industry.
              Specializing in the production of billets, strips (Patra), and high-quality steel pipes,
              Sourabh Rolling Mills adheres to stringent BIS norms. Our facility boasts multiple automatic rolling mills,
              ensuring efficiency and precision in our manufacturing processes. The company employs over 2,700 direct and
              indirect dedicated and highly talented workforce members, fostering a culture of excellence and continuous improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg shadow-md">
              <Target className="w-16 h-16 mx-auto text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h3>
              <p className="text-gray-600">
                Our emphasis on innovation, sustainability, and quality drives our mission to contribute to nation-building and foster self-reliance in India.
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md">
              <Award className="w-16 h-16 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Our Vision</h3>
              <p className="text-gray-600">
                Under the visionary leadership of Mr. Pankaj Agrawal & Mr. Akash Agrawal Sourabh Rolling Mills continues to uphold the core values of Pankaj Group.
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-md">
              <Users className="w-16 h-16 mx-auto text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Our Values</h3>
              <p className="text-gray-600">
                The plant is designed with a focus on sustainability and a better work environment. With greenery both inside and outside the campus, Sourabh Rolling Mills creates a serene and eco-friendly atmosphere for all employees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-12">
            Our Purpose
          </h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Simplify Operations</h3>
                    <p className="text-gray-600">
                      We eliminate complexity by providing integrated solutions that bring
                      all your business processes under one roof.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Drive Growth</h3>
                    <p className="text-gray-600">
                      Our platform provides actionable insights and automation that help
                      you scale your business efficiently.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Enhance Collaboration</h3>
                    <p className="text-gray-600">
                      Foster seamless teamwork with tools designed to keep everyone
                      connected and aligned.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Ensure Reliability</h3>
                    <p className="text-gray-600">
                      Count on enterprise-grade security, uptime, and support that keeps
                      your business running 24/7.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-800 to-gray-900 text-white">

        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-4 text-red-500">Sagar Pipe</h3>
              {/* <p className="text-gray-300 mb-4">
                Streamlining operations and helping businesses achieve their goals.
              </p> */}
              <div className="flex justify-center md:justify-start space-x-4">
                {/* Social Media Icons */}
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.279 16.736 5.018 15.622 5 12c.018-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h4 className="text-xl font-semibold mb-4 text-red-400">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start">
                  <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-300">+918839494655</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-300">sourabhshakti@yahoo.co.in</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-300">Achholi Road Kanhera Urla Industrial Area<br />Raipur C.G.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 my-8"></div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Sagar Pipe. All rights reserved.
            </p>
            <p>
              Powered By{" "}
              <a href="https://botivate.in/" className="text-red-500 hover:underline">
                Botivate
              </a>
            </p>

          </div>
        </div>

      </section>
    </div>
  )
}

export default function AdminLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeRoute, setActiveRoute] = useState("home")
  const [activeSidebar, setActiveSidebar] = useState("home")
  const [username] = useState("Admin User")
  const [currentUrl, setCurrentUrl] = useState("")
  const [isIframeVisible, setIsIframeVisible] = useState(false)
  const [showUnderConstruction, setShowUnderConstruction] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const topNavRoutes = [
    { id: "home", label: "Home", url: "" },
    { id: "checkilst", label: "Checklist", url: "https://checklist-frontend-aws.vercel.app/login" },
    { id: "leadToOrder", label: "Lead To Order", url: "https://lead-to-order.vercel.app/" },
    { id: "housekeeping", label: "HouseKeeping", url: "https://housekeeping-frontend-aws.vercel.app/login" },
    { id: "maintenance", label: "Maintenance", url: "https://maintenance-frontend-production.vercel.app/" },
    { id: "repair", label: "Repair", url: "https://repair-system-frontend-production.vercel.app/" },
    { id: "store", label: "Store", url: "https://store-frontend-vercel.vercel.app/" },
    { id: "subscription", label: "Subscription", url: "https://subscription-frontend-aws.vercel.app/" },
    { id: "document", label: "Document", url: "https://document-manager-beta.vercel.app/" },
    { id: "orderToDelivery", label: "Order To Delivery", url: "" },
    { id: "project", label: "Project", url: "" },
    { id: "batchCode", label: "Batch Code", url: "" },
    { id: "allPayment", label: "All Payment", url: "" },
    { id: "accountChecklist", label: "Account Checklist", url: "" },
    { id: "financial", label: "Financial", url: "" },
    { id: "freight", label: "Freight FMS", url: "" },
    { id: "travel", label: "Travel", url: "" },
    { id: "birthdayGreeting", label: "Birthday Greeting", url: "" },
    { id: "12week", label: "12 Week Plan", url: "" },
  ]

  // Function to handle route click
  const handleRouteClick = (url, id) => {
    setActiveRoute(id)

    // If it's the home route
    if (id === "home") {
      setIsIframeVisible(false)
      setShowUnderConstruction(false)
      setCurrentUrl("")
      return
    }

    // If URL is empty, show under construction
    if (!url || url.trim() === "") {
      setShowUnderConstruction(true)
      setIsIframeVisible(false)
      setCurrentUrl("")
    } else {
      // If URL exists, show iframe
      setCurrentUrl(url)
      setIsIframeVisible(true)
      setShowUnderConstruction(false)
    }
  }

  useEffect(() => {
    // Retrieve saved state from localStorage on component mount
    const savedRoute = localStorage.getItem("activeRoute");
    const savedUrl = localStorage.getItem("currentUrl");

    if (savedRoute) {
      setActiveRoute(savedRoute);
    }

    if (savedUrl) {
      setCurrentUrl(savedUrl);
      setIsIframeVisible(!!savedUrl); // Show iframe if URL exists
    }
  }, []);

  useEffect(() => {
    // Save active route and URL to localStorage whenever they change
    localStorage.setItem("activeRoute", activeRoute);
    localStorage.setItem("currentUrl", currentUrl);
  }, [activeRoute, currentUrl]);

  // Update the class dynamically based on activeRoute
  const getButtonClass = (routeId) => {
    return `px-4 py-3 text-sm font-medium whitespace-nowrap hover:bg-white/20 transition-all border-r border-white/10 ${activeRoute === routeId ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-lg" : ""
      }`;
  };

  // Ensure activeRoute is applied correctly on refresh
  useEffect(() => {
    const savedRoute = localStorage.getItem("activeRoute");
    if (savedRoute && savedRoute !== activeRoute) {
      setActiveRoute(savedRoute);
    }
  }, [activeRoute]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsHeaderVisible(false); // Hide header on scroll down
      } else {
        setIsHeaderVisible(true); // Show header on scroll up
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <header
        className={`bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm transition-transform duration-300 ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo with floating animation */}
          <div className="flex items-center">
            <div
              className="flex items-center"
              style={{
                animation: 'logoFloat 2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                willChange: 'transform'
              }}
            >
              <img
                src="/logo.png"
                alt="Logo"
                className="w-22 h-11"
              />
            </div>
          </div>

          {/* User Avatar with emoji animation */}
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-2"
              style={{
                opacity: 0,
                animation: 'slideInFade 1s ease-out 1.5s forwards'
              }}
            >
              <span
                className="text-xl"
                style={{
                  display: 'inline-block',
                  animation: 'waveHand 1.5s ease-in-out 2.5s'
                }}
              >
                👋
              </span>
              <span className="text-gray-700 font-medium text-sm">
                AAKASH
              </span>
            </div>

            <div
              className="w-10 h-10 bg-gradient-to-br from-red-500 to-gray-500 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                opacity: 0,
                animation: 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 2s forwards'
              }}
            >
              <span className="text-white font-bold text-sm">
                A
              </span>
            </div>
          </div>
        </div>

        {/* CSS animations */}
        <style jsx>{`
      @keyframes logoFloat {
        0% {
          transform: translateX(-100px) translateY(-100px) rotate(-20deg);
          opacity: 0;
          filter: blur(4px);
        }
        30% {
          transform: translateX(50px) translateY(-30px) rotate(10deg);
          opacity: 0.8;
          filter: blur(1px);
        }
        60% {
          transform: translateX(-20px) translateY(20px) rotate(-5deg);
          opacity: 0.9;
        }
        80% {
          transform: translateX(10px) translateY(-10px) rotate(2deg);
          opacity: 1;
        }
        100% {
          transform: translateX(0) translateY(0) rotate(0deg);
          opacity: 1;
          filter: blur(0);
        }
      }

      @keyframes slideInFade {
        0% {
          opacity: 0;
          transform: translateX(30px);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes waveHand {
        0%, 100% {
          transform: rotate(0deg);
        }
        25% {
          transform: rotate(25deg);
        }
        50% {
          transform: rotate(-10deg);
        }
        75% {
          transform: rotate(15deg);
        }
      }

      @keyframes bounceIn {
        0% {
          opacity: 0;
          transform: scale(0.3);
        }
        50% {
          opacity: 0.9;
          transform: scale(1.1);
        }
        70% {
          transform: scale(0.9);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    `}</style>
      </header>

      {/* Top Navigation Bar - Red Gradient Style */}
      <nav className="bg-gradient-to-r from-red-600 via-rose-600 to-gray-600 text-white sticky top-[64px] z-40 shadow-lg">
        <div className="flex items-center overflow-x-auto scrollbar-thin">
          {topNavRoutes.map((route) => (
            <button
              key={route.id}
              onClick={() => handleRouteClick(route.url, route.id)}
              className={getButtonClass(route.id)}
            >
              {route.label}
            </button>
          ))}
          <button className="px-4 py-3 text-xl hover:bg-white/20 border-r border-white/10 font-bold">
            ❯
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              {topNavRoutes.map((route) => (
                <button
                  key={route.id}
                  onClick={() => {
                    handleRouteClick(route.url, route.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 rounded hover:bg-gray-100 ${activeRoute === route.id ? "bg-gradient-to-r from-red-500 to-gray-500 text-white" : ""
                    }`}
                >
                  {route.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden fixed bottom-6 right-6 z-50 bg-gradient-to-r from-red-500 to-gray-500 text-white p-4 rounded-full shadow-2xl hover:from-red-600 hover:to-gray-600"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-white">
          {/* Show Home Page */}
          {!isIframeVisible && !showUnderConstruction && <HomePage />}

          {/* Show Under Construction */}
          {showUnderConstruction && <UnderConstruction />}

          {/* Show Iframe */}
          {isIframeVisible && currentUrl && (
            <div className="h-full flex flex-col">
              <div className="flex-1 relative">
                <iframe
                  id="external-iframe"
                  src={currentUrl}
                  className="w-full h-full border-0"
                  title="External Content"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Custom Styles */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  )
}