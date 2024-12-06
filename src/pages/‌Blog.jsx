import React from 'react';
import { Link } from 'react-router-dom';

const blogItem = [
  {
    id : 1 ,
    imgSrc: "assets/images/new-img/hava.jpg",
    day: "26",
    month: "خرداد",
    title: "راهنمای هوا گیری رادیاتور",
    link: "single-page.html"
  },
  {
    id : 2 ,
    imgSrc: "assets/images/new-img/lazresh.webp",
    day: "27",
    month: "خرداد",
    title: "راهنمایی جلوگیری از لرزش موتور",
    link: "single-page.html"
  },
  {
    id : 3 ,
    imgSrc: "assets/images/new-img/dande.jpg",
    day: "8",
    month: "خرداد",
    title: "روش دنده کشی و جلوگیری از آسیب زدن به موتور",
    link: "single-page.html"
  },
  {
    id : 4 ,
    imgSrc: "assets/images/new-img/cold.jpg",
    day: "7",
    month: "خرداد",
    title: "راهنمایی تعویض ضدیخ",
    link: "single-page.html"
  },
  {
    id : 5 ,
    imgSrc: "assets/images/new-img/oil2.webp",
    day: "5",
    month: "خرداد",
    title: "راهنمایی تعویض روغن موتور",
    link: "single-page.html"
  },
  {
    id : 6 ,
    imgSrc: "assets/images/new-img/sipak2.webp",
    day: "30",
    month: "خرداد",
    title: "راهنمایی جلوگیری از لرزش جلو بندی",
    link: "single-page.html"
  }
];

const Blog = () => {
  return (
    <section className="my-14 mt-4 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div className="bg-white p-6 rounded-3xl mb-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <a href="#" className="inline-flex items-center">
                  خانه
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                  <a href="#" className="mr-1 text-sm font-medium">
                    وبلاگ
                  </a>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div>
            <div>
            <div id="blog-item" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {blogItem.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-3xl">
              <div className="relative">
              <Link to={`/blog/${item.id}`}> {/* استفاده از Link به جای a */}
               <img className="rounded-2xl h-[280px]" src={item.imgSrc} alt={item.title} />
            </Link>
                <div className="absolute top-4 left-4 bg-white border-t-4 border-yellow-400 p-2 px-3 rounded-xl">
                  <div className="flex flex-col">
                    <span className="font-YekanBakh-ExtraBold text-2xl">{item.day}</span>
                    <span className="font-YekanBakh-Bold">{item.month}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                <Link to={`/blog/${item.id}`}> {/* استفاده از Link به جای a */}
                   <h3 className="font-YekanBakh-ExtraBold text-base">{item.title}</h3>
                </Link>
                </div>
                <div>
                <Link className="flex items-center" to={`/blog/${item.id}`}> {/* استفاده از Link به جای a */}
          <span className="ml-2">بیشتر</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
          </svg>
                 </Link>
                </div>
              </div>
            </div>
          ))}
        </div>  
            </div>
            <div>
                
            </div>
        </div>
        

        <div className="col-span-12 lg:col-span-9 order-1 lg:order-2">
          <div className="flex justify-center mt-10">
            <div className="join">
              <button className="join-item btn">صفحه قبل</button>
              <button className="join-item btn">صفحه 22</button>
              <button className="join-item btn">صفحه بعد</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
