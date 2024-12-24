import { useState } from "react";
import EditProductModal from "./EditProductModal";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import useGet from "../../hooks/useGet";
import useDelete from "../../hooks/useDelete";
import { handleToast } from "../../utils/message";
import { Link } from "react-router-dom";

const ProductTable = () => {
  const { data: products, isLoading } = useGet(['product'], '/product')
  const { mutateAsync, isPending } = useDelete(['product'], '/product')

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;


  // ! delete a product
  const handleDelete = async(slug) => {
    try {
      await mutateAsync(slug)
      handleToast('success', 'محصول با موفقیت حذف شد')
    } catch (error) {
      console.log(error)
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };






  // const indexOfLastProduct = currentPage * itemsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  // const currentProducts = products.data.slice(indexOfFirstProduct, indexOfLastProduct);


  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-center border ">
        <thead className="border-b-2 bg-[#090580] text-white">
          <tr className="text-sm lg:text-md">
            <th className="py-3">ردیف</th>
            <th>عکس</th>
            <th>نام محصول</th>
            <th>قیمت اصلی</th>
            <th>قیمت تخفیف‌دار</th>
            <th>برند</th>
            <th>دسته‌بندی</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {products?.data?.products && products?.data?.products.map((product, index) => (
            <tr key={product.id} className="mt-1 hover:bg-green-500 hover:text-white text-sm lg:text-md">
              <td className="py-2">{index + 1}</td>
              <td className="flex items-center justify-center w-full">
              <img src={product?.images[0]?.image_url ? `${import.meta.env.VITE_API_BASE_URL}${product.images[0].image_url}` : ''} className="w-10 h-10" alt="" />
               
              </td>
              <td>{product.name}</td>
              <td>
                {new Intl.NumberFormat("fa-IR").format(product.price)} تومان
              </td>
              <td>
                {product.price_with_off ? new Intl.NumberFormat("fa-IR").format(product.price_with_off) : 0} تومان
              </td>
              <td>{product.brand}</td>
              <td>{product.categories.name}</td>
              <td className="">
                <button>
                   <Link to={`/admin/dashboard/edit-product/${product.slug}`} onClick={() => handleEdit(product)}>
                  <CiEdit />
                </Link>
                </button>
               
                <button onClick={() => handleDelete(product.slug)}>
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {products.data.totalPages > 0 && (
        <div className="flex justify-center mt-4">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="mx-2">قبلی</button>
          {Array.from({ length: products.data.totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-2 px-3 rounded-sm py-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(products.length / itemsPerPage)} className="mx-2">بعدی</button>
        </div>
      )}

      {isModalOpen && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={(updatedProduct) => {
            setProducts((prevProducts) =>
              prevProducts.map((p) =>
                p.id === updatedProduct.id ? updatedProduct : p
              )
            );
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductTable;
