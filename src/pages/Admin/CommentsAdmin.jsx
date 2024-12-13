import  { useState} from 'react'
import CommentProduct from '../../components/Admin/CommentProduct';
import BlogComments from '../../components/Admin/BlogComments';
import CommentsPhone from '../../components/Admin/CommentsPhone';

export default function CommentsAdmin() {

    const [activeTab, setActiveTab] = useState("commentProduct");
  return (
    <div className='md:p-4'>
         <h1 className="text-xl font-YekanBakh-Regular  mb-5">صفحه کامنت ها</h1>
         <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab("commentProduct")}
          className={`px-4 py-2 ${
            activeTab === "commentProduct" ? "border-b-2 border-blue-500 text-blue-500" : ""
          }`}
        >
          کامنت محصولات
        </button>
        <button
          onClick={() => setActiveTab("commentBlog")}
          className={`px-4 py-2 ${
            activeTab === "commentBlog" ? "border-b-2 border-blue-500 text-blue-500" : ""
          }`}
        >
           کامنت وبلاگ
        </button>
        <button
          onClick={() => setActiveTab("commentPhone")}
          className={`px-4 py-2 ${
            activeTab === "commentPhone" ? "border-b-2 border-blue-500 text-blue-500" : ""
          }`}
        >
            کامنت تماس ها
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "commentProduct" && <CommentProduct />}
      {activeTab === "commentBlog" && <BlogComments />}
      {activeTab === "commentPhone" && <CommentsPhone />}
    </div>
  )
}
