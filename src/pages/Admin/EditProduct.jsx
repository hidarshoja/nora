import React, { useEffect, useState } from 'react'
import useGet from '../../hooks/useGet'
import { useParams } from 'react-router-dom'
import { carManufacturers, carPartsMaterials, iranianCars } from '../../constant/cars-data'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import { handleToast } from '../../utils/message'
import useDelete from '../../hooks/useDelete'
import { getFormData } from '../../utils/form-data'
import useUpdate from '../../hooks/useUpdate'
import { transformedErrors } from '../../utils'
import { handleImageChange } from '../../utils/image-lib'

const EditProduct = () => {
    const [images, setImages] = useState([])
    const [suggestion, setSuggestion] = useState('inactive')
    const [selectedProduct, setSelectedProduct] = useState({
        category_id: 0,
        machine: "",
        brand: "",
    })
    const [errors, setErrors] = useState(null)
    const [imageId, setImageId] = useState(0)
    const [isOpen, setIsOpen] = useState(false)


    const { slug } = useParams()

    const { data: categories } = useGet(['category'], '/category')
    const { data, isLoading: loading } = useGet(['product-single', slug], `/product/show/${slug}`)
    const { mutateAsync, isPending } = useDelete(`/product/image/delete`, ['product-single'])
    const { mutateAsync: mutate, isPending: isLoading } = useUpdate(`/product`, ['product-single', 'product'])
    console.log(data)

    useEffect(() => {
        setSelectedProduct({
            category_id: data?.data?.product.categories?.id,
            machine: data?.data?.product.machine,
            brand: data?.data?.product.brand,
        })
        setSuggestion(data?.data?.product.suggestion)
    }, [loading])

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
    const handleRemoveImage = async () => {
        try {
            await mutateAsync(imageId)
            handleToast('success', 'عکس با موفقیت حذف شد')
            setIsOpen(false)
            setImageId(0)
        } catch (error) {
            console.log(error)
        }

    };

    // ! handle update
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data?.data?.product.images.length === 0 && images?.length === 0) {
            handleToast('error', 'حداقل یک عکس وارد کنید')
            return
        }

        setErrors(null)
        const hashedImaged = images?.length > 0 ? await handleImageChange(images) : []
        const body = {
            ...getFormData(e.target),
            images: hashedImaged,
            ...selectedProduct,
            price_with_off: getFormData(e.target).price_with_off !== '' ? getFormData(e.target).price_with_off : null,
            suggestion
        }

        try {
            await mutate({ slug, body })
            handleToast('success', 'محصول با موفقیت ویرایش شد')
            setErrors(null)
            setImages([])
        } catch (error) {
            console.log(error)
            if (error.response.data?.errors) setErrors(transformedErrors(error?.response?.data?.errors))
        }
    }


    if (loading) {
        return <div>Loading ...</div>
    }

    return (
        <>
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

                <div className="flex flex-wrap gap-2 mb-2">
                    {data?.data?.product.images?.length > 0 && data?.data?.product?.images?.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={image?.image_url ? `${import.meta.env.VITE_API_BASE_URL}${image.image_url}` : ''}
                                alt={`Uploaded ${index + 1}`}
                                className="w-20 h-20 object-cover rounded border"
                            />
                            <button
                                onClick={() => {
                                    setImageId(image.id)
                                    setIsOpen(true)
                                }}
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
                            defaultValue={data?.data?.product.name}
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
                            defaultValue={data?.data?.product.amount}
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
                            defaultValue={data?.data?.product.price}
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
                            defaultValue={data?.data?.product.price_with_off || ''}
                            className="block w-full p-2 mb-2 border"
                        />
                        <p className="text-red-600 mb-3 text-sm">{errors?.price_with_off ? errors?.price_with_off[0] : ""}</p>
                    </div>

                </div>

                <div className="flex sm:flex-row flex-col gap-2">
                    <div className="w-full sm:w-1/2">
                        <select
                            className="block w-full p-2 mb-2 border text-gray-600"
                            value={selectedProduct.category_id}
                            onChange={(e) => setSelectedProduct(prev => ({ ...prev, category_id: e.target.value }))}
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
                            value={selectedProduct?.machine}
                            onChange={(e) => setSelectedProduct(prev => ({ ...prev, machine: e.target.value }))}
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
                            value={selectedProduct?.brand}
                            onChange={(e) => setSelectedProduct(prev => ({ ...prev, brand: e.target.value }))}
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
                            value={selectedProduct?.material}
                            onChange={(e) => setSelectedProduct(prev => ({ ...prev, material: e.target.value }))}
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
                            defaultValue={data?.data?.product.material}
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
                        defaultValue={data?.data?.product.description}
                    >

                    </textarea>
                    <p className="text-red-600 mb-3 text-sm">{errors?.description ? errors?.description[0] : ""}</p>
                </div>


                <div class="flex h-6 shrink-0 items-center my-4 gap-3">
                    <div class="group grid size-4 grid-cols-1">
                        <input id="comments" checked={suggestion === 'active'} aria-describedby="comments-description" name="comments" type="checkbox" class="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
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
                    disabled={isLoading}
                >
                    {isLoading ? 'در حال اضافه کردن...' : 'اضافه کردن'}
                </button>
            </form>


            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => setIsOpen(false)}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto text-black bg-black/75">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium text-black  w-full">
                                <QuestionMarkCircleIcon className="size-14 text-rose-600 m-auto animate-bounce" />
                            </DialogTitle>
                            <p className="mt-2 text-sm/6 text-black text-center">
                                آیا میخواهید این عکس رو پاک کنید؟
                            </p>
                            <div className="flex justify-center items-center gap-3 mt-4">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-red-700"
                                    onClick={() => setIsOpen(false)}
                                >
                                    انصراف
                                </Button>
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-green-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-green-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-green-700"
                                    onClick={handleRemoveImage}
                                    disabled={isPending}
                                >
                                    {isPending ? 'در حال پاک کردن...' : 'پاک کردن'}
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default EditProduct