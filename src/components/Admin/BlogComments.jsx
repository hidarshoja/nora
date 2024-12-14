import { useState } from "react";
import { FcAnswers } from "react-icons/fc";
import { MdDelete } from "react-icons/md";

export default function BlogComments() {
  const [blogComments, setBlogComments] = useState([
    {
      id: 1,
      date: "1402/09/10",
      time: "16:45",
      userName: "مریم احمدی",
      contact: "maryam@gmail.com",
      title: "آیا می‌توانم راهنمایی بیشتری درباره مقاله دریافت کنم؟",
    },
    {
      id: 2,
      date: "1402/09/09",
      time: "12:30",
      userName: "حسین مرادی",
      contact: "hossein@example.com",
      title: "نقدی بر مقاله اخیر شما دارم",
    },
  ]);

  const [selectedBlogComment, setSelectedBlogComment] = useState(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  const handleReply = (comment) => {
    setSelectedBlogComment(comment);
    setIsBlogModalOpen(true);
  };

  const handleDelete = (id) => {
    setBlogComments(blogComments.filter((comment) => comment.id !== id));
  };

  const closeModal = () => {
    setSelectedBlogComment(null);
    setIsBlogModalOpen(false);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div className="p-4">
      <h2 className="text-sm lg:text-xl font-bold mb-4">کامنت بلاگ‌ها</h2>
      <div className="overflow-x-auto">

      <table className="table-auto w-full text-center border">
        <thead className="border-b bg-green-700 text-white">
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
          {blogComments.map((comment) => (
            <tr key={comment.id} className="hover:bg-gray-200 text-sm lg:text-md">
              <td className="py-2">{comment.id}</td>
              <td>{comment.date}</td>
              <td>{comment.time}</td>
              <td>{comment.userName}</td>
              <td>{comment.contact}</td>
              <td>{truncateText(comment.title, 5)}</td>
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

      {isBlogModalOpen && selectedBlogComment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-[300px] md:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">پاسخ به کامنت بلاگ</h2>
              <button
                className="text-red-500 text-lg"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-medium">
                {selectedBlogComment.title}
              </p>
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
                className="bg-green-500 text-white px-4 py-2 rounded"
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
