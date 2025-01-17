import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import useGet from './../../hooks/useGet';
import useDelete from './../../hooks/useDelete';
import { handleToast } from './../../utils/message';
import { getFormData } from './../../utils/form-data';
import usePost from "../../hooks/usePost";
import { transformedErrors } from "../../utils";
import useUpdate from './../../hooks/useUpdate';

export default function Notifications() {
  const { data: notification, isLoading } = useGet(['notification'], '/notification')
  const { mutateAsync: mutateAsyncDelete } = useDelete('/notification', ['notification'])
  const { mutateAsync: mutateAsyncAdd } = usePost('/notification', ['notification'])
  const { mutateAsync: mutateAsyncUpdate } = useUpdate('/notification', ['notification'])



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new DateObject())

  // ! Add new notification
  const handleAddNotification = async(e) => {
    e.preventDefault()
    const persianToEnglishDigits = (str) => str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    const expired_at = persianToEnglishDigits(date.format('YYYY-MM-DD'));

    const body = {
      ...getFormData(e.target),
      expired_at
    }

    try {
      await mutateAsyncAdd(body)
      handleToast('success', 'اطلاعیه با موفقیت اضافه شد')
      setIsModalOpen(false)
    } catch (error) {
      console.log(error)
      setError(transformedErrors(error?.response?.data?.errors))
    }
  };

  // ! update a notification
  const handleUpdateNotification = async(e) => {
    e.preventDefault()
    const persianToEnglishDigits = (str) => str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    const expired_at = persianToEnglishDigits(date.format('YYYY-MM-DD'));

    const body = {
      ...getFormData(e.target),
      expired_at
    }

    try {
      await mutateAsyncUpdate({slug: selectedNotif.id, body})
      handleToast('success', 'اطلاعیه با موفقیت ویرایش شد')
      setIsModalOpen(false)
    } catch (error) {
      console.log(error)
      setError(transformedErrors(error?.response?.data?.errors))
    }
  };


  // ! delete a notification
  const handleDeleteNotification = async (id) => {
    try {
      await mutateAsyncDelete(id)
      handleToast('success', 'اطلاعیه با موفقیت حذف شد')
    } catch (error) {
      console.log(error)
    }
  };


  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">اطلاعیه‌ها</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setIsEditMode(false);
          setIsModalOpen(true);
        }}
      >
        اضافه کردن اطلاعیه
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form onSubmit={isEditMode ? handleUpdateNotification : handleAddNotification} className="bg-white p-6 rounded shadow-lg w-[300px] md:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                {isEditMode ? "ویرایش اطلاعیه" : "اضافه کردن اطلاعیه"}
              </h3>
              <button className="text-red-500 text-xl" onClick={() => {
                setIsModalOpen(false);
                setIsEditMode(false);
              }}>
                &times;
              </button>
            </div>
            <input
              type="text"
              placeholder="موضوع اطلاعیه"
              name="title"
              defaultValue={isEditMode ? selectedNotif?.title : ''}
              className="w-full border p-2 rounded mb-4"
            />
            <DatePicker
              name="expired_at"
              format='YYYY-MM-DD'
              inputMode="none"
              className="rmdp-mobile"
              inputClass='w-full p-2 border rounded my-4 border-gray-300'
              calendar={persian}
              locale={persian_fa}
              onChange={(e) => setDate(e)}
              value={isEditMode ? selectedNotif?.expired_at : date}
            />

            <textarea
              rows="4"
              placeholder="متن اطلاعیه"
              name="description"
              defaultValue={isEditMode ? selectedNotif?.description : ''}
              className="w-full border p-2 rounded mb-4"
            />

            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                
              >
                {isEditMode ? "ویرایش" : "ثبت"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border">
          <thead className="border-b bg-blue-700 text-white">
            <tr>
              <th className="py-3">آیدی</th>
              <th>تاریخ</th>
              <th> موضوع</th>
              <th>مدت اطلاعیه</th>
              <th>متن اطلاعیه</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {notification?.data?.map((notification) => (
              <tr
                key={notification.id}
                className="hover:bg-gray-200 text-sm lg:text-md"
              >
                <td className="py-2">{notification.id}</td>
                <td>{new Intl.DateTimeFormat("fa-IR").format(new Date(notification.createdAt))}</td>
                <td>{notification.title}</td>
                <td>{notification.expired_at}</td>
                <td>
                  {(notification.description)}
                </td>
                <td className="flex justify-center space-x-2">
                  <button
                    className="text-blue-500 text-2xl"
                    onClick={() => {
                      setIsEditMode(true);
                      setIsModalOpen(true);
                      setSelectedNotif(notification);
                    }}
                  >
                    <MdEdit />
                  </button>
                  <button
                    className="text-red-500 text-2xl"
                    onClick={() => handleDeleteNotification(notification.id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}