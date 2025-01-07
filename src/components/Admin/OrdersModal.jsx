'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function OrdersModal({ open, setOpen,orders }) {

  return (
    <Dialog open={open} onClose={() => setOpen(prev => ({ ...prev, orders: false }))} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0  w-full">
                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900 mb-4">
                  جزییات محصول
                </DialogTitle>
                  <table className="min-w-full divide-y divide-gray-300 border w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th
                          className="px-3 py-4 text-center text-sm font-semibold text-gray-900 font-YekanBakh-Regular"
                        >
                          نام محصول
                        </th>
                        <th
                          className="px-3 py-4 text-center text-sm font-semibold text-gray-900 font-YekanBakh-Regular"
                        >
                          تعداد
                        </th>
                        <th
                          className="px-3 py-4 text-center text-sm font-semibold text-gray-900 font-YekanBakh-Regular"
                        >
                          قیمت کل
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {orders?.map((order,index) => (
                        <tr key={index}>
                          <td className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular">
                            {order?.product?.name}
                          </td>

                          <td className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular">
                            {order?.amount}
                          </td>

                          <td className="px-3 py-4 text-sm text-gray-500 text-center font-YekanBakh-Regular">
                            {new Intl.NumberFormat('fa-IR').format(order?.price)} تومان
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => setOpen(prev => ({ ...prev, orders: false }))}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                بستن
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
