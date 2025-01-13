import React, { useState } from "react";
import { MdFollowTheSigns } from "react-icons/md";
import useGet from "../../hooks/useGet";
import useUpdate from "../../hooks/useUpdate";
import { FaEye } from "react-icons/fa";
import OrdersModal from "../../components/Admin/OrdersModal";
import AddressModal from "../../components/Admin/AddressModel";
import { handleToast } from '../../utils/message'
export default function AdminOrders() {
  const { data: orders, isLoading } = useGet(['orders'], '/order')

  const [info, setInfo] = useState({
    address_id: 0,
    trackingNumber: 0,
    orders: [],
    address: null
  });

  const { mutateAsync, isPending } = useUpdate('/order', ['orders'])

  const [openModal, setOpenModal] = useState({
    ref_code: false,
    address: false,
    orders: false
  });

  const tableHeaders = [
    "شماره سفارش",
    "تاریخ",
    "نام خریدار",
    "قیمت کل محصول",
    "جزییات محصول",
    "آدرس",
    "وضعیت",
    "عملیات",
  ];

  const handleTrackingSubmit = async () => {
    try {
      await mutateAsync({ slug: info.address_id, body: { ref_code: info.trackingNumber, status:'ارسال شد' } })
      handleToast('success', 'کد پیگیری ثبت شد')
      setOpenModal(prev => ({ ...prev, ref_code: false }))
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <div className="md:p-4">
        <h1 className="text-lg md:text-xl font-YekanBakh-Regular  mb-5">صفحه سفارشات</h1>
       
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
            {orders?.data?.length > 0 ? (
              orders?.data?.map((order, index) => (
                <tr key={order.id}>
                  <td className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular">
                    {order.id}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular">
                    {new Intl.DateTimeFormat('fa-IR').format(new Date(order?.address?.createdAt))}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular">
                    {order.address.user.first_name + ' ' + order.address.user.last_name}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular">
                    {new Intl.NumberFormat('fa-IR').format(order?.total_price)} تومان
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular">
                    <FaEye
                      className="size-5 text-center cursor-pointer"
                      onClick={() => {
                        setOpenModal(prev => ({ ...prev, orders: true }))
                        setInfo(prev => ({ ...prev, orders: order?.orders }))
                      }}
                    />
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular ">
                    <FaEye
                      className="size-5 text-center cursor-pointer"
                      onClick={() => {
                        setOpenModal(prev => ({ ...prev, address: true }))
                        setInfo(prev => ({ ...prev, address: order?.address }))
                      }}
                    />
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular">
                    {order.address.statuse}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular">
                    <button
                      className=" p-2  text-2xl rounded "
                      onClick={() => {
                        setOpenModal(prev => ({ ...prev, ref_code: true }))
                        setInfo(prev => ({ ...prev, address_id: order?.address.id, trackingNumber: order?.address?.ref_code }))
                      }}
                    >
                      <MdFollowTheSigns />
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


      {openModal.ref_code && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg w-80">
            <h2 className="text-lg font-YekanBakh-Regular mb-3">شماره پیگیری</h2>
            <input
              type="number"
              className="w-full border px-3 py-2 mb-4 font-YekanBakh-Regular"
              placeholder="شماره پیگیری را وارد کنید"
              defaultValue={info?.trackingNumber}
              onChange={(e) => setInfo(prev => ({ ...prev, trackingNumber: e.target.value }))}
            />
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 font-YekanBakh-Regular"
                onClick={() => setOpenModal(prev => ({ ...prev, ref_code: false }))}
              >
                انصراف
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 font-YekanBakh-Regular"
                onClick={handleTrackingSubmit}
                disabled={isPending}
              >
                ارسال
              </button>
            </div>
          </div>
        </div>
      )}

      {openModal.orders &&
        <OrdersModal
          open={openModal.orders}
          setOpen={setOpenModal}
          orders={info?.orders}
        />
      }

      {openModal.address &&
        <AddressModal
          open={openModal.address}
          setOpen={setOpenModal}
          address={info?.address}
        />
      }
    </div>
  );
}