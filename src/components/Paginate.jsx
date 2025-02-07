import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';

const Paginate = ({ products, setCurrentPage, setTriggerFetch }) => {
    const [pageRange, setPageRange] = useState(3); 

    useEffect(() => {
        const updatePageRange = () => {
            if (window.innerWidth < 768) {
                setPageRange(1); 
            } else {
                setPageRange(3);
            }
        };

        updatePageRange(); // Set initial value
        window.addEventListener("resize", updatePageRange);

        return () => window.removeEventListener("resize", updatePageRange);
    }, [])

    const handlePageChange = (e) => {
        const selectedPage = e.selected;
        setCurrentPage(selectedPage); // Update page state
        setTriggerFetch(true); // Trigger re-fetch for new page
    };
  return (
      <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={products?.data?.totalPages}
          marginPagesDisplayed={1} 
          pageRangeDisplayed={pageRange}
          onPageChange={handlePageChange}
          containerClassName="flex justify-center space-x-2 mt-4"
          pageClassName="block px-3 py-1 border rounded-md cursor-pointer "
          activeClassName="bg-[#090580] text-white"
          previousClassName="block px-3 py-1 border rounded-md cursor-pointer ml-2"
          nextClassName="block px-3 py-1 border rounded-md cursor-pointer"
          disabledClassName="opacity-50 cursor-not-allowed"
      />
  )
}

export default Paginate