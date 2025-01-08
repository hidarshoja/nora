'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { IoStar } from "react-icons/io5"; // Import star icons
import usePost from '../hooks/usePost';
import { handleToast } from '../utils/message';
import { useAtomValue } from 'jotai';
import { userProfile } from '../stores/store';

const WriteComment = ({ open, setOpen, id }) => {
    const {mutateAsync,isPending} = usePost('/product-comment',['product-comment'])
    const user = useAtomValue(userProfile)
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");

    // Function to handle rating selection
    const handleRating = (rate) => {
        setRating(rate); // Update the rating state
    };

    // Render stars based on the rating or hover
    const renderStars = () => {
        return [1, 2, 3, 4, 5].map((value, index) => (
            <span
                key={index}
                className="cursor-pointer"
                onClick={() => handleRating(value)} // Set rating on click
                onMouseEnter={() => setHoverRating(value)} // Show hover effect
                onMouseLeave={() => setHoverRating(0)} // Reset hover
            >
                {hoverRating >= value || (!hoverRating && rating >= value) ? (
                    <IoStar className="text-yellow-400 h-6 w-6" />
                ) : (
                    <IoStar className="text-gray-300 h-6 w-6" />
                )}
            </span>
        ));
    };


    // Handle form submission
    const handleSubmit = async() => {
       
        const body = {
            product_id: id,
            user_id: user?.id,
            body: comment,
            rate: rating
        }
        try {
            await mutateAsync(body)
            handleToast('success', 'کامنت شما ثبت شد')
            setComment(null)
            setOpen(false)
            setRating(0)
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 w-full"
                    >
                        <div className="sm:flex sm:items-end w-full">
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-right w-full">
                                <div className="mt-2 w-full">
                                    <div className="max-w-md mx-auto p-4 ">
                                        <h2 className="text-lg font-bold mb-4">نظر خود را بنویسید!</h2>
                                        <form >
                                            {/* Rating Section */}
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    امتیاز
                                                </label>
                                                <div className="flex items-center">{renderStars()}</div>
                                            </div>

                                            {/* Textarea Section */}
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="comment"
                                                    className="block text-sm font-medium text-gray-700 mb-2"
                                                >
                                                    نظر شما
                                                </label>
                                                <textarea
                                                    id="comment"
                                                    rows="4"
                                                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-yellow-400"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    placeholder="نظر خود را وارد کنید..."
                                                />
                                            </div>


                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:mr-3 sm:w-auto"
                                disabled={isPending}
                            >
                                {isPending ? 'در حال ارسال' : 'ارسال نظر'}
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => setOpen(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                انصراف
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
export default WriteComment