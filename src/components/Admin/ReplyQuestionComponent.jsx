import { useState } from "react";
import { FcAnswers } from "react-icons/fc";

export default function ReplyQuestionComponent() {
    const [comments, setComments] = useState([
      {
        id: 1,
        userName: "کاربر ۱",
        contact: "email@example.com",
        title: "سوال نمونه",
      },
    ]);
  
    const [selectedComment, setSelectedComment] = useState(null);
    const [reply, setReply] = useState("");
  
    const handleReply = (comment) => {
      setSelectedComment(comment);
    };
  
    const handleSendReply = () => {
      console.log(`Reply sent: ${reply}`);
      setSelectedComment(null);
      setReply("");
    };
  
    return (
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border">
          <thead className="border-b bg-blue-700 text-white">
            <tr>
              <th>آیدی</th>
              <th>نام کاربر</th>
              <th>شماره تماس/ایمیل</th>
              <th>عنوان سوال</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id} className="hover:bg-gray-200 text-sm">
                <td>{comment.id}</td>
                <td>{comment.userName}</td>
                <td>{comment.contact}</td>
                <td>{comment.title}</td>
                <td>
                  <button
                    className="text-2xl p-1 rounded mx-1"
                    onClick={() => handleReply(comment)}
                  >
                     <FcAnswers />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {selectedComment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
              <h2 className="text-lg font-bold mb-4">پاسخ به: {selectedComment.title}</h2>
              <textarea
                className="w-full border p-2 rounded mb-4"
                rows="5"
                placeholder="متن پاسخ خود را اینجا بنویسید..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              ></textarea>
              <div className="flex justify-end">
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded mx-2"
                  onClick={() => setSelectedComment(null)}
                >
                  انصراف
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleSendReply}
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