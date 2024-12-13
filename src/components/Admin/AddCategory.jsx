import React, { useState } from "react";

const AddCategory = () => {
  const [newProduct, setNewProduct] = useState({
  
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    setNewProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = () => {
    console.log("New Product:", newProduct);
   
  };

  return (
    <div>
      <input
        type="file"
        name="image"
        onChange={handleImageUpload}
        className="block w-full p-2 mb-2 border"
      />
   
   

      
      <select
        name="category"
        value={newProduct.category}
        onChange={handleChange}
        className="block w-full p-2 mb-2 border"
      >
        <option value="steering">فرمان</option>
        <option value="suspension">جلوبندی</option>
        <option value="engine">موتور</option>
        <option value="electrical">برقی</option>
        <option value="standard">مکانیزم و استاندارد</option>
        <option value="decoration">تزئینی</option>
        <option value="gearbox">گیریبکس</option>
      </select>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        افزودن دسته بندی
      </button>
    </div>
  );
};

export default AddCategory;
