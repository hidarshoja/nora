import React, { useState } from "react";

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    originalPrice: "",
    discountedPrice: "",
    prand: "",
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
    // ارسال داده به سرور...
  };

  return (
    <div>
      <input
        type="file"
        name="image"
        onChange={handleImageUpload}
        className="block w-full p-2 mb-2 border"
      />
      <input
        type="text"
        name="title"
        value={newProduct.title}
        onChange={handleChange}
        placeholder="نام محصول"
        className="block w-full p-2 mb-2 border"
      />
      <input
        type="number"
        name="originalPrice"
        value={newProduct.originalPrice}
        onChange={handleChange}
        placeholder="قیمت اصلی"
        className="block w-full p-2 mb-2 border"
      />
      <input
        type="number"
        name="discountedPrice"
        value={newProduct.discountedPrice}
        onChange={handleChange}
        placeholder="قیمت تخفیف‌دار"
        className="block w-full p-2 mb-2 border"
      />

      <select
        name="prand"
        value={newProduct.prand}
        onChange={handleChange}
        className="block w-full p-2 mb-2 border"
      >
        <option value="iranKhodo">ایران خودرو</option>
        <option value="saipa">سایپا</option>
        <option value="other">متفرقه</option>
        <option value="chinese">وارداتی</option>
      </select>
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
        افزودن محصول
      </button>
    </div>
  );
};

export default AddProduct;
