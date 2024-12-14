import  { useState } from "react";
import { FcAnswers } from "react-icons/fc";

export default function CommentUser() {
  const [comments, setComments] = useState([
    {
      id: 1,
      date: "1402/09/12",
      time: "14:30",
      title: "سوال در مورد خرید عمده",
      category: "فروش",
    },
    {
      id: 2,
      date: "1402/09/11",
      time: "10:15",
      title: "در خواست اطلاعات بیشتر",
      category: "پشتیبانی",
    },
    {
      id: 3,
      date: "1402/09/10",
      time: "18:45",
      title: "مشکل در فرآیند خرید",
      category: "مشکلات فنی",
    },
  ]);

  const [selectedComment, setSelectedComment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReply = (comment) => {
    setSelectedComment(comment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedComment(null);
    setIsModalOpen(false);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div className="p-2">
      <div className="p-3 bg-stone-200 rounded-xl my-4">
        <h1 className="text-sm font-YekanBakh-Bold">کامنت ها</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border">
          <thead className="bg-blue-700 text-white">
            <tr className="text-sm lg:text-md">
              <th className="py-3">آیدی</th>
              <th>تاریخ</th>
              <th>ساعت</th>
              <th>موضوع کامنت</th>
              <th>دسته‌بندی</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id} className="hover:bg-gray-100 border-b text-sm lg:text-md">
                <td className="py-2">{comment.id}</td>
                <td>{comment.date}</td>
                <td>{comment.time}</td>
                <td>
                {truncateText(comment.title, 3)}
                </td>
                <td>{comment.category}</td>
                <td>
                  <button
                    className="text-blue-600 p-2"
                    onClick={() => handleReply(comment)}
                  >
                    <FcAnswers />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedComment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[300px] md:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                پاسخ به: {selectedComment.title}
              </h3>
              <button className="text-red-500 text-xl" onClick={closeModal}>
                &times;
              </button>
            </div>
            <textarea
              className="w-full border p-2 rounded mb-4"
              rows="4"
              placeholder="پاسخ خود را بنویسید..."
            ></textarea>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded ml-2"
                onClick={closeModal}
              >
                انصراف
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                ارسال
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
