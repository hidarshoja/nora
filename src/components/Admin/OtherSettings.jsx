import { useEffect, useState } from 'react';
import useGet from '../../hooks/useGet';
import useUpdate from '../../hooks/useUpdate';
import { handleToast } from '../../utils/message';

export default function OtherSettings() {
  const { data, isLoading } = useGet(['setting'], '/setting/about-us')
  const { mutateAsync, isPending } = useUpdate('/setting/about-us', ['setting'])
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

  const handleSubmit = async () => {
    try {
      await mutateAsync({ slug: 'update', body: contactDetails })
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
      <div className="space-y-4">
        <div className='flex sm:flex-row flex-col gap-3'>
          <div>
            <label htmlFor="">مرچند آیدی</label>
            <input
              type="text"
              name="merchand_id"
              placeholder="توکن زرین پال"
              defaultValue={data?.data[5].value}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="">لینک بازگشت</label>
            <input
              type="text"
              name="callback_url"
              placeholder="لینک بازگشت از پرداخت"
              defaultValue={data?.data[6].value}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>


        </div>
        <div className='my-3'>
          <label htmlFor="" >هزینه پست</label>
          <input
            type="number"
            name="post_cost"
            placeholder="هزینه پست"
            defaultValue={data?.data[7].value}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

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