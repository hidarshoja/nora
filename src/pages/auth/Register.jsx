import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  // States for the registration form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log('پسوردها یکسان نیستند!');
      return;
    }
    console.log('نام:', firstName);
    console.log('نام خانوادگی:', lastName);
    console.log('شماره تماس:', phone);
    console.log('ایمیل:', email);
    console.log('پسورد:', password);
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
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
               </div>

                <div className='w-1/2'>
                <label className="label">
                  <span className="label-text-alt text-black">نام خانوادگی:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full my-2"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                </div>
               </div>
               <div className='flex gap-2'>
                  <div className='w-1/2'>
                  <label className="label">
                  <span className="label-text-alt text-black">شماره تماس:</span>
                </label>
                <input
                  type="tel"
                  className="input input-bordered w-full my-2"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                  </div>
                  <div className='w-1/2'>
                  <label className="label">
                  <span className="label-text-alt text-black">ایمیل:</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full my-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
               </div>
               <div className='w-1/2'>
               <label className="label">
                  <span className="label-text-alt text-black">تکرار پسورد:</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full my-2"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
               </div>  
               </div>

              

          

               

                <button
                  type="submit"
                  className="btn bg-green-500 hover:bg-green-800 text-black w-full my-4"
                >
                  ثبت نام
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
