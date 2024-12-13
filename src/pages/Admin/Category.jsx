
import  { useState } from "react";
import CategoryTable from "../../components/Admin/CategoryTable";
import AddCategory from "../../components/Admin/AddCategory";

export default function Category() {
    const [activeTab, setActiveTab] = useState("list");

    return (
      <div className="md:p-4">
         <h1 className="text-xl font-YekanBakh-Regular  mb-5">صفحه محصولات</h1>
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-4 py-2 ${
              activeTab === "list" ? "border-b-2 border-blue-500 text-blue-500" : ""
            }`}
          >
            لیست دسته بندی ها
          </button>
          <button
            onClick={() => setActiveTab("add")}
            className={`px-4 py-2 ${
              activeTab === "add" ? "border-b-2 border-blue-500 text-blue-500" : ""
            }`}
          >
            افزودن دسته بندی
          </button>
        </div>
  
        
        {activeTab === "list" && <CategoryTable />}
        {activeTab === "add" && <AddCategory />}
      </div>
    );}
