import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import OrderFilters from '@/components/orders/OrderFilters';
import OrdersTable from '@/components/orders/OrdersTable';
import { ToastContainer } from '@/components/ui/Toast';

const Orders = () => {
  const [filters, setFilters] = useState({});
  const [toasts, setToasts] = useState([]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['/api/orders', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.search) params.append('search', filters.search);
      
      const response = await fetch(`/api/orders?${params}`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      return response.json();
    },
  });

  const showToast = (message, type = 'info', duration = 5000) => {
    const id = Date.now();
    const toast = { id, message, type, duration };
    setToasts(prev => [...prev, toast]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleRefresh = () => {
    refetch();
    showToast('Orders refreshed successfully', 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Orders Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and track all your courier orders from one place.
        </p>
      </div>

      <OrderFilters onFilterChange={handleFilterChange} />

      <OrdersTable
        orders={data?.orders || []}
        isLoading={isLoading}
        onRefresh={handleRefresh}
      />

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </motion.div>
  );
};

export default Orders;
