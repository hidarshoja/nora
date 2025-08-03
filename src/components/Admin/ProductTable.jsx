import { useState, useMemo } from "react";
import EditProductModal from "./EditProductModal";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import useGet from "../../hooks/useGet";
import useDelete from "../../hooks/useDelete";
import { handleToast } from "../../utils/message";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const ProductTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // State برای جستجو
  const { data: products, isLoading } = useGet(
    ["product", currentPage], 
    "/product",
    { all:true } 
  );

  const { mutateAsync } = useDelete(["product"], "/product");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // فیلتر کردن محصولات بر اساس نام
  const filteredProducts = useMemo(() => {
    if (!products?.data?.products) return [];
    return products.data.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleDelete = async (slug) => {
    try {
      await mutateAsync(slug);
      handleToast("success", "محصول با موفقیت حذف شد");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="overflow-x-auto">
      {/* اینپوت جستجو */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="جستجو بر اساس نام محصول..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#090580]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table-auto w-full text-center border">
        <thead className="border-b-2 bg-[#090580] text-white">
          <tr className="text-sm lg:text-md">
            <th className="py-3">ردیف</th>
            <th>عکس</th>
            <th>نام محصول</th>
            <th>قیمت اصلی</th>
            <th>قیمت تخفیف‌دار</th>
            <th>برند</th>
            <th>دسته‌بندی</th>
            <th>موجودی</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <tr
                key={product.id}
                className="mt-1 hover:bg-green-500 hover:text-white text-sm lg:text-md"
              >
                <td className="py-2">{index + 1}</td>
                <td className="flex items-center justify-center w-full">
                  <img
                    src={
                      product?.images[0]?.image_url
                        ? `${import.meta.env.VITE_API_BASE_URL}${product.images[0].image_url}`
                        : ""
                    }
                    className="w-10 h-10"
                    alt=""
                  />
                </td>
                <td>{product.name}</td>
                <td>
                  {new Intl.NumberFormat("fa-IR").format(product.price)} تومان
                </td>
                <td>
                  {product.price_with_off
                    ? new Intll.NumberFormat("fa-IR").format(product.price_with_off)
                    : 0}{" "}
                  تومان
                </td>
                <td>{product.brand}</td>
                <td>{product.categories.name}</td>
                <td>{product.amount}</td>
                <td className="">
                  <button>
                    <Link
                      to={`/admin/dashboard/edit-product/${product.slug}`}
                      onClick={() => handleEdit(product)}
                    >
                      <CiEdit />
                    </Link>
                  </button>
                  <button onClick={() => handleDelete(product.slug)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="py-4 text-red-500">
                محصولی با این نام یافت نشد!
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* پagination (در صورت نیاز می‌توانید آن را فعال کنید) */}
      {/* <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={products?.data?.totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={(e) => setCurrentPage(e.selected)}
        containerClassName="flex justify-center space-x-2 mt-4"
        pageClassName="px-3 py-1 border rounded-md cursor-pointer"
        activeClassName="bg-[#090580] text-white"
        previousClassName="px-3 py-1 border rounded-md cursor-pointer"
        nextClassName="px-3 py-1 border rounded-md cursor-pointer"
        disabledClassName="opacity-50 cursor-not-allowed"
      /> */}

      {isModalOpen && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={(updatedProduct) => {
            setSelectedProduct(null);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductTable;