import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import useGet from '../hooks/useGet';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart'
const NewProducts = () => {
  const {addToCart} = useCart()
  const { data: products, isLoading } = useGet(['product'], '/product?limit=3')

  if(isLoading){
    return <div>Loading ...</div>
  }
 
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
          {products?.data.products.length > 0 ? products.data.products.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-3xl leading-10 p-4">
                <Link to={`/shop/${product.slug}`} className="flex flex-col items-center justify-center">
                <img src={product.images[0] ? `${import.meta.env.VITE_API_BASE_URL}${product.images[0].image_url}` : ''} className="mb-4 h-64" alt="" />
                  
                </Link>
                <div className="text-center">
                  <Link to={`/shop/${product.slug}`}>
                    <h3 className="font-YekanBakh-ExtraBold text-base">{product.name}</h3>
                  </Link>
                  {product?.price_with_off ? (
                    <div className="flex justify-center gap-4 text-base mt-4">
                      <span className="line-through">{new Intl.NumberFormat('fa-IR').format(product.price) + ' تومان'}</span>
                      <span className="text-yellow-500">{new Intl.NumberFormat('fa-IR').format(product.price_with_off) + ' تومان'}</span>
                    </div>
                  ) : (
                    <div className="flex justify-center gap-4 text-base mt-4">
                      <span>{new Intl.NumberFormat('fa-IR').format(product.price) + ' تومان'}</span>
                    </div>
                  )}

                  <div className="flex justify-center gap-2 items-center mt-4">
                    <button className="bg-yellow-500 p-2 text-white rounded-lg" onClick={()=>addToCart(product)}>
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
                    </button>

                  </div>
                </div>
              </div>
            </SwiperSlide>
          )) : (
            <h3 className='text-center font-bold'>محصولی  جهت نمایش وجود ندارد</h3>)}
        </Swiper>
      </div>
    </section>
  );
};

export default NewProducts;
