import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import useGet from "../../hooks/useGet";
import useDelete from "../../hooks/useDelete";
import { handleToast } from "../../utils/message";
import usePost from "../../hooks/usePost";
import useUpdate from "../../hooks/useUpdate";
import { getFormData } from "../../utils/form-data";

export default function Questions() {
  const [form, setForm] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const { data: question, isLoading } = useGet(['question'], '/question')
  const { mutateAsync: mutateAsyncAdd } = usePost('/question', ['question'])
  const { mutateAsync: mutateAsyncDelete } = useDelete('/question', ['question'])
  const { mutateAsync: mutateAsyncUpdate, isPending } = useUpdate('/question', ['question'])



  const handleAddQuestion = async () => {
    try {
      await mutateAsyncAdd(form)
      handleToast('success', 'سوال با موفقیت اضافه شد')
      setForm({})
    } catch (error) {
      console.log(error)
    }
  };

  const handleDelete = async (id) => {
    try {
      await mutateAsyncDelete(id)
      handleToast('success', 'سوال با موفقیت حذف شد')
    } catch (error) {
      console.log(error)
    }
  };

  const handleEdit = async(e) => {
    e.preventDefault()
    const body = {
      ...getFormData(e.target)
    }
    try {
      await mutateAsyncUpdate({ slug: selectedQuestion.id, body })
      handleToast('success', 'سوال با موفقیت ویرایش شد')
      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  };



  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <div>

      <div className="mb-6">
        <h3 className="text-lg md:text-xl font-YekanBakh-Regular  mb-5">سوالات</h3>

        <input
          name="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="موضوع سوال"
          className="border p-2 w-full mb-2"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="پاسخ سوال"
          className="border p-2 w-full mb-2"
        ></textarea>
        <button onClick={handleAddQuestion} className="bg-blue-500 text-white px-4 py-2 rounded">
          ثبت سوال
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border">
          <thead className="border-b bg-blue-700 text-white">
            <tr className="text-sm md:text-md">
              <th>ردیف</th>
              <th>موضوع سوال</th>
              <th>پاسخ</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {question.data.length > 0 && question.data.map((q) => (
              <tr key={q.id} className="hover:bg-gray-200 text-sm md:text-md">
                <td>{q.id}</td>
                <td>{q.name}</td>
                <td>{q.description}</td>
                <td className={`${q.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>{q.status === 'active' ? 'فعال' : 'غیرفعال'}</td>
                <td className="flex items-center justify-center">
                  <button
                    className="px-2 py-1 rounded mx-1 "
                    onClick={() => {
                      setIsOpen(true)
                      setSelectedQuestion(q)
                    }}
                  >
                    <CiEdit className="size-5" />
                  </button>

                  <MdDelete className="text-red-500 cursor-pointer size-6" onClick={() => handleDelete(q.id)} />

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form onSubmit={handleEdit} className="bg-white p-6 rounded shadow-lg w-[300px] md:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">پاسخ به کامنت بلاگ</h2>
              <button
                className="text-red-500 text-lg"
                onClick={() => setIsOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="mb-4">
              <input
                name="name"
                defaultValue={selectedQuestion.name}
                placeholder="موضوع سوال"
                className="border p-2 w-full mb-2"
              />
            </div>
            <textarea
              className="w-full border p-2 rounded mb-4"
              rows="5"
              placeholder="متن پاسخ خود را اینجا بنویسید..."
              name="description"
              defaultValue={selectedQuestion.description}
            ></textarea>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded mx-2"
                onClick={() => setIsOpen(false)}
              >
                انصراف
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                disabled={isPending}
              >
                {isPending ? 'در حال ارسال' : "ارسال"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
