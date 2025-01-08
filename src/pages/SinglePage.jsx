import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useGet from '../hooks/useGet';
import { useAtom, useAtomValue } from 'jotai';
import { checkViews, userProfile } from '../stores/store';
import usePost from '../hooks/usePost';
import { handleToast } from '../utils/message';
import useUpdate from '../hooks/useUpdate';
import { EyeIcon } from '@heroicons/react/24/outline';
import CommentSection from '../components/CommentSection';

const BlogDetail = () => {

  const [comment, setComment] = useState('');
  const { id } = useParams(); // گرفتن id از url

  const user = useAtomValue(userProfile)
  const [isViewed, setIsViewed] = useAtom(checkViews)

  const { data: blog, isLoading } = useGet(['show-blog', id], `/blog/show/${id}`)
  const { data: bestBlog, loading } = useGet(['showblog', id], `/blog?best=true`)
  const { mutateAsync, isPending } = usePost('/comment', ['comment', 'show-blog', id])
  const { mutateAsync: addViews } = useUpdate('/blog', ['show-blog', id])
  
  useEffect(() => {
    const addView = async (params) => {
      try {
        await addViews({ slug: `${id}/views`, body: {} })
      } catch (error) {
        console.log(error)
      }
    }
    if (!isViewed){
      setIsViewed(true)
      addView()
    } 

  }, [id, isViewed])


  const handleSubmitComment = async () => {
    const body = {
      username: user.first_name + ' ' + user.last_name,
      blog_id: id,
      body: comment
    };

    try {
      await mutateAsync(body)
      handleToast('success', 'نظر شما با موفقیت ثبت شد')
      setComment('')
    } catch (error) {
      console.log(error)
    }

  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <section className="mb-20 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div className="bg-white p-6 rounded-3xl mb-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link to="/" className="inline-flex items-center">
                  خانه
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  <a href="#" className="mr-1 text-sm font-medium">جزئیات وبلاگ</a>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-9 order-1">
            <div className="bg-white p-4 rounded-3xl leading-8">
              <div className="border-r-4 bg-slate-100 border-yellow-400 mb-4 rounded-2xl p-4">
                <h1 className="mb-2 text-base font-YekanBakh-Bold">{blog?.data?.name}</h1>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {new Intl.DateTimeFormat('fa-IR', { day: 'numeric' }).format(new Date(blog?.data?.createdAt))}
                    {new Intl.DateTimeFormat('fa-IR', { month: 'short' }).format(new Date(blog?.data?.createdAt))}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                    {blog?.data?.category}
                  </span>

                  <span className="flex items-center gap-1">
                    <EyeIcon className="w-5 h-5" />
                    {blog?.data?.views}
                  </span>
                </div>
              </div>
              <img className="rounded-2xl" src={blog.data?.image_url ? `${import.meta.env.VITE_API_BASE_URL}${blog.data?.image_url}` : ''} alt={blog.data?.name} />
              <p className="mt-4">{blog.data?.body}</p>

              {user?.id ?
                <div className="mt-4">
                  <h3 className="font-YekanBakh-Bold text-slate-800 text-base">نظرات</h3>

                  <textarea
                    className="textarea textarea-bordered w-full h-36 rounded-3xl"
                    placeholder="نظر خود را بنویسید..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    className="btn bg-stone-800 hover:bg-stone-900 text-white rounded-2xl disabled:bg-slate-600"
                    onClick={handleSubmitComment}
                    disabled={isPending}
                  >
                    {isPending ? 'در حال ارسال...' : 'ارسال نظر'}
                  </button>
                </div> :
                <p className='text-center mt-4 text-red-500 font-bold'>برای ارسال نظر ابتدا وارد شوید</p>
              }
              <CommentSection comments={blog?.data?.comments} />

            </div>
          </div>

          <div className="col-span-12 lg:col-span-3 order-2 md:order-1">
            <div className="p-4 bg-white rounded-3xl">
              <div className="col-span-12 md:col-span-3 order-2">
                <div className="bg-white p-4 rounded-3xl mb-4 leading-8">
                  <div className="border-r-4 bg-slate-100 border-yellow-400 mb-4 rounded-2xl p-4">
                    <h3 className="font-YekanBakh-Bold text-slate-800 text-base">پربازدیدترین ها</h3>
                  </div>
                  <div>
                    {bestBlog?.data.length > 0 && bestBlog?.data?.map(blog => (
                      <Link to={`/blog/${blog.slug}/${blog.id}`} className="flex items-center my-4" key={blog.id}>
                        <div className="avatar">
                          <div className="w-16 rounded-full">
                            <img src={blog.image_url ? `${import.meta.env.VITE_API_BASE_URL}${blog.image_url}` : ''} />
                          </div>
                        </div>
                        <div className="mr-2">
                          <h3 className="font-YekanBakh-Bold text-slate-800 text-sm">{blog.name}</h3>
                          <p>{(blog.body).slice(0, 10) + '...'}</p>
                        </div>
                      </Link>
                    ))}

                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
