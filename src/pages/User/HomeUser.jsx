import { useAtomValue } from 'jotai';
import { useEffect, useMemo, useState } from 'react'
import { userProfile } from '../../stores/store';
import useGet from '../../hooks/useGet';
import { userStatistic } from '../../utils';
import { printInvoice } from '../../utils/prints';
import usePost from '../../hooks/usePost';
import { getFormData } from '../../utils/form-data';
import { handleToast } from '../../utils/message';

export default function HomeUser() {
  const user = useAtomValue(userProfile)
  const { data, isLoading } = useGet(['show-order'], `/order/${user?.id}/پرداخت`)
  const { data: notification } = useGet(['notification'], `/notification?limit=2`)
  const { mutateAsync, isPending } = usePost(`/order/cancel`, ['show-order'])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenRequest, setIsModalOpenRequest] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  const statistic = useMemo(() => userStatistic(data?.data), [data]);
 

  const handleRequest = async (e) => {
    e.preventDefault()

    if (getFormData(e.target).reason === '' || getFormData(e.target).cart_number === '') {
      handleToast('error', 'لطفا موارد گفته شده را تکمیل کنید')
      return
    }
    const body = {
      user_id: user?.id,
      address_id: invoiceData.address_id,
      ...getFormData(e.target),
      status: invoiceData?.address.statuse === 'ارسال شد' ? "مرجوع شده" : "لغو"
    }

    try {
      await mutateAsync(body)
      handleToast('success', 'درخواست شما با موفقیت ثبت گردید')
      setIsModalOpenRequest(true)
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <div className='px-1 md:px-3'>
      <div className="p-3 bg-stone-200 rounded-xl my-4">
        <h1 className="text-sm font-YekanBakh-Bold">صفحه اصلی</h1>
      </div>
      <section className=" my-16">
        <div className="container mx-auto max-w-screen-xl">
          <div className="flex gap-4">


            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 rounded-s-3xl">
                <div className="flex items-center justify-between bg-green-500 rounded-3xl p-8">

                  <div className="leading-8 ml-2 text-white">
                    <p className="text-xl font-YekanBakh-ExtraBold">{statistic?.sends} محصول</p>
                    <span className="text-sm mb-2 font-YekanBakh-Bold">خریداری کرده اید</span>
                  </div>
                  <div>
                    <div className="p-4 bg-stone-100 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>



                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-red-600 rounded-3xl p-8">

                  <div className="leading-8 ml-2 text-white">
                    <p className="text-xl font-YekanBakh-ExtraBold">{statistic?.cancel} محصول</p>
                    <span className="text-sm mb-2 font-YekanBakh-Bold">لغو شده</span>
                  </div>
                  <div>
                    <div className="p-4 bg-stone-100 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>



                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-yellow-500 rounded-3xl p-8">

                  <div className="leading-8 ml-2 text-white">
                    <p className="text-xl font-YekanBakh-ExtraBold">{statistic?.returnProduct} محصول</p>
                    <span className="text-sm mb-2 font-YekanBakh-Bold">مرجوع شده</span>
                  </div>
                  <div>
                    <div className="p-4 bg-stone-100 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>

                    </div>
                  </div>
                </div>
              </div>


              <div className="bg-white rounded-3xl">
                <div className="p-3 bg-stone-200 rounded-xl my-4">
                  <h1 className="text-sm font-YekanBakh-Bold">اطلاعیه مهم</h1>
                </div>
                <div className="bg-white border p-6 rounded-2xl">
                  {notification?.data?.length > 0 && notification?.data?.map(item => (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4" key={item.id}>
                      <div className="leading-8 mr-2">
                        <p className="text-sm font-YekanBakh-Bold">عنوان اطلاعیه : {item.title}</p>
                        <span className="text-xs text-stone-500"> تاریخ انتشار: {new Intl.DateTimeFormat('fa-IR', { day: '2-digit', year: 'numeric', month: 'short' }).format(new Date(item.createdAt))} - تاریخ انقضا: {item.expired_at}</span>
                        <p>{item?.description}</p>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-14 h-14 text-stone-200">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                        </svg>

                      </div>
                    </div>
                  ))}


                </div>
                <div>

                  <section className="my-16">
                    <div className="container mx-auto max-w-screen-xl">
                      <div className="flex gap-4">
                        <div className="w-full">
                          <div className="bg-white rounded-3xl p-0 lg:p-4">
                            <div className="p-3 bg-stone-200 rounded-xl my-4">
                              <h1 className="text-sm font-YekanBakh-Bold">سفارش های اخیر شما</h1>
                            </div>
                            <div className="flex flex-col gap-4">
                              {data?.data.length > 0 && data?.data
                                .slice(0, 3)
                                .map((order, index) => (
                                  <div key={index} className="p-6 border rounded-2xl relative my-3">
                                    <div className={`bg-${order?.address?.statuse === 'پرداخت' || order?.address?.statuse === 'در حال پردازش' || order?.address?.statuse === 'ارسال شده' ? 'green' : order?.address?.statuse === 'مرجوع شده' ? 'yellow' : 'red'}-500 rounded-tl-2xl text-xs text-white py-3 px-6 rounded-br-2xl absolute top-0 left-0`}>
                                      {order.address.statuse}
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                                      <div>
                                        <span>تاریخ:</span>
                                        <span className="mr-1 text-stone-500">
                                          {new Intl.DateTimeFormat('fa-IR', { day: '2-digit', year: 'numeric', month: 'short' }).format(new Date(order.address.createdAt))}
                                        </span>
                                      </div>
                                      <div>
                                        <span>کد سفارش:</span>
                                        <span className="mr-1 text-stone-500">{order.address.id}</span>
                                      </div>
                                      <div>
                                        <span>جمع سبد خرید:</span>
                                        <span className="mr-1 text-stone-500">{new Intl.NumberFormat('fa-Ir').format(order.total_price)} تومان</span>
                                      </div>
                                      <div>
                                        <span>کد رهگیری:</span>
                                        <span className="mr-1 text-stone-500">{order.address.ref_code || 'در حال آماده سازی'}</span>
                                      </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row justify-between items-center">
                                      <div className="flex mb-6">
                                        <div>
                                          {order.address.statuse === 'ارسال شد' && (
                                            <button
                                              onClick={() => {
                                                setInvoiceData(order);
                                                setIsModalOpenRequest(true);
                                              }}
                                              className="px-8 py-2 bg-orange-500 rounded-xl text-white">
                                              درخواست مرجوعی
                                            </button>
                                          )}

                                          {order.address.statuse === 'پرداخت' && (
                                            <button
                                              onClick={() => {
                                                setInvoiceData(order);
                                                setIsModalOpenRequest(true);
                                              }}
                                              className="px-8 py-2 bg-red-500 rounded-xl text-white">
                                              درخواست لغو
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                      <div>
                                        <button
                                          onClick={() => {
                                            setInvoiceData(order);
                                            setIsModalOpen(true);
                                          }}
                                          className="px-8 py-2 bg-stone-800 rounded-xl text-white">
                                          مشاهده فاکتور
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && invoiceData && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white  rounded-lg p-8 w-96">
            <h2 className="text-sm lg:text-xl font-bold mb-4">فاکتور</h2>
            <p><strong>کد سفارش:</strong> {invoiceData.address_id}</p>
            <p><strong>تاریخ:</strong> {new Intl.DateTimeFormat('fa-IR').format(new Date(invoiceData.createdAt))}</p>
            <p><strong>جمع سبد خرید:</strong> {new Intl.NumberFormat('fa-IR').format(invoiceData.total_price)} تومان</p>
            <h3 className="mt-4">محصولات:</h3>
            <ul >
              {invoiceData.orders.map((product, index) => (
                <li key={index} className="flex items-center justify-between w-full">
                  <span>{product.product.name}</span>
                  <span>{new Intl.NumberFormat('fa-IR').format(product.product.price_with_off || product.product.price)} تومان</span>

                </li>
              ))}
            </ul>
            <div className="flex justify-end gap-4 mt-4">
              <button className="px-6 py-2 bg-gray-500 text-white rounded-lg" onClick={() => {
                setIsModalOpen(false);
                setInvoiceData(null);
              }}>
                بستن
              </button>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg" onClick={() => printInvoice(invoiceData)}>
                پرینت
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpenRequest && invoiceData && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <form onSubmit={handleRequest} className="bg-white  rounded-lg p-8 w-96">
            <h2 className="text-sm lg:text-xl font-bold mb-4">دلیل درخواست خود را بنویسد</h2>

            <textarea name="reason" id="" className='border border-gray-400 w-full h-20 pr-3' />

            <div className='flex gap-2 flex-col'>
              <label htmlFor="">شماره کارت</label>
              <input type='number' name='cart_number' className='border border-gray-400 h-10 pr-3' />
            </div>


            <div className="flex justify-end gap-4 mt-4">
              <button className="px-6 py-2 bg-gray-500 text-white rounded-lg" onClick={() => {
                setIsModalOpenRequest(false);
                setInvoiceData(null);
              }}>
                بستن
              </button>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg" >
                ارسال
              </button>
            </div>
          </form>
        </div>
      )}


    </div>
  )
}
