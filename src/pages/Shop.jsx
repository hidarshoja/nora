import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MobileShop from "../components/MobileShop";
import DesktopShop from "../components/DesktopShop";
import useGet from "../hooks/useGet";
import useCart from "../hooks/useCart";
import Paginate from "../components/Paginate";

const FilterComponent = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [filters, setFilters] = useState({
    price: '',
    category: 0,
    brand: '',
  });
  const { addToCart } = useCart()

  const categoryParam = Number(useSearchParams()[0].get('category'))

  const { data: products, isLoading, refetch } = useGet(['product'], '/product', { page: currentPage + 1, limit: 1 })
 

  const { data: categories } = useGet(['categories'], '/category')

  //! Run API fetch AFTER state updates to prevent stale data
  useEffect(() => {
    if (triggerFetch) {
      refetch();
      setTriggerFetch(false);
    }
  }, [currentPage, triggerFetch]);

  // ! filter by categories from url
  let FilteredData = categoryParam !== 0 ? products?.data?.products?.filter((product) => product.categories.id === categoryParam) : products?.data?.products

  // ! filter by filters
  FilteredData = FilteredData
    ?.filter((product) => {
      return (
        (filters.category === 0 || product.categories.id === filters.category) &&
        (filters.brand === '' || product.brand === filters.brand) || (categoryParam !== 0 ? product.categories.id === categoryParam : false)
      )
    })
    .sort((a, b) => {
      if (filters.price === 'cheap') {
        return a.price - b.price;
      } else if (filters.price === 'expensive') {
        return b.price - a.price;
      }
      else if (filters.price === 'popular') {
        return b.buy_count - a.buy_count;
      }
      return 0;
    });


  if (isLoading) {
    return <p>Loading...</p>;
  }

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
          <nav className="flex justify-between w-full" aria-label="Breadcrumb">
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
            {(filters.brand !== '' || filters.category > 0 || filters.price !== '') && (
              <button
                className='text-blue-600 w-full text-[14px] text-left py-3'
                onClick={() => setFilters({ category: 0, price: '', brand: '' })
                }>
                پاک کردن فیلتر
              </button>
            )}
          </nav>
          <button
            className="lg:hidden fixed bottom-4 right-4 p-4 text-white bg-[#3E4095] rounded-full shadow-lg z-50"
            onClick={() => setIsFiltersOpen(true)}
          >
            مشاهده فیلترها
          </button>
        </div>

        {/* Mobile Filters */}
        {isFiltersOpen && (
          <MobileShop
            data={FilteredData}
            categories={categories}
            filters={filters}
            setFilters={setFilters}
            setIsFiltersOpen={setIsFiltersOpen}
          />
        )}

        {/* Desktop Filters */}

        <DesktopShop
          data={FilteredData}
          categories={categories}
          filters={filters}
          setFilters={setFilters}
          addToCart={addToCart}
        />
        {/* {filteredProducts?.length > productsPerPage && (
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
        )} */}


        <Paginate
          products={products}
          setCurrentPage={setCurrentPage}
          setTriggerFetch={setTriggerFetch}
        />
      </div>
    </section>
  );
};

export default FilterComponent;
