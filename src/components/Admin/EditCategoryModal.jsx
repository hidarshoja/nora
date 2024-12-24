import useUpdate from "../../hooks/useUpdate";
import { handleToast } from "../../utils/message";
import useGet from "../../hooks/useGet";
import { getFormData } from "../../utils/form-data";
import { useEffect, useState } from "react";

const EditCategoryModal = ({ category, onClose, refetch }) => {
  const [image, setImage] = useState(null)
  const { data, isLoading, refetch: getCategory } = useGet(['categories'], `/category/show/${category}`)
  const { mutateAsync, isPending } = useUpdate('/category', ['category'])

  useEffect(() => {
    getCategory()
  }, [])

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
        setImage(reader.result)
      };

      reader.readAsDataURL(file); // base64
    }
  };


  const handleEdit = async (e) => {
    e.preventDefault();
    const body = {
      name: getFormData(e.target).name,
      image_url: image
    };
    console.log(body)

    try {
      const response = await mutateAsync({ slug: category, body })
      console.log(response.data)
      handleToast('success', 'دسته بندی با موفقیت ویرایش شد')
      refetch()
      onClose()
    } catch (error) {
      console.log(error)
    }
  };

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <form onSubmit={handleEdit} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg w-[300px] md:w-1/2">
          <h2 className="text-xl mb-4">ویرایش دسته بندی</h2>
          <div className="flex justify-center ">
            <img
              src={data?.data[0]?.image_url ? `${import.meta.env.VITE_API_BASE_URL}${data?.data[0].image_url}` : ''} alt={data?.data[0].name}
              className="size-44 object-cover " />

          </div>


          <input
            type="text"
            name="name"
            defaultValue={data?.data[0].name}
            placeholder="نام دسته بندی"
            className="block w-full p-2 mb-2 border"
          />

          <input
            type="file"
            name="image"
            onChange={(e) => handleImageChange(e)}
            className="block w-full p-2 mb-2 border"
          />



          {/* Buttons */}
          <div className="flex justify-end">
            <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded mx-2">
              لغو
            </button>
            <button className={`bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300 disabled:text-gray-800 disabled:cursor-not-allowed`} disabled={isPending}>
              {isPending ? 'در حال ارسال...' : 'ذخیره '}
            </button>
          </div>
        </div>
      </form>


    </>
  );
};

export default EditCategoryModal;
