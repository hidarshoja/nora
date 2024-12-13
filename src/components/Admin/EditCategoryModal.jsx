import { useState } from "react";

const EditCategoryModal = ({ product, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [image, setImage] = useState(null);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Handle save button click
  const handleSave = () => {
    // Create an object with image and category value
    const productData = {
      ...editedProduct,
      image: image ? image.name : product.image, // If there's a new image, take the file name, otherwise keep the old image
    };

    // Log the object
    console.log("Saved Product:", productData);

    // Call the onSave function to pass the updated product
    onSave(productData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-xl mb-4">ویرایش دسته بندی</h2>

        {/* Image upload input */}
        <input
          type="file"
          name="image"
          onChange={handleImageUpload}
          className="block w-full p-2 mb-2 border"
        />

        {/* Category select input */}
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

        {/* Buttons */}
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded mx-2">
            لغو
          </button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
