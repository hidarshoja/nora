import React from 'react'
import { Link } from 'react-router-dom'

export default function DesktopShop({handleFilterChange , categories , handleFilter , activeCategory , handleBrandFilterChange , currentProducts}) {
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
              onClick={() => handleFilterChange("cheapest")}
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
              onClick={() => handleFilterChange("expensive")}
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
              onClick={() => handleFilterChange("bestselling")}
            />
          </div>
          <div className="flex items-center gap-1  w-full justify-between">
            <label htmlFor="popular2">محبوب ترین</label>
            <input
              type="radio"
              id="popular2"
              name="price"
              value="popular"
              className="radio radio-warning"
              onClick={() => handleFilterChange("popular")}
            />
          </div>
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
          {categories?.map((category, index) => (
            <li key={index}>
              <button
                onClick={() => handleFilter(category.standard)}
                className={`${
                  activeCategory === category.standard
                    ? "text-blue-500 font-bold"
                    : "text-gray-900"
                } hover:text-blue-500`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="rounded-3xl mb-4 p-4"
        style={{ backgroundColor: "gainsboro" }}
      >
        <h3 className="font-YekanBakh-ExtraBold text-base">برندها:</h3>
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center gap-1  w-full justify-between">
            <label htmlFor="saipa">سایپا</label>
            <input
              type="radio"
              id="saipa"
              name="brand"
              value="saipa"
              className="radio radio-warning"
              onClick={() => handleBrandFilterChange("saipa")}
            />
          </div>
          <div className="flex items-center gap-1  w-full justify-between">
            <label htmlFor="iranKhodo">ایران خودرو</label>
            <input
              type="radio"
              id="iranKhodo"
              name="brand"
              value="iranKhodo"
              className="radio radio-warning"
              onClick={() => handleBrandFilterChange("iranKhodo")}
            />
          </div>
          <div className="flex items-center gap-1 w-full justify-between">
            <label htmlFor="chinese">چینی</label>
            <input
              type="radio"
              id="chinese"
              name="brand"
              value="chinese"
              className="radio radio-warning"
              onClick={() => handleBrandFilterChange("chinese")}
            />
          </div>
          <label className="flex items-center justify-between">
            <span>دیگر</span>
            <input
              type="radio"
              name="brand"
              value="other"
              className="radio radio-warning"
              onClick={() => handleBrandFilterChange("other")}
            />
          </label>
          <label className="flex items-center justify-between">
            <span>همه</span>
            <input
              type="radio"
              name="brand"
              value="all"
              className="radio radio-warning"
              onClick={() => handleBrandFilterChange("all")}
            />
          </label>
        </div>
      </div>
    </div>

    {/* Products */}
    <div className="col-span-12 lg:col-span-9 order-1 lg:order-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProducts?.map((product, index) => (
          <div
            key={index}
            className="rounded-3xl leading-10 p-4"
            style={{ background: "gainsboro" }}
          >
            <a
              href="#"
              className="flex flex-col items-center justify-center"
            >
              <img className="mb-4 h-60" src={product.image} alt="" />
            </a>
            <div className="text-center">
              <Link to={`/shop/${product.id}`}>
                <h3 className="font-YekanBakh-ExtraBold text-base">
                  {product.title}
                </h3>
              </Link>
              <div className="flex justify-center gap-4 text-base mt-4">
                <span className="line-through">
                  {new Intl.NumberFormat("fa-IR").format(
                    product.originalPrice
                  )}{" "}
                  تومان
                </span>
                <span className="text-yellow-500">
                  {new Intl.NumberFormat("fa-IR").format(
                    product.discountedPrice
                  )}{" "}
                  تومان
                </span>
              </div>
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
        ))}
      </div>
    </div>
  </div>
  )
}
