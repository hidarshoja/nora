import  { useState } from "react";

export default function TicketUser() {
  const [filter, setFilter] = useState("همه");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    category: "مالی",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ticket Data:", formData);
    setIsModalOpen(false); // بستن مدال پس از ارسال
  };
  const tickets = [
    {
      id: 1,
      status: "در حال بررسی",
      title: "مشکل اتصال به سرور",
      date: "۱۴۰۲/۰۹/۲۳",
    },
    {
      id: 2,
      status: "پاسخ داده شده",
      title: "سوال درباره محصول",
      date: "۱۴۰۲/۰۹/۲۴",
    },
  ];

  const filteredTickets =
    filter === "همه"
      ? tickets
      : tickets.filter((ticket) => ticket.status === filter);

  return (
    <div className="p-2">
    <div className="p-3 bg-stone-200 rounded-xl my-4">
                  <h1 className="text-sm font-YekanBakh-Bold">تیکت ها</h1>
                </div>
    <div className="w-full text-black py-6">
      <div className="flex flex-col md:flex-row gap-2 py-4 items-center justify-between">
        <div className="w-full md:w-[250px] flex items-center justify-between gap-2  border border-gray-400 rounded-md p-3 bg-gray-100">
             <div>
             <svg className="size-10 sm:size-12" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M33.625 4C27.343 4 22.25 9.044 22.25 15.266C22.25 21.489 27.343 26.533 33.625 26.533C36.39 26.533 39.061 25.535 41.138 23.726C41.512 23.423 41.566 22.877 41.26 22.507C40.953 22.137 40.402 22.082 40.028 22.386C36.037 25.904 29.956 25.518 26.445 21.564C22.934 17.611 23.324 11.587 27.315 8.11C31.307 4.632 37.389 5.018 40.9 8.972C42.446 10.712 43.298 12.949 43.25 15.267V38.667C43.25 40.103 42.075 41.267 40.625 41.267H7.375C5.925 41.267 4.75 40.103 4.75 38.667V16.294L19.402 25.529L10.256 34.587C9.909 34.92 9.899 35.468 10.235 35.813C10.571 36.157 11.125 36.167 11.472 35.834L20.914 26.482L23.53 28.129C23.938 28.386 24.479 28.267 24.739 27.863C24.998 27.459 24.878 26.923 24.47 26.666L5.285 14.573C5.778 13.92 6.552 13.535 7.375 13.533H19.625C20.108 13.533 20.5 13.145 20.5 12.667C20.5 12.188 20.108 11.8 19.625 11.8H7.375C4.96 11.803 3.003 13.741 3 16.133V38.667C3.003 41.059 4.96 42.997 7.375 43H40.625C43.04 42.997 44.997 41.059 45 38.667V15.267C44.993 9.047 39.904 4.007 33.625 4Z" fill="#22C55E" />
  <path d="M38.256 11.188L31 18.375L28.994 16.388C28.646 16.055 28.092 16.065 27.756 16.409C27.429 16.745 27.429 17.277 27.756 17.613L30.381 20.213C30.723 20.552 31.277 20.552 31.619 20.213L39.494 12.413C39.829 12.069 39.82 11.52 39.472 11.188C39.133 10.863 38.596 10.863 38.256 11.188Z" fill="#22C55E" />
              </svg>

             </div>
             <div className="flex flex-col gap-2">
                  <span>
                  تیکت پاسخ داده شده
                  </span>
                  <span>0</span>
             </div>
        </div>
        <div className="w-full md:w-[250px] flex items-center justify-between gap-2  border border-gray-400 rounded-md p-3 bg-gray-100">
             <div>
             <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M44.1243 23.5065C43.641 23.5065 43.2493 23.8889 43.2493 24.3605V39.7309C43.2493 41.1457 42.074 42.2926 40.6243 42.2926H7.3749C5.92518 42.2926 4.74994 41.1457 4.74994 39.7309V17.3977L19.4409 26.7514L10.2536 35.7175C9.90601 36.0452 9.89641 36.5857 10.2321 36.925C10.5677 37.2642 11.1217 37.2735 11.4693 36.9459C11.4766 36.9391 11.4838 36.9321 11.4908 36.925L20.9371 27.7018L23.5201 29.3456C23.8667 29.5659 24.3241 29.5192 24.6164 29.2338L27.2414 26.672C27.577 26.3328 27.5674 25.7922 27.2199 25.4646C26.8808 25.145 26.3432 25.145 26.0042 25.4646L23.8815 27.5361L5.25656 15.6804L8.24991 12.7592V14.9674C8.24991 15.439 8.64168 15.8213 9.12492 15.8213C9.60816 15.8213 9.99993 15.439 9.99993 14.9674V4.72046H23.9997C24.483 4.72046 24.8747 4.33812 24.8747 3.86652C24.8747 3.39492 24.483 3.01259 23.9997 3.01259H9.99985C9.05339 2.99313 8.26993 3.72603 8.24991 4.64969V10.3443L3.25634 15.2176C3.09228 15.3778 3 15.5949 3 15.8213V39.7309C3.00287 42.0877 4.95994 43.9976 7.3749 44.0004H40.6243C43.0393 43.9976 44.9963 42.0877 44.9992 39.7309V24.3605C44.9993 23.8889 44.6075 23.5065 44.1243 23.5065Z" fill="#FBBF24"/>
  <path d="M22.2835 14.9553C22.7149 20.4124 27.1578 24.7483 32.7496 25.1693V28.7711C31.6668 29.0903 30.9453 30.0876 30.9997 31.1902V38.0215C30.9585 39.3961 32.0669 40.543 33.4754 40.5832H34.7184C34.8192 40.5832 34.9192 40.5662 35.0141 40.5329C36.2693 40.3408 37.1772 39.2604 37.1245 38.0215V31.1902C37.1245 30.7186 36.7328 30.3363 36.2495 30.3363C35.7663 30.3363 35.3745 30.7186 35.3745 31.1902V38.0215C35.4177 38.451 35.096 38.8333 34.6559 38.8754H33.6247C33.1846 38.9176 32.7929 38.6037 32.7496 38.1742V31.1902C32.7064 30.7608 33.0281 30.3785 33.4682 30.3363C34.1079 30.3363 34.4997 29.954 34.4997 29.4824V25.1693C40.7632 24.6977 45.449 19.3601 44.9658 13.2475C44.4825 7.13477 39.0132 2.56183 32.7496 3.03343C26.4861 3.50503 21.8003 8.84264 22.2835 14.9553ZM33.6247 4.71897C38.9403 4.71897 43.2495 8.92438 43.2495 14.112C43.2495 19.2996 38.9403 23.505 33.6247 23.505C28.309 23.505 23.9998 19.2996 23.9998 14.112C24.0061 8.92694 28.3116 4.72514 33.6247 4.71897Z" fill="#FBBF24"/>
  <path d="M27.4994 14.9651C27.9827 14.9651 28.3745 14.5827 28.3745 14.1111C28.3773 11.2827 30.7261 8.99046 33.6244 8.98766C34.1076 8.98766 34.4994 8.60532 34.4994 8.13372C34.4994 7.66212 34.1076 7.27979 33.6244 7.27979C29.7603 7.28403 26.6289 10.34 26.6245 14.111C26.6245 14.5828 27.0162 14.9651 27.4994 14.9651Z" fill="#FBBF24"/>
           </svg>

             </div>
             <div className="flex flex-col gap-2">
                  <span>
                  تیکت   در حال بررسی
                  </span>
                  <span>0</span>
             </div>
        </div>
        <div className="w-full md:w-[250px] flex items-center justify-between gap-2  border border-gray-400 rounded-md p-3 bg-gray-100">
             <div>
             <svg className="size-10 sm:size-12" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M33.625 4C27.343 4 22.25 9.044 22.25 15.267c0 6.222 5.093 11.267 11.375 11.267 2.766 0 5.437-1 7.514-2.807.374-.303.429-.849.122-1.219s-.846-.423-1.219-.122c-4.992 3.478-11.073 3.092-14.584-.861-3.511-3.953-3.122-9.977.87-13.454 3.992-3.477 10.074-3.091 13.585.861C42.397 10.712 43.25 12.95 43.25 15.267V38.667c0 1.436-1.175 2.6-2.625 2.6H7.375c-1.45 0-2.625-1.164-2.625-2.6V16.294L19.402 25.53l-9.146 9.058c-.347.333-.357.882-.021 1.227s.882.357 1.23.025l9.42-9.331 2.616 1.647c.407.257.948.138 1.208-.267.26-.404.14-.94-.268-1.197L5.285 14.573c.492-.654 1.266-1.04 2.09-1.041H19.625c.484 0 .875-.389.875-.867s-.391-.867-.875-.867H7.375c-2.415.003-4.372 1.941-4.375 4.333V38.667c.003 2.392 1.96 4.333 4.375 4.333H40.625c2.415-.003 4.372-1.941 4.375-4.333V15.267C44.993 9.047 39.905 4.007 33.625 4Z" fill="#EF4444"/>
  <path d="M37.744 11.187c-.342-.338-.896-.338-1.237 0L33.625 14.041l-2.882-2.854c-.348-.333-.902-.323-1.237.021-.327.336-.327.869 0 1.205l2.882 2.854-2.882 2.854c-.348.333-.357.882-.021 1.227.336.342.89.352 1.237.021l2.882-2.854 2.882 2.854c.348.333.902.323 1.237-.021.327-.336.327-.869 0-1.205L34.863 15.266l2.882-2.854c.342-.338.342-.886 0-1.225Z" fill="#EF4444"/>
          </svg>


             </div>
             <div className="flex flex-col gap-2">
                  <span>
                  تیکت  بسته شده
                  </span>
                  <span>0</span>
             </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white p-1.5 text-sm md:p-2 rounded-lg">
          ارسال تیکت جدید
        </button>
        <div className="relative">
          <select
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 p-1.5 text-sm md:p-2 rounded-lg shadow focus:outline-none focus:shadow-outline"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="همه">مرتب سازی بر اساس: همه</option>
            <option value="منتظر پاسخ">منتظر پاسخ</option>
            <option value="پاسخ داده شده">پاسخ داده شده</option>
            <option value="در حال بررسی">در حال بررسی</option>
          </select>
        </div>
      </div>
      <div>
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border border-gray-300 rounded-lg p-4 mb-4"
            >
              <h2 className="text-lg font-semibold">{ticket.title}</h2>
              <p className="text-gray-500">{ticket.status}</p>
              <p className="text-gray-400 text-sm">{ticket.date}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">هیچ تیکتی یافت نشد.</p>
        )}
      </div>
    </div>
    {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">ارسال تیکت جدید</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-gray-700 mb-2 text-sm"
                >
                  دسته‌بندی:
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="مالی">مالی</option>
                  <option value="پشتیبانی">پشتیبانی</option>
                  <option value="مشاوره">مشاوره</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block text-gray-700 mb-2 text-sm"
                >
                  موضوع تیکت:
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 mb-2 text-sm"
                >
                  متن تیکت:
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => setIsModalOpen(false)}
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  ارسال تیکت
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
 
    </div>
  );
}
