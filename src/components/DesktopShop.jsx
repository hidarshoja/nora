import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { carManufacturers } from '../constant/cars-data'

export default function DesktopShop({ data, categories, filters, setFilters }) {

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-3 order-2 hidden lg:block lg:order-1">
        <div
          className="rounded-3xl mb-4 p-4"
          style={{ backgroundColor: "gainsboro" }}
        >
          <h3 className="font-YekanBakh-ExtraBold text-base">
            فیلتر بر اساس قیمت:
          </h3>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center gap-1  w-full justify-between">
              <label htmlFor="cheap">ارزان‌ترین</label>
              <input
                type="radio"
                id="cheap"
                name="price"
                value="cheap"
                className="radio radio-warning"
                checked={filters.price === "cheap"}
                onChange={(e) => setFilters(prev => ({ ...prev, price: e.target.value }))}
              />
            </div>
            <div className="flex items-center gap-1  w-full justify-between">
              <label htmlFor="expensive">گران‌ترین</label>
              <input
                type="radio"
                id="expensive"
                name="price"
                value="expensive"
                className="radio radio-warning"
                checked={filters.price === "expensive"}
                onChange={(e) => setFilters(prev => ({ ...prev, price: e.target.value }))}
              />
            </div>

            <div className="flex items-center gap-1  w-full justify-between">
              <label htmlFor="popular">پرفروش‌ترین</label>
              <input
                type="radio"
                id="popular"
                name="price"
                value="popular"
                className="radio radio-warning"
                checked={filters.price === "popular"}
                onChange={(e) => setFilters(prev => ({ ...prev, price: e.target.value }))}
              />
            </div>
            {/* <div className="flex items-center gap-1  w-full justify-between">
              <label htmlFor="popular2">محبوب ترین</label>
              <input
                type="radio"
                id="popular2"
                name="price"
                value="popular"
                className="radio radio-warning"
              />
            </div> */}
            {filters.price.length > 0 && (
              <button
                className='text-blue-600 text-[14px] text-left py-3'
                onClick={() => setFilters(prev => ({ ...prev, price: "" }))
                }>
                پاک کردن فیلتر
              </button>
            )}

          </div>
        </div>

        <div
          className="rounded-3xl mb-4 p-4"
          style={{ backgroundColor: "gainsboro" }}
        >
          <h3 className="font-YekanBakh-ExtraBold text-base">
            دسته‌بندی‌ها:
          </h3>
          <ul className="space-y-2">
            {categories?.data && categories?.data?.map((category, index) => (
              <li key={index}>
                <button
                  className={`${filters.category === category.id
                    ? "text-blue-500 font-bold"
                    : "text-gray-900"
                    } hover:text-blue-500`}
                  onClick={(e) => setFilters(prev => ({ ...prev, category: category.id }))}
                >


                  {category.name}
                </button>
              </li>
            ))}

          </ul>
          {filters.category > 0 && (
            <button
              className='text-blue-600 w-full text-[14px] text-left py-3'
              onClick={() => setFilters(prev => ({ ...prev, category: 0 }))
              }>
              پاک کردن فیلتر
            </button>
          )}
        </div>

        <div
          className="rounded-3xl mb-4 p-4"
          style={{ backgroundColor: "gainsboro" }}
        >
          <h3 className="font-YekanBakh-ExtraBold text-base">برندها:</h3>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex flex-col  gap-1  w-full justify-between">
              {carManufacturers && carManufacturers.map((brand, index) => (
                <div className='flex justify-between items-center' key={index}>
                  <label htmlFor="saipa">{brand}</label>
                  <input
                    type="radio"
                    id="saipa"
                    name="brand"
                    value="saipa"
                    className="radio radio-warning"
                    checked={filters.brand === brand}
                    onChange={(e) => setFilters(prev => ({ ...prev, brand }))}
                  />

                </div>

              ))}
              {filters.brand.length > 0 && (
                <button
                  className='text-blue-600 w-full text-[14px] text-left py-3'
                  onClick={() => setFilters(prev => ({ ...prev, brand: '' }))
                  }>
                  پاک کردن فیلتر
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Products */}
      <div className="col-span-12 lg:col-span-9 order-1 lg:order-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.length > 0 ? data.map((product, index) => (
            <div
              key={index}
              className="rounded-3xl leading-10 p-4"
              style={{ background: "gainsboro" }}
            >
              <Link
                to={`/shop/${product.slug}`}
                className="flex flex-col items-center justify-center"
              >
                <img className="mb-4 h-60" src={product?.images[0]?.image_url ? `${import.meta.env.VITE_API_BASE_URL}${product.images[0].image_url}` : ''} alt="" />
              </Link>
              <div className="text-center">
                <Link to={`/shop/${product.slug}`}>
                  <h3 className="font-YekanBakh-ExtraBold text-base">
                    {product.name}
                  </h3>
                </Link>
                {product.price_with_off ? (
                  <div className="flex justify-center gap-4 text-base mt-4">
                    <span className="line-through">
                      {new Intl.NumberFormat("fa-IR").format(
                        product.price
                      )}{" "}
                      تومان
                    </span>
                    <span className="text-yellow-500">
                      {new Intl.NumberFormat("fa-IR").format(
                        product.price_with_off
                      )}{" "}
                      تومان
                    </span>
                  </div>
                ) : (
                  <span className="">
                    {new Intl.NumberFormat("fa-IR").format(
                      product.price
                    )}{" "}
                    تومان
                  </span>
                )}

                <div className="flex justify-center gap-2 items-center mt-4">
                  <Link
                    className="bg-yellow-500 p-2 text-white rounded-lg"
                    to="/cart"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )) : (
            <div className='col-span-12 text-center font-bold my-5'>محصولی یافت نشد</div>
          )}
        </div>
      </div>
    </div>
  )
}
