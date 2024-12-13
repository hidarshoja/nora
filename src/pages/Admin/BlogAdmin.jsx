import React, { useState } from "react";

export default function BlogAdmin() {
  const [blog, setBlog] = useState({
    image: null,
    title: "",
    category: "",
    description: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setBlog((prev) => ({ ...prev, image: file }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("New Blog:", blog);
    // This is where you can send the blog data to your API or backend
  };

  return (
    <div className="md:p-4">
      <h1 className="text-xl font-YekanBakh-Regular mb-5">صفحه وبلاگ</h1>
      <div>
        {/* Image upload */}
        <input
          type="file"
          name="image"
          onChange={handleImageUpload}
          className="block w-full p-2 mb-2 border"
        />

        {/* Blog title */}
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          placeholder="نام بلاگ"
          className="block w-full p-2 mb-2 border"
        />

        {/* Blog category */}
        <select
          name="category"
          value={blog.category}
          onChange={handleChange}
          className="block w-full p-2 mb-2 border"
        >
          <option value="" disabled>
            انتخاب دسته بندی
          </option>
          <option value="steering">فرمان</option>
          <option value="suspension">جلوبندی</option>
          <option value="engine">موتور</option>
          <option value="electrical">برقی</option>
          <option value="standard">مکانیزم و استاندارد</option>
          <option value="decoration">تزئینی</option>
          <option value="gearbox">گیریبکس</option>
        </select>

        {/* Blog description */}
        <textarea
          name="description"
          value={blog.description}
          onChange={handleChange}
          placeholder="توضیحات بلاگ"
          className="block w-full p-2 mb-2 border"
        />

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          افزودن بلاگ
        </button>
      </div>
    </div>
  );
}
