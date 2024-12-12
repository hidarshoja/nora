import React, { useState } from "react";

export default function AdminOrders() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const tableHeaders = [
    "ردیف",
    "تاریخ",
    "ساعت",
    "نام خریدار",
    "نام محصول",
    "تعداد",
    "قیمت محصول",
    "قیمت کل محصول",
    "عملیات",
  ];

  const orders = [
    {
      id: 1,
      date: "1402/09/15",
      time: "14:30",
      buyerName: "علی رضایی",
      productName: "میلنگ پراید",
      quantity: 2,
      unitPrice: 12000000,
      totalPrice: 24000000,
    },
    {
      id: 2,
      date: "1402/09/15",
      time: "19:30",
      buyerName: "علی محمد رحمانی",
      productName: "رینگ پراید",
      quantity: 2,
      unitPrice: 200000,
      totalPrice: 400000,
    },
    
  ];

  const openModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTrackingNumber("");
  };

  const handleTrackingSubmit = () => {
    console.log(`شماره پیگیری برای سفارش ${selectedOrderId}:`, trackingNumber);
    closeModal();
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-YekanBakh-Regular  mb-5">صفحه سفارشات</h1>
     <div className="overflow-x-auto">
     <table className="min-w-full divide-y divide-gray-300 border ">
        <thead className="bg-gray-100">
          <tr>
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                className="px-3 py-4 text-center text-sm font-semibold text-gray-900 font-YekanBakh-Regular"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order.id}>
                <td className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular">
                  {index + 1}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular">
                  {order.date}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular">
                  {order.time}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular">
                  {order.buyerName}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular">
                  {order.productName}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular">
                  {order.quantity}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular">
                  {order.unitPrice.toLocaleString()} تومان
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular">
                  {order.totalPrice.toLocaleString()} تومان
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-YekanBakh-Regular"
                    onClick={() => openModal(order.id)}
                  >
                      شماره پیگیری
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={tableHeaders.length}
                className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular"
              >
                موردی یافت نشد
              </td>
            </tr>
          )}
        </tbody>
      </table>
     </div>

    
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg w-80">
            <h2 className="text-lg font-YekanBakh-Regular mb-3">  شماره پیگیری</h2>
            <input
              type="text"
              className="w-full border px-3 py-2 mb-4 font-YekanBakh-Regular"
              placeholder="شماره پیگیری را وارد کنید"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 font-YekanBakh-Regular"
                onClick={closeModal}
              >
                انصراف
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 font-YekanBakh-Regular"
                onClick={handleTrackingSubmit}
              >
                ارسال
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}