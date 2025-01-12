import { useState } from "react";
import { FcAnswers } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import useGet from "../../hooks/useGet";
import usePost from "../../hooks/usePost";
import { handleToast } from "../../utils/message";
import { GiStopSign } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import useUpdate from "../../hooks/useUpdate";

export default function BlogComments() {
  const { data: comments, isLoading } = useGet(['comment', 'blog'], '/comment')
  const { mutateAsync, isPending } = usePost('/comment/reply', ['comment', 'blog'])
  const { mutateAsync:mutateAsyncStatus } = useUpdate('/comment', ['comment', 'blog'])

  const [selectedBlogComment, setSelectedBlogComment] = useState(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [reply, setReply] = useState('');

  const handleReply = (comment) => {
    setSelectedBlogComment(comment);
    setIsBlogModalOpen(true);
  };

  const handleStatus = async(id,state) => {
    const body = {
      status: state === 'inactive' ? 'published' : 'inactive'
    }
    try {
      const res = await mutateAsyncStatus({ slug: id, body })
      handleToast('success', 'وضعیت کامنت با موفقیت تغییر کرد')
    } catch (error) {
      console.log(error)
    }
  };

  const closeModal = () => {
    setSelectedBlogComment(null);
    setIsBlogModalOpen(false);
  };

  const handleSubmitReply = async () => {
    const body = {
      comment_id: selectedBlogComment.id,
      body: reply
    }
    try {
      const response = await mutateAsync(body)
      handleToast('success', 'پاسخ کامنت انجام شد')
      setSelectedBlogComment(null);
      setIsBlogModalOpen(false);
    } catch (error) {
      console.log(error)
    }
  }


  if (isLoading) {
    <div>Loading ...</div>
  }

  return (
    <div className="p-4">
      <h2 className="text-sm lg:text-xl font-bold mb-4">کامنت بلاگ‌ها</h2>
      <div className="overflow-x-auto">

        <table className="table-auto w-full text-center border">
          <thead className="border-b bg-green-700 text-white">
            <tr className="text-sm lg:text-md">
              <th className="py-3">آیدی</th>
              <th>تاریخ</th>
              <th>نام کاربر</th>
              <th>عنوان بلاگ</th>
              <th>عنوان کامنت</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {comments?.data?.map((comment) => (
              <tr key={comment.id} className="hover:bg-gray-200 text-sm lg:text-md">
                <td className="py-2">{comment.id}</td>
                <td>{new Intl.DateTimeFormat('fa-IR').format(new Date(comment?.createdAt))}</td>
                <td>{comment.username}</td>
                <td>{comment.blogs.name}</td>
                <td>{(comment.body).slice(0, 12) + '...'}</td>
                <td className={`${comment?.status === 'published' ? 'text-green-500' : 'text-orange-400'}`}>{comment?.status === 'published' ? 'منتشر شده' : 'انتظار'}</td>
                <td className="flex items-center justify-center">
                  <button
                    className="text-2xl p-1 rounded mx-1"
                    onClick={() => handleReply(comment)}
                  >
                    <FcAnswers />
                  </button>
                  {comment?.status === 'published' ?
                    <GiStopSign className="text-red-500 cursor-pointer size-6" onClick={() => handleStatus(comment.id, 'published')} /> :
                    <TiTick className="text-green-500 cursor-pointer size-6" onClick={() => handleStatus(comment.id, 'inactive')} />
                  }
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
                {selectedBlogComment.body}
              </p>
            </div>
            <textarea
              className="w-full border p-2 rounded mb-4"
              rows="5"
              placeholder="متن پاسخ خود را اینجا بنویسید..."
              onChange={(e) => setReply(e.target.value)}
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
                onClick={handleSubmitReply}
                disabled={isPending}
              >
                {isPending ? 'در حال ارسال' : "ارسال"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
