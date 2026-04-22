import React from 'react';
import { useAuthStore } from '@/store/AuthStore';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogoout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div>
      <Button onClick={handleLogoout}>Logout</Button>
    </div>
  );
};

export default Dashboard;
