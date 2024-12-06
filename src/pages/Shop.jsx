import React, { useState  , useEffect } from "react";
import { Link } from "react-router-dom";

const FilterComponent = () => {
    const [products, setProducts] = useState(
   [
    {
      title: "جلوبندی و سیبک",
      originalPrice: 50000,
      discountedPrice: 45000,
      image: "assets/images/new-img/sipak2.webp",
      sales: 30,
      popularity: 4.8,
      prand : "saipa"
    },
    {
      title: "روغن موتور اسپیدی",
      originalPrice: 1080000,
      discountedPrice: 900000,
      image: "assets/images/new-img/oil2.webp",
      sales: 30,
      popularity: 4.8,
       prand : "saipa"
    },
    {
      title: "باتری وارنا",
      originalPrice: 630000,
      discountedPrice: 430000,
      image: "assets/images/new-img/butri.webp",
      sales: 30,
      popularity: 4.8,
       prand : "saipa"
    },
    {
      title: "دیسک و لنت ترمز",
      originalPrice: 600000,
      discountedPrice: 420000,
      image: "assets/images/new-img/disck2.webp",
      sales: 20,
      popularity: 2.8,
       prand : "chinese"
    },
    {
      title: "لاستیک بارز",
      originalPrice: 360000,
      discountedPrice: 280000,
      image: "assets/images/new-img/tire.webp",
      sales: 80,
      popularity: 4.6,
       prand : "other"
    },
    {
      title: "روغن اسپیدی",
      originalPrice: 140000,
      discountedPrice: 90000,
      image: "assets/images/new-img/oil.webp",
      sales: 70,
      popularity: 4.9,
       prand : "other"
    },
    {
      title: "فیلتر دو زمانه",
      originalPrice: 960000,
      discountedPrice: 425000,
      image: "assets/images/new-img/filter2.webp",
      sales: 35,
      popularity: 4.7,
       prand : "saipa"
    },
    {
      title: "برف پاک کن",
      originalPrice: 50000,
      discountedPrice: 45000,
      image: "assets/images/new-img/ezam.webp",
      sales: 40,
      popularity: 4.8,
       prand : "iranKhodo"
    },
    {
      title: "فیلتر",
      originalPrice: 960000,
      discountedPrice: 425000,
      image: "assets/images/new-img/filter.webp",
      sales: 30,
      popularity: 4,
       prand : "iranKhodo"
    },
  ]);
  const [filter, setFilter] = useState("all"); 
  const [brandFilter, setBrandFilter] = useState("all");
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("priceFilters");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilterChange = (filterType) => {
    
    setFilter(filterType);
  };

  const handleBrandFilterChange = (brand) => {
    setBrandFilter(brand);
  };

  const handleOpenFilters = () => {
    setFiltersOpen(true);
  };

  const handleCloseFilters = () => {
    setFiltersOpen(false);
  };

  const handleChangeFilterSection = (section) => {
    setActiveFilter(section);
  };



  useEffect(() => {
    let filteredByBrand = [...products];
    if (brandFilter !== "all") {
      filteredByBrand = filteredByBrand.filter(
        (product) => product.prand === brandFilter
      );
    }

    let sortedProducts = [...filteredByBrand];
    if (filter === "cheapest") {
      sortedProducts.sort((a, b) => a.originalPrice - b.originalPrice);
    } else if (filter === "expensive") {
      sortedProducts.sort((a, b) => b.originalPrice - a.originalPrice);
    } else if (filter === "bestselling") {
      sortedProducts.sort((a, b) => b.sales - a.sales);
    } else if (filter === "popular") {
      sortedProducts.sort((a, b) => b.popularity - a.popularity);
    }

    setFilteredProducts(sortedProducts);
  }, [filter, brandFilter, products]);

  return (
    <section className="my-14 mt-4 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div
          className="p-6 rounded-3xl mb-4"
          style={{
            backgroundColor: "gainsboro",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
                    فروشگاه
                  </a>
                </div>
              </li>
            </ol>
          </nav>
          <button
            className="lg:hidden fixed bottom-4 right-4 p-4 text-white bg-[#3E4095] rounded-full shadow-lg z-50"
            onClick={handleOpenFilters}
          >
            مشاهده فیلترها
          </button>
        </div>

        {/* Mobile Filters */}
        {isFiltersOpen && (
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
                  className="text-blue-500 font-bold"
                  onClick={() => handleChangeFilterSection("priceFilters")}
                >
                  فیلتر بر اساس قیمت
                </button>
                <button
                  className="text-blue-500 font-bold"
                  onClick={() => handleChangeFilterSection("categoryFilters")}
                >
                  دسته‌بندی‌ها
                </button>
                <button
                  className="text-blue-500 font-bold"
                  onClick={() => handleChangeFilterSection("brandFilters")}
                >
                  فیلتر بر اساس برند
                </button>
              </div>

              {/* Price Filter */}
              {activeFilter === "priceFilters" && (
                <div>
                  <h4 className="font-bold mb-2">فیلتر بر اساس قیمت</h4>
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
              )}

              {/* Category Filter */}
              {activeFilter === "categoryFilters" && (
                <div>
                  <h4 className="font-bold mb-2">دسته‌بندی‌ها</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/blocking" className="text-blue-500 hover:text-blue-900">
                        قطعات جلوبندی
                      </Link>
                    </li>
                    <li>
                    <Link to="#" className="text-gray-900 hover:text-blue-500">
                        قطعات موتوری
                      </Link>
                    </li>
                    <li>
                      
                    <Link to="#" className="text-gray-900 hover:text-blue-500">
                        قطعات فرمان
                      </Link>
                    </li>
                    <li>
                    <Link to="#" className="text-gray-900 hover:text-blue-500">
                        تزیینات
                      </Link>
                    </li>
                  </ul>
                </div>
              )}

              {/* Brand Filter */}
              {activeFilter === "brandFilters" && (
                <div>
                  <h4 className="font-bold mb-2">فیلتر بر اساس برند</h4>
                  <div className="space-y-2">
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
              )}

              <button
                className="w-full mt-6 bg-[#3E4095] text-white py-3 rounded-lg font-bold"
                onClick={handleCloseFilters}
              >
                 مشاهده محصولات
              </button>
            </div>
          </div>
        )}

        {/* Desktop Filters */}
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
                <li>
                  <Link to="/blocking" className="text-gray-900 hover:text-blue-500">
                    قطعات جلوبندی
                  </Link>
                </li>
                <li>
                <Link to="#" className="text-gray-900 hover:text-blue-500">
                    قطعات موتوری
                  </Link>
                </li>
                <li>
                <Link to="#" className="text-gray-900 hover:text-blue-500">
                    قطعات فرمان
                  </Link>
                </li>
                <li>
                <Link to="#" className="text-gray-900 hover:text-blue-500">
                    تزیینات
                  </Link>
                </li>
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
              {filteredProducts?.map((product, index) => (
             
                <div key={index} className="rounded-3xl leading-10 p-4" style={{background:"gainsboro"}}>
                <a href="#" className="flex flex-col items-center justify-center">
                  <img className="mb-4" src={product.image} alt="" />
                </a>
              <div className="text-center">
                <a href="#">
                <h3 className="font-YekanBakh-ExtraBold text-base"> 
                {product.title}
                </h3></a>
                <div className="flex justify-center gap-4 text-base mt-4">
                  <span className="line-through">
                    {new Intl.NumberFormat('fa-IR').format(product.originalPrice)} تومان
                  
                  </span>
                  <span className="text-yellow-500">
                    {new Intl.NumberFormat('fa-IR').format(product.discountedPrice)} تومان
           
                  </span>
                </div>    
                <div className="flex justify-center gap-2 items-center mt-4">
                  <Link className="bg-yellow-500 p-2 text-white rounded-lg" to="/cart">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>                          
                  </Link>
               
                </div>  
              </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterComponent;
