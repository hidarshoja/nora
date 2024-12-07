import React from 'react'

export default function MobileShop({handleCloseFilters , handleChangeFilterSection , activeFilter , handleFilterChange , categories , handleBrandFilterChange , activeCategory , handleFilter}) {
  return (
    <div className="lg:hidden fixed inset-0 z-50 top-[120px] bg-white transform transition-transform ease-in-out duration-300">
            <div className="p-4">
              <div className="flex justify-between items-center border-b pb-2 mb-4">
                <h3 className="text-lg font-bold">فیلترها</h3>
                <button
                  className="text-red-500 font-bold"
                  onClick={handleCloseFilters}
                >
                  بستن
                </button>
              </div>

              <div className="flex justify-around border-b pb-2 mb-4">
                <button
                  className="text-blue-500 py-2 px-1 rounded  hover:bg-blue-200"
                  onClick={() => handleChangeFilterSection("priceFilters")}
                >
                  بر اساس قیمت
                </button>
                <button
                  className="text-blue-500 py-2 px-1 rounded  hover:bg-blue-200"
                  onClick={() => handleChangeFilterSection("categoryFilters")}
                >
                  دسته‌بندی‌ها
                </button>
                <button
                  className="text-blue-500 py-2 px-1 rounded  hover:bg-blue-200"
                  onClick={() => handleChangeFilterSection("brandFilters")}
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
                        onClick={() => handleFilterChange("cheapest")}
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>گران‌ترین</span>
                      <input
                        type="radio"
                        name="price"
                        value="expensive"
                        className="radio radio-warning"
                        onClick={() => handleFilterChange("expensive")}
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>پرفروش‌ترین</span>
                      <input
                        type="radio"
                        name="price"
                        value="popular"
                        className="radio radio-warning"
                        onClick={() => handleFilterChange("bestselling")}
                      />
                    </label>
                    <div className="flex items-center gap-1 w-full justify-between">
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
              )}

              {/* Category Filter */}
              {activeFilter === "categoryFilters" && (
                <div>
                  <h4 className="font-bold mb-2 text-green-600">
                    دسته‌بندی‌ها
                  </h4>
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
              )}

              {/* Brand Filter */}
              {activeFilter === "brandFilters" && (
                <div>
                  <h4 className="font-bold mb-2 text-red-600">
                    فیلتر بر اساس برند
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 w-full justify-between">
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
                    <div className="flex items-center gap-1 w-full justify-between">
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
              )}

              <button
                className="w-full mt-6 bg-[#3E4095] text-white py-3 rounded-lg font-bold"
                onClick={handleCloseFilters}
              >
                مشاهده محصولات
              </button>
            </div>
          </div>
  )
}
