import React, { useState } from 'react'
import { carManufacturers } from '../constant/cars-data'

export default function MobileShop({ categories, filters, setFilters, setIsFiltersOpen }) {
  const [activeFilter, setActiveFilter] = useState('priceFilters')
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);


  const handleFilter = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
    setFilters((prev) => ({ ...prev, [name]: value }));
    setTimeout(() => {
      refetch();
    }, 300);
  };

  const deleteFilter = (name, value) => {
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
    setFilters((prev) => ({ ...prev, [name]: value }));
    setTimeout(() => {
      refetch();
    }, 300);
  };

  return (
    <div className="lg:hidden fixed inset-0 z-50 top-[120px] bg-white transform transition-transform ease-in-out duration-300">
      <div className="p-4">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-bold">فیلترها</h3>
          <button
            className="text-red-500 font-bold"
            onClick={() => setIsFiltersOpen(false)}
          >
            بستن
          </button>
        </div>

        <div className="flex justify-around border-b pb-2 mb-4">
          <button
            className="text-blue-500 py-2 px-1 rounded  hover:bg-blue-200"
            onClick={() => setActiveFilter("priceFilters")}
          >
            بر اساس قیمت
          </button>
          <button
            className="text-blue-500 py-2 px-1 rounded  hover:bg-blue-200"
            onClick={() => setActiveFilter("categoryFilters")}
          >
            دسته‌بندی‌ها
          </button>
          <button
            className="text-blue-500 py-2 px-1 rounded  hover:bg-blue-200"
            onClick={() => setActiveFilter("brandFilters")}
          >
            بر اساس برند
          </button>
        </div>

        {/* Price Filter */}
        {activeFilter === "priceFilters" && (
          <div>
            <h4 className="font-bold mb-2 text-blue-600">
              فیلتر بر اساس قیمت
            </h4>
            <div className="space-y-2">
              <label className="flex items-center justify-between">
                <span>ارزان‌ترین</span>
                <input
                  type="radio"
                  name="price"
                  value="cheap"
                  className="radio radio-warning"
                  checked={filters.price === 'cheap'}
                  onChange={(e) => handleFilter(e)}
                />
              </label>
              <label className="flex items-center justify-between">
                <span>گران‌ترین</span>
                <input
                  type="radio"
                  name="price"
                  value="expensive"
                  className="radio radio-warning"
                  checked={filters.price === 'expensive'}
                  onChange={(e) => handleFilter(e)}
                />
              </label>
              <label className="flex items-center justify-between">
                <span>پرفروش‌ترین</span>
                <input
                  type="radio"
                  name="price"
                  value="popular"
                  className="radio radio-warning"
                  checked={filters.price === 'popular'}
                  onChange={(e) => handleFilter(e)}
                />
              </label>
              
              {filters.price.length > 0 && (
                <button
                  className='text-blue-600 text-[14px] w-full text-left py-3'
                  onClick={(e) => deleteFilter('price','')}>
                  پاک کردن فیلتر
                </button>
              )}
            </div>
          </div>
        )}

        {/* Category Filter */}
        {activeFilter === "categoryFilters" && (
          <div>
            <h4 className="font-bold mb-2 text-green-600">
              دسته‌بندی‌ها
            </h4>
            <ul className="space-y-2">
              {categories?.data && categories?.data?.map((category, index) => (
                <label className="flex items-center justify-between">
                  <span>{category.name}</span>
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    className="radio radio-warning"
                    checked={filters.category == category.id}
                    onChange={(e) => handleFilter(e)}
                  />
                </label>
              ))}
            </ul>
            {filters.category > 0 && (
              <button
                className='text-blue-600 w-full text-[14px] text-left py-3'
                onClick={() => deleteFilter('category',0)}>
                پاک کردن فیلتر
              </button>
            )}
          </div>
        )}

        {/* Brand Filter */}
        {activeFilter === "brandFilters" && (
          <div>
            <h4 className="font-bold mb-2 text-red-600">
              فیلتر بر اساس برند
            </h4>
            <div className="space-y-2">
              <div className="flex flex-col items-center gap-1 w-full justify-between">
                {carManufacturers.map((brand, index) => (
                  <div key={index} className="flex w-full justify-between gap-1">
                    <label htmlFor="saipa">{brand}</label>
                    <input
                      type="radio"
                      id="saipa"
                      name="brand"
                      value="saipa"
                      className="radio radio-warning"
                      checked={filters.brand === brand}
                      onChange={(e) => handleFilter(e)}
                    />
                  </div>
                ))}

              </div>
              {filters.brand.length > 0 && (
                <button
                  className='text-blue-600 w-full text-[14px] text-left py-3'
                  onClick={() => deleteFilter('brand', '')}>
                  پاک کردن فیلتر
                </button>
              )}
            </div>
          </div>
        )}

        <button
          className="w-full mt-6 bg-[#3E4095] text-white py-3 rounded-lg font-bold"
          onClick={() => setIsFiltersOpen(false)}
        >
          مشاهده محصولات
        </button>
      </div>
    </div>
  )
}
