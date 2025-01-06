import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function AboutUs() {
  const images = [
    { src: "assets/images/new-img/serves.png", alt: "Serves" },
    { src: "assets/images/new-img/price.png", alt: "Price" },
    { src: "assets/images/new-img/buy.png", alt: "Buy" },
    { src: "assets/images/new-img/logo2.jpg", alt: "Logo" },
    { src: "assets/images/new-img/light.jpg", alt: "Light" },
    { src: "assets/images/new-img/dande.jpg", alt: "Dande" },
  ];

  return (
    <div>
           <section className="my-14 px-4">
        <div className="container mx-auto max-w-screen-xl">
            <div className="text-center mb-8">
                <h2 className="font-YekanBakh-ExtraBlack text-3xl">درباره ما</h2>
              </div>
            <div className="grid grid-cols-12 gap-4 md:gap-8">
                <div className="col-span-12 md:col-span-3 flex flex-col justify-center">
                    <div className="bg-white border rounded-3xl p-4 flex items-center mb-4 flex-col text-center gap-4">
                        <div className="bg-yellow-500 p-2 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                              </svg>
                                                  
                        </div>
                        <div>
                          <h3 className="text-base font-YekanBakh-ExtraBold mb-2">1500 محصول</h3>
                          <p>انواع لوازم با بهترین </p>
                        </div>
                      </div>
                      <div className="bg-white border rounded-3xl p-4 flex items-center flex-col text-center gap-4">
                        <div className="bg-yellow-500 p-2 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                              </svg>
                                                  
                        </div>
                        <div>
                          <h3 className="text-base font-YekanBakh-ExtraBold mb-2">۵ سال فعالیت</h3>
                          <p>بهترین  فروش لوازم ماشین در تهران</p>
                        </div>
                      </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <img className="rounded-3xl" src="assets/images/new-img/logo2.jpg" alt=""/>
                </div>
                <div className="col-span-12 md:col-span-3 flex flex-col justify-center">
                    <div className="bg-white border rounded-3xl p-4 flex items-center mb-4 flex-col text-center gap-4">
                        <div className="bg-yellow-500 p-2 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                              </svg>
                                                    
                        </div>
                        <div>
                          <h3 className="text-base font-YekanBakh-ExtraBold mb-2">رضایت کاربران</h3>
                          <p>بالای 1 میلیون رضایت کاربران</p>
                        </div>
                      </div>
                      <div className="bg-white border rounded-3xl p-4 flex items-center flex-col text-center gap-4">
                        <div className="bg-yellow-500 p-2 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                              </svg>
                                                   
                        </div>
                        <div>
                          <h3 className="text-base font-YekanBakh-ExtraBold mb-2">ارزان تر از همه جا</h3>
                          <p>خرید 1000 محصول با  تخفیف</p>
                        </div>
                      </div>
                </div>
            </div>
        </div>
          </section>
          <section className="my-14 px-4">
        <div className="container mx-auto max-w-screen-lg">
            <div className="text-center mb-8">
                <h2 className="font-YekanBakh-ExtraBlack text-3xl">درباره نورا پارت  بخوانید</h2>
              </div>
              <div className="leading-8">
                <p>
                   فروشگاه  لوازم یدکی نورا پارت از سال ۱۳۹۸ فعالیت خود را شروع کرد و  قطعات مورد نیاز برای انواع مدل خودرو موجود در بازار با بهترین قیمت  و بهترین کیفیت در دسترس شما قرار گرفته است. کافی است با توجه به مدل خودروی خود به دسته‌بندی مربوطه مراجعه کنید یا در کادر جستجوی سایت، قطعه مورد نیازتان را جستجو کنید.
                  قطعات یدکی ماشین انواع برند های خودرو ساز ایرانی، کره‌ای، آلمانی، ژاپنی، فرانسوی و چینی در فروشگاه نوراپارت قابل سفارش هستند. اگر قطعه‌ی خاصی مد نظرتان بود که در سایت موجود نبود با ما تماس بگیرد و درخواست خود را ثبت کنید. متخصصین بازرگانی نورپارت برای ارائه مشاوره رایگان خرید لوازم یدکی همواره آماده پاسخگویی به شما مشتریان عزیز هستند.
                </p>
              </div>
        </div>

          </section>
          <section className="my-14 px-4 py-20 bg-stone-100">
      <div className="container mx-auto max-w-screen-2xl">
        <div className="text-center mb-8">
          <h2 className="font-YekanBakh-ExtraBlack text-3xl">بهترین های نورا پارت</h2>
        </div>
       
          <section className="my-14 px-4 py-20 bg-stone-100">
      <div className="container mx-auto max-w-screen-2xl">
        <div className="text-center mb-8">
          <h2 className="font-YekanBakh-ExtraBlack text-3xl">
            بهترین های نورا پارت
          </h2>
        </div>
        <Swiper
          modules={[Pagination]}
          pagination={false}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="about-slider"
        >
              <Swiper
          modules={[Pagination]}
          pagination={false}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="about-slider"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="w-72">
              <img src={image.src} alt={image.alt} className="h-60" />
            </SwiperSlide>
          ))}
        </Swiper>
        </Swiper>
      </div>
    </section>
      </div>
    </section>
    </div>
  )
}













