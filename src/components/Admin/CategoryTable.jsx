import { useState } from "react";
import EditCategoryModal from "./EditCategoryModal";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

import useGet from "../../hooks/useGet";
import useDelete from "../../hooks/useDelete";
import { handleToast } from "../../utils/message";

export default function CategoryTable() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: category, isLoading,refetch } = useGet(['category'], '/category')
  const { mutateAsync, isPending } = useDelete('/category',['category'])
  



  const handleDelete = async (id) => {
    try {
      await mutateAsync(id)
      handleToast('success', 'دسته بندی با موفقیت حذف شد')
    } catch (error) {
      console.log(error)
    }
  }

 

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
          {category?.data.length > 0 && category?.data?.map((category, index) => (
            <tr key={category.id} className="mt-1 hover:bg-green-500 hover:text-white text-sm lg:text-md">
              <td className="py-2">{index + 1}</td>
              <td className="flex items-center justify-center w-full">
                <img src={category.image_url ? `${import.meta.env.VITE_API_BASE_URL}${category.image_url}` : ''} className="w-10 h-10" alt="" />
              </td>

              <td>{category.name}</td>

              <td>
                <button onClick={() => {
                  setSelectedCategory(category.id)
                  setIsModalOpen(true)
                }}>
                  <CiEdit />
                </button>
                <button onClick={() => handleDelete(category.id)}>
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>




      {isModalOpen && (
        <EditCategoryModal
          category={selectedCategory}
          onClose={() => setIsModalOpen(false)}
          refetch={refetch}
        />
      )}
    </div>
  );
};
