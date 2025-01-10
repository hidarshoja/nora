import React , { useState } from 'react'
import useGet from '../hooks/useGet';

export default function Question() {
  const{data:question , isLoading} = useGet(['question'], '/question')
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
                {/* <div className="relative">
                  <input type="text" placeholder="تایپ کنید ..." className="input input-bordered w-full max-w-lg placeholder:text-sm" /> 
                  <button className="btn absolute top-0 left-0 rounded-r-none">
                    ارسال
                      
                  </button>
                </div> */}
              </div>
        </div>

         </section>
         <section className="my-14 px-4">
      <div className="container mx-auto max-w-screen-xl">
        {question?.data?.map((question, index) => (
          <div className="collapse collapse-plus bg-base-200 my-4">
          <input
            type="radio"
            name="my-accordion-3"
            checked={selected === index}
            onChange={() => toggleCollapse(index)}
          />
          <div className="collapse-title text-base font-YekanBakh-ExtraBold">
            {question.name}
          </div>
          <div className="collapse-content">
            <p>
             {question.description}
            </p>
          </div>
        </div>
        ))}
        
      </div>
    </section>
    </div>
  )
}
