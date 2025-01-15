import React, { useEffect } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import axiosClient from '../axios-client'
import useCart from '../hooks/useCart'
const SuccessPayment = () => {
    const { setCart } = useCart()
    const { state } = useLocation()

    if (!state?.authority) {
        return <Navigate to={'/cart'} />
    }

    useEffect(() => {
        const verify = async () => {
            const items = JSON.parse(localStorage.getItem('body'))

            try {
                const response = await axiosClient.post('/order', items)

                const body = {
                    authority: state.authority,
                    amount: items.total_price * 10,
                    user_id: items.user_id,
                    address_id: response.data.address_id
                }
                try {
                    const res = await axiosClient.post('/order/verify', body)

                    if (res.status === 200) {
                        setCart([]);
                        localStorage.removeItem('body');
                        console.log('Verification successful, body removed:', res.data);
                    } else {
                        console.error('Verification failed, response status:', res.status);
                    }

                    console.log(res)
                } catch (error) {
                    console.log(error)
                }

            } catch (error) {
                console.log(error)
            }

        }
        console.log('State Status:', state?.status);

        if (state?.status === "OK") {
            verify()
        }
    }, [])

    return (

        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className=" p-6  md:mx-auto">
                <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                    <path fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                    </path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">پرداخت با موفقیت انجام شد!!</h3>
                    <p className="text-gray-600 my-2">شما میتوانید جهت پیگیری سفارش خود به پنل کاربری مراجعه فرمایید</p>
                    <p> با تشکر از خرید شما  </p>
                    <div className="py-10 text-center">
                        <Link to="/" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                            بازگشت به خانه
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessPayment