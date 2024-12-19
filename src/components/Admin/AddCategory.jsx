import React, { useState } from "react";
import  axiosClient  from "../../axios-client";

const AddCategory = () => {
  const [newProduct, setNewProduct] = useState(null);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewProduct({ ...newProduct, image_url: reader.result });
			};

			reader.readAsDataURL(file); // base64
		}
	};

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await axiosClient.post('/category', newProduct)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <form encType="multipart/form-data">
      <input
        type="text"
        name="name"
        onChange={(e)=>setNewProduct(prev => ({...prev, name: e.target.value}))}
        className="block w-full p-2 mb-2 border"
        placeholder="نام دسته بندی"
      />
      <input
        type="file"
        name="image_url"
        onChange={handleImageChange}
        className="block w-full p-2 mb-2 border"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        افزودن دسته بندی
      </button>
    </form>
  );
};

export default AddCategory;
