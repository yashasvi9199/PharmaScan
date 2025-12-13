import { Outlet, Link, useLocation } from "react-router-dom";

/** Shared layout with navigation */
export default function Layout() {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/scan", label: "Scan", icon: "📷" },
    { path: "/history", label: "History", icon: "📋" },
    { path: "/lookup", label: "Lookup", icon: "🔍" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl">💊</span>
              <span className="font-semibold text-gray-900">PharmaScan</span>
            </Link>
            <div className="flex items-center gap-1">
              {navItems.map(({ path, label, icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(path)
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <span className="hidden sm:inline mr-1">{icon}</span>
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-8">
        <Outlet />
      </main>
    </div>
  );
}
