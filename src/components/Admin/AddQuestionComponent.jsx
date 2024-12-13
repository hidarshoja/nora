import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

export default function AddQuestionComponent() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      topic: "نحوه ثبت نام",
      author: "اصغر اصغری",
      question: "نحوه ثبت نام چگونه است؟",
      answer: "نحوه ثبت نام در سایت پس از اینکه فرم ثبت نام را پر کردید اطلاعات شما برای ما ذخیره و ثبت نام شما تایید می شود.",
    },
    {
      id: 2,
      topic: "نحوه خرید",
      author: "محمد اصغری",
      question: "نحوه خرید چگونه است؟",
      answer: "نحوه خرید در سایت پس از اینکه فرم ثبت نام را پر کردید اطلاعات شما برای ما ذخیره و ثبت نام شما تایید می شود و شما می توانید خرید انجام بدهید.",
    },
  ]);

  const [form, setForm] = useState({
    topic: "",
    author: "",
    question: "",
    answer: "",
  });

  const [expandedItem, setExpandedItem] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: Date.now(), ...form }]);
    setForm({ topic: "", author: "", question: "", answer: "" });
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleEdit = (id) => {
    const questionToEdit = questions.find((q) => q.id === id);
    setForm(questionToEdit);
    handleDelete(id);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? `${words.slice(0, wordLimit).join(" ")} ...`
      : text;
  };

  const toggleExpandedItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div>
      <div className="mb-6">
        <input
          name="topic"
          value={form.topic}
          onChange={handleChange}
          placeholder="موضوع"
          className="border p-2 w-full mb-2"
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="نام طراح سوال"
          className="border p-2 w-full mb-2"
        />
        <input
          name="question"
          value={form.question}
          onChange={handleChange}
          placeholder="موضوع سوال"
          className="border p-2 w-full mb-2"
        />
        <textarea
          name="answer"
          value={form.answer}
          onChange={handleChange}
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
            <tr>
              <th>آیدی</th>
              <th>موضوع</th>
              <th>نام طراح</th>
              <th>موضوع سوال</th>
              <th>پاسخ</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id} className="hover:bg-gray-200 text-sm">
                <td>{q.id}</td>
                <td>{q.topic}</td>
                <td>{q.author}</td>
                <td>
                  <span onClick={() => toggleExpandedItem(q.id)} className="cursor-pointer">
                    {expandedItem === q.id ? q.question : truncateText(q.question, 3)}
                  </span>
                </td>
                <td>
                  <span onClick={() => toggleExpandedItem(q.id)} className="cursor-pointer">
                    {expandedItem === q.id ? q.answer : truncateText(q.answer, 3)}
                  </span>
                </td>
                <td>
                  <button
                    className="px-2 py-1 rounded mx-1"
                    onClick={() => handleEdit(q.id)}
                  >
                    <CiEdit />
                  </button>
                  <button
                    className=" px-2 py-1 rounded mx-1"
                    onClick={() => handleDelete(q.id)}
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
