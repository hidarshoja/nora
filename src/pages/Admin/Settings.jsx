import { useState } from 'react'
import ContactSettings from "../../components/Admin/ContactSettings"
import OtherSettings from '../../components/Admin/OtherSettings';

export default function Settings() {
      const [activeTab, setActiveTab] = useState("list");
  return (
    <div className='md:p-4'>
              <h1 className="text-xl font-YekanBakh-Regular  mb-5">صفحه تنظیمات</h1>
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab("list")}
          className={`px-4 py-2 ${
            activeTab === "list" ? "border-b-2 border-blue-500 text-blue-500" : ""
          }`}
        >
           تغییر راه ارتباطی
        </button>
        <button
          onClick={() => setActiveTab("add")}
          className={`px-4 py-2 ${
            activeTab === "add" ? "border-b-2 border-blue-500 text-blue-500" : ""
          }`}
        >
          سایر تنظیمات
        </button>
      </div>
      {activeTab === "list" ? <ContactSettings /> : <OtherSettings />}
    </div>
  )
}
