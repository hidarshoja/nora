import { useState } from 'react'

export default function HomeUser() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const orders = [
    {
      id: '#246585',
      date: '3 خرداد 1402',
      discount: '76.000 تومان',
      total: '399.000 تومان',
      status: 'پرداخت موفق',
      products: [
        { name: 'سیپاک ', price: '120.000 ', img: '/assets/images/new-img/sipak10.jpg' },
        { name: 'لنت', price: '130.000 ', img: '/assets/images/new-img/sipak11.jpg' },
        { name: 'روغن موتور', price: '149.000 ', img: '/assets/images/new-img/sipak12.jpg' },
      ]
    },
    {
      id: '#246586',
      date: '4 خرداد 1402',
      discount: '50.000 تومان',
      total: '250.000 تومان',
      status: 'درانتظار',
      products: [
        { name: 'لنت 1', price: '80.000 ', img: '/assets/images/new-img/lent.webp' },
        { name: 'لاسیک', price: '70.000 ', img: '/assets/images/new-img/lastic.jpg' },
        { name: 'دیسک 2', price: '100.000 ', img: '/assets/images/new-img/disck2.webp' },
      ]
    },
    {
      id: '#246587',
      date: '5 خرداد 1402',
      discount: '10.000 تومان',
      total: '50.000 تومان',
      status: 'ناموفق',
      products: [
        { name: 'لنت 2', price: '50.000 ', img: '/assets/images/new-img/lent.webp' },
      ]
    }
  ];
  

      const openModal = (order) => {
       
        setInvoiceData(order); 
        console.log(`order`, order);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setInvoiceData(null);
      };
    
      const printInvoice = () => {
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
          <html>
            <head>
              <title>فاکتور بازرگانی نوراپارت</title>
              <style>
                body {
                  direction: rtl;
                  font-family: Tahoma, Arial, sans-serif;
                  margin: 20px;
                  padding: 0;
                  background-color: #f4f4f4;
                }
                .container {
                  background-color: #fff;
                  padding: 20px;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  width: 100%;
                  max-width: 800px;
                  margin: 0 auto;
                }
                h1 {
                  text-align: center;
                  font-size: 24px;
                  margin-bottom: 20px;
                }
                .section-title {
                  font-weight: bold;
                  background-color: #e0e0e0;
                  padding: 5px;
                  margin-bottom: 10px;
                }
                .row {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 10px;
                }
                .row div {
                  padding: 8px;
                  flex: 1;
                  text-align: center;
                }
                .row div:nth-child(even) {
                  background-color: #f8f8f8;
                }
                .row div:nth-child(odd) {
                  background-color: #fff;
                }
                .products-list {
                  margin-top: 20px;
                }
                .products-list li {
                  display: flex;
                  justify-content: space-between;
                  padding: 5px 0;
                  border-bottom: 1px solid #ddd;
                }
                .products-list li:last-child {
                  border-bottom: none;
                }
                .footer {
                  margin-top: 20px;
                  text-align: center;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>فاکتور بازرگانی نوراپارت</h1>
                <div class="section-title">اطلاعات سفارش</div>
                 <div class="row">
              <div><strong>وضعیت:</strong> ${invoiceData.status}</div>
            </div>
                <div class="row">
                  <div><strong>کد سفارش:</strong> ${invoiceData.id}</div>
                  <div><strong>تاریخ:</strong> ${invoiceData.date}</div>
                </div>
                <div class="row">
                  <div><strong>تخفیف:</strong> ${invoiceData.discount}</div>
                  <div><strong>جمع سبد خرید:</strong> ${invoiceData.total}</div>
                </div>
                
                <div class="section-title">محصولات</div>
                <ul class="products-list">
                  ${invoiceData.products.map(product => `
                    <li>
                      <span>${product.name}</span>
                      <span>${product.price} تومان</span>
                    </li>
                  `).join('')}
                </ul>
      
                <div class="footer">
                  <p>© 2024 بازرگانی نوراپارت</p>
                </div>
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      };
      
      
    

  return (
    <div className='p-1'>
      <div className="p-3 bg-stone-200 rounded-xl my-4">
                  <h1 className="text-sm font-YekanBakh-Bold">صفحه اصلی</h1>
                </div>
         <section className="lg:px-4 my-16">
        <div className="container mx-auto max-w-screen-xl">
            <div className="flex gap-4">
              

                <div className="px-4 w-full">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 rounded-s-3xl">
                        <div className="flex items-center justify-between bg-green-500 rounded-3xl p-8">
                            
                            <div className="leading-8 ml-2 text-white">
                                <p className="text-xl font-YekanBakh-ExtraBold">9 محصول</p>
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
                        <div className="flex items-center justify-between bg-stone-800 rounded-3xl p-8">
                            
                            <div className="leading-8 ml-2 text-white">
                                <p className="text-xl font-YekanBakh-ExtraBold">2 محصول</p>
                                <span className="text-sm mb-2 font-YekanBakh-Bold">در انتظار پرداخت</span>
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
                                <p className="text-xl font-YekanBakh-ExtraBold">1 محصول</p>
                                <span className="text-sm mb-2 font-YekanBakh-Bold">لغو شده</span>
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
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="leading-8 mr-2">
                                    <p className="text-sm font-YekanBakh-Bold">عنوان اطلاعیه خیلی مهم</p>
                                    <span className="text-xs text-stone-500">دوشنبه ۲۰ ام شهریور ۱۴۰۲</span>
                                    <p>تمام لنت ها و لاستیک ها با ده درصد تخفیف به مناسبت روز صنعت معدن و تجارت عرضه خواهد شد.(به مدت ده روز)</p>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-14 h-14 text-stone-200">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                                      </svg>
                                      
                                </div>
                            </div>
    
                        </div>
                        <div>
      <section className="lg:px-4 my-16">
        <div className="container mx-auto max-w-screen-xl">
          <div className="flex gap-4">
            <div className="lg:px-4 w-full">
              <div className="bg-white rounded-3xl p-0 lg:p-4">
                <div className="p-3 bg-stone-200 rounded-xl my-4">
                  <h1 className="text-sm font-YekanBakh-Bold">سفارش های اخیر شما</h1>
                </div>
                <div className="flex flex-col gap-4">
                  {orders.map((order) => (
                    <div key={order.id} className="p-6 border rounded-2xl relative">
        <div className={`bg-${order.status === 'پرداخت موفق' ? 'green' : order.status === 'درانتظار' ? 'yellow' : 'red'}-500 rounded-tl-2xl text-xs text-white py-3 px-6 rounded-br-2xl absolute top-0 left-0`}>
                        {order.status}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                        <div>
                          <span>تاریخ:</span>
                          <span className="mr-1 text-stone-500">{order.date}</span>
                        </div>
                        <div>
                          <span>کد سفارش:</span>
                          <span className="mr-1 text-stone-500">{order.id}</span>
                        </div>
                        <div>
                          <span>تخفیف:</span>
                          <span className="mr-1 text-stone-500">{order.discount}</span>
                        </div>
                        <div>
                          <span>جمع سبد خرید:</span>
                          <span className="mr-1 text-stone-500">{order.total}</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-center">
                      
                        <div>
                          <button 
                          onClick={() => openModal(order)}
                          className="px-8 py-2 bg-stone-800 rounded-xl text-white">مشاهده فاکتور</button>
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
          <div className="bg-white rounded-lg p-8 w-96">
            <h2 className="text-sm lg:text-xl font-bold mb-4">فاکتور</h2>
            <p><strong>کد سفارش:</strong> {invoiceData.id}</p>
            <p><strong>تاریخ:</strong> {invoiceData.date}</p>
            <p><strong>تخفیف:</strong> {invoiceData.discount}</p>
            <p><strong>جمع سبد خرید:</strong> {invoiceData.total}</p>
            <h3 className="mt-4">محصولات:</h3>
            <ul >
              {invoiceData.products.map((product, index) => (
                <li key={index} className="flex items-center justify-between w-full">
                    <span>{product.name}</span>
                    <span>{product.price} تومان</span>
                  
                </li>
              ))}
            </ul>
            <div className="flex justify-end gap-4 mt-4">
              <button className="px-6 py-2 bg-gray-500 text-white rounded-lg" onClick={closeModal}>
                بستن
              </button>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg" onClick={printInvoice}>
                پرینت
              </button>
            </div>
          </div>
        </div>
      )}
   
    </div>
  )
}
