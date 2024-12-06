import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="px-4 sticky top-0  bg-[#3E4095]" style={{zIndex:999}}>
      <div className="container mx-auto max-w-screen-xl">
        <div className="flex items-center justify-between gap-4 lg:gap-40 pt-2">
          <div className="lg:hidden leading-none z-10">
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                <label htmlFor="my-drawer" className="drawer-button">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </label>
              </div> 
              <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu menu-moblie p-4 w-80 min-h-full bg-base-200 text-base-content">
                  <div className="drawer-content text-left">
                    <label htmlFor="my-drawer" className="swap swap-rotate drawer-button">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </label> 
                  </div> 
                  <li><Link to="/">صفحه اصلی</Link></li>
                  <li><Link to="/shop">فروشگاه</Link></li>
                  <li><Link to="/blog">وبلاگ</Link></li>
                  <li><Link to="/contact">درباره ما</Link></li>
                  <li><Link to="/about">تماس با ما</Link></li>
                  <li><Link to="/login">ورود</Link></li>
                  <li><Link to="/register">ثبت نام </Link></li>
                  <li><Link to="/Question">سوالات متداول</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex items-center lg:flex-1 gap-8">
            <div><Link to="/"><img src="/assets/images/new-img/logo.png" className="w-40 h-28 rounded-full" alt="Logo" /></Link></div>
            <div className="hidden lg:block form-control w-full">
              <div className="flex items-center gap-8">
                <ul className="flex menu lg:menu-horizontal !p-0">
                  <li><Link to="/">صفحه اصلی</Link></li>
                  <li><Link to="/shop">فروشگاه</Link></li>
                  <li><Link to="/blog">وبلاگ</Link></li>
                  <li><Link to="/contact">درباره ما</Link></li>
                  <li><Link to="/about">تماس با ما</Link></li>
                </ul>
              </div> 
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:block text-white"><Link to="/login">ورود / ثبت نام</Link></div>
           

            <div className="indicator">
              <span className="indicator-item badge bg-yellow-400">4+</span> 
              <Link to="/cart" className="p-1">
                <svg xmlns="http://www.w3.org/2000/svg" style={{ color: 'white' }} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>                              
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
