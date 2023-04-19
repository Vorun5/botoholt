import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from 'shared/lib/hooks/use-toast'
import { store } from 'shared/lib/store'
import { App } from './app'
import 'shared/styles/main.scss'
import 'shared/lib/i18n/i18n'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ToastProvider>
            <Provider store={store}>
                <React.Suspense fallback="loading">
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </React.Suspense>
            </Provider>
        </ToastProvider>
    </React.StrictMode>,
)
