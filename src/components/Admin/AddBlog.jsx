import React, { useState } from 'react'
import usePost from '../../hooks/usePost';
import { handleToast } from '../../utils/message';
import { getFormData } from '../../utils/form-data'
import { transformedErrors } from '../../utils';
const AddBlog = () => {

    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const { mutateAsync, isPending } = usePost('/blog', ['blog'])

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
                setImage(reader.result);
            };

            reader.readAsDataURL(file); // base64
        }
    };



    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (image === null) {
            handleToast("error", "لطفا یک تصویر انتخاب کنید.");
            return
        }
        const body = {
            ...getFormData(e.target),
            image_url: image
        }
        try {
            const response = await mutateAsync(body)

            console.log(response.data)
            handleToast('success', 'بلاگ با موفقیت اضافه شد')

        } catch (error) {
            console.log(error)
            setError(transformedErrors(error?.response?.data?.errors))
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            {/* Image upload */}
            <input
                type="file"
                onChange={handleImageChange}
                className="block w-full p-2 mb-2 border"
            />

            {/* Blog title */}
            <input
                type="text"
                name="name"
                placeholder="نام بلاگ"
                className="block w-full p-2 mb-2 border"
            />
            <p className="text-red-600 mb-3">{error?.name ? error?.name[0] : ""}</p>

            {/* Blog category */}
            <select
                name="category"
                className="block w-full p-2 mb-2 border"
            >
                <option value="" disabled>
                    انتخاب دسته بندی
                </option>
                <option value="فرمان">فرمان</option>
                <option value="جلوبندی">جلوبندی</option>
                <option value="موتور">موتور</option>
                <option value="برقی">برقی</option>
                <option value="مکانیزم و استاندارد">مکانیزم و استاندارد</option>
                <option value="تزئینی">تزئینی</option>
                <option value="گیریبکس">گیریبکس</option>
            </select>
            <p className="text-red-600 mb-3">{error?.category ? error?.category[0] : ""}</p>
            {/* Blog description */}
            <textarea
                name="body"
                placeholder="توضیحات بلاگ"
                className="block w-full p-2 mb-2 border"
            />
            <p className="text-red-600 mb-3">{error?.body ? error?.body[0] : ""}</p>
            {/* Submit button */}
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                افزودن بلاگ
            </button>
        </form>
    )
}

export default AddBlog