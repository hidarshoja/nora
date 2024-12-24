import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFormData } from '../../utils/form-data';
import { handleToast } from '../../utils/message';
import axiosClient  from '../../axios-client';
import { useSetAtom } from 'jotai';
import { userProfile } from '../../stores/store';
import { transformedErrors } from '../../utils';

const Register = () => {
  const [error, setError] = useState([])
  const [loading, setLoading] = useState(false)
  const setProfile = useSetAtom(userProfile)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    const body = getFormData(e.target);

    setLoading(true)
    setError(null)

    if (body.password !== body.confirm_password) {
      handleToast("error", "پسورد و تکرار پسورد مطابقت ندارند.");
      setLoading(false)
      return
    }
    try {
      const response = await axiosClient.post('/auth/signup', body);

      setProfile(response.data.user);
      localStorage.setItem('ACCESS_TOKEN', response.data.token)

      handleToast("success", "ثبت نام با موفقیت انجام شد");

      setTimeout(() => {
        navigate('/admin/dashboard/home')
      }, 2500);
    } catch (error) {
      console.log(error)
      setError(transformedErrors(error?.response?.data?.errors))
      if (error?.response?.data?.message) handleToast('error', error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  };

  return (
    <section className="h-screen px-4">
      <div>
        <div className=" mt-6 text-black rounded-2xl overflow-hidden">
          <div className="flex flex-row items-center justify-center gap-8">
            <div className="w-full md:w-1/2 p-8 md:p-4 lg:p-20 lg:pb-0 text-center">
              <form onSubmit={handleRegister}>
                <h2 className="text-3xl font-YekanBakh-ExtraBlack my-4">ثبت نام</h2>

                <div className='flex gap-2'>
                  <div className='w-1/2'>
                    <label className="label">
                      <span className="label-text-alt text-black">نام:</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full my-2"
                      name='first_name'
                    />
                    <p className="text-red-600 mb-3 text-[13px]">{error?.first_name ? error?.first_name[0] : ""}</p>

                  </div>

                  <div className='w-1/2'>
                    <label className="label">
                      <span className="label-text-alt text-black">نام خانوادگی:</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full my-2"
                      name='last_name'
                    />
                    <p className="text-red-600 mb-3 text-[13px]">{error?.last_name ? error?.last_name[0] : ""}</p>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <div className='w-1/2'>
                    <label className="label">
                      <span className="label-text-alt text-black">شماره تماس:</span>
                    </label>
                    <input
                      type="number"
                      className="input input-bordered w-full my-2"
                      name='phone'
                    />
                    <p className="text-red-600 mb-3 text-[13px]">{error?.phone ? error?.phone[0] : ""}</p>
                  </div>
                  <div className='w-1/2'>
                    <label className="label">
                      <span className="label-text-alt text-black">ایمیل:</span>
                    </label>
                    <input
                      type="email"
                      className="input input-bordered w-full my-2"
                      name='email'
                    />
                    <p className="text-red-600 mb-3 text-[13px]">{error?.email ? error?.email[0] : ""}</p>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <div className='w-1/2'>
                    <label className="label">
                      <span className="label-text-alt text-black">پسورد:</span>
                    </label>
                    <input
                      type="password"
                      className="input input-bordered w-full my-2"
                      name='password'
                    />
                    <p className="text-red-600 mb-3 text-[13px]">{error?.password ? error?.password[0] : ""}</p>
                  </div>
                  <div className='w-1/2'>
                    <label className="label">
                      <span className="label-text-alt text-black">تکرار پسورد:</span>
                    </label>
                    <input
                      type="password"
                      className="input input-bordered w-full my-2"
                      name={`confirm_password`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`btn bg-green-500 hover:bg-green-800 text-black w-full my-4 disabled:bg-green-500 disabled:text-gray-600 disabled:cursor-not-allowed`}
                  disabled={loading}
                >
                  {loading ? "لطفا صبر کنید..." : "ثبت نام"}
                </button>
              </form>

              <p className="text-center my-4">
                اگر حساب کاربری دارید <Link to="/auth/login">وارد شوید</Link>
              </p>
            </div>
            <div className="hidden md:block w-1/2">
              <img className="register-img" src="/assets/images/login/auth.png" alt="Background" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
