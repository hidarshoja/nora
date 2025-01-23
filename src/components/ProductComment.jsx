import { StarIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { IoStarHalf } from 'react-icons/io5'
import WriteComment from './WriteComment'
import { useAtomValue } from 'jotai'
import { userProfile } from '../stores/store'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductComment({ comments, id , reviews }) {
    const [open, setOpen] = useState(false)
    const user = useAtomValue(userProfile)

   
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
                <div className="lg:col-span-4">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">نظرات مشتریان</h2>

                    <div className="mt-3 flex items-center">
                        <div>
                            <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                    <StarIcon
                                        key={rating}
                                        aria-hidden="true"
                                        className={classNames(
                                            reviews?.average > rating ? 'text-yellow-400' : 'text-gray-300',
                                            'h-5 w-5 flex-shrink-0',
                                        )}
                                    />
                                ))}
                            </div>
                            <p className="sr-only">{reviews?.average || 0} out of 5 stars</p>
                        </div>
                        <p className="ml-2 text-sm text-gray-900">بر اساس {reviews?.totalCount} نظر</p>
                    </div>

                    <div className="mt-6">
                        <h3 className="sr-only">Review data</h3>

                        <dl className="space-y-3">
                            {reviews.counts.map((count) => (
                                <div key={count.rating} className="flex items-center text-sm">
                                    <dt className="flex flex-1 items-center">
                                        <p className="w-3 font-medium text-gray-900">
                                            {count.rating}
                                            <span className="sr-only"> star reviews</span>
                                        </p>
                                        <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                                            <StarIcon
                                                aria-hidden="true"
                                                className={classNames(
                                                    count.count > 0 ? 'text-yellow-400' : 'text-gray-300',
                                                    'h-5 w-5 flex-shrink-0',
                                                )}
                                            />

                                            <div className="relative ml-3 flex-1">
                                                <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                                                {count.count > 0 ? (
                                                    <div
                                                        style={{ width: `calc(${count.count} / ${reviews.totalCount} * 100%)` }}
                                                        className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                                                    />
                                                ) : null}
                                            </div>
                                        </div>
                                    </dt>
                                    <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                                        {Math.round((count.count / reviews.totalCount) * 100) || 0}%
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-lg font-medium text-gray-900">نظر خود را به اشتراک بذارید</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            اگر شما این محصول را خریداری کرده اید، نظر خود را ارسال کنید.
                        </p>

                        <button
                            onClick={() => setOpen(true)}
                            className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                            disabled={!user}
                        >
                            {user ? 'ارسال کامنت' : 'برای ارسال نظر وارد بشوید'}
                        </button>
                    </div>
                </div>

                <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
                    <h3 className="sr-only">Recent reviews</h3>

                    <div className="flow-root">
                        <div className="-my-12 divide-y divide-gray-200">
                            {comments.length > 0 ? comments.filter(comment => comment.status === 'published').map((review) => (
                                <div key={review.id} className="py-12">
                                    <div className="flex items-center">
                                        <img alt={`${review.user.first_name}.`} src={'/assets/images/user.png'} className="h-12 w-12 rounded-full" />
                                        <div className="ml-4">
                                            <h4 className="text-sm font-bold text-gray-900">{review.user.first_name + ' ' + review.user.last_name}</h4>
                                            <div className="mt-1 flex items-center">
                                                {[0, 1, 2, 3, 4].map((rating) => (
                                                    <StarIcon
                                                        key={rating}
                                                        aria-hidden="true"
                                                        className={
                                                            review.rate >= rating + 1
                                                                ? 'text-yellow-400 h-5 w-5 flex-shrink-0' // Full Star
                                                                : 'text-gray-300 h-5 w-5 flex-shrink-0' // Empty Star
                                                        }
                                                    />
                                                ))}
                                            </div>


                                        </div>
                                    </div>

                                    <div
                                        className="mt-4 space-y-6 text-base italic text-gray-600"
                                    >
                                        {review.body}
                                    </div>
                                </div>
                            )) : (
                                <p className='font-bold flex justify-center items-center h-96'>اولین نفری باشید که راجب این محصول نظر میدهید!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <WriteComment open={open} setOpen={setOpen} id={id} />
        </div>
    )
}
