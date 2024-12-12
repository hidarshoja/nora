import  { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MobileShop from "../components/MobileShop";
import DesktopShop from "../components/DesktopShop";

const FilterComponent = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "سیبک فرمان پراید",
      originalPrice: 500000,
      discountedPrice: 450000,
      image: "/assets/images/new-img/sipak12.jpg",
      sales: 30,
      popularity: 4.8,
      prand: "saipa",
      category: "steering", 
    },
    {
      id: 2,
      title: "طبق بوش لاستیکی و فلزی پراید",
      originalPrice: 1080000,
      discountedPrice: 900000,
      image: "/assets/images/new-img/sipak13.jpg",
      sales: 30,
      popularity: 4.8,
      prand: "saipa",
      category: "suspension", // جلوبندی
    },
    {
      id: 3,
      title: "لاستیک تعادل پراید",
      originalPrice: 630000,
      discountedPrice: 430000,
      image: "assets/images/new-img/lastik2.jpg",
      sales: 30,
      popularity: 4.8,
      prand: "saipa",
      category: "suspension", // جلوبندی
    },
    {
      id: 4,
      title: "لاستیک چاکدار پراید",
      originalPrice: 600000,
      discountedPrice: 420000,
      image: "/assets/images/new-img/lastic.jpg",
      sales: 20,
      popularity: 2.8,
      prand: "saipa",
      category: "suspension", // جلوبندی
    },
    {
      id: 5,
      title: "طبق چپ و راست تیبا",
      originalPrice: 360000,
      discountedPrice: 280000,
      image: "/assets/images/new-img/sipak10.jpg",
      sales: 80,
      popularity: 4.6,
      prand: "saipa",
      category: "suspension", // جلوبندی
    },
    {
      id: 6,
      title: "سیبک تیبا",
      originalPrice: 140000,
      discountedPrice: 90000,
      image: "assets/images/new-img/sipak9.jpg",
      sales: 70,
      popularity: 4.9,
      prand: "saipa",
      category: "steering", // فرمان
    },
    {
      id: 7,
      title: "میل موج گیر تیبا",
      originalPrice: 960000,
      discountedPrice: 425000,
      image: "assets/images/new-img//sipak7.jpg",
      sales: 35,
      popularity: 4.7,
      prand: "saipa",
      category: "suspension", // جلوبندی
    },
    {
      id: 8,
      title: "لاستیک چاکدار تیبا",
      originalPrice: 50000,
      discountedPrice: 45000,
      image: "/assets/images/new-img/lastic3.jpg",
      sales: 40,
      popularity: 4.8,
      prand: "saipa",
      category: "suspension", // جلوبندی
    },
    {
      id: 9,
      title: "بوش تعادل تیبا",
      originalPrice: 960000,
      discountedPrice: 425000,
      image: "/assets/images/new-img/lastic4.jpg",
      sales: 30,
      popularity: 4,
      prand: "saipa",
      category: "suspension", // جلوبندی
    },
    {
      id: 10,
      title: "جلوبندی و سیبک",
      originalPrice: 50000,
      discountedPrice: 45000,
      image: "assets/images/new-img/sipak2.webp",
      sales: 30,
      popularity: 4.8,
      prand: "saipa",
      category: "suspension", // جلوبندی
    },
    {
      id: 11,
      title: "روغن موتور اسپیدی",
      originalPrice: 1080000,
      discountedPrice: 900000,
      image: "assets/images/new-img/oil2.webp",
      sales: 30,
      popularity: 4.8,
      prand: "saipa",
      category: "engine", // موتوری
    },
    {
      id: 12,
      title: "باتری وارنا",
      originalPrice: 630000,
      discountedPrice: 430000,
      image: "assets/images/new-img/butri.webp",
      sales: 30,
      popularity: 4.8,
      prand: "saipa",
      category: "electrical", // برقی
    },
    {
      id: 13,
      title: "دیسک و لنت ترمز",
      originalPrice: 600000,
      discountedPrice: 420000,
      image: "assets/images/new-img/disck2.webp",
      sales: 20,
      popularity: 2.8,
      prand: "chinese",
      category: "standard", // استاندار
    },
    {
      id: 14,
      title: "لاستیک بارز",
      originalPrice: 360000,
      discountedPrice: 280000,
      image: "assets/images/new-img/tire.webp",
      sales: 80,
      popularity: 4.6,
      prand: "other",
      category: "standard", // استاندار
    },
    {
      id: 15,
      title: "روغن اسپیدی",
      originalPrice: 140000,
      discountedPrice: 90000,
      image: "assets/images/new-img/oil.webp",
      sales: 70,
      popularity: 4.9,
      prand: "other",
      category: "engine", // موتوری
    },
    {
      id: 16,
      title: "فیلتر دو زمانه",
      originalPrice: 960000,
      discountedPrice: 425000,
      image: "assets/images/new-img/filter2.webp",
      sales: 35,
      popularity: 4.7,
      prand: "saipa",
      category: "engine", // موتوری
    },
    {
      id: 17,
      title: "برف پاک کن",
      originalPrice: 50000,
      discountedPrice: 45000,
      image: "assets/images/new-img/ezam.webp",
      sales: 40,
      popularity: 4.8,
      prand: "iranKhodo",
      category: "decoration", // تزیینات
    },
    {
      id: 18,
      title: "فیلتر",
      originalPrice: 960000,
      discountedPrice: 425000,
      image: "assets/images/new-img/filter.webp",
      sales: 30,
      popularity: 4,
      prand: "iranKhodo",
      category: "engine", // موتوری
    },
    {
      id: 19,
      title: "پوسته گیریبکس سمند",
      originalPrice: 1960000,
      discountedPrice: 1425000,
      image: "assets/images/new-img/lent5.png",
      sales: 30,
      popularity: 4,
      prand: "iranKhodo",
      category: "gearbox", // گیریبکس
    },
    {
      id: 20,
      title: "لامپ سمند",
      originalPrice: 960000,
      discountedPrice: 425000,
      image: "assets/images/new-img/light2.png",
      sales: 30,
      popularity: 4,
      prand: "iranKhodo",
      category: "electrical", // برقی
    },
    {
      id: 21,
      title: "هیدرولیک فرمان سمند",
      originalPrice: 9160000,
      discountedPrice: 8425000,
      image: "assets/images/new-img/griboks.jpg",
      sales: 30,
      popularity: 4,
      prand: "iranKhodo",
      category: "steering", // فرمان
    },
    {
      id: 22,
      title: "رینگ سمند",
      originalPrice: 96000,
      discountedPrice: 84500,
      image: "assets/images/new-img/ring.webp",
      sales: 30,
      popularity: 4,
      prand: "iranKhodo",
      category: "decoration", // تزیینات
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState(null);
  const productsPerPage = 6;
  const [searchParams] = useSearchParams();

  const categories = [
    {id : 1 , name: "قطعات جلوبندی", standard: "suspension" },
    {id : 2 , name: "قطعات موتوری", standard: "engine" },
    {id : 3 , name: "قطعات فرمان", standard: "steering" },
    {id : 4 , name: "قطعات برقی", standard: "electrical" },
    {id : 5 , name: "قطعات گیریبکس", standard: "gearbox" },
    {id : 6 , name: "تزیینات", standard: "decoration" },
    {id : 7 , name: "مکانیزم و استاندارد", standard: "standard" },
    {id : 8 , name: "تمام محصولات", standard: "" },
  ];
  const [filter, setFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("priceFilters");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const handleFilter = (category) => {
    if (category === "") {
      setFilteredProducts(products);
      setActiveCategory(category);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setActiveCategory(category);
      setFilteredProducts(filtered);
      setCurrentPage(1);
    }
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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

  useEffect(() => {
    // دریافت categoryId از Query Params
    const categoryId = searchParams.get("category");
    if (categoryId) {
      const category = categories.find((cat) => cat.id === parseInt(categoryId));
      if (category) {
        setActiveCategory(category.standard); // تنظیم دسته فعال
        const filtered = products.filter(
          (product) => product.category === category.standard
        );
        setFilteredProducts(filtered);
      }
    } else {
      setActiveCategory(""); // هیچ دسته‌ای انتخاب نشده
      setFilteredProducts(products);
    }
  }, [searchParams]);

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
          // <div className="lg:hidden fixed inset-0 z-50 top-[120px] bg-white transform transition-transform ease-in-out duration-300">
          //   <div className="p-4">
          //     <div className="flex justify-between items-center border-b pb-2 mb-4">
          //       <h3 className="text-lg font-bold">فیلترها</h3>
          //       <button
          //         className="text-red-500 font-bold"
          //         onClick={handleCloseFilters}
          //       >
          //         بستن
          //       </button>
          //     </div>

          //     <div className="flex justify-around border-b pb-2 mb-4">
          //       <button
          //         className="text-blue-500 py-2 px-1 rounded  hover:bg-blue-200"
          //         onClick={() => handleChangeFilterSection("priceFilters")}
          //       >
          //         بر اساس قیمت
          //       </button>
          //       <button
          //         className="text-blue-500 py-2 px-1 rounded  hover:bg-blue-200"
          //         onClick={() => handleChangeFilterSection("categoryFilters")}
          //       >
          //         دسته‌بندی‌ها
          //       </button>
          //       <button
          //         className="text-blue-500 py-2 px-1 rounded  hover:bg-blue-200"
          //         onClick={() => handleChangeFilterSection("brandFilters")}
          //       >
          //         بر اساس برند
          //       </button>
          //     </div>

          //     {/* Price Filter */}
          //     {activeFilter === "priceFilters" && (
          //       <div>
          //         <h4 className="font-bold mb-2 text-blue-600">
          //           فیلتر بر اساس قیمت
          //         </h4>
          //         <div className="space-y-2">
          //           <label className="flex items-center justify-between">
          //             <span>ارزان‌ترین</span>
          //             <input
          //               type="radio"
          //               name="price"
          //               value="cheap"
          //               className="radio radio-warning"
          //               onClick={() => handleFilterChange("cheapest")}
          //             />
          //           </label>
          //           <label className="flex items-center justify-between">
          //             <span>گران‌ترین</span>
          //             <input
          //               type="radio"
          //               name="price"
          //               value="expensive"
          //               className="radio radio-warning"
          //               onClick={() => handleFilterChange("expensive")}
          //             />
          //           </label>
          //           <label className="flex items-center justify-between">
          //             <span>پرفروش‌ترین</span>
          //             <input
          //               type="radio"
          //               name="price"
          //               value="popular"
          //               className="radio radio-warning"
          //               onClick={() => handleFilterChange("bestselling")}
          //             />
          //           </label>
          //           <div className="flex items-center gap-1 w-full justify-between">
          //             <label htmlFor="popular2">محبوب ترین</label>
          //             <input
          //               type="radio"
          //               id="popular2"
          //               name="price"
          //               value="popular"
          //               className="radio radio-warning"
          //               onClick={() => handleFilterChange("popular")}
          //             />
          //           </div>
          //         </div>
          //       </div>
          //     )}

          //     {/* Category Filter */}
          //     {activeFilter === "categoryFilters" && (
          //       <div>
          //         <h4 className="font-bold mb-2 text-green-600">
          //           دسته‌بندی‌ها
          //         </h4>
          //         <ul className="space-y-2">
          //           {categories.map((category, index) => (
          //             <li key={index}>
          //               <button
          //                 onClick={() => handleFilter(category.standard)}
          //                 className={`${
          //                   activeCategory === category.standard
          //                     ? "text-blue-500 font-bold"
          //                     : "text-gray-900"
          //                 } hover:text-blue-500`}
          //               >
          //                 {category.name}
          //               </button>
          //             </li>
          //           ))}
          //         </ul>
          //       </div>
          //     )}

          //     {/* Brand Filter */}
          //     {activeFilter === "brandFilters" && (
          //       <div>
          //         <h4 className="font-bold mb-2 text-red-600">
          //           فیلتر بر اساس برند
          //         </h4>
          //         <div className="space-y-2">
          //           <div className="flex items-center gap-1 w-full justify-between">
          //             <label htmlFor="saipa">سایپا</label>
          //             <input
          //               type="radio"
          //               id="saipa"
          //               name="brand"
          //               value="saipa"
          //               className="radio radio-warning"
          //               onClick={() => handleBrandFilterChange("saipa")}
          //             />
          //           </div>
          //           <div className="flex items-center gap-1 w-full justify-between">
          //             <label htmlFor="iranKhodo">ایران خودرو</label>
          //             <input
          //               type="radio"
          //               id="iranKhodo"
          //               name="brand"
          //               value="iranKhodo"
          //               className="radio radio-warning"
          //               onClick={() => handleBrandFilterChange("iranKhodo")}
          //             />
          //           </div>
          //           <div className="flex items-center gap-1 w-full justify-between">
          //             <label htmlFor="chinese">چینی</label>
          //             <input
          //               type="radio"
          //               id="chinese"
          //               name="brand"
          //               value="chinese"
          //               className="radio radio-warning"
          //               onClick={() => handleBrandFilterChange("chinese")}
          //             />
          //           </div>
          //           <label className="flex items-center justify-between">
          //             <span>دیگر</span>
          //             <input
          //               type="radio"
          //               name="brand"
          //               value="other"
          //               className="radio radio-warning"
          //               onClick={() => handleBrandFilterChange("other")}
          //             />
          //           </label>
          //           <label className="flex items-center justify-between">
          //             <span>همه</span>
          //             <input
          //               type="radio"
          //               name="brand"
          //               value="all"
          //               className="radio radio-warning"
          //               onClick={() => handleBrandFilterChange("all")}
          //             />
          //           </label>
          //         </div>
          //       </div>
          //     )}

          //     <button
          //       className="w-full mt-6 bg-[#3E4095] text-white py-3 rounded-lg font-bold"
          //       onClick={handleCloseFilters}
          //     >
          //       مشاهده محصولات
          //     </button>
          //   </div>
          // </div>
          <MobileShop
          handleCloseFilters={handleCloseFilters}
          handleChangeFilterSection ={handleChangeFilterSection}
          activeFilter ={activeFilter}
          handleFilterChange = {handleFilterChange}
          categories = {categories}
          handleFilter = {handleFilter}
          activeCategory = {activeCategory}
          handleBrandFilterChange = {handleBrandFilterChange}
          />
        )}

        {/* Desktop Filters */}
        
        <DesktopShop 
        handleFilterChange ={handleFilterChange}
        categories = {categories}
        handleFilter = {handleFilter}
        activeCategory = {activeCategory}
        handleBrandFilterChange = {handleBrandFilterChange}
        currentProducts = {currentProducts}
        />
        {filteredProducts.length > productsPerPage && (
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => {
                  paginate(index + 1); // تغییر صفحه
                  window.scrollTo({ top: 0, behavior: "smooth" }); // اسکرول به بالا
                }}
                className={`mx-1 px-3 py-1 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FilterComponent;
