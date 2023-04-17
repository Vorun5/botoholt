import { Route, Routes } from 'react-router-dom'
import { HomePage, NotFound, StreamerPage } from 'pages'
import { Header } from 'widgets/header'
import { Page } from 'shared/ui'

export const App = () => {
    return (
        <Page>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:streamerName/*" element={<StreamerPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Page>
    )
}
