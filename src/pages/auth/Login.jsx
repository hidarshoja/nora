import React, { useState } from 'react';

const Login = () => {
  // States for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission
    console.log('نام کاربری:', username);
    console.log('پسورد:', password);
    // می‌توانید اینجا درخواست به سرور را انجام دهید
  };

  return (
    <section className="h-screen px-4 flex items-center">
      <div className="container mx-auto max-w-screen-lg">
        <div className="bg-[#3E4095] text-white rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 p-8 md:p-4 lg:p-20 lg:pb-0 text-center">
              <form onSubmit={handleLogin}>
                <h2 className="text-3xl font-YekanBakh-ExtraBlack my-4">ورود</h2>

                <label className="label">
                  <span className="label-text-alt text-white">نام کاربری:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full my-2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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

                <button
                  type="submit"
                  className="btn bg-green-500 hover:bg-green-800 text-white w-full my-4"
                >
                  ورود
                </button>
              </form>

              <p className="text-center my-4">
                رمز عبور خود را <a href="lost-password.html">فراموش </a>کرده اید؟
              </p>
              <div className="divider my-8">یا</div>
              <p className="text-center my-4">
                <a href="sign-up.html">حساب کاربری ندارید !!!</a>
              </p>
            </div>

          
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
