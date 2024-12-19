import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleToast } from "../../utils/message";
import { getFormData } from "../../utils/form-data";
import axiosClient from '../../axios-client'
import { transformedErrors } from "../../utils";
import { useSetAtom } from "jotai";
import {userProfile} from '../../stores/store'

const Login = () => {
  const [error, setError] = useState([])
  const [loading, setLoading] = useState(false)
  const setProfile = useSetAtom(userProfile)
  const navigate = useNavigate()

  // !handle login api
  const handleLogin = async(e) => {
    e.preventDefault();
    const body = getFormData(e.target);

    setLoading(true)
    setError(null)

    try {
      const response = await axiosClient.post('/auth/login',body)
      setProfile(response.data.user)
      handleToast('success',response.data.message)

      setTimeout(() => {
        if (response.data.user?.role === "user") {
          navigate('/user/home/main');
        } else if (response.data.user?.role === "admin") {
          navigate('/admin/dashboard/home'); 
        }
      }, 2500);

    } catch (error) {
      console.log(error)
      setError(transformedErrors(error?.response?.data?.errors))
      if(error?.response?.data?.message) handleToast('error',error?.response?.data?.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="font-YekanBakh-Regular text-sm bg-slate-50 h-screen flex items-center">
      <div className="container mx-auto max-w-screen-lg">
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Form Section */}
            <div className="flex-1 p-8 md:p-4 lg:p-20 lg:pb-0">
              <form onSubmit={handleLogin}>
                <h2 className="text-3xl font-YekanBakh-ExtraBlack my-4">ورود</h2>

                <label className="label">
                  <span className="label-text-alt">شماره موبایل :</span>
                </label>
                <input type="number" className="input input-bordered w-full my-2" name="phone"/>
                <p className="text-red-600 mb-3">{error?.phone ? error?.phone[0] : ""}</p>

                <label className="label">
                  <span className="label-text-alt">کلمه عبور:</span>
                </label>
                <input type="password" className="input input-bordered w-full my-2" name="password" />
                <p className="text-red-600 mb-3">{error?.password ? error?.password[0] : ""}</p>
              
                <button 
                  className={`btn bg-stone-800 hover:bg-stone-900 text-white w-full my-4 disabled:bg-stone-700 `}
                  disabled={loading}
                >
                  {loading ? "در حال ورود ..." : "ورود"}
                </button>
             
              </form>
              <p className="text-center my-4">
                رمز عبور خود را <Link to="/auth/forget" className="text-green-500 underline">فراموش </Link>کرده اید؟
              </p>
              <div className="divider my-8">یا</div>
              <p className="text-center my-4">
                <Link to="/auth/register">حساب کاربری ندارید !!!</Link>
              </p>
            </div>

           
            <div className="hidden md:block">
              <img className="bg-cover" src="/assets/images/login/login.jpg" alt="Background" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
