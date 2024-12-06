import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from "react-router-dom"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const categories = [
  {
    image: "assets/images/new-img/joloBandi.jpg",
    title: "قطعات جلوبندی",
    link: "/blocking"
  },
  {
    image: "assets/images/new-img/motori.jpg",
    title: "سیستم موتوری",
    link: "#"
  },
  {
    image: "assets/images/new-img/lent5.png",
    title: "گیریبکس",
    link: "#"
  },
  {
    image: "assets/images/new-img/butri.webp",
    title: "قطعات برقی",
    link: "#"
  },
  {
    image: "/assets/images/new-img/griboks.jpg",
    title: "قطعات فرمان",
    link: "#"
  },
  {
    image: "assets/images/new-img/lent.webp",
    title: "مکانیزم و استاندارد",
    link: "#"
  },
  {
    image: "assets/images/new-img/ring.webp",
    title: "تزیینات",
    link: "#"
  }
];

export default function CategoriesComponent() {
  return (
    <section className="my-14 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div className="text-center mb-8">
          <h2 className="font-YekanBakh-ExtraBlack text-3xl">دسته بندی محصولات</h2>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={4}
          navigation={false} 
          pagination={false}
          breakpoints={{
            320: {
              slidesPerView: 1, 
            },
            768: {
              slidesPerView: 2, 
            },
            1024: {
              slidesPerView: 5, 
            },
          }}
       
          
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <div className="border border-slate-200 bg-white rounded-3xl leading-10">
                <Link
                  to={category.link}
                  className="flex flex-col items-center justify-center p-4"
                >
                  <img
                    className="mb-4"
                    style={{ width: "150px", height: "150px" }}
                    src={category.image}
                    alt={category.title}
                  />
                  <h3 className="font-YekanBakh-ExtraBold text-base">
                    {category.title}
                  </h3>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

