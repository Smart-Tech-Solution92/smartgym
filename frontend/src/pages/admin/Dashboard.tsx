
import React, { useState } from "react";
import AdminNavbar from "../../components/layout/admin/AdminNavbar";
import AdminSidebar from "../../components/layout/admin/AdminSidebar";
import User from "./User";
import Staff from "./Staff";
import Notification from "./Notification";

const Dashboard: React.FC = () => {
  const [activePage, setActivePage] = useState("User");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  
  const adminUser = {
    name: "Admin User",
    email: "admin@smartgym.com",
    role: "Administrator",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
  };

  
  const handleLogout = () => {
    console.log('Logging out...');
  };

  const handleProfileClick = () => {
    console.log('Opening profile...');
  };

  

  const renderPage = () => {
    switch (activePage) {
      case "User":
        return <User />;
      case "Staff":
        return <Staff />;
      case "Notification":
        return <Notification />;
      default:
        return <User />;
    }
  };

  return (
    <div className="flex h-screen">
    
      <AdminSidebar
        onSelect={setActivePage}
        activePage={activePage}
        isCollapsed={isSidebarCollapsed}
      />

      
      <div className="flex-1 flex flex-col min-w-0">
        
        <AdminNavbar
          user={adminUser} 
          pageTitle={activePage}
          onMenuToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onLogout={handleLogout} 
          onProfileClick={handleProfileClick} 
          
          logo={{ text: 'SmartGym' }} 
          
        />
        <main className="flex-1 overflow-y-auto bg-gray-50">{renderPage()}</main>
      </div>
    </div>
  );
};

export default Dashboard;