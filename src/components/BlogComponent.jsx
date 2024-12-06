import React from 'react';

export default function BlogComponent() {
  const posts = [
    {
      title: 'راهنمای جلوگیری از لرزش موتور',
      image: 'assets/images/new-img/lazresh.webp',
      date: '26 خرداد',
      link: '#'
    },
    {
      title: 'هوا گیری رادیاتور',
      image: 'assets/images/new-img/hava.jpg',
      date: '26 خرداد',
      link: '#'
    },
    {
      title: 'سرویس گریبکس',
      image: 'assets/images/new-img/dande.jpg',
      date: '26 خرداد',
      link: '#'
    }
  ];

  return (
    <section className="my-14 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div className="text-center mb-8">
          <h2 className="font-YekanBakh-ExtraBlack text-3xl">خواندنی های جدید</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <div key={index} className="bg-white p-4 rounded-3xl">
              <div className="relative">
                <a href={post.link}>
                  <img className="rounded-2xl" src={post.image} alt="" style={{ height: '300px' }} />
                </a>
                <div className="absolute top-4 left-4 bg-white border-t-4 border-yellow-400 p-2 px-3 rounded-xl">
                  <div className="flex flex-col">
                    <span className="font-YekanBakh-ExtraBold text-2xl">26</span>
                    <span className="font-YekanBakh-Bold">خرداد</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <a href={post.link}>
                    <h3 className="font-YekanBakh-ExtraBold text-base">{post.title}</h3>
                  </a>
                </div>
                <div>
                  <a className="flex items-center" href={post.link}>
                    <span className="ml-2">بیشتر</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
