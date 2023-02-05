import { Route, Routes } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import StreamerPage from 'pages/StreamerPage/StreamerPage'
import HomePage from 'pages/HomePage/HomePage'
import ErrorPage from 'pages/NotFoundPage/ErrorPage'
import EasterEgg from 'components/EasterEgg/EasterEgg'
import Header from 'components/Header/Header'

const App = () => {
    const { t } = useTranslation()

    return (
        <div className="app-container">
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:streamerLogin/*" element={<StreamerPage />} />
                <Route
                    path="*"
                    element={<ErrorPage text={t('page-not-found')} />}
                />
            </Routes>
            <EasterEgg />
        </div>
    )
}

export default App
