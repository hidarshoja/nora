const Footer = () => {
    return (
      <footer style={{ backgroundColor: '#3E4095' }} className="p-10 text-white">
        <div className="container mx-auto max-w-screen-xl">
          <div className="bg-yellow-500 p-8 rounded-3xl mb-10">
            <div className="swiper partners">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="flex justify-center">
                    <img src="/assets/images/new-img/kia.png" alt="" />
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="flex justify-center">
                    
                    <img src="/assets/images/new-img/nissan-Photoroom.png" alt="1" />
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="flex justify-center">
                    <img
                      src="/assets/images/new-img/logo.png"
                      style={{ width: '150px', height: '110px', borderRadius: '50%' }}
                      alt=""
                    />
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="flex justify-center">
                    <img src="/assets/images/new-img/iran-Photoroom.png" alt="" />
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="flex justify-center">
                    <img src="/assets/images/new-img/sipa.png" alt="" />
                  </div>
                </div>
              </div>
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
                <li><a href="#">سوالات متداول</a></li>
                <li><a href="#">صفحه محصول</a></li>
                <li><a href="#">جزئیات وبلاگ</a></li>
                <li><a href="#">تماس با ما</a></li>
              </ul>
            </div>
            <div className="col-span-12 lg:col-span-2 text-right md:text-center">
              <h3 className="font-YekanBakh-Bold text-white mb-4 text-lg">صفحات</h3>
              <ul>
                <li><a href="#">موتوری</a></li>
                <li><a href="#">گیریبکس</a></li>
                <li><a href="#">سیستم روشنایی</a></li>
                <li><a href="#">تزیینات</a></li>
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
  