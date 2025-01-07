import React, { useState } from 'react'
import useGet from '../../hooks/useGet'
import useDelete from '../../hooks/useDelete';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { handleToast } from '../../utils/message';
import BlogEdit from './BlogEdit';

const BlogTable = () => {
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: blogs, isLoading,refetch } = useGet(['blog'], '/blog')

    const { mutateAsync, isPending } = useDelete('/blog', ['blog'])




    const handleDelete = async (id) => {
        try {
            await mutateAsync(id)
            handleToast('success', 'بلاگ با موفقیت حذف شد')
        } catch (error) {
            console.log(error)
        }
    }


    console.log(blogs)
    if (isLoading) {
        return <div>Loading ...</div>
    }
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full text-center border ">
                <thead className="border-b-2 bg-[#090580] text-white">
                    <tr className="text-sm lg:text-md">
                        <th className="py-3">ردیف</th>
                        <th className="py-3">تاریخ</th>
                        <th>عکس</th>
                        <th>موضوع</th>
                        <th>عنوان</th>
                        <th>دسته</th>
                        <th>وضعیت</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs?.data.length > 0 && blogs?.data?.map((blog, index) => (
                        <tr key={blog.id} className="mt-1 hover:bg-green-500 hover:text-white text-sm lg:text-md">
                            <td className="py-2">{index + 1}</td>

                            <td className="flex items-center justify-center w-full">
                                <img src={blog?.image_url ? `${import.meta.env.VITE_API_BASE_URL}${blog?.image_url}` : ''} className="w-10 h-10" alt="" />
                            </td>

                            <td>{new Intl.DateTimeFormat('fa-IR').format(new Date(blog.createdAt))}</td>
                            <td>{blog.name}</td>
                            <td>{(blog.body || '').slice(0, 20) + '...'}</td>
                            <td>{blog.category}</td>
                            <td className={`${blog.status === 'published' ? 'text-green-500' : 'text-red-500'}`}>{blog.status === 'published' ? 'منتشر شده' : 'در حال انتشار'}</td>

                            <td>
                                <button onClick={() => {
                                    setSelectedBlog(blog.id)
                                    setIsModalOpen(true)
                                }}>
                                    <CiEdit />
                                </button>
                                <button onClick={() => handleDelete(blog.id)}>
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>




            {isModalOpen && (
                <BlogEdit
                    blog={selectedBlog}
                    onClose={() => setIsModalOpen(false)}
                    refetch={refetch}
                />
            )}
        </div>
    )
}

export default BlogTable