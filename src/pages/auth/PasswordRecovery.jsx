import React from "react";


const PasswordRecovery = () => {
  return (
    <div className="font-YekanBakh-Regular text-sm bg-slate-50 h-screen flex items-center">
      <div className="container mx-auto max-w-screen-lg">
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Form Section */}
            <div className="flex-1 p-8 md:p-4 lg:p-20 lg:pb-0">
              <form action="#">
                <h2 className="text-3xl font-YekanBakh-ExtraBlack my-4">فراموشی رمز عبور</h2>
                <p className="leading-8">
                  گذرواژه خود را فراموش کرده اید؟ نام کاربری یا ایمیل خود را وارد کنید. یک لینک برای ساختن گذرواژه جدید در ایمیل خود دریافت خواهید کرد.
                </p>

                <label className="label">
                  <span className="label-text-alt">ایمیل:</span>
                </label>
                <input type="email" className="input input-bordered w-full my-2" />

                <button className="btn bg-stone-800 hover:bg-stone-900 text-white w-full my-4">
                  بازگردانی گذرواژه
                </button>
              </form>
            </div>

         
            <div className="hidden md:block">
              <img className="bg-cover" src="/assets/images/login/sign-up.jpg" alt="Background" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
