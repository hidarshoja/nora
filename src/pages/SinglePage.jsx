import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const [comment, setComment] = useState('');
  const { id } = useParams(); // گرفتن id از url
  const blogItem = [
    {
      id: 1,
      name:"اصغر اصغری",
      imgSrc: "/assets/images/new-img/hava.jpg",
      day: "26",
      month: "خرداد",
      title: "راهنمای هوا گیری رادیاتور",
      link: "single-page.html",
      description: "در این مقاله به نحوه هواگیری رادیاتور خودرو پرداخته شده است. هواگیری رادیاتور یکی از مهمترین مراحل در حفظ عملکرد بهینه سیستم خنک کننده موتور است. با انجام این کار، هوا از داخل سیستم خارج می‌شود و جریان مایع خنک‌کننده به درستی انجام می‌شود."
    },
    {
      id: 2,
      name:"نگار جواهریان ",
      imgSrc: "/assets/images/new-img/lazresh.webp",
      day: "27",
      month: "خرداد",
      title: "راهنمایی جلوگیری از لرزش موتور",
      link: "single-page.html",
      description: "لرزش موتور می‌تواند نشانه‌ای از مشکلات مختلفی باشد. این مقاله به بررسی روش‌هایی برای جلوگیری از لرزش موتور خودرو می‌پردازد. این مشکلات ممکن است ناشی از خرابی سیستم تعلیق، سوخت و احتراق نادرست، یا مشکل در اجزای مختلف موتور باشد."
    },
    {
      id: 3,
      name:"مریم اصغری",
      imgSrc: "/assets/images/new-img/dande.jpg",
      day: "8",
      month: "خرداد",
      title: "روش دنده کشی و جلوگیری از آسیب زدن به موتور",
      link: "single-page.html",
      description: "دنده کشی به معنی تعویض دنده در هنگام رانندگی است. اگر به درستی انجام نشود، می‌تواند به موتور و سیستم انتقال قدرت آسیب برساند. این مقاله توضیح می‌دهد که چگونه دنده کشی صحیح را یاد بگیرید تا از آسیب به موتور جلوگیری کنید."
    },
    {
      id: 4,
      name:"زهرا اصغری",
      imgSrc: "/assets/images/new-img/cold.jpg",
      day: "7",
      month: "خرداد",
      title: "راهنمایی تعویض ضدیخ",
      link: "single-page.html",
      description: "تعویض ضدیخ یکی از اقدامات مهم برای حفظ سلامت سیستم خنک‌کننده خودرو است. ضدیخ‌ها به جلوگیری از یخ زدن مایع خنک‌کننده در دماهای پایین کمک می‌کنند و در دماهای بالا از جوش آوردن موتور جلوگیری می‌کنند. این مقاله به شما نشان می‌دهد که چگونه ضدیخ مناسب را انتخاب کرده و آن را تعویض کنید."
    },
    {
      id: 5,
      name:"اصغر محمدیان",
      imgSrc: "/assets/images/new-img/oil2.webp",
      day: "5",
      month: "خرداد",
      title: "راهنمایی تعویض روغن موتور",
      link: "single-page.html",
      description: "تعویض روغن موتور یک بخش اساسی در نگهداری و سلامت موتور خودرو است. در این مقاله به مراحل تعویض روغن موتور و انتخاب روغن مناسب پرداخته شده است. تعویض به موقع روغن موتور باعث افزایش طول عمر موتور و بهبود عملکرد خودرو می‌شود."
    },
    {
      id: 6,
      name:"اصغر محمدی",
      imgSrc: "/assets/images/new-img/sipak2.webp",
      day: "30",
      month: "خرداد",
      title: "راهنمایی جلوگیری از لرزش جلو بندی",
      link: "single-page.html",
      description: "لرزش جلو بندی می‌تواند ناشی از مشکلات سیستم تعلیق یا قسمت‌های دیگر خودرو باشد. این مقاله به بررسی علت‌های لرزش جلو بندی و روش‌های جلوگیری از آن می‌پردازد. با استفاده از این راهنما می‌توانید مشکلات لرزش جلو بندی را شناسایی و از بروز آن جلوگیری کنید."
    }
  ];

  const blog = blogItem.find(item => item.id === parseInt(id)); // پیدا کردن بلاگ با id

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = () => {
    // Handle comment submission logic here
    console.log("Comment submitted:", comment);
  };

  return (
    <section className="mb-20 px-4">
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
          <div className="col-span-12 md:col-span-9 order-1">
            <div className="bg-white p-4 rounded-3xl leading-8">
              <div className="border-r-4 bg-slate-100 border-yellow-400 mb-4 rounded-2xl p-4">
                <h1 className="mb-2 text-base font-YekanBakh-Bold">{blog.title}</h1>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {blog.day} {blog.month}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                    ابزارآلات
                  </span>
                </div>
              </div>
              <img className="rounded-2xl" src={blog.imgSrc} alt={blog.title} />
              <p className="mt-4">{blog.description}</p>
              <div className="mt-4">
                <h3 className="font-YekanBakh-Bold text-slate-800 text-base">نظرات</h3>
                <p>شما با نام {blog.name} وارد شده اید!!</p>
                <textarea
                  className="textarea textarea-bordered w-full h-36 rounded-3xl"
                  placeholder="نظر خود را بنویسید..."
                  value={comment}
                  onChange={handleCommentChange}
                />
                <button
                  className="btn bg-stone-800 hover:bg-stone-900 text-white rounded-2xl"
                  onClick={handleSubmitComment}
                >
                  ارسال پیام
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3 order-2 md:order-1">
            <div className="p-4 bg-white rounded-3xl">
            <div className="col-span-12 md:col-span-3 order-2">
                  <div className="bg-white p-4 rounded-3xl mb-4 leading-8">
                      <div className="border-r-4 bg-slate-100 border-yellow-400 mb-4 rounded-2xl p-4">
                          <h3 className="font-YekanBakh-Bold text-slate-800 text-base">پربازدیدترین ها</h3>
                      </div>
                      <div>
                          <div className="flex items-center my-4">
                              <div className="avatar">
                                  <div className="w-16 rounded-full">
                                    <img src="/assets/images/new-img/lazresh.webp" />
                                  </div>
                                </div>
                                <div className="mr-2">
                                  <h3 className="font-YekanBakh-Bold text-slate-800 text-sm">جذاب ترین ایده دکوراسیون</h3>
                                  <p>لورم ایپسوم متن ساختگی</p>    
                                </div>
                          </div>
                          <div className="flex items-center my-4">
                              <div className="avatar">
                                  <div className="w-16 rounded-full">
                                    <img src="/assets/images/new-img/dande.jpg" />
                                  </div>
                                </div>
                                <div className="mr-2">
                                  <h3 className="font-YekanBakh-Bold text-slate-800 text-sm">5 مدل مبلمان فضای بسته</h3>
                                  <p>لورم ایپسوم متن ساختگی</p>    
                                </div>
                          </div>
                          <div className="flex items-center my-4">
                              <div className="avatar">
                                  <div className="w-16 rounded-full">
                                    <img src="/assets/images/new-img/cold.jpg" />
                                  </div>
                                </div>
                                <div className="mr-2">
                                  <h3 className="font-YekanBakh-Bold text-slate-800 text-sm">زیبا ترین گل های آپارتمانی</h3>
                                  <p>لورم ایپسوم متن ساختگی</p>    
                                </div>
                          </div>
                          <div className="flex items-center my-4">
                              <div className="avatar">
                                  <div className="w-16 rounded-full">
                                    <img src="/assets/images/new-img/oil2.webp" />
                                  </div>
                                </div>
                                <div className="mr-2">
                                  <h3 className="font-YekanBakh-Bold text-slate-800 text-sm">زیبا ترین گل های آپارتمانی</h3>
                                  <p>لورم ایپسوم متن ساختگی</p>    
                                </div>
                          </div>
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
