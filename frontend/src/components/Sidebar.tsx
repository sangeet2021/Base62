import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import {
  ChartNoAxesColumn,
  LayoutDashboard,
  Link as LinkIcon,
  Settings,
} from 'lucide-react';
import { useAuthStore } from '@/store/AuthStore';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/links', label: 'My Links', icon: LinkIcon },
  { path: '/analytics', label: 'Analytics', icon: ChartNoAxesColumn },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore(
    useShallow((state) => ({ user: state.user, logout: state.logout })),
  );

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="bg-bg border-r border-gray-800 min-h-screen w-72 flex flex-col py-8">
      <h1 className="font-display font-extrabold text-2xl px-4 pb-8 border-b border-gray-800">
        base<span className="text-accent">62</span>
      </h1>
      
      <div className="px-4 flex flex-col gap-2 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink 
              key={item.path} 
              to={item.path} 
              end={item.path === '/'}
            >
              {({ isActive }) => (
                <Button
                  variant={isActive ? 'primary' : 'ghost'}
                  className="w-full flex justify-start gap-3"
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Button>
              )}
            </NavLink>
          );
        })}
      </div>

      <div className="mt-auto px-4 pt-6 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-bg font-bold text-lg">
            {user?.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">{user?.username}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
        <Button onClick={handleLogout} variant="ghost" className="w-full justify-start">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;