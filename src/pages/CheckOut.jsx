import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { userProfile } from "../stores/store";
import { Navigate } from "react-router-dom";
import useGet from "../hooks/useGet";
import { getFormData } from "../utils/form-data";
import useCart from "../hooks/useCart";
import usePost from "../hooks/usePost";
import { removeFormDataPrefix, transformedErrors } from "../utils";

const CheckOut = () => {
  const { cart, totalPrice } = useCart()
  const user = useAtomValue(userProfile);
  const [cities, setCities] = useState([])
  const [error, setError] = useState([])

  const { data, isLoading } = useGet(['province'], `/province`)
  const { mutateAsync } = usePost(`/order`, ['orders'])


  useEffect(() => {
    setCities(data?.data?.province[0]?.cities || [])
  }, [data])

  if (!user) {
    return <Navigate to="/auth/login?next=/check-out" replace />;
  }

  if (cart.length === 0) {
    return <Navigate to="/" replace />;
  }

  // ! handle city select
  const handleCityChange = (e) => {
    const id = e.target.value;
    const filteredCities = data?.data?.province?.find((province) => province.id == id);
    setCities(filteredCities.cities);
  }

  // ! handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError([])
    const formData = getFormData(e.target);

    const body = {
      formData: formData,
      cart,
      user_id: user?.id,
      total_price: totalPrice
    }

    console.log(body)
    try {
      const response = await mutateAsync(body)
      console.log(response)
    } catch (error) {
      console.log(error)
      setError(removeFormDataPrefix(transformedErrors(error?.response?.data?.errors)))
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  
  return (
    <section className="my-14 mt-4 px-4">

      <div className="container mx-auto max-w-screen-xl">
        <div className="bg-white p-6 rounded-3xl mb-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <a href="#" className="inline-flex items-center">
                  خانه
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>

                  <a href="#" className="mr-1 text-sm font-medium">
                    جزئیات پرداخت
                  </a>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text-alt">نام:</span>
              </label>
              <input
                type="text"
                name="firstName"
                className="input input-bordered w-full"
                value={user?.first_name}
                readOnly
                disabled
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text-alt">نام خانوادگی:</span>
              </label>
              <input
                type="text"
                name="lastName"
                className="input input-bordered w-full"
                value={user?.last_name}
                readOnly
                disabled
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text-alt">استان:</span>
              </label>
              <select
                name="province_id"
                className="select select-bordered"
                onChange={(e) => handleCityChange(e)}
              >
                {data?.data?.province?.length > 0 && data?.data?.province?.map((province) => (
                  <option value={province.id} key={province.id}>{province.name}</option>
                ))}

              </select>
              <p className="text-red-600 mb-3 text-[12px]">{error?.province_id ? error?.province_id[0] : ""}</p>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text-alt">شهر:</span>
              </label>
              <select
                name="city_id"
                className="select select-bordered"
              >
                {cities?.length > 0 && cities?.map((city) => (
                  <option value={city.id} key={city.id}>{city.name}</option>
                ))}

              </select>
              <p className="text-red-600 mb-3 text-[12px]">{error?.city_id ? error?.city_id[0] : ""}</p>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text-alt">آدرس دقیق:</span>
              </label>
              <input
                type="text"
                name="address"
                className="input input-bordered w-full"
              />
              <p className="text-red-600 mb-3 text-[12px]">{error?.address ? error?.address[0] : ""}</p>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text-alt">کدپستی:</span>
              </label>
              <input
                type="text"
                name="postal_code"
                className="input input-bordered w-full"
              />              
              <p className="text-red-600 mb-3 text-[12px]">{error?.postal_code ? error?.postal_code[0] : ""}</p>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text-alt">شماره تماس دوم (اختیاری):</span>
              </label>
              <input
                type="text"
                name="phone"
                className="input input-bordered w-full"
              />
              <p className="text-red-600 mb-3 text-[12px]">{error?.phone ? error?.phone[0] : ""}</p>
            </div>


          </div>
          <div className="flex justify-start mt-4">
            <div className="form-control">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  className="checkbox checkbox-warning"
                />
                <span className="label-text mr-2">
                  ثبت سفارش به منزله پذیرفتن قوانین سایت می باشد.
                </span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="btn bg-stone-800 hover:bg-stone-900 text-white mt-4"
          >
            ثبت سفارش و پرداخت
          </button>
        </form>
      </div>
    </section>
  );
};

export default CheckOut;

