import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeConfig } from './Config/Theme.config.tsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <ThemeConfig>
          <App />
        </ThemeConfig>
        <ReactQueryDevtools/>
    </QueryClientProvider>
  </React.StrictMode>,
)
