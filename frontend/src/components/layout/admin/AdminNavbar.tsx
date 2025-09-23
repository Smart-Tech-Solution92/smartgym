
import "../../../styles/navbarStyles.css"
import React, { useState, useRef, useEffect } from 'react';
import { Menu, User, Settings, LogOut, ChevronDown } from 'lucide-react';

type User = {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
};

type NavbarProps = {
  user?: User;
  pageTitle?: string;
  onMenuToggle?: () => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
  className?: string;
  logo?: {
    src?: string;
    text: string;
  };
};

const AdminNavbar: React.FC<NavbarProps> = ({
  user,
  pageTitle = 'Dashboard',
  onMenuToggle,
  onLogout,
  onProfileClick,
  className = '',
  logo = { text: 'Company' }
}) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <nav
      ref={navbarRef}
      className={`bg-white border-b border-gray-200 shadow-sm ${className}`}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
         
          <div className="flex items-center space-x-4">
            
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>

           
            <div className="flex items-center space-x-3">
              {logo.src ? (
                <img src={logo.src} alt="Logo" className="h-8 w-auto" />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {logo.text.charAt(0)}
                  </span>
                </div>
              )}
              <div className="hidden md:block">
                <h1 className="text-lg font-semibold text-gray-900">
                  {logo.text}
                </h1>
              </div>
            </div>

            
            <div className="hidden lg:block h-6 w-px bg-gray-300 mx-2"></div>

            
            <div className="hidden lg:block">
              <h2 className="text-xl font-bold text-gray-900">{pageTitle}</h2>
            </div>
          </div>

          
          <div className="flex items-center space-x-4">
            {user && (
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-expanded={isProfileDropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="hidden sm:block text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user.role || 'Admin'}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        isProfileDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {user.email}
                      </div>
                    </div>

                    <button
                      onClick={onProfileClick}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </button>

                    <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={onLogout}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        
        <div className="lg:hidden pb-4">
          <h2 className="text-lg font-bold text-gray-900">{pageTitle}</h2>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
