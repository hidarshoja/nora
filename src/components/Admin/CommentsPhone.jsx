import  { useState } from "react";
import { FcAnswers } from "react-icons/fc";
import { MdDelete } from "react-icons/md";

export default function CommentsPhone() {
  const [comments, setComments] = useState([
    {
      id: 1,
      date: "1402/09/12",
      time: "14:30",
      userName: "مهدی قاسمی",
      contact: "mehdi@example.com",
      title: "آیا امکان تماس فوری هست؟",
    },
    {
      id: 2,
      date: "1402/09/11",
      time: "10:15",
      userName: "زهرا رضوی",
      contact: "09351234567",
      title: "شماره تماس پشتیبانی شما چیست؟",
    },
  ]);

  const [selectedComment, setSelectedComment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReply = (comment) => {
    setSelectedComment(comment);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const closeModal = () => {
    setSelectedComment(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-sm lg:text-lg font-bold mb-4">کامنت های تماس با ما</h2>
    <div className="overflow-x-auto">
    <table className="table-auto w-full text-center border">
        <thead className="border-b bg-blue-700 text-white">
          <tr className="text-sm lg:text-md">
            <th className="py-3">آیدی</th>
            <th>تاریخ</th>
            <th>ساعت</th>
            <th>نام کاربر</th>
            <th>شماره تماس/ایمیل</th>
            <th>عنوان کامنت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id} className="hover:bg-gray-200 text-sm lg:text-md">
              <td className="py-2">{comment.id}</td>
              <td>{comment.date}</td>
              <td>{comment.time}</td>
              <td>{comment.userName}</td>
              <td>{comment.contact}</td>
              <td>{comment.title.split(" ").slice(0, 4).join(" ") + "..."}</td>
              <td>
                <button
                  className="text-2xl p-1 rounded mx-1"
                  onClick={() => handleReply(comment)}
                >
                   <FcAnswers />
                </button>
                <button
                  className="text-2xl p-1 rounded mx-1"
                  onClick={() => handleDelete(comment.id)}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-white p-6 rounded shadow-lg w-[300px] md:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">{selectedComment.title}</h2>
              <button
                className="text-red-500 text-lg"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
            <textarea
              className="w-full border p-2 rounded mb-4"
              rows="5"
              placeholder="متن پاسخ خود را اینجا بنویسید..."
            ></textarea>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded mx-2"
                onClick={closeModal}
              >
                انصراف
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={closeModal}
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

