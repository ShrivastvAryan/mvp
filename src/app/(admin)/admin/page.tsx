"use client";
import Dashboard from '@/components/admin/Dashboard';
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const AdminPanel = () => {

  return <Dashboard />;
};

export default AdminPanel;