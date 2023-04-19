import { Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage, NotFound, StreamerPage } from 'pages'

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/:streamerName/*" element={<StreamerPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
