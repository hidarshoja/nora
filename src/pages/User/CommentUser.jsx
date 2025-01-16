import { useState, Fragment } from "react";
import { FcAnswers } from "react-icons/fc";
import useGet from "../../hooks/useGet";
import { useAtomValue } from "jotai";
import { userProfile } from "../../stores/store";

const CommentTable = ({ comments, onSelectComment }) => (
  <div className="overflow-x-auto">
    <table className="table-auto w-full text-center border">
      <thead className="bg-blue-700 text-white">
        <tr className="text-sm lg:text-md">
          <th className="py-3">ردیف</th>
          <th>تاریخ</th>
          <th>محصول</th>
          <th>امتیاز شما</th>
          <th>مشاهده</th>
          <th>وضعیت</th>
        </tr>
      </thead>
      <tbody>
        {comments.map((comment) => (
          <tr key={comment.id} className="hover:bg-gray-100 border-b text-sm lg:text-md">
            <td className="py-2">{comment.id}</td>
            <td>{new Intl.DateTimeFormat("fa-IR").format(new Date(comment.createdAt))}</td>
            <td>{comment.product.name}</td>
            <td>{comment.rate}</td>
            <td>
              <button
                className="text-blue-600 p-2"
                onClick={() => onSelectComment(comment.body)}
              >
                <FcAnswers />
              </button>
            </td>
            <td>
              <p className={comment.status === 'published' ? 'text-green-600' : 'text-red-500'}>
                {comment.status === 'published' ? 'منتشر شده' : 'در انتظار'}
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Modal = ({ isOpen, content, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[300px] md:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <button className="text-red-500 text-xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <p className="text-gray-700 text-sm">{content}</p>
        <div className="flex justify-end">
          <button className="bg-gray-300 text-black px-4 py-2 rounded ml-2" onClick={onClose}>
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CommentUser() {
  const user = useAtomValue(userProfile);
  const { data, isLoading } = useGet([`product-comment-${user?.id}`], `/product-comment/${user?.id}`);

  const [selectedComment, setSelectedComment] = useState(null);

  const handleSelectComment = (commentBody) => setSelectedComment(commentBody);
  const handleCloseModal = () => setSelectedComment(null);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="p-2">
      <header className="p-3 bg-stone-200 rounded-xl my-4">
        <h1 className="text-sm font-YekanBakh-Bold">کامنت‌ها</h1>
      </header>
      <CommentTable comments={data?.data || []} onSelectComment={handleSelectComment} />
      <Modal
        isOpen={!!selectedComment}
        content={selectedComment}
        onClose={handleCloseModal}
      />
    </div>
  );
}
