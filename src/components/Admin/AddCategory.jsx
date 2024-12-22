import React, { useState } from "react";
import  axiosClient  from "../../axios-client";
import { QueryClient, useMutation } from '@tanstack/react-query'
import { handleToast } from "../../utils/message";
import { transformedErrors } from "../../utils";
import usePost from "../../hooks/usePost";

const AddCategory = () => {
  const [newProduct, setNewProduct] = useState(null);
  const [error, setError] = useState(null);
  const { mutateAsync, isPending} = usePost('/category', 'category')

  // ! change image to link
	const handleImageChange = (e) => {
		const file = e.target.files[0];
    
    // return if file is not image
    if (!file.type.startsWith("image/")) {
      handleToast("error", "لطفا یک تصویر انتخاب کنید.");
      document.querySelector('#images').reset();
      return;
    }

		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewProduct({ ...newProduct, image_url: reader.result });
			};

			reader.readAsDataURL(file); // base64
		}
	};

  // ! add new category

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError(false)
    try {
      const response = await mutateAsync(newProduct)
      handleToast('success', response.data.message)

      document.querySelector('form').reset();

    } catch (error) {
      console.log(error)
      setError(transformedErrors(error?.response?.data?.errors))
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
      <p className="text-red-600 mb-3">{error?.name ? error?.name[0] : ""}</p>


      <input
        type="file"
        name="image_url"
        onChange={handleImageChange}
        id="images"
        className="block w-full p-2 mb-2 border"
      />
      <p className="text-red-600 mb-3">{error?.image_url ? error?.image_url[0] : ""}</p>

      <button
        onClick={handleSubmit}
        className={`bg-green-500 text-white px-4 py-2 rounded disabled:bg-green-300`}
        disabled={isPending}
      >
        {isPending ? 'در حال ارسال...' : 'افزودن دسته بندی'}
      </button>
    </form>
  );
};

export default AddCategory;
