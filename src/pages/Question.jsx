import React , { useState } from 'react'

export default function Question() {
    const [selected, setSelected] = useState(null);

    const toggleCollapse = (index) => {
      setSelected(selected === index ? null : index);
    };
  return (
    <div>
          <section>
        <div className="relative flex justify-center items-center">

                <img className="object-cover lg:h-auto h-60" src="../assets/images/bg-faq.jpg" alt="" />

            <div className="form-control w-full max-w-lg absolute p-4 text-center">
                <h2 className="font-YekanBakh-ExtraBlack text-3xl mb-4 text-white">سوال خود را برای ما ارسال  کنید...</h2>
                <div className="relative">
                  <input type="text" placeholder="تایپ کنید ..." className="input input-bordered w-full max-w-lg placeholder:text-sm" /> 
                  <button className="btn absolute top-0 left-0 rounded-r-none">
                    ارسال
                      
                  </button>
                </div>
              </div>
        </div>

         </section>
         <section className="my-14 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div className="collapse collapse-plus bg-base-200 my-4">
          <input
            type="radio"
            name="my-accordion-3"
            checked={selected === 0}
            onChange={() => toggleCollapse(0)}
          />
          <div className="collapse-title text-base font-YekanBakh-ExtraBold">
            فرم ها را چگونه می توانم دانلود کنم؟
          </div>
          <div className="collapse-content">
            <p>
              لوازم ماشین شامل اجزای مختلفی است که به بهبود عملکرد، ایمنی و راحتی راننده کمک می‌کند. برخی از این لوازم شامل روغن موتور، فیلتر هوا، لنت ترمز و تایرها هستند. این لوازم باید به صورت منظم بررسی و تعویض شوند تا از عملکرد بهینه خودرو اطمینان حاصل شود.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200 my-4">
          <input
            type="radio"
            name="my-accordion-3"
            checked={selected === 1}
            onChange={() => toggleCollapse(1)}
          />
          <div className="collapse-title text-base font-YekanBakh-ExtraBold">
            آیا پس از عضویت نیاز به تایید ایمیل است؟
          </div>
          <div className="collapse-content">
            <p>
              برای نگهداری لوازم ماشین خود، باید توجه ویژه‌ای به تعویض روغن موتور و بررسی سیستم خنک‌کننده خودرو داشته باشید. به علاوه، فیلتر هوا باید به‌طور منظم تعویض شود تا عملکرد خودرو بهینه باقی بماند.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200 my-4">
          <input
            type="radio"
            name="my-accordion-3"
            checked={selected === 2}
            onChange={() => toggleCollapse(2)}
          />
          <div className="collapse-title text-base font-YekanBakh-ExtraBold">
            چگونه اکانت خود را بازیابی کنیم؟
          </div>
          <div className="collapse-content">
            <p>
              لوازم جانبی ماشین مانند GPS، ردیاب‌ها و سیستم‌های صوتی هم می‌توانند عملکرد خودرو را بهبود ببخشند. این لوازم می‌توانند تجربه رانندگی شما را راحت‌تر و سرگرم‌کننده‌تر کنند.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200 my-4">
          <input
            type="radio"
            name="my-accordion-3"
            checked={selected === 3}
            onChange={() => toggleCollapse(3)}
          />
          <div className="collapse-title text-base font-YekanBakh-ExtraBold">
            آیا برای سفارش خدمات تماس بگیریم؟
          </div>
          <div className="collapse-content">
            <p>
              برای بهبود عملکرد خودرو، لوازم مختلفی مانند باتری، سیستم فرمان و سیستم تعلیق باید به‌طور منظم بررسی و تعویض شوند. این لوازم نقش مهمی در ایمنی و راحتی راننده ایفا می‌کنند.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200 my-4">
          <input
            type="radio"
            name="my-accordion-3"
            checked={selected === 4}
            onChange={() => toggleCollapse(4)}
          />
          <div className="collapse-title text-base font-YekanBakh-ExtraBold">
            چگونه مشاوره رایگان دریافت کنیم؟
          </div>
          <div className="collapse-content">
            <p>
              برای انتخاب بهترین لوازم ماشین، باید با کارشناسان این حوزه مشورت کنید. این لوازم شامل قطعات یدکی، لوازم جانبی و تجهیزات ویژه‌ای هستند که به شما کمک می‌کنند خودرویتان در شرایط مختلف عملکرد بهتری داشته باشد.
            </p>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
