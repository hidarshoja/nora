import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useGet from '../hooks/useGet';
import CountdownTimer from './CountdownTimer';


export default function OfferSection() {
  const {data,isLoading} = useGet(['product-offer'], '/product/offers')
console.log(data)
  if(isLoading){
    return <div>Loading ...</div>
  }

  if(!data.data){
    return 
  }

  return (
    <section className="my-14 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div className="rounded-3xl pt-10 pb-4" style={{ backgroundColor: '#3E4095' }}>
          <div className="text-center mb-8">
            <h2 className="font-YekanBakh-ExtraBlack text-3xl text-white">پیشنهاد شگفت انگیز</h2>
          </div>
          <div className="grid grid-cols-12 gap-4 p-4">
            <div className="col-span-12 lg:col-span-9">
              <Swiper
                spaceBetween={20}
                navigation={false}
                pagination={false}
                breakpoints={{
                  320: { // موبایل
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  1024: { // دسکتاپ
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                }}
              >
                {data.data.suggestion_list.map((product, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-white rounded-3xl leading-10 p-4">
                      <div className="relative">
                        <a href="#" className="flex flex-col items-center justify-center">
                          <img className="mb-4 h-[270px]"  src={product.product.images[0] ? `${import.meta.env.VITE_API_BASE_URL}${product.product.images[0].image_url}` : ''}  alt={product.title} />
                        </a>
                        <div className="bg-yellow-500 absolute top-2 right-2 rounded-full w-10 h-10">
                          <p className="flex items-center justify-center">{product.product.name}</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <a href="#"><h3 className="font-YekanBakh-ExtraBold text-base">{product.product.name}</h3></a>
                        
                          <div className="flex justify-center gap-4 text-base mt-4">
                          <span className="line-through">
                          {new Intl.NumberFormat('fa-IR').format(product.product.price)} تومان
                          </span>
                          <span className="text-yellow-500">
                          {new Intl.NumberFormat('fa-IR').format(product.product.price_with_off)} تومان
                          </span>
                        </div>
                        
                      </div>
                      <div className="flex justify-center gap-2 items-center mt-4">
                        <Link className="bg-yellow-500 p-2 text-white rounded-lg" to="/cart">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                        </Link>
                       
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
        
            <CountdownTimer expiredAt={data.data.expired_at} />
          </div>
        </div>
      </div>
    </section>
  );
}
