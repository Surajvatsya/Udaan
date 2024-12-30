import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const OrderDetailsPage = () => {
  const { order_id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/order/${order_id}`);
        if (!response.ok) throw new Error('Failed to fetch order details');
        const data = await response.json();
        // console.log("data", data);
        setOrderData(data[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [order_id]);

  const handlePrint = () => {
    window.print();
    console.log("called");
  };

  const handleDownload = () => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(orderData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = dataStr;
    downloadAnchor.download = `order_${orderData?.order_id || 'unknown'}.json`;
    downloadAnchor.click();
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  console.log("orderData",orderData);

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
      <div className="w-4/5 max-w-4xl bg-white shadow-lg rounded-lg p-8 backdrop-filter backdrop-blur-lg">
        {/* Header Section */}
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-indigo-600 font-bold text-lg">O</span>
          </div>
          <h1 className="ml-4 text-2xl font-bold text-gray-800">Order Details</h1>
        </div>

        {/* Order Info Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <InfoCard title="Order ID" value={`#${orderData.order_id}`} />
          <InfoCard title="Restaurant ID" value={`#${orderData.restaurant_id}`} />
          <InfoCard
            title="Order Date"
            value={new Date(orderData.order_date).toLocaleDateString()}
          />
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <StatusBadge status={orderData.order_status} />
        </div>


        {/* Items Table */}
        <div className="mb-6">
          <ItemsTable items={orderData.items || []}  totalAmount={orderData.total_amount || 0 }/>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <ActionButton label="Print Order" primary onClick={handlePrint} />
          <ActionButton label="Download" onClick={handleDownload} />
        </div>
      </div>
    </div>
  );
};

// InfoCard Component
const InfoCard = ({ title, value }) => (
  <div className="bg-indigo-50 p-4 rounded-lg shadow">
    <h3 className="text-sm text-gray-500">{title}</h3>
    <p className="text-lg font-bold text-gray-800">{value}</p>
  </div>
);

// StatusBadge Component
const StatusBadge = ({ status }) => {
  const colorClass =
    status === 'Delivered' ? 'text-green-500 bg-green-100' : 'text-gray-500 bg-gray-100';
  return (
    <div className={`flex items-center px-4 py-2 rounded-full ${colorClass}`}>
      <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
      <span>{status}</span>
    </div>
  );
};

// ItemsTable Component
const ItemsTable = ({ items, totalAmount }) => (
  <div className="border rounded-lg overflow-hidden">
    <table className="w-full text-left">
      <thead className="bg-gray-100 text-gray-600">
        <tr>
          <th className="p-4">Item</th>
          <th className="p-4">Quantity</th>
          <th className="p-4">Price</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="p-4">{item.item_name}</td>
            <td className="p-4">{item.quantity}</td>
            <td className="p-4">₹{parseFloat(item.price).toFixed(2)}</td>
          </tr>
        ))}
        <tr className="font-bold bg-indigo-50">
          <td className="p-4">Total Amount</td>
          <td></td>
          <td className="p-4">₹{totalAmount.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

// ActionButton Component
const ActionButton = ({ label, primary }) => (
  <button
    className={`px-6 py-2 rounded-lg font-medium shadow transition ${
      primary
        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    {label}
  </button>
);

export default OrderDetailsPage;
