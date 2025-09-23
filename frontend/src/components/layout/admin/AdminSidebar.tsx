
import React from "react";
import { Users, UserCog, Bell } from "lucide-react";

type SidebarProps = {
  onSelect: (page: string) => void;
  activePage: string;
  isCollapsed: boolean; 
};

const AdminSidebar: React.FC<SidebarProps> = ({ onSelect, activePage, isCollapsed }) => {
  const menuItems = [
    { name: "User", icon: <Users className="w-5 h-5" /> },
    { name: "Staff", icon: <UserCog className="w-5 h-5" /> },
    { name: "Notification", icon: <Bell className="w-5 h-5" /> },
  ];

  return (
    <aside
      className={`bg-gray-900 text-white h-screen flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className={`p-4 text-xl font-bold border-b border-gray-700 text-center`}>
        {!isCollapsed && "Admin Panel"}
      </div>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onSelect(item.name)}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-800 transition-colors duration-200 ${
              activePage === item.name ? "bg-gray-800 font-semibold" : ""
            }`}
          >
            {item.icon}
            {!isCollapsed && <span>{item.name}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
