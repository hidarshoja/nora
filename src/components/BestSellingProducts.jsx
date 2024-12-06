import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const bestSellingProducts = [
  {
    name: "دیسک ایران خودرو",
    originalPrice: "600.000 تومان",
    discountedPrice: "500.000 تومان",
    stock: "7 از 20",
    imgSrc: "assets/images/new-img/disk.webp",
    progressValue: 70,
  },
  {
    name: "سیبک",
    originalPrice: "50.000 تومان",
    discountedPrice: "45.000 تومان",
    stock: "7 از 20",
    imgSrc: "assets/images/new-img/sipak.webp",
    progressValue: 70,
  },
  {
    name: "فیلتر هوا",
    originalPrice: "50.000 تومان",
    discountedPrice: "45.000 تومان",
    stock: "7 از 20",
    imgSrc: "assets/images/new-img/filter.webp",
    progressValue: 70,
  },
  {
    name: "لاستیک بارز",
    originalPrice: "843.000 تومان",
    discountedPrice: "841.000 تومان",
    stock: "7 از 20",
    imgSrc: "assets/images/new-img/tire.webp",
    progressValue: 70,
  },
  {
    name: "روغن سه و نیم لیتری",
    originalPrice: "50.000 تومان",
    discountedPrice: "45.000 تومان",
    stock: "7 از 20",
    imgSrc: "assets/images/new-img/oil3.webp",
    progressValue: 70,
  },
];

const BestSellingProducts = () => {
  return (
    <section className="my-14 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div className="text-center mb-8">
          <h2 className="font-YekanBakh-ExtraBlack text-3xl">پرفروش ترین کالاها</h2>
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
          {bestSellingProducts.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-3xl leading-10 relative p-4">
                <div className="flex items-center justify-center">
                  <div>
                    <a href="#">
                      <img className="w-32" src={product.imgSrc} alt={product.name} />
                    </a>
                  </div>
                  <div>
                    <a href="#">
                      <h3 className="font-YekanBakh-ExtraBold text-base">{product.name}</h3>
                    </a>
                    <div className="flex justify-center gap-4 text-base mt-4">
                      <span className="line-through">{product.originalPrice}</span>
                      <span className="text-yellow-500">{product.discountedPrice}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-sm justify-center gap-4">
                  <div>موجودی: {product.stock}</div>
                  <div>
                    <progress className="progress progress-warning w-48 md:w-56" value={product.progressValue} max="100"></progress>
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

export default BestSellingProducts;
