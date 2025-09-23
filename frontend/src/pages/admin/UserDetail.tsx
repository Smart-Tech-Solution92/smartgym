// pages/UserDetail.tsx
import React from 'react';
import { ArrowLeft, Calendar, Clock, User, CreditCard, Activity } from 'lucide-react';

type User = {
  id: number;
  name: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  joinDate: string;
  subDuration: string;
  daysLeft: number;
  status: 'Active' | 'Expired' | 'Pending';
  phone?: string;
  address?: string;
  lastVisit?: string;
  totalVisits?: number;
  membershipType?: string;
};

interface UserDetailProps {
  userId: number;
  onBack: () => void;
}

const UserDetail: React.FC<UserDetailProps> = ({ userId, onBack }) => {
  const user: User = {
    id: userId,
    name: 'John Smith',
    email: 'john.smith@email.com',
    gender: 'Male',
    joinDate: '2024-01-15',
    subDuration: '6 Months',
    daysLeft: 45,
    status: 'Active',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    lastVisit: '2024-03-20',
    totalVisits: 67,
    membershipType: 'Premium'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysLeftColor = (days: number) => {
    if (days < 0) return 'text-red-600 font-semibold';
    if (days <= 7) return 'text-orange-600 font-semibold';
    return 'text-green-600';
  };

  return (
    <div className="p-6">
      
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors mr-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Users</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{user.name}</h2>
              <p className="text-blue-100">{user.email}</p>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mt-2 ${getStatusColor(user.status)}`}>
                {user.status}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2 text-gray-400" />
                Personal Information
              </h3>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-500">Gender</label>
                  <p className="text-gray-900">{user.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-gray-900">{user.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <p className="text-gray-900">{user.address}</p>
                </div>
              </div>
            </div>

           
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-gray-400" />
                Membership
              </h3>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-500">Join Date</label>
                  <p className="text-gray-900 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {user.joinDate}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Subscription</label>
                  <p className="text-gray-900">{user.subDuration}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Days Left</label>
                  <p className={`flex items-center ${getDaysLeftColor(user.daysLeft)}`}>
                    <Clock className="w-4 h-4 mr-1" />
                    {user.daysLeft >= 0 ? `${user.daysLeft} days` : 'Expired'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Membership Type</label>
                  <p className="text-gray-900">{user.membershipType}</p>
                </div>
              </div>
            </div>

            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-gray-400" />
                Activity
              </h3>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Visit</label>
                  <p className="text-gray-900">{user.lastVisit}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Visits</label>
                  <p className="text-gray-900">{user.totalVisits}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Member Since</label>
                  <p className="text-gray-900">{Math.floor((new Date().getTime() - new Date(user.joinDate).getTime()) / (1000 * 60 * 60 * 24))} days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Send Message
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Renew Membership
          </button>
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
            Update Profile
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            View Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;