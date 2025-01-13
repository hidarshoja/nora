import { useEffect, useState } from 'react';
import useGet from '../../hooks/useGet';
import useUpdate from '../../hooks/useUpdate';
import { handleToast } from '../../utils/message';

export default function ContactSettings() {
  const { data, isLoading } = useGet(['setting'], '/setting/about-us')
  const { mutateAsync, isPending } = useUpdate('/setting/about-us',['setting'])
  const [contactDetails, setContactDetails] = useState([]);

  useEffect(() => {
    data?.data.map(item => {
      setContactDetails(prev => ([...prev, { key: item.key, value: item.value }]));
    })
  }, [isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactDetails((prev) => 
      prev.map(item => item.key === name ? { ...item, value } : item)
    );
  };

  const handleSubmit = async() => {
    try {
      await mutateAsync({slug: 'update', body: contactDetails})
      handleToast('success', 'تغییرات با موفقیت ذخیره شد')
    } catch (error) {
      console.log(error)
    }
  };


  if (isLoading) {
    return <div>Loading ....</div>
  }
  return (
    <div className="p-4">
      <h2 className="text-lg font-YekanBakh-Regular mb-4">تغییر راه ارتباطی</h2>
      <div className="space-y-4">
        <div className='flex sm:flex-row flex-col gap-3'>
          <input
            type="number"
            name="phone1"
            placeholder="شماره تماس اول"
            defaultValue={data?.data[3].value}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="phone2"
            placeholder="شماره تماس دوم"
            defaultValue={data?.data[4].value}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className='flex sm:flex-row flex-col gap-3'>
          <input
            type="email"
            name="email"
            placeholder="ایمیل"
            defaultValue={data?.data[0]?.value}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="work"
            placeholder="ساعت  کار"
            value={data?.data[2]?.value}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

        </div>


        <textarea
          name="address"
          placeholder="آدرس"
          value={data?.data[1]?.value}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-400 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {isPending ? 'در حال ذخیره' : 'ذخیره'}
        </button>
      </div>
    </div>
  );
}