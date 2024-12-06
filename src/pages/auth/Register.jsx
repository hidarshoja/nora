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

  // Handle form submission
  const handleRegister = (e) => {
    e.preventDefault(); // Prevent form submission
    if (password !== confirmPassword) {
      console.log('پسوردها یکسان نیستند!');
      return;
    }
    console.log('نام:', firstName);
    console.log('نام خانوادگی:', lastName);
    console.log('شماره تماس:', phone);
    console.log('ایمیل:', email);
    console.log('پسورد:', password);
    // می‌توانید اینجا درخواست به سرور را انجام دهید
  };

  return (
    <section className="h-screen px-4 flex items-center">
      <div className="container mx-auto max-w-screen-lg">
        <div className="bg-[#3E4095] mt-6 text-white rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 p-8 md:p-4 lg:p-20 lg:pb-0 text-center">
              <form onSubmit={handleRegister}>
                <h2 className="text-3xl font-YekanBakh-ExtraBlack my-4">ثبت نام</h2>

                <label className="label">
                  <span className="label-text-alt text-white">نام:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full my-2"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />

                <label className="label">
                  <span className="label-text-alt text-white">نام خانوادگی:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full my-2"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />

                <label className="label">
                  <span className="label-text-alt text-white">شماره تماس:</span>
                </label>
                <input
                  type="tel"
                  className="input input-bordered w-full my-2"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                <label className="label">
                  <span className="label-text-alt text-white">ایمیل:</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full my-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label className="label">
                  <span className="label-text-alt text-white">پسورد:</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full my-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <label className="label">
                  <span className="label-text-alt text-white">تکرار پسورد:</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full my-2"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  className="btn bg-green-500 hover:bg-green-800 text-white w-full my-4"
                >
                  ثبت نام
                </button>
              </form>

              <p className="text-center my-4">
                اگر حساب کاربری دارید <Link to="/login">وارد شوید</Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
