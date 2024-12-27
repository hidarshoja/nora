
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  DialogBackdrop,
} from '@headlessui/react'
import { UsersIcon } from '@heroicons/react/24/outline'
import { FaRegSadTear } from "react-icons/fa";
import { useState } from 'react'
import  useGet  from '../hooks/useGet'
import { useNavigate } from 'react-router-dom'


export default function Search({setOpenSearch,openSearch}) {
  const [query, setQuery] = useState('')
  const navigate= useNavigate()

  const {data,isLoading} = useGet(['product'], '/product?limit=1000')

  if(isLoading){
    return <div>Loading ...</div>
  }

  const filteredPeople =
    query === ''
      ? []
      : data?.data?.products?.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Dialog
      className="relative z-[1000]"
      open={openSearch}
      onClose={() => {
        setOpenSearch(false)
        setQuery('')
      }}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900 bg-opacity-70 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
        <DialogPanel
          transition
          className="mx-auto max-w-xl transform rounded-xl bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in "
        >
          <Combobox
            onChange={(person) => {
              if (person) {
                navigate(`/shop/${person.slug}`)
                setOpenSearch(false)
              }
            }}
          >
            <ComboboxInput
              autoFocus
              className="w-full rounded-md border-0 bg-gray-100 px-4 py-2.5 text-gray-900 focus:ring-0 sm:text-sm"
              placeholder="Search..."
              onChange={(event) => setQuery(event.target.value)}
              onBlur={() => setQuery('')}
            />

            {filteredPeople.length > 0 && (
              <ComboboxOptions static className="-mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                {filteredPeople.map((product) => (
                  <ComboboxOption
                    key={product.id}
                    value={product}
                    className="select-none rounded-md px-4 py-2 data-[focus]:bg-indigo-600 data-[focus]:text-white cursor-pointer"
                  >
                    <div className='flex gap-3 items-center'>
                        <img src={product?.images[0]?.image_url ? `${import.meta.env.VITE_API_BASE_URL}${product.images[0].image_url}` : ''} alt="" className='size-8'/>
                        <p>{product.name}</p>
                    </div>
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            )}

            {query !== '' && filteredPeople.length === 0 && (
              <div className="px-4 py-14 text-center sm:px-14">
                <FaRegSadTear className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                <p className="mt-4 text-sm text-gray-900">محصولی یافت نشد.</p>
              </div>
            )}
          </Combobox>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
