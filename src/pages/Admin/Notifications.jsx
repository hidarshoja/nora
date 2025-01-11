import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import DatePicker, { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      priority: "تخفیف ۵٪",
      duration: "5 روز",
      text: "از امروز به مدت 5 روز لنت ها با تخفیف  است.",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    },
    {
      id: 2,
      priority: "تخفیف ۱۲٪",
      duration: "3 روز",
      text: "این اطلاعیه به مدت 3 روز معتبر است و دیسک ها تخفیف دارند.",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [newNotification, setNewNotification] = useState({
    priority: "",
    duration: "",
    text: "",
  });

  const handleOpenModal = (isEdit = false, notification = {}) => {
    setIsEditMode(isEdit);
    setIsModalOpen(true);
    if (isEdit) {
      setCurrentEditId(notification.id);
      setNewNotification({
        priority: notification.priority,
        duration: notification.duration,
        text: notification.text,
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewNotification({ priority: "", duration: "", text: "" });
    setIsEditMode(false);
    setCurrentEditId(null);
  };

  const handleAddNotification = () => {
    const newId = notifications.length
      ? notifications[notifications.length - 1].id + 1
      : 1;
    setNotifications([
      ...notifications,
      {
        id: newId,
        ...newNotification,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      },
    ]);
    handleCloseModal();
  };

  const handleUpdateNotification = () => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === currentEditId
          ? {
            ...notification,
            ...newNotification,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
          }
          : notification
      )
    );
    handleCloseModal();
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">اطلاعیه‌ها</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => handleOpenModal(false)}
      >
        اضافه کردن اطلاعیه
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-[300px] md:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                {isEditMode ? "ویرایش اطلاعیه" : "اضافه کردن اطلاعیه"}
              </h3>
              <button className="text-red-500 text-xl" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <input
              type="text"
              placeholder="موضوع اطلاعیه"
              value={newNotification.priority}
              onChange={(e) =>
                setNewNotification({ ...newNotification, priority: e.target.value })
              }
              className="w-full border p-2 rounded mb-4"
            />
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              inputClass="w-full border p-2 rounded mb-4"
              placeholder="تاریخ اطلاعیه"
              onChange={(e) => setNewNotification({ ...newNotification, date: e.toLocaleDateString() })}
            />


            <textarea
              rows="4"
              placeholder="متن اطلاعیه"
              value={newNotification.text}
              onChange={(e) =>
                setNewNotification({ ...newNotification, text: e.target.value })
              }
              className="w-full border p-2 rounded mb-4"
            ></textarea>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={isEditMode ? handleUpdateNotification : handleAddNotification}
              >
                {isEditMode ? "ویرایش" : "ثبت"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border">
          <thead className="border-b bg-blue-700 text-white">
            <tr>
              <th className="py-3">آیدی</th>
              <th> موضوع</th>
              <th>مدت اطلاعیه</th>
              <th>متن اطلاعیه</th>
              <th>تاریخ</th>
              <th>ساعت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr
                key={notification.id}
                className="hover:bg-gray-200 text-sm lg:text-md"
              >
                <td className="py-2">{notification.id}</td>
                <td>{notification.priority}</td>
                <td>{notification.duration}</td>
                <td>
                  {truncateText(notification.text, 5)}
                </td>
                <td>{notification.date}</td>
                <td>{notification.time}</td>
                <td className="flex justify-center space-x-2">
                  <button
                    className="text-blue-500 text-2xl"
                    onClick={() => handleOpenModal(true, notification)}
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
