import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const NewProducts = () => {
  const newProducts = [
    {
      name: "لاستیک بارز",
      oldPrice: "360.000 تومان",
      newPrice: "280.000 تومان",
      image: "assets/images/new-img/tire.webp",
      link: "#",
    },
    {
      name: "روغن اسپیدی",
      oldPrice: "140.000 تومان",
      newPrice: "90.000 تومان",
      image: "assets/images/new-img/oil.webp",
      link: "#",
    },
    {
      name: "فیلتر دو زمانه",
      oldPrice: "960.000 تومان",
      newPrice: "425.000 تومان",
      image: "assets/images/new-img/filter2.webp",
      link: "#",
    },
    {
      name: "برف پاک کن",
      oldPrice: "50.000 تومان",
      newPrice: "45.000 تومان",
      image: "assets/images/new-img/ezam.webp",
      link: "#",
    },
    {
      name: "فیلتر",
      oldPrice: "960.000 تومان",
      newPrice: "425.000 تومان",
      image: "assets/images/new-img/filter.webp",
      link: "#",
    },
  ];

  return (
    <section className="my-14 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div className="text-center mb-8">
          <h2 className="font-YekanBakh-ExtraBlack text-3xl">جدیدترین محصولات</h2>
        </div>

        <Swiper
              navigation={false} 
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={20}
              slidesPerView={4}
              pagination={{ clickable: true }}
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
          {newProducts.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-3xl leading-10 p-4">
                <a href={product.link} className="flex flex-col items-center justify-center">
                  <img className="mb-4" src={product.image} alt={product.name} />
                </a>
                <div className="text-center">
                  <a href={product.link}>
                    <h3 className="font-YekanBakh-ExtraBold text-base">{product.name}</h3>
                  </a>
                  <div className="flex justify-center gap-4 text-base mt-4">
                    <span className="line-through">{product.oldPrice}</span>
                    <span className="text-yellow-500">{product.newPrice}</span>
                  </div>
                  <div className="flex justify-center gap-2 items-center mt-4">
                    <a className="bg-yellow-500 p-2 text-white rounded-lg" href="#">
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
                    <a className="bg-yellow-500 p-2 text-white rounded-lg" href="comparison.html">
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
                          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
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

export default NewProducts;
