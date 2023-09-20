import React from 'react'
import { ToastProvider } from 'shared/lib/hooks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from './app'

import 'shared/styles/main.scss'

import 'shared/lib/i18n/i18n'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 1000 * 5, // время кэширования - 5 секунд
        },
    },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ToastProvider>
                <React.Suspense>
                    <BrowserRouter>
                        <App />
                        <ReactQueryDevtools initialIsOpen={false} />
                    </BrowserRouter>
                </React.Suspense>
            </ToastProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
