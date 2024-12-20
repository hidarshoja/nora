import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const ProductCarousel = () => {
  const productList = [
    {
      imgSrc: "assets/images/new-img/harrington.jpg",
      title: "پمپ روغن",
      originalPrice: "2,140,000 تومان",
      discountedPrice: "2,100,000 تومان",
      link: "#", 
    },
    {
      imgSrc: "assets/images/new-img/manual.webp",
      title: "استوپر دستی",
      originalPrice: "140.000 تومان",
      discountedPrice: "90.000 تومان",
      link: "#",
    },
    {
      imgSrc: "assets/images/new-img/oil3.webp",
      title: "روغن موتور",
      originalPrice: "960.000 تومان",
      discountedPrice: "425.000 تومان",
      link: "#",
    },
    {
      imgSrc: "assets/images/new-img/filter2.webp",
      title: "فیلتر روغن",
      originalPrice: "50.000 تومان",
      discountedPrice: "45.000 تومان",
      link: "#",
    },
    {
      imgSrc: "assets/images/new-img/manual.webp",
      title: "استوپر دستی",
      originalPrice: "140.000 تومان",
      discountedPrice: "90.000 تومان",
      link: "#",
    },
  ];

  return (
    <section className="my-14 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div className="text-center mb-8">
          <h2 className="font-YekanBakh-ExtraBlack text-3xl">پیشنهاد های نورا پارت</h2>
        </div>
        <Swiper
          navigation={false}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={4}
          pagination={false}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {productList.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-3xl leading-10 p-4">
                <a href={product.link} className="flex flex-col items-center justify-center">
                  <img className="mb-4 h-64" src={product.imgSrc} alt={product.title} />
                </a>
                <div className="text-center">
                  <a href={product.link}>
                    <h3 className="font-YekanBakh-ExtraBold text-base">{product.title}</h3>
                  </a>
                  <div className="flex justify-center gap-4 text-base mt-4">
                    <span className="line-through">{product.originalPrice}</span>
                    <span className="text-yellow-500">{product.discountedPrice}</span>
                  </div>
                  <div className="flex justify-center gap-2 items-center mt-4">
                    <a className="bg-yellow-500 p-2 text-white rounded-lg" href={product.link}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                    </a>
                  
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductCarousel;
