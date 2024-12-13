import { useState } from 'react';

export default function ContactSettings() {
  const [contactDetails, setContactDetails] = useState({
    firstPhone: "",
    secondPhone: "",
    email: "",
    startTime: "",
    endTime: "",
    address: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log(contactDetails);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-YekanBakh-Regular mb-4">تغییر راه ارتباطی</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="firstPhone"
          placeholder="شماره تماس اول"
          value={contactDetails.firstPhone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="secondPhone"
          placeholder="شماره تماس دوم"
          value={contactDetails.secondPhone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="ایمیل"
          value={contactDetails.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="time"
          name="startTime"
          placeholder="ساعت شروع کار"
          value={contactDetails.startTime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="time"
          name="endTime"
          placeholder="ساعت پایان کار"
          value={contactDetails.endTime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="address"
          placeholder="آدرس"
          value={contactDetails.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          ذخیره و ارسال
        </button>
      </div>
    </div>
  );
}