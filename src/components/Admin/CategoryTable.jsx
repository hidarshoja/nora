import { useState } from "react";
import EditCategoryModal from "./EditCategoryModal";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

import useGet from "../../hooks/useGet";

export default function CategoryTable() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: category, isLoading } = useGet(['category'], '/category')
 

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <p>Loading...</p>
  }


  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-center border ">
        <thead className="border-b-2 bg-[#090580] text-white">
          <tr className="text-sm lg:text-md">
            <th className="py-3">آیدی</th>
            <th>عکس</th>
            <th>نام دسته بندی</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {category?.data && category?.data.map((product,index) => (
            <tr key={product.id} className="mt-1 hover:bg-green-500 hover:text-white text-sm lg:text-md">
              <td className="py-2">{index + 1}</td>
              <td className="flex items-center justify-center w-full">
              <img src={product.image_url ? `${import.meta.env.VITE_API_BASE_URL}${product.image_url}` : ''} className="w-10 h-10" alt="" />
              </td>

              <td>{product.name}</td>

              <td>
                <button onClick={() => handleEdit(product)}>
                  <CiEdit />
                </button>
                <button onClick={() => handleDelete(product.id)}>
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>




      {isModalOpen && (
        <EditCategoryModal
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
