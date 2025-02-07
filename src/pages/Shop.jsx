import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MobileShop from "../components/MobileShop";
import DesktopShop from "../components/DesktopShop";
import useGet from "../hooks/useGet";
import useCart from "../hooks/useCart";
import Paginate from "../components/Paginate";

const FilterComponent = () => {
  const [currentPage, setCurrentPage] = useState(1); // Start from page 1
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    price: '',
    category: 0,
    brand: '',
  });
  const { addToCart } = useCart();

  // Get category from URL query params (e.g., ?category=1)
  const categoryParam = Number(useSearchParams()[0].get('category'));

  // Fetch products with filters applied
  const { data: products, isLoading, refetch } = useGet(
    ['product'],
    '/product',
    {
      page: currentPage,
      limit: 9,
      priceFilter: filters.price, // Adding filters to the query
      categoryId: filters.category,
      brand: filters.brand,
    }
  );

  const { data: categories } = useGet(['categories'], '/category');

  // Trigger API call when page or filters change
  useEffect(() => {
    if (triggerFetch) {
      refetch();
      setTriggerFetch(false);
    }
  }, [currentPage, filters, triggerFetch]);

  // Filter products based on selected filters
  let FilteredData = categoryParam !== 0 ? products?.data?.products?.filter((product) => product.categories.id === categoryParam) : products?.data?.products;


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
                onClick={() => setFilters({ category: 0, price: '', brand: '' })}
              >
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
            refetch={refetch}
          />
        )}

        {/* Desktop Filters */}
        <DesktopShop
          data={FilteredData}
          categories={categories}
          filters={filters}
          setFilters={setFilters}
          addToCart={addToCart}
          refetch={refetch}
        />

        {/* Pagination */}
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
