import { Link } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Footer = () => {
    return (
      <footer style={{ backgroundColor: '#3E4095' }} className="p-10 text-white">
        <div className="container mx-auto max-w-screen-xl">
          <div className="bg-yellow-500 p-8 rounded-3xl mb-10">
            <div className="swiper partners">
            <Swiper
          navigation={false}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={5}
          pagination={false}
          breakpoints={{
            320: {
              slidesPerView: 1, // For mobile devices
            },
            768: {
              slidesPerView: 2, // For tablets
            },
            1024: {
              slidesPerView: 5, // For desktops
            },
          }}
        >
          <SwiperSlide>
            <div className="flex justify-center">
              <img src="/assets/images/new-img/kia.png" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center">
              <img src="/assets/images/new-img/nissan-Photoroom.png" alt="1" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center">
              <img
                src="/assets/images/new-img/logo.png"
                style={{ width: '150px', height: '110px', borderRadius: '50%' }}
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center">
              <img src="/assets/images/new-img/iran-Photoroom.png" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center">
              <img src="/assets/images/new-img/sipa.png" alt="" />
            </div>
          </SwiperSlide>
             </Swiper>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 leading-8">
            <div className="col-span-12 lg:col-span-5">
              <img
                className="mb-4"
                src="assets/images/new-img/logo.png"
                style={{ width: '150px', height: '110px', borderRadius: '50%' }}
                alt=""
              />
              <p>
                نورا پارت با فراهم آوردن تنوع معقولی از محصولات در کنار عرضه با قیمت مناسب آن‌ها، به دنبال خرید راحت و رضایت‌بخش قطعات خودرو برای همراهان خودش است و این مهم را با مهیا کردن امکان بررسی فنی و کاربردی قطعات و ارائه محتوای مناسب و غنی محقق می‌سازد.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-2 text-right md:text-center">
              <h3 className="font-YekanBakh-Bold text-white mb-4 text-lg">دسترسی سریع</h3>
              <ul>
                <li><Link to="/question">سوالات متداول</Link></li>
                <li><Link to="/shop">صفحه محصول</Link></li>
                <li><Link to="/blog"> وبلاگ</Link></li>
                <li><Link to="/contact">تماس با ما</Link></li>
              </ul>
            </div>
            <div className="col-span-12 lg:col-span-2 text-right md:text-center">
              <h3 className="font-YekanBakh-Bold text-white mb-4 text-lg">صفحات</h3>
              <ul>
                <li><Link to="/blocking">موتوری</Link></li>
                <li><Link to="#">گیریبکس</Link></li>
                <li><Link to="#">سیستم روشنایی</Link></li>
                <li><Link to="#">تزیینات</Link></li>
              </ul>
            </div>
            <div className="col-span-12 lg:col-span-3">
              <h3 className="font-YekanBakh-Bold text-white mb-4 text-lg">عضویت در خبرنامه</h3>
              <div className="flex items-center">
                <img src="assets/images/enamad_logo.png" alt="" />
                <img src="assets/images/samandehi_logo.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  







