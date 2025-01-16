import { useState } from 'react';
import useGet from '../../hooks/useGet'
import usePost from '../../hooks/usePost'
import { useAtomValue } from 'jotai';
import { userProfile } from '../../stores/store'
import { printInvoice } from '../../utils/prints';
import { getFormData } from '../../utils/form-data'
import {handleToast} from '../../utils/message'
import { Link } from 'react-router-dom';
export default function OrderUser() {
  const user = useAtomValue(userProfile)
  const { data, isLoading } = useGet(['show-order'], `/order/${user?.id}/پرداخت`)
  const { mutateAsync, isPending } = usePost(`/order/cancel`, ['show-order'])


  const [activeTab, setActiveTab] = useState('ok');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenRequest, setIsModalOpenRequest] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  const handleRequest = async (e) => {
    e.preventDefault()

    if (getFormData(e.target).reason === '' || getFormData(e.target).cart_number === '') {
      handleToast('error','لطفا موارد گفته شده را تکمیل کنید') 
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
        <h1 className="text-sm font-YekanBakh-Bold">سفارش ها</h1>
      </div>
      <section className="my-16">
        <div className="container mx-auto max-w-screen-xl">
          <div className="flex gap-4">
            <div className="w-full">
              <div className="bg-white rounded-3xl p-4">


                <div className="leading-8 mb-12">
                  <div className="mb-4">
                    <div className="flex flex-col sm:flex-row gap-4 justify-start">
                      <button
                        className={`px-10 py-1 border-2 rounded-xl text-black ${activeTab == 'ok' ? 'bg-green-600' : ''}`}
                        onClick={() => setActiveTab('ok')}
                      >
                        پرداخت شده
                      </button>
                      <button
                        className={`px-8 py-1 border-2 rounded-xl text-black ${activeTab == 'cancel' ? 'bg-red-600' : ''}`}
                        onClick={() => setActiveTab('cancel')}
                      >
                        لغو شده
                      </button>
                      <button
                        className={`px-8 py-1 border-2 rounded-xl text-black ${activeTab == 'back' ? 'bg-yellow-600' : ''}`}
                        onClick={() => setActiveTab('back')}
                      >
                        مرجوع محصول
                      </button>
                    </div>
                  </div>

                  <div className={`tab-content rounded-lg ${activeTab === 'ok' ? '' : 'hidden'}`}>
                    {data?.data.length > 0 && data?.data?.filter(order => order.address.statuse === 'پرداخت' || order.address.statuse === 'ارسال شد' || order.address.statuse === 'در حال پردازش').map((order, index) => (
                      <div key={index} className="p-6 border rounded-2xl relative my-3">
                        <div className={`bg-green-500 rounded-tl-2xl text-xs text-white py-3 px-6 rounded-br-2xl absolute top-0 left-0`}>
                          {order.address.statuse}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                          <div>
                            <span>تاریخ:</span>
                            <span className="mr-1 text-stone-500">{new Intl.DateTimeFormat('fa-IR', { day: '2-digit', year: 'numeric', month: 'short' }).format(new Date(order.address.createdAt))}</span>
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
                                  className="px-8 py-2 bg-orange-500 rounded-xl text-white">درخواست مرجوعی</button>
                              )}

                              {order.address.statuse === 'پرداخت' && (
                                <button
                                  onClick={() => {
                                    setInvoiceData(order);
                                    setIsModalOpenRequest(true);
                                  }}
                                  className="px-8 py-2 bg-red-500 rounded-xl text-white">درخواست لغو</button>
                              )}

                            </div>
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                setInvoiceData(order);
                                setIsModalOpen(true);
                              }}
                              className="px-8 py-2 bg-stone-800 rounded-xl text-white">مشاهده فاکتور</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={`tab-content rounded-lg ${activeTab === 'cancel' ? '' : 'hidden'}`}>
                    {data?.data.length > 0 ? data?.data?.filter(order => order.address.statuse === 'لغو').map((order, index) => (
                      <div key={index} className="p-6 border rounded-2xl relative my-3">
                        <div className={`bg-red-500 rounded-tl-2xl text-xs text-white py-3 px-6 rounded-br-2xl absolute top-0 left-0`}>
                          {order.address.statuse}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                          <div>
                            <span>تاریخ:</span>
                            <span className="mr-1 text-stone-500">{new Intl.DateTimeFormat('fa-IR', { day: '2-digit', year: 'numeric', month: 'short' }).format(new Date(order.address.createdAt))}</span>
                          </div>
                          <div>
                            <span>کد سفارش:</span>
                            <span className="mr-1 text-stone-500">{order.address.id}</span>
                          </div>
                          <div>
                            <span>جمع سبد خرید:</span>
                            <span className="mr-1 text-stone-500">{new Intl.NumberFormat('fa-Ir').format(order.total_price)} تومان</span>
                          </div>

                        </div>
                        <div className="flex flex-col sm:flex-row justify-end items-center">

                          <div>
                            <button
                              onClick={() => {
                                setInvoiceData(order);
                                setIsModalOpen(true);
                              }}
                              className="px-8 py-2 bg-stone-800 rounded-xl text-white">مشاهده فاکتور</button>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <p className='flex items-center justify-center my-5 font-bold'>سفارشی یافت نشد</p>
                    )}
                  </div>

                  <div className={`tab-content rounded-lg ${activeTab === 'back' ? '' : 'hidden'}`}>
                    {data?.data.length > 0 ? data?.data?.filter(order => order.address.statuse === 'مرجوع شده').map((order, index) => (
                      <div key={index} className="p-6 border rounded-2xl relative my-3">
                        <div className={`bg-yellow-600 rounded-tl-2xl text-xs text-white py-3 px-6 rounded-br-2xl absolute top-0 left-0`}>
                          {order.address.statuse}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                          <div>
                            <span>تاریخ:</span>
                            <span className="mr-1 text-stone-500">{new Intl.DateTimeFormat('fa-IR', { day: '2-digit', year: 'numeric', month: 'short' }).format(new Date(order.address.createdAt))}</span>
                          </div>
                          <div>
                            <span>کد سفارش:</span>
                            <span className="mr-1 text-stone-500">{order.address.id}</span>
                          </div>
                          <div>
                            <span>جمع سبد خرید:</span>
                            <span className="mr-1 text-stone-500">{new Intl.NumberFormat('fa-Ir').format(order.total_price)} تومان</span>
                          </div>

                        </div>
                        <div className="flex flex-col sm:flex-row justify-end items-center">

                          <div>
                            <button
                              onClick={() => {
                                setInvoiceData(order);
                                setIsModalOpen(true);
                              }}
                              className="px-8 py-2 bg-stone-800 rounded-xl text-white">مشاهده فاکتور</button>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <p className='flex items-center justify-center my-5 font-bold'>سفارشی یافت نشد</p>
                    )}
                  </div>

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
              <input type='number' name='cart_number' className='border border-gray-400 h-10 pr-3'/>
            </div>

      
        <p className='text-red-500 text-sm'>جهت مرجوع کردن کالا <Link to={'/return'} className='text-blue-500 underline'>شرایط</Link> مرجوع را با دقت مطالعه کنید</p>
     


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
  );
}
