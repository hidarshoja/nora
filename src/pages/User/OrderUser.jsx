import  { useState } from 'react';

export default function OrderUser() {
  const [activeTab, setActiveTab] = useState('ok');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  const orders = {
    tab1: [
      {
        status: 'پرداخت موفق',
        date: '3 خرداد 1402',
        orderCode: '#246585',
        discount: '76.000 تومان',
        total: '399.000 تومان',
        products: [
          { name: 'لنت 2', price: '50.000 ', img: '/assets/images/new-img/lent.webp' },
        ]
      },
      
    ],
    tab2: [
      {
        status: 'پرداخت ناموفق',
        date: '3 خرداد 1402',
        orderCode: '#246585',
        discount: '76.000 تومان',
        total: '399.000 تومان',
        products: [
          { name: 'لنت 1', price: '80.000 ', img: '/assets/images/new-img/lent.webp' },
          { name: 'لاسیک', price: '70.000 ', img: '/assets/images/new-img/lastic.jpg' },
          { name: 'دیسک 2', price: '100.000 ', img: '/assets/images/new-img/disck2.webp' },
        ]
      },
     
    ],
    tab3: [
      {
        status: 'مرجوع شده',
        date: '3 خرداد 1402',
        orderCode: '#246585',
        discount: '76.000 تومان',
        total: '399.000 تومان',
        products: [
          { name: 'سیپاک ', price: '120.000 ', img: '/assets/images/new-img/sipak10.jpg' },
          { name: 'لنت', price: '130.000 ', img: '/assets/images/new-img/sipak11.jpg' },
          { name: 'روغن موتور', price: '149.000 ', img: '/assets/images/new-img/sipak12.jpg' },
        ]
      },
      
    ],
  };

  const handleTabClick = (tab) => {
    console.log(`tab`, tab);
    setActiveTab(tab);
  };

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
              <div><strong>کد سفارش:</strong> ${invoiceData.orderCode}</div>
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
    <div>
       <div className="p-3 bg-stone-200 rounded-xl my-4">
                  <h1 className="text-sm font-YekanBakh-Bold">سفارش ها</h1>
                </div>
      <section className="lg:px-4 my-16">
        <div className="container mx-auto max-w-screen-xl">
          <div className="flex gap-4">
            <div className="lg:px-4 w-full">
              <div className="bg-white rounded-3xl p-4">
               

                <div className="leading-8 mb-12">
                  <div className="lg:p-2 mb-4">
                    <div className="flex flex-col sm:flex-row gap-4 justify-start">
                      <button
                        className={`px-10 py-1 border-2 rounded-xl text-black ${activeTab == 'ok' ? 'bg-green-600' : ''}`}
                        onClick={() => handleTabClick('ok')}
                      >
                        پرداخت شده
                      </button>
                      <button
                        className={`px-8 py-1 border-2 rounded-xl text-black ${activeTab == 'cancel' ? 'bg-red-600' : ''}`}
                        onClick={() => handleTabClick('cancel')}
                      >
                        لغو شده
                      </button>
                      <button
                        className={`px-8 py-1 border-2 rounded-xl text-black ${activeTab == 'back' ? 'bg-yellow-600' : ''}`}
                        onClick={() => handleTabClick('back')}
                      >
                        مرجوع محصول
                      </button>
                    </div>
                  </div>

                  <div className={`lg:p-4 tab-content rounded-lg ${activeTab === 'ok' ? '' : 'hidden'}`}>
                    {orders.tab1.map((order, index) => (
                      <div key={index} className="p-6 border rounded-2xl relative">
                        <div className={`bg-green-500 rounded-tl-2xl text-xs text-white py-3 px-6 rounded-br-2xl absolute top-0 left-0`}>
                          {order.status}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                          <div>
                            <span>تاریخ:</span>
                            <span className="mr-1 text-stone-500">{order.date}</span>
                          </div>
                          <div>
                            <span>کد سفارش:</span>
                            <span className="mr-1 text-stone-500">{order.orderCode}</span>
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
                          <div className="flex mb-6">
                            {order.products.map((product) => (
                              <a key={product.id} href="single-product.html">
                                <img className="w-24" src={product.src} alt="" />
                              </a>
                            ))}
                          </div>
                          <div>
                            <button
                            onClick={() => openModal(order)}
                            className="px-8 py-2 bg-stone-800 rounded-xl text-white">مشاهده فاکتور</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={`lg:p-4 tab-content rounded-lg ${activeTab === 'cancel' ? '' : 'hidden'}`}>
                    {orders.tab2.map((order, index) => (
                      <div key={index} className="p-6 border rounded-2xl relative">
                        <div className={`bg-red-500 rounded-tl-2xl text-xs text-white py-3 px-6 rounded-br-2xl absolute top-0 left-0`}>
                          {order.status}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                          <div>
                            <span>تاریخ:</span>
                            <span className="mr-1 text-stone-500">{order.date}</span>
                          </div>
                          <div>
                            <span>کد سفارش:</span>
                            <span className="mr-1 text-stone-500">{order.orderCode}</span>
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
                          <div className="flex mb-6">
                            {order.products.map((product) => (
                              <a key={product.id} href="single-product.html">
                                <img className="w-24" src={product.src} alt="" />
                              </a>
                            ))}
                          </div>
                          <div>
                            <button
                            onClick={() => openModal(order)}
                            className="px-8 py-2 bg-stone-800 rounded-xl text-white">مشاهده فاکتور</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={`lg:p-4 tab-content rounded-lg ${activeTab === 'back' ? '' : 'hidden'}`}>
                    {orders.tab3.map((order, index) => (
                      <div key={index} className="p-6 border rounded-2xl relative">
                        <div className={`bg-yellow-500 rounded-tl-2xl text-xs text-white py-3 px-6 rounded-br-2xl absolute top-0 left-0`}>
                          {order.status}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                          <div>
                            <span>تاریخ:</span>
                            <span className="mr-1 text-stone-500">{order.date}</span>
                          </div>
                          <div>
                            <span>کد سفارش:</span>
                            <span className="mr-1 text-stone-500">{order.orderCode}</span>
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
                          <div className="flex mb-6">
                            {order.products.map((product) => (
                              <a key={product.id} href="single-product.html">
                                <img className="w-24" src={product.src} alt="" />
                              </a>
                            ))}
                          </div>
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
        </div>
      </section>
      {isModalOpen && invoiceData && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white  rounded-lg p-8 w-96">
            <h2 className="text-sm lg:text-xl font-bold mb-4">فاکتور</h2>
            <p><strong>کد سفارش:</strong> {invoiceData.orderCode}</p>
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
  );
}
