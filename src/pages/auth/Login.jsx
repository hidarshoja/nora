import React from "react";
import { Link } from "react-router-dom";
import { handleToast } from "../../utils/message";
import { getFormData } from "../../utils/form-data";

const Login = () => {
  
  const handleLogin = async(e) => {
    e.preventDefault();
    const body = getFormData(e.target);
    console.log(body)
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

                <label className="label">
                  <span className="label-text-alt">کلمه عبور:</span>
                </label>
                <input type="password" className="input input-bordered w-full my-2" name="password" />
              
                <button className="btn bg-stone-800 hover:bg-stone-900 text-white w-full my-4" >
                  ورود
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
