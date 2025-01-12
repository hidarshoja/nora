import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import useGet from '../hooks/useGet';
import { Link } from 'react-router-dom';



const BestSellingProducts = () => {
  const { data, isLoading } = useGet(['product-buy'], '/product?mode=buy')

  if (isLoading) {
    return <div>Loading ...</div>
  }

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
          {data.data.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-3xl leading-10 relative p-4">
                <div className="flex items-center justify-center">
                  <div>
                    <Link to={`/shop/${product?.slug}`}>
                      <img className="size-24 m" src={product.images[0] ? `${import.meta.env.VITE_API_BASE_URL}${product.images[0].image_url}` : ''} alt={product.name} />
                    </Link>
                  </div>
                  <div>
                    <Link to={`/shop/${product?.slug}`}>
                      <h3 className="font-YekanBakh-ExtraBold text-base">{product.name}</h3>
                    </Link>
                    {product?.price_with_off ? (
                      <div className="flex justify-center gap-4 text-base mt-4">
                        <span className="line-through">{new Intl.NumberFormat('fa-IR').format(product.price)} تومان</span>
                        <span className="text-yellow-500">{new Intl.NumberFormat('fa-IR').format(product.price_with_off)} تومان</span>
                      </div>
                    ) : (
                      <div className="flex justify-center gap-4 text-base mt-4">
                        <span className="">{new Intl.NumberFormat('fa-IR').format(product.price)} تومان</span>
                      </div>
                    )}


                  </div>
                </div>
                <div className="flex items-center text-sm justify-center gap-4">
                  <p className={`${product.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {product.amount > 0 ? 'موجود در انبار' : 'ناموجود'}
                  </p>
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
