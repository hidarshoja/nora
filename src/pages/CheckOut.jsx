import React, { useState } from "react";

const CheckOut = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "ایران",
    state: "",
    city: "",
    postalCode: "",
    phone: "",
    email: "",
    secondaryPhone: "",
    acceptTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

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
                value={formData.firstName}
                onChange={handleInputChange}
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
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text-alt">نام شرکت (اختیاری):</span>
              </label>
              <input
                type="text"
                name="companyName"
                className="input input-bordered w-full"
                value={formData.companyName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text-alt">کشور:</span>
              </label>
              <select
                name="country"
                className="select select-bordered"
                value={formData.country}
                onChange={handleInputChange}
              >
                <option value="ایران">ایران</option>
                <option value="ترکیه">ترکیه</option>
                <option value="فرانسه">فرانسه</option>
                <option value="آمریکا">آمریکا</option>
                <option value="انگلیس">انگلیس</option>
                <option value="سوئد">سوئد</option>
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text-alt">استان:</span>
              </label>
              <input
                type="text"
                name="state"
                className="input input-bordered w-full"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text-alt">شهر(آدرس دقیق):</span>
              </label>
              <input
                type="text"
                name="city"
                className="input input-bordered w-full"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text-alt">کدپستی:</span>
              </label>
              <input
                type="text"
                name="postalCode"
                className="input input-bordered w-full"
                value={formData.postalCode}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text-alt">تلفن:</span>
              </label>
              <input
                type="text"
                name="phone"
                className="input input-bordered w-full"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text-alt">ایمیل:</span>
              </label>
              <input
                type="text"
                name="email"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text-alt">شماره تماس دوم:</span>
              </label>
              <input
                type="text"
                name="secondaryPhone"
                className="input input-bordered w-full"
                value={formData.secondaryPhone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex justify-start mt-4">
            <div className="form-control">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  className="checkbox checkbox-warning"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
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

