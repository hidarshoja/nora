

import React, { useState } from "react";
import ProductTable from "../../components/Admin/ProductTable";
import AddProduct from "../../components/Admin/AddProduct";

const Products = () => {
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
          لیست محصولات
        </button>
        <button
          onClick={() => setActiveTab("add")}
          className={`px-4 py-2 ${
            activeTab === "add" ? "border-b-2 border-blue-500 text-blue-500" : ""
          }`}
        >
          افزودن محصول
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "list" && <ProductTable />}
      {activeTab === "add" && <AddProduct />}
    </div>
  );
};

export default Products;

