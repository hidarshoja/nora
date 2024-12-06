import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function HeaderImgSilder() {
  return (
    <section className="px-4 mt-4">
      <div className="container mx-auto max-w-screen-xl">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]} // اضافه کردن ماژول‌ها
          spaceBetween={0} // بدون فاصله بین اسلایدها
          slidesPerView={1} // نمایش یک اسلاید در هر بار
          navigation={false} 
          pagination={false}
         
        >
          <SwiperSlide>
            <img
              className="rounded-b-3xl w-full"
              style={{ height: '500px' }}
              src="assets/images/new-img/logo2.jpg"
              alt="Logo 2"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="object-cover rounded-b-3xl w-full"
              style={{ height: '500px' }}
              src="assets/images/new-img/oil.jpg"
              alt="Oil"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
