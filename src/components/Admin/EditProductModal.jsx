import React, { useState } from "react";

const EditProductModal = ({ product, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedProduct);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-[300px] md:w-1/2">
        <h2 className="text-xl mb-4">ویرایش محصول</h2>
        <input
          type="text"
          name="title"
          value={editedProduct.title}
          onChange={handleChange}
          placeholder="نام محصول"
          className="block w-full p-2 mb-2 border"
        />
        <input
          type="number"
          name="originalPrice"
          value={editedProduct.originalPrice}
          onChange={handleChange}
          placeholder="قیمت اصلی"
          className="block w-full p-2 mb-2 border"
        />
        <input
          type="number"
          name="discountedPrice"
          value={editedProduct.discountedPrice}
          onChange={handleChange}
          placeholder="قیمت تخفیف‌دار"
          className="block w-full p-2 mb-2 border"
        />
        <select
          name="prand"
          value={editedProduct.prand}
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
          value={editedProduct.category}
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
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded mx-2"
          >
            لغو
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
