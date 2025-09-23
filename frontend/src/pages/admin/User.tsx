// pages/User.tsx
import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, AlertCircle, Filter, Bell, X } from 'lucide-react';

type User = {
  id: number;
  name: string;
  email: string;
  gender: 'Male' | 'Female';
  joinDate: string;
  subDuration: string;
  daysLeft: number;
  status: 'Active' | 'Expired' | 'Pending';
};

interface UserProps {
  onUserClick?: (userId: number) => void;
}

const User: React.FC<UserProps> = ({ onUserClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showNewUserDialog, setShowNewUserDialog] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [userToAlert, setUserToAlert] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    status: 'All',
    gender: 'All',
    subscription: 'All'
  });
  const [showFilters, setShowFilters] = useState(false);

  
  const demoUsers: User[] = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      gender: 'Male',
      joinDate: '2024-01-15',
      subDuration: '6 Months',
      daysLeft: 45,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      gender: 'Female',
      joinDate: '2024-02-01',
      subDuration: '12 Months',
      daysLeft: 300,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      gender: 'Male',
      joinDate: '2023-12-10',
      subDuration: '3 Months',
      daysLeft: -5,
      status: 'Expired'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      gender: 'Female',
      joinDate: '2024-03-05',
      subDuration: '1 Month',
      daysLeft: 10,
      status: 'Active'
    },
    {
      id: 5,
      name: 'Alex Thompson',
      email: 'alex.t@email.com',
      gender: 'Female',
      joinDate: '2024-01-20',
      subDuration: '12 Months',
      daysLeft: 280,
      status: 'Active'
    },
    {
      id: 6,
      name: 'Lisa Brown',
      email: 'lisa.brown@email.com',
      gender: 'Female',
      joinDate: '2023-11-15',
      subDuration: '6 Months',
      daysLeft: -25,
      status: 'Expired'
    },
    {
      id: 7,
      name: 'David Lee',
      email: 'david.lee@email.com',
      gender: 'Male',
      joinDate: '2024-03-01',
      subDuration: '3 Months',
      daysLeft: 75,
      status: 'Active'
    },
    {
      id: 8,
      name: 'Jennifer Martinez',
      email: 'jennifer.m@email.com',
      gender: 'Female',
      joinDate: '2024-02-20',
      subDuration: '1 Month',
      daysLeft: 5,
      status: 'Pending'
    }
  ];

  
  const filteredUsers = demoUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filters.status === 'All' || user.status === filters.status;
    const matchesGender = filters.gender === 'All' || user.gender === filters.gender;
    const matchesSubscription = filters.subscription === 'All' || user.subDuration === filters.subscription;

    return matchesSearch && matchesStatus && matchesGender && matchesSubscription;
  });

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleEdit = (userId: number) => {
    console.log('Edit user:', userId);
    
  };

  const handleDeleteClick = (userId: number) => {
    setUserToDelete(userId);
    setShowDeleteAlert(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      console.log('Delete user:', userToDelete);
      
    }
    setShowDeleteAlert(false);
    setUserToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteAlert(false);
    setUserToDelete(null);
  };

  const handleAlertClick = (userId: number) => {
    setUserToAlert(userId);
    setShowAlertDialog(true);
  };

  const handleAlertConfirm = () => {
    if (userToAlert) {
      console.log('Send alert to user:', userToAlert);
      
    }
    setShowAlertDialog(false);
    setUserToAlert(null);
  };

  const handleAlertCancel = () => {
    setShowAlertDialog(false);
    setUserToAlert(null);
  };

  const handleNewUser = () => {
    setShowNewUserDialog(true);
  };

  const handleCreateUser = (userData: any) => {
    console.log('Create new user:', userData);
    
    setShowNewUserDialog(false);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: 'All',
      gender: 'All',
      subscription: 'All'
    });
  };

  const handleUserNameClick = (userId: number) => {
    if (onUserClick) {
      onUserClick(userId);
    }
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

 
  const NewUserDialog: React.FC = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      gender: 'Male' as 'Male' | 'Female' | 'Other',
      subDuration: '1 Month',
      joinDate: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleCreateUser(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Create New User</h3>
            <button
              onClick={() => setShowNewUserDialog(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subscription Duration</label>
              <select
                value={formData.subDuration}
                onChange={(e) => setFormData(prev => ({ ...prev, subDuration: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1 Month">1 Month</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="12 Months">12 Months</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
              <input
                type="date"
                value={formData.joinDate}
                onChange={(e) => setFormData(prev => ({ ...prev, joinDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowNewUserDialog(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">Manage all gym members and their subscriptions</p>
      </div>

      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
         
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users by name, email, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            
            <button 
              onClick={handleNewUser}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New User</span>
            </button>
          </div>
        </div>

        
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Expired">Expired</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={filters.gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subscription</label>
                <select
                  value={filters.subscription}
                  onChange={(e) => handleFilterChange('subscription', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Subscriptions</option>
                  <option value="1 Month">1 Month</option>
                  <option value="3 Months">3 Months</option>
                  <option value="6 Months">6 Months</option>
                  <option value="12 Months">12 Months</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-600">
                Showing {filteredUsers.length} of {demoUsers.length} users
              </span>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

     
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
       
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">
                {selectedUsers.length > 0 
                  ? `${selectedUsers.length} selected` 
                  : `${filteredUsers.length} users`
                }
              </span>
            </div>
            
            {selectedUsers.length > 0 && (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleAlertClick(selectedUsers[0])}
                  className="flex items-center space-x-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  <span>Alert Selected</span>
                </button>
                <button 
                  onClick={() => handleDeleteClick(selectedUsers[0])}
                  className="flex items-center space-x-2 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Selected</span>
                </button>
              </div>
            )}
          </div>
        </div>

        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days Left
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                      />
                      <div>
                        <button
                          onClick={() => handleUserNameClick(user.id)}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors text-left"
                        >
                          {user.name}
                        </button>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.gender}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.joinDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.subDuration}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${getDaysLeftColor(user.daysLeft)}`}>
                      {user.daysLeft >= 0 ? `${user.daysLeft} days` : 'Expired'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Edit user"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAlertClick(user.id)}
                        className="text-yellow-600 hover:text-yellow-900 transition-colors"
                        title="Send alert"
                      >
                        <Bell className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>

     
      {showDeleteAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Delete User</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showAlertDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <Bell className="w-6 h-6 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-900">Send Alert</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to send an alert to this user?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleAlertCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAlertConfirm}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Send Alert
              </button>
            </div>
          </div>
        </div>
      )}

      {showNewUserDialog && <NewUserDialog />}
    </div>
  );
};

export default User;