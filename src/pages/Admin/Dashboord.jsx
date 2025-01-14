import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import ChartLineComponent from '../../components/Admin/ChartLineComponent';
import useGet from '../../hooks/useGet';
import { useEffect, useState } from 'react';





export default function Dashboord() {
  const [clients, setClients] = useState([]);
  const {data:statistic, isLoading} = useGet(['views'], '/setting/views/statistic')
  const {data:income, isLoading:loading} = useGet(['incomes'], '/setting/income/statistic')
  
  useEffect(() => {
    setClients([{
      id: 1,
      name: 'تعداد کاربران',
      imageUrl: '/assets/images/new-img/users.svg',
      lastInvoice: { amount: income?.data?.users, status: 'نفر' },
    },
    {
      id: 2,
      name: 'میزان در آمد روزانه',
      imageUrl: '/assets/images/new-img/day.jpg',
      lastInvoice: { amount: income?.data?.totalPriceToday, status: 'تومان' },
    },
    {
      id: 3,
      name: 'میزان در آمد ماهانه',
      imageUrl: '/assets/images/new-img/moon.svg',
      lastInvoice: { amount: income?.data?.totalPriceMonth, status: 'تومان' },
    },
    {
      id: 4,
      name: 'میزان درآمد کل',
      imageUrl: '/assets/images/new-img/total.svg',
      lastInvoice: { amount: income?.data?.totalPriceAll, status: 'تومان' },
    }],)
  },[loading])


if (isLoading || loading) {
    return <div>Loading ...</div>
  }
  return (
   <div className="md:p-4">
   <h3  className="text-lg md:text-xl font-YekanBakh-Regular  mb-5">میزان درآمد و تعداد کاربران</h3>
 
   <ul
      role="list"
      className="flex flex-wrap items-center justify-center gap-6"
    >
      {clients.map((client) => (
        <li
        key={client.id}
        className="w-full md:w-1/3 2xl:w-1/5 overflow-hidden h-40 rounded-xl border border-gray-300 cursor-pointer hover:bg-green-300 transform hover:scale-105 transition-transform duration-200"
      >
          <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
            <img
              alt={client.name}
              src={client.imageUrl}
              className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
            />
            <div className="text-sm font-medium leading-6 text-gray-900">
              {client.name}
            </div>
          </div>
          <dl className="-my-3 divide-y divide-gray-400 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">
                {client.lastInvoice.status === 'نفر' ? 'تعداد کاربر :' : 'مبلغ :'}
              </dt>
              <dd className="flex items-start gap-x-2">
                <div className="font-medium text-gray-900">
                  {new Intl.NumberFormat('fa-IR').format(client.lastInvoice.amount)}
                </div>
                <div>{client.lastInvoice.status}</div>
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
    <h3 className='text-base font-semibold px-3 py-6 mt-6'>نمودار بازدید</h3>
    <ChartLineComponent statistic={statistic.data.data}/>
   </div>
  );
}
