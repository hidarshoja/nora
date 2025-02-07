import React, { useState, useEffect } from 'react';
import { carManufacturers } from '../constant/cars-data';
import { Link } from 'react-router-dom';

export default function DesktopShop({ data, categories, filters, setFilters, addToCart, refetch }) {
  const [localFilters, setLocalFilters] = useState(filters); // local state to avoid unnecessary re-renders

  useEffect(() => {
    // Whenever filters are updated in parent, sync them to local state
    setLocalFilters(filters);
  }, [filters]);

  const handleFilter = (e) => {
    const { name, value } = e.target;

    // Update the local filters state
    setLocalFilters((prev) => ({ ...prev, [name]: value }));

    // Set the filters to the parent
    setFilters((prev) => ({ ...prev, [name]: value }));

    // Refetch after some delay to avoid rapid refetching
    setTimeout(() => {
      refetch();
    }, 300); // 300ms delay before triggering refetch
  };

  const deleteFilter = (name, value) => {
    // Update the local filters state
    setLocalFilters((prev) => ({ ...prev, [name]: value }));

    // Set the filters to the parent
    setFilters((prev) => ({ ...prev, [name]: value }));

    // Refetch after some delay to avoid rapid refetching
    setTimeout(() => {
      refetch();
    }, 300); // 300ms delay before triggering refetch
  };
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-3 order-2 hidden lg:block lg:order-1">
        <div className="rounded-3xl mb-4 p-4" style={{ backgroundColor: "gainsboro" }}>
          <h3 className="font-YekanBakh-ExtraBold text-base">فیلتر بر اساس قیمت:</h3>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center gap-1 w-full justify-between">
              <label htmlFor="cheap">ارزان‌ترین</label>
              <input
                type="radio"
                id="cheap"
                name="price"
                value="cheap"
                className="radio radio-warning"
                checked={filters.price === "cheap"}
                onChange={(e) => handleFilter(e)}
              />
            </div>
            <div className="flex items-center gap-1 w-full justify-between">
              <label htmlFor="expensive">گران‌ترین</label>
              <input
                type="radio"
                id="expensive"
                name="price"
                value="expensive"
                className="radio radio-warning"
                checked={filters.price === "expensive"}
                onChange={(e) => handleFilter(e)}
              />
            </div>
            <div className="flex items-center gap-1 w-full justify-between">
              <label htmlFor="popular">پرفروش‌ترین</label>
              <input
                type="radio"
                id="popular"
                name="price"
                value="popular"
                className="radio radio-warning"
                checked={filters.price === "popular"}
                onChange={(e) => handleFilter(e)}
              />
            </div>
            {filters.price.length > 0 && (
              <button
                className="text-blue-600 text-[14px] text-left py-3"
                onClick={() => deleteFilter('price', '')}
              >
                پاک کردن فیلتر
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="rounded-3xl mb-4 p-4" style={{ backgroundColor: "gainsboro" }}>
          <h3 className="font-YekanBakh-ExtraBold text-base">دسته‌بندی‌ها:</h3>
          <ul className="space-y-2">
            {categories?.data?.map((category, index) => (
              <div className="flex items-center gap-1 w-full justify-between" key={index}>
                <label htmlFor="popular">{category.name}</label>
                <input
                  type="radio"
                  id="popular"
                  name="category"
                  value={category.id}
                  className="radio radio-warning"
                  checked={category.id == filters.category}
                  onChange={(e) => handleFilter(e)}
                />
              </div>
            ))}
          </ul>
          {filters.category > 0 && (
            <button
              className="text-blue-600 w-full text-[14px] text-left py-3"
              onClick={() => deleteFilter('category', 0)}
            >
              پاک کردن فیلتر
            </button>
          )}
        </div>

        {/* Brands */}
        <div className="rounded-3xl mb-4 p-4" style={{ backgroundColor: "gainsboro" }}>
          <h3 className="font-YekanBakh-ExtraBold text-base">برندها:</h3>
          <div className="flex flex-col gap-2 mt-4">
            {carManufacturers?.map((brand, index) => (
              <div key={index} className="flex justify-between items-center">
                <label htmlFor={brand}>{brand}</label>
                <input
                  type="radio"
                  id={brand}
                  name="brand"
                  value={brand}
                  className="radio radio-warning"
                  checked={filters.brand === brand}
                  onChange={(e) => handleFilter(e)}
                />
              </div>
            ))}
            {filters.brand && (
              <button
                className="text-blue-600 w-full text-[14px] text-left py-3"
                onClick={() => deleteFilter('brand', '')}
              >
                پاک کردن فیلتر
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="col-span-12 lg:col-span-9 order-1 lg:order-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.length > 0 ? (
            data.map((product, index) => (
              <div key={index} className="rounded-3xl leading-10 p-4" style={{ background: "gainsboro" }}>
                <Link to={`/shop/${product.slug}`} className="flex flex-col items-center justify-center">
                  <img className="mb-4 h-60" src={product?.images[0]?.image_url ? `${import.meta.env.VITE_API_BASE_URL}${product.images[0].image_url}` : ''} alt="" />
                </Link>
                <div className="text-center">
                  <Link to={`/shop/${product.slug}`}>
                    <h3 className="font-YekanBakh-ExtraBold text-base">{product.name}</h3>
                  </Link>
                  {product.price_with_off ? (
                    <div className="flex justify-center gap-4 text-base mt-4">
                      <span className="line-through">
                        {new Intl.NumberFormat("fa-IR").format(product.price)} تومان
                      </span>
                      <span className="text-yellow-500">
                        {new Intl.NumberFormat("fa-IR").format(product.price_with_off)} تومان
                      </span>
                    </div>
                  ) : (
                    <span className="">
                      {new Intl.NumberFormat("fa-IR").format(product.price)} تومان
                    </span>
                  )}
                  <div className="flex justify-center gap-2 items-center mt-4">
                    {product.amount === 0 ? (
                      <span className="text-red-500">ناموجود</span>
                    ) : (
                      <button
                        className="bg-yellow-500 p-2 text-white rounded-lg"
                        onClick={() => addToCart(product)}
                      >
                        {/* Add to cart icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-12 text-center font-bold my-5">محصولی یافت نشد</div>
          )}
        </div>
      </div>
    </div>
  );
}
