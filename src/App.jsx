import { Toaster } from 'react-hot-toast'
import './App.css'
import MainLayout from './layout/MainLayout.jsx'

function App() {
  return (
    <>
      <div dir='rtl' className='font-YekanBakh-Regular text-sm'>
        <MainLayout />
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>

  )
}

export default App
