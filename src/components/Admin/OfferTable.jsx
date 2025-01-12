import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import useGet from '../../hooks/useGet'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import "react-multi-date-picker/styles/layouts/mobile.css"
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import usePost from '../../hooks/usePost'
import { handleToast } from '../../utils/message'
import { transformedErrors } from '../../utils'
import { MdDelete } from 'react-icons/md'
import useDelete from '../../hooks/useDelete'

const OfferTable = () => {
    const { data, isLoading } = useGet(['product-offers-list'], '/product?mode=offer')
    const { data: offers } = useGet(['product-offers-list-all'], '/product/offers')
    const { mutateAsync, isPending } = usePost('/product/offers', ['product-offers-list-all'])
    const { mutateAsync: mutateAsyncDelete } = useDelete('/product/offers/delete', ['product-offers-list-all'])
   
    const [options, setOptions] = useState([])
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)
    const [date, setDate] = useState(new DateObject())

    // ! set options for selection
    useEffect(() => {
        data?.data?.map((item) => setOptions((prev) => [...prev, { value: item.id, label: item.name }]))
    }, [])

    // ! add new offer
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (products.length === 0) {
            setError(prev => ({ ...prev, products: ['لطفا یک محصول را انتخاب کنید'] }))
            return
        }
        const filter = products.map((item) => item.value)
        const persianToEnglishDigits = (str) => str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
        const expired_at = persianToEnglishDigits(date.format('YYYY-MM-DD HH:mm:ss'));
        const body = { products: filter, expired_at }

        try {
            await mutateAsync(body)
            handleToast('success', 'عملیات با موفقیت انجام شد')
        } catch (error) {
            console.log(error)
            handleToast('error', error?.response?.data?.msg)
            setError(transformedErrors(error?.response?.data?.errors))
        }
    }

    // ! delete offer
    const handleDelete = async (id) => {
        try {
            await mutateAsyncDelete(id)
            handleToast('success', 'عملیات با موفقیت انجام شد')
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <Select
                    options={options}
                    isMulti
                    name="products"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => setProducts(e)}
                />
                <p className='text-red-500 text-[14px] my-2'>{error?.products ? error?.products[0] : ''}</p>
                <DatePicker
                    name="date"
                    format='YYYY-MM-DD HH:mm:ss'
                    plugins={[
                        <TimePicker />
                    ]}
                    inputMode="none"
                    className="rmdp-mobile"
                    inputClass='w-full p-2 border rounded my-4 border-gray-300'
                    calendar={persian}
                    locale={persian_fa}
                    onChange={(e) => setDate(e)}
                    value={date}
                />
                <button className='px-4 py-2 bg-blue-500 text-white w-[100px] disabled:bg-blue-400 disabled:cursor-not-allowed' disabled={isPending}>
                    {isPending ? 'در حال انجام' : 'ثبت'}
                </button>
            </form>

            {offers.data && (
                <div className="overflow-x-auto my-5">
                    <table className="table-auto w-full text-center border ">
                        <thead className="border-b-2 bg-[#090580] text-white">
                            <tr className="text-sm lg:text-md">
                                <th className="py-3">ردیف</th>
                                <th>انقضا</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={offers.data.id} className="mt-1 hover:bg-green-500 hover:text-white text-sm lg:text-md">
                                <td className="py-2">{offers.data.id}</td>
                                <td>{offers?.data?.expired_at}</td>
                                <td className="">

                                    <button onClick={() => handleDelete(offers?.data?.id)}>
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default OfferTable