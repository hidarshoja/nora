import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})
ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </QueryClientProvider>,
)