import React, { useState } from "react";

const Cart = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "سیبک فرمان",
      category: "جلو بندی",
      originalPrice: 360000,
      discountPrice: 280000,
      quantity: 1,
      image: "assets/images/new-img/sipak-nora.jpg",
    },
    {
      id: 2,
      name: "روغن چهار لیتری",
      category: "تعویضی ها",
      originalPrice: 360000,
      discountPrice: 280000,
      quantity: 1,
      image: "assets/images/new-img/oil.webp",
    },
  ]);

  const handleQuantityChange = (id, increment) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(1, product.quantity + increment) }
          : product
      )
    );
  };

  const handleRemoveProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const calculateTotal = () => {
    const productsTotal = products.reduce(
      (total, product) => total + product.discountPrice * product.quantity,
      0
    );
    const shippingCost = 140000; // ثابت هزینه ارسال
    return productsTotal + shippingCost;
  };

  return (
    <section className="my-14 mt-4 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div className="bg-white p-6 rounded-3xl mb-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <a href="#" className="inline-flex items-center">
                  خانه
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                  <a href="#" className="mr-1 text-sm font-medium">
                    سبد خرید
                  </a>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {products.length === 0 ? (
          <div className="text-center text-xl font-bold text-red-500">
            سبد خرید شما خالی است
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-9">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-200 relative rounded-3xl p-4 flex flex-col md:flex-row items-center  mb-4 gap-16"
                >
                       <button
                      onClick={() => handleRemoveProduct(product.id)}
                      className="text-red-500 absolute left-3 top-3 text-lg  lg:hidden"
                    >
                      x 
                    </button>
                  <div className="flex gap-1 items-center w-full lg:w-1/2">
                    <div>
                      <img
                        className="w-32 border rounded-2xl"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="leading-10">
                      <h1 className="font-YekanBakh-ExtraBold text-base">
                        {product.name}
                      </h1>
                      <p>دسته بندی: {product.category}</p>
                      <div className="priceTagMobile flex gap-4 text-base mt-4">
                      <span className="line-through">
                        {new Intl.NumberFormat("fa-IR").format(
                          product.originalPrice
                        )}{" "}
                      </span>
                      <span className="text-yellow-500">
                        {new Intl.NumberFormat("fa-IR").format(
                          product.discountPrice
                        )}{" "}
                      </span>
                     </div>
                    </div>
                  </div>
                  <div  className="flex gap-1 items-center w-full lg:w-1/2">
                    <div className="priceTag flex gap-4 text-base mt-4">
                      <span className="line-through">
                        {new Intl.NumberFormat("fa-IR").format(
                          product.originalPrice
                        )}{" "}
                      </span>
                      <span className="text-yellow-500">
                        {new Intl.NumberFormat("fa-IR").format(
                          product.discountPrice
                        )}{" "}
                      </span>
                    </div>
                    <div>
                      <div className="number flex">
                        <span className="minus p-4">تعداد:</span>
                        <div className="flex border border-gray-700 rounded-md bg-white">
                          <button
                            onClick={() => handleQuantityChange(product.id, -1)}
                            className="p-2"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={product.quantity}
                            className="input text-center w-20"
                            readOnly
                          />
                          <button
                            onClick={() => handleQuantityChange(product.id, 1)}
                            className="p-2"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      className="text-red-500  text-lg hidden lg:block"
                    >
                      حذف 
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-span-12 md:col-span-3">
              <div className="bg-white rounded-3xl p-8">
                <div className="flex flex-col font-YekanBakh-ExtraBold text-lg">
                  <div className="flex items-center justify-between p-4 bg-yellow-100 rounded-lg">
                    <span>تعداد خرید:</span>
                    <span>
                      {products.reduce(
                        (total, product) => total + product.quantity,
                        0
                      )}{" "}
                      عدد
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <span>مبلغ کل:</span>
                    <span>
                      {new Intl.NumberFormat("fa-IR").format(
                        products.reduce(
                          (total, product) =>
                            total + product.discountPrice * product.quantity,
                          0
                        )
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-100 rounded-lg">
                    <span>هزینه ارسال:</span>
                    <span>{new Intl.NumberFormat("fa-IR").format(140000)}</span>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <span>مبلغ نهایی:</span>
                    <span>
                      {new Intl.NumberFormat("fa-IR").format(calculateTotal())}
                    </span>
                  </div>
                  <button className="btn bg-stone-800 hover:bg-stone-900 text-white">
                    پرداخت
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
