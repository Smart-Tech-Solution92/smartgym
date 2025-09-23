
import React, { useState } from "react";
import AdminNavbar from "../../components/layout/admin/AdminNavbar";
import AdminSidebar from "../../components/layout/admin/AdminSidebar";
import User from "./User";
import Staff from "./Staff";
import UserDetail from "./UserDetail";
import Notification from "./Notification";

const Dashboard: React.FC = () => {
  const [activePage, setActivePage] = useState("User");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

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

 

  const handleUserClick = (userId: number) => {
    console.log('User clicked:', userId); 
    setSelectedUserId(userId);
    setActivePage("UserDetail"); 
  };

  const handleBackToUsers = () => {
    setSelectedUserId(null);
    setActivePage("User");
  };

  const renderPage = () => {
    console.log('Current active page:', activePage); 
    console.log('Selected user ID:', selectedUserId); 
    
    switch (activePage) {
      case "User":
        return <User onUserClick={handleUserClick} />;
      case "Staff":
        return <Staff />;
      case "Notification":
        return <Notification />;
      case "UserDetail":
        return selectedUserId ? (
          <UserDetail userId={selectedUserId} onBack={handleBackToUsers} />
        ) : (
         
          <div className="p-6">
            <button 
              onClick={handleBackToUsers}
              className="mb-4 text-blue-600 hover:text-blue-800"
            >
              ← Back to Users
            </button>
            <p>No user selected</p>
          </div>
        );
      default:
        return <User onUserClick={handleUserClick} />;
    }
  };

  const getPageTitle = () => {
    if (activePage === "UserDetail" && selectedUserId) {
      return "User Details";
    }
    return activePage;
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar
        onSelect={setActivePage}
        activePage={activePage === "UserDetail" ? "User" : activePage}
        isCollapsed={isSidebarCollapsed}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar
          user={adminUser}
          pageTitle={getPageTitle()}
          onMenuToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onLogout={handleLogout}
          onProfileClick={handleProfileClick}
          
          logo={{ text: 'SmartGym' }}
          
        />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;