import { useState } from 'react'
import AddQuestionComponent from '../../components/Admin/AddQuestionComponent';
import ReplyQuestionComponent from '../../components/Admin/ReplyQuestionComponent';

export default function Questions() {

    const [activeTab, setActiveTab] = useState("list");
  return (
    <div className='md:p-4'>
                <h1 className="text-xl font-YekanBakh-Regular  mb-5">صفحه سوالات</h1>
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab("list")}
          className={`px-4 py-2 ${
            activeTab === "list" ? "border-b-2 border-blue-500 text-blue-500" : ""
          }`}
        >
           ایجاد سوال
        </button>
        <button
          onClick={() => setActiveTab("add")}
          className={`px-4 py-2 ${
            activeTab === "add" ? "border-b-2 border-blue-500 text-blue-500" : ""
          }`}
        >
           پاسخ سوالات
        </button>
      </div>
      {activeTab === "list" && <AddQuestionComponent />}
      {activeTab === "add" && <ReplyQuestionComponent />}
    </div>
  )
}
