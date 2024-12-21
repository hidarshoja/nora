import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from "react-router-dom"
import  useGet  from '../hooks/useGet';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



export default function CategoriesComponent() {
  const {data:categories,isLoading } = useGet(['category'], '/category')


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
          {categories?.data && categories?.data.map((category, index) => (
            <SwiperSlide key={index}>
              <div className="border border-slate-200 bg-white rounded-3xl leading-10">
                <Link
                   to={`/shop?category=${category.id}`}
                  className="flex flex-col items-center justify-center p-4"
                >
                  <img
                    className="mb-4"
                    style={{ width: "150px", height: "150px" }}
                    src={category.image_url}
                    alt={category.name}
                  />
                  <h3 className="font-YekanBakh-ExtraBold text-base">
                    {category.name}
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

