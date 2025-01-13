
import React, { useState } from "react";
import { Link } from "react-router-dom";
import usePost from "../hooks/usePost";
import useGet from '../hooks/useGet'
import { getFormData } from "../utils/form-data";
import { handleToast } from "../utils/message";
import { transformedErrors } from "../utils";

const ContactUs = () => {
  const {data, isLoading} = useGet(['setting'], '/setting/about-us')
  const {mutateAsync, isPending} = usePost('/contact', ['contact'])
  const [error, setError] = useState({})

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      await mutateAsync(getFormData(e.target))
      handleToast('success', 'پیام شما با موفقیت ارسال شد')
    } catch (error) {
      console.log(error)
      setError(transformedErrors(error?.response?.data?.errors))
    }
  };

  if(isLoading) {
    return <div>Loading ....</div>
  }
  return (
    <section className="mb-20 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div className="bg-white p-6 rounded-3xl my-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link to="/" className="inline-flex items-center">
                  خانه
                </Link>
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
                  <Link to="/contact" className="mr-1 text-sm font-medium">
                    تماس با ما
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white rounded-3xl p-4">
          <div className="p-4">
            <h3 className="text-xl font-YekanBakh-ExtraBold mb-2">
              راه های ارتباطی ...
            </h3>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
              {[
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-12 h-12 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  ),
                  title: "ایمیل:",
                  description: data?.data[0]?.value,
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-12 h-12 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  ),
                  title: "آدرس:",
                  description:data?.data[1]?.value
                   
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-12 h-12 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  title: "ساعت کاری فروشگاه:",
                  description: data?.data[2]?.value,
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-12 h-12 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  ),
                  title: "تماس",
                  description: `${data?.data[3]?.value} - ${data?.data[4]?.value}`,
                },
                
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-3xl p-4 flex items-center flex-col text-center gap-4"
                >
                  <div className="bg-yellow-500 p-2 rounded-xl">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-YekanBakh-ExtraBold mb-2">
                      {item.title}
                    </h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form className="p-4" onSubmit={handleSubmit}>
            <h3 className="text-xl font-YekanBakh-ExtraBold mb-2">
              با ما در ارتباط باشید...
            </h3>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text-alt">موضوع پیام:</span>
              </label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
              />
              <p className="text-red-500 text-[14px] my-2">{error?.name ? error.name[0] : ""}</p>
              <label className="label">
                <span className="label-text-alt">پست الکترونیکی:</span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
              />
              <p className="text-red-500 text-[14px] my-2">{error?.email ? error.email[0] : ""}</p>
              <label className="label">
                <span className="label-text-alt">متن پیام:</span>
              </label>
              <textarea
                name="body"
                className="textarea textarea-bordered h-24"
                placeholder="متن پیام را بنویسید..."
              ></textarea>
              <p className="text-red-500 text-[14px] my-2">{error?.body ? error.body[0] : ""}</p>
              <button
                className="btn bg-stone-800 hover:bg-stone-900 text-white my-3 disabled:bg-gray-500 disabled:cursor-not-allowed"
                disabled={isPending}
              >
                {isPending ? "در حال ارسال..." : "ارسال"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

