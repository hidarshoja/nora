import React, { useState } from "react";
import useGet from "../../hooks/useGet";
import { GiStopSign } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import useUpdate from "../../hooks/useUpdate";
import { handleToast } from "../../utils/message";

export default function CommentProduct() {
  const { data, isLoading } = useGet(['product-comment'], '/product-comment')
  const { mutateAsync:mutateAsyncStatus } = useUpdate('/product-comment', ['comment', 'product'])
  console.log(data)

 

   const handleStatus = async(id) => {
    
     try {
       await mutateAsyncStatus({ slug: id, body:{} })
       handleToast('success', 'وضعیت کامنت با موفقیت تغییر کرد')
     } catch (error) {
       console.log(error)
     }
   };

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <div className="p-4">
      <h2 className="text-sm lg:text-xl font-bold mb-4">کامنت محصولات</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border">
          <thead className="border-b bg-blue-700 text-white">
            <tr className="text-sm lg:text-md">
              <th className="py-3">ردیف</th>
              <th>تاریخ</th>
              <th>نام کاربر</th>
              <th>نام محصول</th>
              <th>عنوان کامنت</th>
              <th>امتیاز</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.comments.map((comment) => (
              <tr key={comment.id} className="hover:bg-gray-200 text-sm lg:text-md">
                <td className="py-2">{comment.id}</td>
                <td>{new Intl.DateTimeFormat("fa-IR").format(new Date(comment.createdAt))}</td>
                <td>{comment.user.first_name + ' ' + comment.user.last_name}</td>
                <td>{comment.product.name}</td>
                <td>{comment.body}</td>
                <td>{comment.rate}</td>
                <td className={comment.status === 'published' ? 'text-green-500' : 'text-red-500'}>{comment.status === 'published' ? 'فعال' : 'انتظار'}</td>
                <td>
                  {comment?.status === 'published' ?
                    <GiStopSign className="text-red-500 cursor-pointer size-6" onClick={() => handleStatus(comment.id)} /> :
                    <TiTick className="text-green-500 cursor-pointer size-6" onClick={() => handleStatus(comment.id)} />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}
