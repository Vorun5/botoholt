import { AdminPage, HomePage, LoginPage, NotFound, StreamerPage } from 'pages'
import { useTheme } from 'features'
import { Route, Routes } from 'react-router-dom'

export const App = () => {
    useTheme()

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/:streamerName/*" element={<StreamerPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
