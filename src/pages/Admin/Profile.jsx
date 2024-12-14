import  { useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [activeTab, setActiveTab] = useState("personalInfo");

  const [formData, setFormData] = useState({
    firstName: '',
    nationalCode: '',
    Mobile: '',
    Phone: '',
    email: '',
    State: '',
    City: '',
    postal: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const oldPassword = e.target.elements['old-password'].value;
    const newPassword = e.target.elements['new-password'].value;
    const confirmPassword = e.target.elements['confirm-password'].value;

    if (newPassword !== confirmPassword) {
      alert("رمز عبور جدید و تکرار آن مطابقت ندارند.");
      return;
    }

    axios.post('https://jsonplaceholder.typicode.com/posts', {
      oldPassword,
      newPassword
    })
      .then((response) => {
        console.log('پاسخ دریافت شده:', response.data);
        alert("رمز عبور با موفقیت تغییر یافت.");
      })
      .catch((error) => {
        console.error('خطا در تغییر رمز عبور:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://jsonplaceholder.typicode.com/posts', formData)
      .then((response) => {
        console.log('پاسخ دریافت شده:', response.data);
      })
      .catch((error) => {
        console.error('خطا در ارسال اطلاعات:', error);
      });
  };

  return (
    <div className="md:p-4 ">
       <h2 className="text-sm lg:text-xl font-bold mb-4">پرفایل </h2>
      <div className="mt-8 flow-root">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <div className="bg-white p-3">
            <nav className="-mb-px flex gap-2" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("personalInfo")}
                className={`${
                  activeTab === "personalInfo"
                    ? "border-yellow-500 text-yellow-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                مشخصات حقیقی
              </button>
              <button
                onClick={() => setActiveTab("changePassword")}
                className={`${
                  activeTab === "changePassword"
                    ? "border-yellow-500 text-yellow-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                تغییر پسورد
              </button>
            </nav>
          </div>

          <div className="px-4 py-5 sm:px-6">
            {activeTab === "personalInfo" && (
              <form onSubmit={handleSubmit}>
              <div className="flex flex-col lg:flex-row w-full gap-3">
                <div className="w-full lg:w-1/3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    نام و نام خانوادگی *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                     name="firstName"
                      id="first-name"
                      onChange={handleChange}
                      value={formData.firstName}
                      
                      className="block pr-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/3">
                  <label
                    htmlFor="nationalCode"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    کدملی *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="nationalCode"
                      id="nationalCode"
                      onChange={handleChange}
                      value={formData.nationalCode}
                      dir='ltr'
                      className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/3">
                  <label
                    htmlFor="Mobile"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    شماره موبایل *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="Mobile"
                      id="Mobile"
                      onChange={handleChange}
                      value={formData.Mobile}
                      dir='ltr'
                      className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row w-full gap-3 mt-5">
                <div className="w-full lg:w-1/3">
                  <label
                    htmlFor="Phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    تلفن
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="Phone"
                      id="Phone"
                      onChange={handleChange}
                      value={formData.Phone}
                      dir='ltr'
                      className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ایمیل *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      onChange={handleChange}
                      value={formData.email}
                      dir='ltr'
                      className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/3">
                  <label
                    htmlFor="State"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    استان *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="State"
                      id="State"
                      onChange={handleChange}
                      value={formData.State}
                      
                      className="block pr-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row w-full gap-3 mt-5">
                <div className="w-full lg:w-1/3">
                  <label
                    htmlFor="City"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    شهر *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="City"
                      id="City"
                      onChange={handleChange}
                      value={formData.City}
                      
                      className="block pr-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/3">
                  <label
                    htmlFor="postal"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    کدپستی *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postal"
                      id="postal"
                      onChange={handleChange}
                      value={formData.postal}
                      dir='ltr'
                      className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/3">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    آدرس *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      onChange={handleChange}
                      value={formData.address}
                      
                      className="block pr-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  ذخیره اطلاعات
                </button>
              </div>
            </form>
            )}

            {activeTab === "changePassword" && (
              <form onSubmit={handlePasswordChange}>
                <div className="flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="old-password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      رمز عبور قدیمی *
                    </label>
                    <input
                      type="password"
                      id="old-password"
                      name="old-password"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="new-password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      رمز عبور جدید *
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      name="new-password"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      تکرار رمز عبور جدید *
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      name="confirm-password"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-4 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    ذخیره تغییرات
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
