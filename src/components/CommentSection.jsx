import { StarIcon } from '@heroicons/react/20/solid'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CommentSection({ comments }) {
  return (
    <div className="bg-white my-5">
      <div>
        <h2 className="sr-only">Customer Reviews</h2>

        <div className="-my-10">
          {comments
            .filter((review) => review.status === "published")
            .map((review, reviewIdx) => (
              <div key={reviewIdx} className="flex flex-col space-x-4 text-sm text-gray-500">
                <div className='flex space-x-4 text-sm text-gray-500'>
                  <div className="flex-none py-10">
                    <img alt="" src="/assets/images/user.png" className="h-10 w-10 rounded-full bg-gray-100" />
                  </div>
                  <div className={classNames(reviewIdx === 0 ? '' : 'border-t border-gray-200', 'flex-1 py-10')}>
                    <h3 className="font-medium text-gray-900">{review.username}</h3>
                    <p>
                      {new Intl.DateTimeFormat('fa-IR', { dateStyle: 'long' }).format(new Date(review.updatedAt))}
                    </p>

                    {/* <div className="mt-4 flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        4 > rating ? 'text-yellow-400' : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0',
                      )}
                    />
                  ))}
                </div> */}


                    <div
                      className="prose prose-sm mt-4 max-w-none text-gray-500"
                    >
                      {review.body}
                    </div>
                  </div>
                </div>

                {review.replies.length > 0 && review.replies.map((review, reviewIdx) => (


                  <div key={reviewIdx} className="flex space-x-4 text-sm text-gray-500 bg-gray-100">
                    <div className="flex-none py-10">
                      <img alt="" src="/assets/images/user-head.png" className="size-16 rounded-full bg-gray-100" />
                    </div>
                    <div className={classNames(reviewIdx === 0 ? '' : 'border-t border-gray-200', 'flex-1 py-10')}>
                      <h3 className="font-medium text-gray-900">{'ادمین نوراپارت'}</h3>
                      <p>
                        {new Intl.DateTimeFormat('fa-IR', { dateStyle: 'long' }).format(new Date(review.updatedAt))}
                      </p>

                      {/* <div className="mt-4 flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        4 > rating ? 'text-yellow-400' : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0',
                      )}
                    />
                  ))}
                </div> */}


                      <div
                        className="prose prose-sm mt-4 max-w-none text-gray-500"
                      >
                        {review.body}
                      </div>
                    </div>
                  </div>
                ))}

              </div>

            ))}
        </div>
      </div>
    </div>
  )
}
