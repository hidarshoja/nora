import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useCart from "../hooks/useCart";
import useGet from "../hooks/useGet";
import { handleToast } from "../utils/message";

const Cart = () => {
  const { cart, setCart, removeFromCart, changeQuantity, totalPrice } = useCart()
  const { data, refetch } = useGet(['product'], '/product?all=true')
  const { data: option, isLoading } = useGet(['options'], '/setting/about-us/key/post_cost')


  const navigate = useNavigate()

  const search = useSearchParams()[0]
  const status = search.get('Status')
  const authority = search.get('Authority')



  useEffect(() => {
    if (status === "OK") {
      navigate('/success', { state: { authority, status } })
    } else if (status === "NOK") {
      console.log("first")
      handleToast('error', 'پرداخت موفق آمیز نبود')
      setTimeout(() => {
        navigate('/cart');
      }, 2000); // Adjust the delay as needed (e.g., 1 second)
    }
  }, [])

  //! Efficiently check and update cart prices
  useEffect(() => {
    if (data && data?.data?.products) {
      const dbProducts = data.data.products;
      let isUpdated = false;

      const updatedCart = cart.reduce((acc, product) => {
        const dbProduct = dbProducts.find((p) => p.id == product.product_id);
        if (dbProduct) {
          if (dbProduct.price !== product.price || dbProduct.price_with_off != product.price_with_off) {
            isUpdated = true;
            acc.push({
              ...product,
              price: dbProduct.price,
              price_with_off: dbProduct.price_with_off,
            });
          } else {
            acc.push(product);
          }
        } else {
          acc.push(product);
        }
        return acc;
      }, []);

      if (isUpdated) {
        setCart(updatedCart);
      }
    }
  }, [data]);

  //! Refetch data every 30 seconds with proper cleanup
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (cart.length === 0) return
      refetch();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [refetch]);

  if (isLoading) {
    return <div>Loading ...</div>
  }
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

        {cart.length === 0 ? (
          <div className="text-center text-xl font-bold text-red-500">
            سبد خرید شما خالی است
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-9">
              {cart.map((product) => (
                <div
                  key={product.product_id}
                  className="bg-gray-200 relative rounded-3xl p-4 flex flex-col md:flex-row items-center  mb-4 gap-16"
                >
                  <button
                    onClick={() => removeFromCart(product.product_id)}
                    className="text-red-500 absolute left-3 top-3 text-lg  lg:hidden"
                  >
                    x
                  </button>
                  <div className="flex gap-1 items-center w-full lg:w-1/3 ">
                    <div>
                      <img
                        className="w-32 border rounded-2xl"
                        src={product?.image ? `${import.meta.env.VITE_API_BASE_URL}${product.image}` : ''}
                        alt={product.image}
                      />
                    </div>
                    <div className="leading-10">
                      <h1 className="font-YekanBakh-ExtraBold text-base">
                        {product.name}
                      </h1>
                      <p>دسته بندی: {product.category}</p>

                    </div>
                  </div>
                  <div className="flex gap-1 items-center w-full lg:w-1/2 justify-between">
                    {product.price_with_off ? (
                      <div className=" flex flex-col gap-4 text-base mt-4">
                        <span className="line-through">
                          {new Intl.NumberFormat("fa-IR").format(
                            product.price
                          )}{" "}ت
                        </span>
                        <span className="text-yellow-500">
                          {new Intl.NumberFormat("fa-IR").format(
                            product.price_with_off
                          )}{" "}ت
                        </span>
                      </div>
                    ) : (
                      <span className="">
                        {new Intl.NumberFormat("fa-IR").format(
                          product.price
                        )}{" "}ت
                      </span>
                    )}


                    <div className=" flex flex-col gap-4 text-base ">
                      <span className="">
                        {new Intl.NumberFormat("fa-IR").format(
                          product.price_with_off ? product.price_with_off * product.amount : product.price * product.amount
                        )}{" "}ت
                      </span>

                    </div>


                    <div>
                      <div className="number flex flex-col items-center md:flex-row">
                        <span className="minus pl-4">تعداد:</span>
                        <div className="flex border border-gray-700 rounded-md bg-white">
                          <button
                            onClick={() => changeQuantity(product.product_id, -1)}
                            className="p-2"
                            disabled={product.amount === 1}
                          >
                            -
                          </button>

                          <input
                            type="text"
                            value={product.amount}
                            className="input text-center w-12"
                            readOnly
                          />
                          <button
                            onClick={() => changeQuantity(product.product_id, 1)}
                            className="p-2"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(product.product_id)}
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
                      {cart?.length}{" "}
                      عدد
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <span>مبلغ کل:</span>
                    <span>
                      {new Intl.NumberFormat("fa-IR").format(totalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-100 rounded-lg">
                    <span>هزینه ارسال:</span>
                    <span>{new Intl.NumberFormat("fa-IR").format(option?.data?.value)}</span>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <span>مبلغ نهایی:</span>
                    <span>
                      {new Intl.NumberFormat("fa-IR").format(totalPrice + Number(option?.data?.value))}
                    </span>
                  </div>
                  <Link to="/check-out">
                    <button className="btn bg-stone-800 hover:bg-stone-900 text-white">
                      پرداخت
                    </button>
                  </Link>
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
