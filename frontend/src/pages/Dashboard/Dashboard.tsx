import React from 'react';
import { useAuthStore } from '@/store/AuthStore';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import mht1 from '/mht/mht1.jpeg';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogoout = () => {
    logout();
    toast.success('Logged out succesfully');
    navigate('/login');
  };
  return (
    <div className="flex flex-col gap-16 items-center justify-center min-h-screen">
      <img src={mht1} alt="" className="h-140 hover:scale-110 transition-all" />
      <Button onClick={handleLogoout}>Logout</Button>
    </div>
  );
};

export default Dashboard;
