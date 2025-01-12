import React, { useState, useEffect } from 'react';
import moment from 'moment-jalaali';

const CountdownTimer = ({expiredAt}) => {
  const persianDate = expiredAt;  
  const currentDate = new Date();
  const persianToGregorian = moment(persianDate, "jYYYY-jMM-jDD HH:mm:ss").toDate();

  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const timeDifference = persianToGregorian - new Date();

      if (timeDifference <= 0) {
        clearInterval(interval);
      } else {
        setRemainingTime({
          days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [persianToGregorian]);

  return (
    <div className="hidden lg:block lg:col-span-3">
      <div className="bg-stone-800 rounded-3xl p-4">
        <div className="flex flex-col leading-8">
          <p className="text-white text-center">با  تخفیف شگفتانه محصول خود را خریداری کنید :)</p>
          <div className="flex justify-center my-12">
            <img className="w-48" src="assets/images/off.png" alt="Offer" />
          </div>
          <div className="grid grid-cols-4 gap-2 leading-4">
            <div className="flex flex-col text-center text-white bg-stone-900 px-2 py-4 rounded-2xl">
              <span className="countdown font-YekanBakh-SemiBold text-3xl">
                <span style={{ '--value': remainingTime.seconds }}></span>
              </span>
              ثانیه
            </div>
            <div className="flex flex-col text-center text-white bg-stone-900 px-2 py-4 rounded-2xl">
              <span className="countdown font-YekanBakh-SemiBold text-3xl">
                <span style={{ '--value': remainingTime.minutes }}></span>
              </span>
              دقیقه
            </div>
            <div className="flex flex-col text-center text-white bg-stone-900 px-2 py-4 rounded-2xl">
              <span className="countdown font-YekanBakh-SemiBold text-3xl">
                <span style={{ '--value': remainingTime.hours }}></span>
              </span>
              ساعت
            </div>
            <div className="flex flex-col text-center text-white bg-stone-900 px-2 py-4 rounded-2xl">
              <span className="countdown font-YekanBakh-SemiBold text-3xl">
                <span style={{ '--value': remainingTime.days }}></span>
              </span>
              روز
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
