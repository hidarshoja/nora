import { useState } from "react";
import { GiStopSign } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import { FaUserTie } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa";
import useGet from "../../hooks/useGet";
import useUpdate from "../../hooks/useUpdate";
import { handleToast } from "../../utils/message";

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const { data: users, isLoading } = useGet(['user'], '/user')
  const { mutateAsync:mutateStatus, isPending } = useUpdate( '/user',['user'])


  //  ! active or inactive user
  const handleStatus = async (usre_id) => {
    try {
      await mutateStatus({ slug: `${usre_id}/change-status`, body: {} })
      handleToast('success', 'وضعیت کاربر با موفقیت تغییر کرد')
    } catch (error) {
      console.log(error)
    }
  }
  //  ! change role
  const handleRole = async (usre_id) => {
    try {
      await mutateStatus({ slug: `${usre_id}/change-role`, body: {} })
      handleToast('success', 'نقش کاربر با موفقیت تغییر کرد')
    } catch (error) {
      console.log(error)
    }
  }
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const currentUsers = users.data.data.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  if (isLoading) {
    return <div>Loading ...</div>
  }



  return (
    <div className="md:p-4">
      <h1 className="text-lg md:text-xl font-YekanBakh-Regular  mb-5">صفحه کاربران</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border">
          <thead className="border-b-2 bg-[#090580] text-white">
            <tr>
              <th className="py-3">آیدی</th>
              <th>نام کاربر</th>
              <th>شماره تماس</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {users.data.data.map((user) => (
              <tr key={user.id} className="mt-1 hover:bg-gray-100 ">
                <td className="py-2">{user.id}</td>
                <td>{user.first_name + ' ' + user.last_name}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.role === 'user' ? 'کاربر' : 'مدیر'}</td>
                <td className={`${user.statuse === 'active' ? 'text-green-500' : 'text-red-500'}`}>{user.statuse === 'active' ? 'فعال' : 'غیرفعال'}</td>
                <td className="flex justify-center my-3 gap-2 items-center">
                  {user.statuse === 'active' ?
                    <GiStopSign className="text-red-500 cursor-pointer" onClick={() => handleStatus(user.id)} /> :
                    <TiTick className="text-green-500 cursor-pointer" onClick={() => handleStatus(user.id)} />
                  }

                  {user.role === 'user' ?
                    <FaUserTie className="text-blue-500 cursor-pointer" onClick={() => handleRole(user.id)} /> :
                    <FaUserSlash className="text-gray-500 cursor-pointer" onClick={() => handleRole(user.id)} />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length > itemsPerPage && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="mx-2"
            >
              قبلی
            </button>
            {[...Array(Math.ceil(users.length / itemsPerPage))].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-2 px-3 rounded-sm py-1 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
                  }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
              className="mx-2"
            >
              بعدی
            </button>
          </div>
        )}


      </div>
    </div>
  );
}
