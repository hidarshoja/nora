import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useGet from "../hooks/useGet";
import useCart from "../hooks/useCart";

export default function ProductDetails() {
  const {addToCart} = useCart()
  const { slug } = useParams();
  const { data: product, isLoading } = useGet(['product', slug], `/product/show/${slug}`)

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!isLoading && product?.data.images?.length > 0) {
      setSelectedImage(product.data.images[0].image_url);
    }
  }, [isLoading, product]); // Runs only when `isLoading` or `product` changes

  if (isLoading) {
    return <p>Loading...</p>;
  }


  const features = [
    {
      text: 'بهترین قیمت', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-yellow-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
      )
    },
    {
      text: 'تضمین اصل بودن محصول', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-yellow-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
        </svg>
      )
    },
    {
      text: 'ارسال سریع', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-yellow-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      )
    },
    {
      text: 'مشاوره قبل از خرید', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-yellow-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
        </svg>
      )
    },
    {
      text: 'بسته بندی زیبا', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-yellow-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      )
    },
    {
      text: 'رضایت کاربران', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-yellow-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
      )
    },

  ];






  // if (!product) {
  //   return <div>محصول یافت نشد</div>;
  // }
  return (
    <div className="w-full flex flex-col md:flex-row mt-10 px-3">
      <div className="w-full lg:w-1/2">
        <div className="flex flex-col md:flex-row">
          {/* Box 1 */}
          <div className="w-full md:w-1/2 p-4">
            {/* Main Image */}
            <div className="mb-4">
              <img
                src={selectedImage ? `${import.meta.env.VITE_API_BASE_URL}${selectedImage}` : ""}
                alt="Product"
                className="w-full h-[300px] rounded-lg shadow-md"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2">
              {product?.data?.images.map((image, index) => (
                <img
                  key={index}
                  src={image.image_url ? `${import.meta.env.VITE_API_BASE_URL}${image.image_url}` : ""}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-20 cursor-pointer rounded-lg border-2 ${selectedImage === image.image_url
                    ? "border-yellow-500"
                    : "border-gray-300"
                    }`}
                  onClick={() => setSelectedImage(image.image_url)}
                />
              ))}
            </div>
          </div>

          {/* Box 2 */}
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-2xl font-bold mb-2">{product?.data?.name}</h2>
            <p className="text-gray-500 mb-4">دسته بندی: {product?.data?.categories?.name}</p>
            <p className="text-gray-700 mb-4">نوع خودرو: {product?.data?.machine}</p>
            <p className="text-gray-700 mb-4">برند: {product?.data?.brand}</p>
            <p className="text-gray-700 mb-4">جنس: {product?.data?.material}</p>
            {product?.data.price_with_off ? (
              <>
                <div className="text-lg text-yellow-500 font-bold mb-2">
                  {new Intl.NumberFormat('fa-IR').format(product?.data.price_with_off)} تومان
                </div>
                <div className="text-gray-400 line-through mb-4">
                  {new Intl.NumberFormat('fa-IR').format(product?.data.price)} تومان
                </div>
              </>
            ) : (
              <div className="text-lg text-yellow-500 font-bold mb-2">
                  {new Intl.NumberFormat('fa-IR').format(product?.data.price)} تومان
                </div>
            )}

            <button className="w-full bg-black text-white py-2 px-4 rounded-lg mb-2" onClick={()=>addToCart(product?.data)}>
              افزودن به سبد خرید
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:block w-full lg:w-1/2 lg:flex px-2">
        <div className="w-1/2"></div>
        <div className=" w-full lg:w-1/2 flex items-center flex-col">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center border rounded-lg w-64 my-2 p-2">
              {feature.icon}
              <span className="mr-2">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}




