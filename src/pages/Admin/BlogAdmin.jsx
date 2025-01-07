import React, { useState } from "react";
import AddBlog from "../../components/Admin/AddBlog";
import BlogTable from "../../components/Admin/BlogTable";

export default function BlogAdmin() {
  const [activeTab, setActiveTab] = useState("list");


  return (
    <div className="md:p-4">
      <h1 className="text-xl font-YekanBakh-Regular mb-5">صفحه وبلاگ</h1>
      <div className='md:p-4'>
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-4 py-2 ${activeTab === "list" ? "border-b-2 border-blue-500 text-blue-500" : ""
              }`}
          >
             وبلاگ ها
          </button>
          <button
            onClick={() => setActiveTab("add")}
            className={`px-4 py-2 ${activeTab === "add" ? "border-b-2 border-blue-500 text-blue-500" : ""
              }`}
          >
           وبلاگ جدید
          </button>
        </div>
        {activeTab === "list" && <BlogTable />}
        {activeTab === "add" && <AddBlog />}
      </div>
     
    </div>
  );
}
