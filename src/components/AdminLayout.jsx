import { useState, useEffect, useRef } from "react"
import { LogOut, X, Construction, Settings } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import HomePage from "../pages/AllUsers";
import {
  fetchSystemsApi,
  createSystemApi,
  updateSystemApi,
  deleteSystemApi,
} from "../redux/api/systemsApi";
// import { fetchUserDetailsApi } from "../redux/api/settingApi";

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


export default function AdminLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeRoute, setActiveRoute] = useState("home")
  const [currentUrl, setCurrentUrl] = useState("")
  const [isIframeVisible, setIsIframeVisible] = useState(false)
  const [showUnderConstruction, setShowUnderConstruction] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const navigate = useNavigate();
  const [systems, setSystems] = useState([]);
  const [showSystemModal, setShowSystemModal] = useState(false);
  const [editSystem, setEditSystem] = useState(null);
  const [username, setUsername] = useState(() =>
    localStorage.getItem("user-name")
  );
  const isAdmin = username?.toLowerCase() === "admin";
  const [isSavingSystem, setIsSavingSystem] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [systemAccessList, setSystemAccessList] = useState([]);
  const [isAdminSidebarOpen, setIsAdminSidebarOpen] = useState(false);
  const [showAllUsersModal, setShowAllUsersModal] = useState(false);
  const allUsersRef = useRef(null);




  const DEFAULT_SYSTEMS = ["CHECKLIST COMBINED"];


  const topNavRoutes = [
    {
      id: "HOME",
      label: "HOME",
      url: "",
    },
    ...systems.map((s) => ({
      id: s.systems,
      label: s.systems,
      url: s.link || "",
    })),
  ];


  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type });
    }, 500);
  };


  // Function to handle route click
  const handleRouteClick = (url, id) => {
    setActiveRoute(id)

    // If it's the home route
    if (id.toUpperCase() === "HOME") {
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

  const handleLogout = () => {
    localStorage.removeItem("user-name");
    localStorage.removeItem("activeRoute");
    localStorage.removeItem("currentUrl");
    localStorage.removeItem("system_access");
    sessionStorage.clear();

    setUsername(null);
    setSystemAccessList([]);
    setSystems([]);

    window.location.replace("/login");
  };


  const loadSystems = async () => {
    const data = await fetchSystemsApi();
    setSystems(data);
  };

  useEffect(() => {
    loadSystems();
  }, []);


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

  useEffect(() => {
    if (isAdmin) {
      setSystemAccessList([]);
      return;
    }

    const storedAccess = localStorage.getItem("system_access");

    if (!storedAccess) {
      setSystemAccessList([]);
      return;
    }

    const accessArray = storedAccess
      .split(",")
      .map((v) => v.trim().toUpperCase())
      .filter(Boolean);

    setSystemAccessList(accessArray);
  }, [isAdmin]);



  useEffect(() => {
    if (!username) {
      navigate("/login", { replace: true });
    }
  }, [username, navigate]);


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
          <div className="flex items-center">
            <div className="flex items-center motion-safe:animate-float">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-22 h-11"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">

            <div className="flex items-center gap-2 opacity-100 animate-slide-in-fade delay-500">
              <span className="inline-block animate-wave"></span>
              <span className="text-gray-700 font-medium text-sm">
                Welcome, {username || "User"}
              </span>

            </div>


            {username?.toLowerCase() === "admin" ? (
              <><button
                className="lg:hidden w-10 h-10 bg-red-600 hover:bg-red-700 rounded flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <span className="text-white text-xl font-bold">☰</span>
              </button>
                <div className="hidden lg:flex w-10 h-10 bg-gray-700 hover:bg-gray-900 rounded-full items-center justify-center cursor-pointer transition"
                  onClick={() => setIsAdminSidebarOpen(true)}
                >
                  <Settings className="text-white w-5 h-5" />
                </div></>

            ) : (
              <div
                onClick={handleLogout}
                className="w-10 h-10 bg-red-600 hover:bg-red-900 rounded-full flex items-center justify-center cursor-pointer transition opacity-100"
              >
                <LogOut className="text-white w-5 h-5" />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Top Navigation Bar - Red Gradient Style */}
      <nav className="hidden lg:block bg-gradient-to-r from-red-900 via-rose-600 to-gray-600 text-white sticky top-[64px] z-40 shadow-lg">
        <div className="flex items-center overflow-x-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10">
          {topNavRoutes
            .filter((route) => {
              const routeId = route.id.toUpperCase();
              const usernameLower = username?.toLowerCase();
              if (usernameLower === "admin") return true;

              if (routeId === "HOME") return true;

              if (DEFAULT_SYSTEMS.includes(routeId)) return true;

              return systemAccessList.includes(routeId);
            })
            .map((route) => (
              <button
                key={route.id}
                onClick={() => handleRouteClick(route.url, route.id)}
                className={getButtonClass(route.id)}
              >
                {route.label}
              </button>
            ))}

        </div>
      </nav>

      {/* MOBILE SIDEBAR (SYSTEMS + ADMIN ACTIONS) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="w-80 bg-white shadow-2xl flex flex-col">
            {/* HEADER */}
            <div className="px-5 py-4 border-b relative">

              {/* CLOSE ICON – TOP RIGHT */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <p className="text-xs text-gray-500">Welcome</p>
              <p className="text-lg font-semibold text-gray-800">
                {username}
              </p>
            </div>

            {/* SYSTEMS */}
            <div className="px-5 py-4">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
                Systems
              </p>

              <div className="space-y-1">
                {topNavRoutes
                  .filter((route) => {
                    const routeId = route.id.toUpperCase();
                    if (routeId === "HOME") return true;
                    if (isAdmin) return routeId !== "HOME";
                    if (DEFAULT_SYSTEMS.includes(routeId)) return true;
                    return systemAccessList.includes(routeId);
                  })
                  .map((route) => (
                    <button
                      key={route.id}
                      onClick={() => {
                        handleRouteClick(route.url, route.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full px-4 py-3 rounded-md text-sm font-medium text-left transition
                  ${activeRoute === route.id
                          ? "bg-red-600 text-white shadow"
                          : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      {route.label}
                    </button>
                  ))}
              </div>
            </div>

            {/* ACTIONS */}
            {isAdmin && (
              <div className="px-5 py-4 border-t">
                <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
                  Actions
                </p>

                <button
                  onClick={() => {
                    setShowAllUsersModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-md text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Show All Users
                </button>

                <button
                  onClick={() => {
                    setEditSystem(null);
                    setShowSystemModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-md text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Add / Edit Systems
                </button>
              </div>
            )}

            {/* LOGOUT */}
            <div className="mt-auto px-5 py-4 border-t">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-md text-red-600 hover:bg-red-50 font-medium"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}



      {/* Main Content Layout */}
      <div className="flex flex-1 overflow-hidden">

        <main className="flex-1 overflow-y-auto bg-white">
          {!isIframeVisible && !showUnderConstruction && (
            <HomePage
              allUsersRef={allUsersRef}
              showAllUsersModal={showAllUsersModal}
              setShowAllUsersModal={setShowAllUsersModal}
            />
          )}

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
                  // sandbox="allow-forms allow-modals allow-scripts allow-same-origin allow-storage-access-by-user-activation"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </main>
      </div>
      {showSystemModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded p-6">
            <h2 className="text-xl font-bold mb-4">
              {editSystem ? "Edit System" : "Add System"}
            </h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSavingSystem(true);

                try {
                  const systems = e.target.systems.value.trim();
                  const linkValue = e.target.link?.value?.trim();

                  const payload = {
                    systems,
                    ...(linkValue ? { link: linkValue } : { link: null }),
                  };

                  if (editSystem) {
                    await updateSystemApi(editSystem.id, payload);
                    showToast("System updated");
                  } else {
                    await createSystemApi(payload);
                    showToast("System added");
                  }

                  setShowSystemModal(false);
                  setEditSystem(null);
                  await loadSystems();
                } catch (err) {
                  showToast("Action failed", "error");
                } finally {
                  setIsSavingSystem(false);
                }
              }}
              className="space-y-4"
            >
              <input
                name="systems"
                defaultValue={editSystem?.systems || ""}
                placeholder="System Name"
                className="w-full border p-2 rounded"
                required
              />

              <input
                name="link"
                defaultValue={editSystem?.link || ""}
                placeholder="System Link"
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowSystemModal(false)}
                  className="px-4 py-2 border rounded"
                  disabled={isSavingSystem}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSavingSystem}
                  className={`px-4 py-2 rounded text-white flex items-center gap-2
        ${isSavingSystem ? "bg-gray-400 cursor-not-allowed" : "bg-red-600"}
      `}
                >
                  {isSavingSystem && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  Save
                </button>
              </div>
            </form>

          </div>
        </div>
      )
      }

      {showSystemModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded p-6 overflow-y-auto max-h-[90vh]">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editSystem ? "Edit System" : "Manage Systems"}
              </h2>
              <button onClick={() => setShowSystemModal(false)}>
                <X />
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSavingSystem(true);

                try {
                  const systems = e.target.systems.value.trim();
                  const linkValue = e.target.link?.value?.trim();

                  const payload = {
                    systems,
                    ...(linkValue ? { link: linkValue } : { link: null }),
                  };

                  if (editSystem) {
                    await updateSystemApi(editSystem.id, payload);
                    showToast("System updated");
                  } else {
                    await createSystemApi(payload);
                    showToast("System added");
                  }

                  e.target.reset();
                  setEditSystem(null);
                  await loadSystems();
                } catch (err) {
                  showToast("Action failed", "error");
                } finally {
                  setIsSavingSystem(false);
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
            >
              <input
                name="systems"
                defaultValue={editSystem?.systems || ""}
                placeholder="System Name"
                className="border p-2 rounded"
                required
              />

              <input
                name="link"
                defaultValue={editSystem?.link || ""}
                placeholder="System Link"
                className="border p-2 rounded"
              />

              <div className="md:col-span-2 flex justify-end gap-3">
                {editSystem && (
                  <button
                    type="button"
                    onClick={() => setEditSystem(null)}
                    className="px-4 py-2 border rounded"
                    disabled={isSavingSystem}
                  >
                    Cancel Edit
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isSavingSystem}
                  className={`px-4 py-2 rounded text-white flex items-center gap-2
        ${isSavingSystem ? "bg-gray-400 cursor-not-allowed" : "bg-red-600"}
      `}
                >
                  {isSavingSystem && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  {editSystem ? "Update" : "Add"}
                </button>
              </div>
            </form>


            {/* SYSTEM LIST */}
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">System</th>
                  <th className="p-2 text-left">Link</th>
                  <th className="p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {systems.map((s) => (
                  <tr key={s.id} className="border-t">
                    <td className="p-2">{s.systems}</td>
                    <td className="p-2 text-blue-600 underline">
                      <a href={s.link} target="_blank" rel="noreferrer">
                        {s.link}
                      </a>
                    </td>
                    <td className="p-2 text-center space-x-3">
                      <button
                        onClick={() => setEditSystem(s)}
                        className="text-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm("Delete this system?")) {
                            await deleteSystemApi(s.id);
                            loadSystems();
                          }
                        }}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      )
      }

      {toast.show && (
        <div
          className={`fixed top-5 right-5 z-[9999] px-4 py-2 rounded shadow-lg text-white text-sm
      ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}
    `}
        >
          {toast.message}
        </div>
      )}

      {isAdminSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="flex-1 bg-black/50"
            onClick={() => setIsAdminSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div className="w-72 bg-white shadow-xl p-5 flex flex-col">
            <h2 className="text-lg font-bold mb-6 border-b pb-3">
              Admin Settings
            </h2>

            {/* All Users */}
            <button
              onClick={() => {
                // setActiveRoute("HOME");
                // setIsIframeVisible(false);
                // setShowUnderConstruction(false);
                // setCurrentUrl("");
                setShowAllUsersModal(true);
                setIsAdminSidebarOpen(false);

                requestAnimationFrame(() => {
                  allUsersRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                });
              }}
              className="text-left px-4 py-3 rounded hover:bg-gray-100 font-medium"
            >
              Show All Users
            </button>

            {/* Add / Edit Systems */}
            <button
              onClick={() => {
                setEditSystem(null);
                setShowSystemModal(true);
                setIsAdminSidebarOpen(false);
              }}
              className="text-left px-4 py-3 rounded hover:bg-gray-100 font-medium"
            >
              Add / Edit Systems
            </button>

            <div className="flex-1" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}

    </div >
  )
}