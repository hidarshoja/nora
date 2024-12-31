import { Toaster } from 'react-hot-toast'
import './App.css'
import MainLayout from './layout/MainLayout.jsx'
import CacheBuster from 'react-cache-buster';

function App() {
  return (
    <>
      <CacheBuster
        version={'1.0.2'}
        isEnabled={true}
      >
        <div dir='rtl' className='font-YekanBakh-Regular text-sm'>
        
          <MainLayout />
        </div>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </CacheBuster>
    </>

  )
}

export default App
