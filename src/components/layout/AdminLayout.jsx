import { useState, useEffect } from "react"
import { LogOut, Search, Hash, Menu, X, ChevronDown, Bookmark, Code, GraduationCap, Award, Construction, Users, Target, Briefcase, TrendingUp, CheckCircle, ChevronRight, Home, ListCheck, ShoppingCart, Home as HomeIcon, Wrench, HardHat, Package, FileText, Truck, ClipboardCheck, Calendar, Gift, Plane, Cake, TrendingUp as TrendingUpIcon, DollarSign, Users as UsersIcon, Building, Grid, Settings, User, Bell, MessageSquare } from 'lucide-react'

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
  return (
    <div className="w-full">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg shadow-md">
              <Target className="w-16 h-16 mx-auto text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h3>
              <p className="text-gray-600">
                Mission creating happiness through achievements
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md">
              <Award className="w-16 h-16 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Our Vision</h3>
              <p className="text-gray-600">
                Vision becoming a humble man with high values and creative mind set.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="text-center md:text-left">
              <h4 className="text-xl font-semibold mb-4 text-red-400">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start">
                  <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-300">+917225061350 , </span>
                  <span className="text-gray-300">+918839494655</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-300">admin@sagartmt.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-300">Achholi Road Kanhera , Urla Industrial Area<br />Raipur C.G.</span>
                </div>
              </div>
            </div>
            <div className="">
              <h5 className="text-lg font-medium mb-4 text-red-400">Our Location</h5>
              <div className="w-full h-48 md:h-64 lg:h-48">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d529.0000000000001!2d81.6093303!3d21.3333512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28e700143df22d%3A0x89321ea274817173!2sSourabh%20Rolling%20Mill%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map Location"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 my-8"></div>

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

// Horizontal SubNav Component
function HorizontalSubNav({
  activeModule,
  onSubTabClick,
  activeSubTab,
  sidebarConfig
}) {
  if (!activeModule || !sidebarConfig[activeModule]?.subtabs?.length) return null;

  const subtabs = sidebarConfig[activeModule].subtabs;

  return (
    <nav className="text-black sticky top-[120px] md:top-[120px] z-30 shadow-md">
      <div className="flex items-center overflow-x-auto scrollbar-thin px-2">
        {subtabs.map((subtab) => (
          <button
            key={subtab.id}
            onClick={() => onSubTabClick(subtab.url, subtab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap hover:bg-white/10 transition-all border-r border-white/10 ${activeSubTab === subtab.id
              ? "bg-gradient-to-r from-orange-200 to-red-200 shadow-lg rounded-lg"
              : ""
              }`}
          >
            {subtab.icon && <subtab.icon className="h-4 w-4" />}
            <span>{subtab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default function AdminLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeRoute, setActiveRoute] = useState("home")
  const [activeModule, setActiveModule] = useState(null)
  const [activeSubTab, setActiveSubTab] = useState(null)
  const [currentUrl, setCurrentUrl] = useState("")
  const [isIframeVisible, setIsIframeVisible] = useState(false)
  const [showUnderConstruction, setShowUnderConstruction] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)

  // Define sidebar configurations
  const sidebarConfig = {
    home: {
      // titl e: "Home",
      icon: HomeIcon,
      subtabs: []
    },
    salesSystem: {
      title: "Sales Systems",
      subtabs: [
        { id: "o2d", label: "Order To Delivery", url: "https://o2-d-system-frontend-aws-nsa4.vercel.app/" },
        { id: "enquiryManagement", label: "Enquiry Management", url: "https://lead-to-order.vercel.app/" },
        { id: "batchCode", label: "Batch Code", url: "" },
      ]
    },
    checklistTasks: {
      title: "Checklist Tasks",
      subtabs: [
        { id: "checklist", label: "Checklist", url: "https://checklist-delegation-eight.vercel.app/" },
        { id: "maintenance", label: "Maintenance", url: "https://maintenance-frontend-production.vercel.app/" },
        { id: "HouseKeeping", label: "HouseKeeping", url: "https://housekeeping-frontend-aws.vercel.app/" },
      ]
    },
    storePurchase: {
      title: "Store Purchase",
      subtabs: [
        { id: "hk-dashboard", label: "Store", url: "https://store-frontend-vercel.vercel.app/" },
        { id: "hk-tasks", label: "Repair", url: "https://repair-system-frontend-production.vercel.app/" },
      ]
    },
    allAccountSystem: {
      title: "All Accounts System",
      subtabs: [
        { id: "subscription", label: "Subscription", url: "https://subscription-frontend-aws-c7dd.vercel.app/" },
        { id: "document", label: "Document Manager", url: "https://document-manager-beta.vercel.app/" },
        { id: "finance", label: "Finance Dashboard", url: "" },
        { id: "freight", label: "Freight Management", url: "" },
        { id: "allPayment", label: "All Payment System", url: "" },
        { id: "account", label: "Account FMS", url: "" }
      ]
    },
    hrSystem: {
      title: "HR System",
      subtabs: [
        { id: "hrSystem", label: "HR System", url: "" },
        { id: "travel", label: "Travel", url: "" },
        { id: "birthdayWishes", label: "Birthday Wishes", url: "" },
      ]
    },
    project: {
      title: "Project Management",
      subtabs: [
        { id: "12weekPlan", label: "12 Week Plan", url: "https://dashboard-sagar.vercel.app/" },
      ]
    },
    logistic: {
      title: "Travel Management",
      subtabs: [
        { id: "dispatch", label: "Dispatch", url: "" },
        { id: "getOut", label: "Get Out", url: "" },

      ]
    },

  };

  const topNavRoutes = [
    { id: "home", label: "Home", url: "", icon: Home },
    { id: "salesSystem", label: "Sales Systems", url: "https://o2-d-system-frontend-aws-nsa4.vercel.app/" },
    { id: "checklistTasks", label: "Checklist Tasks", url: "https://checklist-delegation-eight.vercel.app/" },
    { id: "storePurchase", label: "Store Purchase Systems", url: "https://store-frontend-vercel.vercel.app/" },
    { id: "allAccountSystem", label: "All Accounts Systems", url: "https://subscription-frontend-aws-c7dd.vercel.app/", },
    { id: "hrSystem", label: "HR Systems", url: "" },
    { id: "project", label: "Project Systems", url: "" },
    { id: "logistic", label: "logistic Systems", url: "" },
  ]

  // Function to handle top tab click
  const handleTopTabClick = (id) => {
    setActiveRoute(id)

    if (id === "home") {
      setIsIframeVisible(false)
      setShowUnderConstruction(false)
      setCurrentUrl("")
      setActiveModule(null)
      setActiveSubTab(null)
      return
    }

    if (id === "menu") {
      setIsMobileMenuOpen(!isMobileMenuOpen)
      return
    }

    // Check if module has subtabs configured
    const moduleHasSubtabs = sidebarConfig[id]?.subtabs?.length > 0;

    if (moduleHasSubtabs) {
      // Set active module for horizontal subnav
      setActiveModule(id)

      // Show under construction if no URL is set for the first subtab
      const firstSubtab = sidebarConfig[id].subtabs[0];
      if (!firstSubtab.url || firstSubtab.url.trim() === "") {
        setShowUnderConstruction(true)
        setIsIframeVisible(false)
        setCurrentUrl("")
        setActiveSubTab(firstSubtab.id)
      } else {
        // Load first subtab by default
        handleSubTabClick(firstSubtab.url, firstSubtab.id)
      }
    } else {
      // For modules without subtabs, check if they have a direct URL
      const route = topNavRoutes.find(r => r.id === id);
      if (route) {
        if (!route.url || route.url.trim() === "") {
          setShowUnderConstruction(true)
          setIsIframeVisible(false)
          setCurrentUrl("")
        } else {
          setCurrentUrl(route.url)
          setIsIframeVisible(true)
          setShowUnderConstruction(false)
        }
        setActiveModule(null)
        setActiveSubTab(null)
      }
    }
  }

  // Function to handle subtab click
  const handleSubTabClick = (url, subtabId) => {
    setActiveSubTab(subtabId)

    if (!url || url.trim() === "") {
      setShowUnderConstruction(true)
      setIsIframeVisible(false)
      setCurrentUrl("")
    } else {
      setCurrentUrl(url)
      setIsIframeVisible(true)
      setShowUnderConstruction(false)
    }

    // Close mobile menu after selection
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    const savedRoute = localStorage.getItem("activeRoute");
    const savedUrl = localStorage.getItem("currentUrl");
    const savedModule = localStorage.getItem("activeModule");
    const savedSubTab = localStorage.getItem("activeSubTab");

    if (savedRoute) {
      setActiveRoute(savedRoute);
      if (savedModule && sidebarConfig[savedModule]) {
        setActiveModule(savedModule);
        if (savedSubTab) {
          setActiveSubTab(savedSubTab);
        }
      }
    }

    if (savedUrl) {
      setCurrentUrl(savedUrl);
      setIsIframeVisible(!!savedUrl);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeRoute", activeRoute);
    localStorage.setItem("currentUrl", currentUrl);
    localStorage.setItem("activeModule", activeModule || "");
    localStorage.setItem("activeSubTab", activeSubTab || "");
  }, [activeRoute, currentUrl, activeModule, activeSubTab]);

  const getButtonClass = (routeId) => {
    return `px-4 py-3 text-sm font-medium whitespace-nowrap hover:bg-white/20 transition-all border-r border-white/10 ${activeRoute === routeId ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-lg" : ""
      }`;
  };

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
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
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
          <div className="flex items-center">
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-22 h-11"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium text-sm">
                Welcome , Aakash
              </span>
            </div>

            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-gray-500 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-white font-bold text-sm">A</span>
            </div>
          </div>
        </div>
      </header>

      {/* Top Navigation Bar */}
      <nav className="bg-gradient-to-r from-red-600 via-rose-600 to-gray-600 text-white sticky top-[64px] z-40 shadow-lg">
        <div className="flex items-center overflow-x-auto scrollbar-thin">
          {topNavRoutes.map((route) => (
            <button
              key={route.id}
              data-id={route.id}
              onClick={() => handleTopTabClick(route.id)}
              className={getButtonClass(route.id)}
            >
              {route.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Horizontal Sub Navigation */}
      <HorizontalSubNav
        activeModule={activeModule}
        onSubTabClick={handleSubTabClick}
        activeSubTab={activeSubTab}
        sidebarConfig={sidebarConfig}
      />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <span className="font-bold text-lg">All Modules</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-2">
              {topNavRoutes.map((route) => (
                <button
                  key={route.id}
                  onClick={() => {
                    handleTopTabClick(route.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 my-1 rounded hover:bg-gray-700/50 transition-all ${activeRoute === route.id ? "bg-gradient-to-r from-red-500 to-gray-500 text-white shadow-lg" : ""
                    }`}
                >
                  {route.icon && <route.icon className="h-4 w-4" />}
                  <span className="text-sm font-medium">{route.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-white lg:pb-0">
        {/* Show Home Page */}
        {!isIframeVisible && !showUnderConstruction && activeRoute === "home" && <HomePage />}

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

      {/* Mobile Bottom Navigation */}
      {/* <MobileBottomNav
        activeRoute={activeRoute}
        onTopTabClick={handleTopTabClick}
        topNavRoutes={topNavRoutes}
        activeModule={activeModule}
        sidebarConfig={sidebarConfig}
        onSubTabClick={handleSubTabClick}
        activeSubTab={activeSubTab}
      /> */}

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