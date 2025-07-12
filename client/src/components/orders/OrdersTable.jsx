import { useState } from 'react';
import { Eye, Printer, MapPin, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const OrdersTable = ({ orders, isLoading, onRefresh }) => {
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      in_transit: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      delivered: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      picked_up: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    };
    return colors[status] || colors.pending;
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pending',
      in_transit: 'In Transit',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
      picked_up: 'Picked Up',
    };
    return labels[status] || status;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading orders...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Orders
          </h3>
          <div className="flex items-center space-x-2">
            <select className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>10 per page</option>
              <option>25 per page</option>
              <option>50 per page</option>
            </select>
            <button
              onClick={onRefresh}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th
                className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => handleSort('orderId')}
              >
                Order ID
              </th>
              <th
                className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => handleSort('customerName')}
              >
                Customer
              </th>
              <th
                className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => handleSort('productName')}
              >
                Product
              </th>
              <th
                className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => handleSort('destinationCity')}
              >
                Destination
              </th>
              <th
                className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => handleSort('status')}
              >
                Status
              </th>
              <th
                className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => handleSort('amount')}
              >
                Amount
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {orders.map((order) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {order.orderId}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(order.createdAt)}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {order.customerName}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {order.customerEmail}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {order.productName}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {order.productWeight} kg
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {order.destinationCity}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {order.destinationPostal}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    ${order.amount}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 text-sm p-1 rounded hover:bg-green-50 dark:hover:bg-green-900/20">
                      <Printer className="w-4 h-4" />
                    </button>
                    <button className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 text-sm p-1 rounded hover:bg-purple-50 dark:hover:bg-purple-900/20">
                      <MapPin className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          No orders found
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{orders.length}</span> of <span className="font-medium">{orders.length}</span> results
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors">
            Previous
          </button>
          <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg">1</button>
          <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors">2</button>
          <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors">3</button>
          <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
