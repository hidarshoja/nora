import { useState } from "react";
import { handleToast } from "../../utils/message";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../axios-client";
import { getFormData } from '../../utils/form-data'
import { transformedErrors } from "../../utils";
import useGet from "../../hooks/useGet";
import usePost from "../../hooks/usePost";


const AddProduct = () => {
  const [images, setImages] = useState([])
  const [newImages, setNewImages] = useState([])
  const [errors, setErrors] = useState(null)

  const { data: categories, isLoading } = useGet(['category'], '/category')
  const { mutateAsync, isPending } = usePost('/product', 'product')

  // ! select multy image
  const handleImageUpload = (e) => {
    const files = e.target.files[0];

    if (images?.length > 5) {
      handleToast("error", "حداکثر می‌توانید 5 عکس اضافه کنید.");
      return;
    }

    setImages((prev) => ([
      ...prev,
      files,
    ]));
  };

  // ! remove image
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ! change image to link
  const handleImageChange = () => {

    if (images?.length === 0) {
      handleToast("error", "لطفا حداقل یک عکس وارد کنید");
      return;
    }

    for (const image of images) {
      // return if file is not image
      if (!image.type.startsWith("image/")) {
        handleToast("error", "لطفا یک تصویر انتخاب کنید.");
        return;
      }

      if (image) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setNewImages(prev => ([...prev, reader.result]));
        };

        reader.readAsDataURL(image);
      }
    }
  };


  // ! add new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleImageChange()

    try {
      let body = {
        ...getFormData(e.target),
        images: newImages
      }

      if (Number(body?.price) < Number(body?.price_with_off)) {
        handleToast('error', 'قیمت تخفیف‌دار نباید بیشتر از قیمت اصلی باشد')
        return
      }

      console.log(body)
      await mutateAsync(body)

      handleToast('success', 'محصول با موفقیت اضافه شد')
      document.querySelector('form').reset();

      setInterval(() => {
        setImages([])
        setErrors(null)
      },2000)
      

    } catch (error) {
      console.log(error)
      if (error.response.data?.errors) setErrors(transformedErrors(error?.response?.data?.errors))
    }


  };

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="block w-full p-2 mb-2 border"
      />


      <div className="flex flex-wrap gap-2 mb-2">
        {images?.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt={`Uploaded ${index + 1}`}
              className="w-20 h-20 object-cover rounded border"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        name="name"
        placeholder="نام محصول"
        className="block w-full p-2 mb-2 border"
      />
      <p className="text-red-600 mb-3">{errors?.name ? errors?.name[0] : ""}</p>

      <div className="flex sm:flex-row flex-col gap-2">
        <div className="w-full sm:w-1/2">
          <input
            type="number"
            name="price"
            placeholder="قیمت اصلی"
            className="block w-full p-2 mb-2 border"
          />
          <p className="text-red-600 mb-3">{errors?.price ? errors?.price[0] : ""}</p>
        </div>
        <div className="w-full sm:w-1/2">
          <input
            type="number"
            name="price_with_off"
            placeholder="قیمت تخفیف‌دار"
            className="block w-full p-2 mb-2 border"
          />
          <p className="text-red-600 mb-3">{errors?.price_with_off ? errors?.price_with_off[0] : ""}</p>
        </div>

      </div>

      <div className="flex sm:flex-row flex-col gap-2">
        <div className="w-full sm:w-1/2">
          <select
            name="category_id"
            className="block w-full p-2 mb-2 border"
          >
            {categories?.data && categories?.data.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-1/2">
          <input
            type="text"
            name="machine"
            placeholder="نوع خودرو"
            className="block w-full p-2 mb-2 border"
          />
          <p className="text-red-600 mb-3">{errors?.machine ? errors?.machine[0] : ""}</p>
        </div>
      </div>


      <div className="flex sm:flex-row flex-col gap-2">
        <div className="w-full sm:w-1/2">
          <input
            type="text"
            name="brand"
            placeholder="برند محصول"
            className="block w-full p-2 mb-2 border"
          />
          <p className="text-red-600 mb-3">{errors?.brand ? errors?.brand[0] : ""}</p>
        </div>
        <div className="w-full sm:w-1/2">
          <input
            type="text"
            name="material"
            placeholder="جنس محصول"
            className="block w-full p-2 mb-2 border"
          />
          <p className="text-red-600 mb-3">{errors?.material ? errors?.material[0] : ""}</p>
        </div>
      </div>



      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        disabled={isPending}
      >
        {isPending ? 'در حال اضافه کردن...' : 'اضافه کردن'}
      </button>
    </form>
  );
};

export default AddProduct;