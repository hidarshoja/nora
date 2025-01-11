import { useState } from "react";
import { handleToast } from "../../utils/message";
import { getFormData } from '../../utils/form-data'
import { transformedErrors } from "../../utils";
import useGet from "../../hooks/useGet";
import usePost from "../../hooks/usePost";
import { handleImageChange } from "../../utils/image-lib";
import { carManufacturers, carPartsMaterials, iranianCars } from "../../constant/cars-data";


const AddProduct = () => {
  const [images, setImages] = useState([])
  const [errors, setErrors] = useState(null)
  const [suggestion, setSuggestion] = useState('inactive')

  const { data: categories, isLoading } = useGet(['category'], '/category')
  const { mutateAsync, isPending } = usePost('/product', ['product'])

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

  // ! add new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const hashedImaged = await handleImageChange(images)

    if (hashedImaged.length === 0) return

    try {
      let body = {
        ...getFormData(e.target),
        images: hashedImaged,
        suggestion
      }

      if (Number(body?.price) < Number(body?.price_with_off)) {
        handleToast('error', 'قیمت تخفیف‌دار نباید بیشتر از قیمت اصلی باشد')
        return
      }

      await mutateAsync(body)

      handleToast('success', 'محصول با موفقیت اضافه شد')
      document.querySelector('form').reset();

      setInterval(() => {
        // setImages([])
        setErrors(null)
      }, 2000)


    } catch (error) {
      console.log(error)
      if (error.response.data?.errors) setErrors(transformedErrors(error?.response?.data?.errors))
    } finally {
      // if (!isError) {
      //   setImages([])
      //   setErrors(null)
      // }
    }


  };

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        name="images"
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
      <div className="flex sm:flex-row flex-col gap-2">
        <div className="w-full sm:w-1/2">
          <input
            type="text"
            name="name"
            placeholder="نام محصول"
            className="block w-full p-2 mb-2 border"
          />
          <p className="text-red-600 mb-3 text-sm">{errors?.name ? errors?.name[0] : ""}</p>
        </div>

        <div className="w-full sm:w-1/2">
          <input
            type="number"
            name="amount"
            placeholder="تعداد محصول موجود"
            className="block w-full p-2 mb-2 border"
          />
          <p className="text-red-600 mb-3 text-sm">{errors?.amount ? errors?.amount[0] : ""}</p>
        </div>
      </div>


      <div className="flex sm:flex-row flex-col gap-2">
        <div className="w-full sm:w-1/2">
          <input
            type="number"
            name="price"
            placeholder="قیمت اصلی"
            className="block w-full p-2 mb-2 border"
          />
          <p className="text-red-600 mb-3 text-sm">{errors?.price ? errors?.price[0] : ""}</p>
        </div>
        <div className="w-full sm:w-1/2">
          <input
            type="number"
            name="price_with_off"
            placeholder="قیمت تخفیف‌دار"
            className="block w-full p-2 mb-2 border"
          />
          <p className="text-red-600 mb-3 text-sm">{errors?.price_with_off ? errors?.price_with_off[0] : ""}</p>
        </div>

      </div>

      <div className="flex sm:flex-row flex-col gap-2">
        <div className="w-full sm:w-1/2">
          <select
            name="category_id"
            className="block w-full p-2 mb-2 border text-gray-600"
          >
            <option value="">انتخاب دسته بندی</option>
            {categories?.data && categories?.data.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <p className="text-red-600 mb-3 text-sm">{errors?.category_id ? errors?.category_id[0] : ""}</p>
        </div>

        <div className="w-full sm:w-1/2">
          <select
            name="machine"
            className="block w-full p-2 mb-2 border text-gray-600"
          >
            <option value="">انتخاب نوع خودرو</option>
            {iranianCars && iranianCars.map((cars) => (
              <option key={cars} value={cars}>
                {cars}
              </option>
            ))}
          </select>
          <p className="text-red-600 mb-3 text-sm">{errors?.machine ? errors?.machine[0] : ""}</p>
        </div>
      </div>


      <div className="flex sm:flex-row flex-col gap-2">
        <div className="w-full sm:w-1/2">
          <select
            name="brand"
            className="block w-full p-2 mb-2 border text-gray-600"
          >
            <option value="">نوع محصول</option>
            {carManufacturers && carManufacturers.map((cars) => (
              <option key={cars} value={cars}>
                {cars}
              </option>
            ))}
          </select>
          <p className="text-red-600 mb-3 text-sm">{errors?.brand ? errors?.brand[0] : ""}</p>
        </div>
        <div className="w-full sm:w-1/2">
          {/* <select
            name="material"
            className="block w-full p-2 mb-2 border text-gray-600"
          >
            <option value="">جنس محصول</option>
            {carPartsMaterials && carPartsMaterials.map((cars) => (
              <option key={cars} value={cars}>
                {cars}
              </option>
            ))}
          </select> */}
          <input
            type="text"
            name="material"
            placeholder="برند محصول"
            className="block w-full p-2 mb-2 border"
          />
          <p className="text-red-600 mb-3 text-sm">{errors?.material ? errors?.material[0] : ""}</p>
        </div>
      </div>
      <div className="w-full">
        <textarea
          name="description"
          placeholder="توضیحات محصول را وارد کنید"
          className="block w-full p-2 mb-2 border"
        >

        </textarea>
        <p className="text-red-600 mb-3 text-sm">{errors?.description ? errors?.description[0] : ""}</p>
      </div>

      <div class="flex h-6 shrink-0 items-center my-4 gap-3">
        <div class="group grid size-4 grid-cols-1">
          <input id="comments" aria-describedby="comments-description" name="comments" type="checkbox" class="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
            onChange={() => setSuggestion(suggestion === 'inactive' ? 'active' : 'inactive')} />

          <svg class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
            <path class="opacity-0 group-has-[:checked]:opacity-100" d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path class="opacity-0 group-has-[:indeterminate]:opacity-100" d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <span>این محصول را پیشنهاد میکنید؟</span>
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