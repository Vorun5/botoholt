import { Route, Routes } from 'react-router-dom';
import { HomePage } from 'pages/home';
import { StreamerPage } from 'pages/streamer';
import { Header } from 'widgets/header';
import { Page } from 'shared/ui';

export const App = () => {
    return (
        <Page>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:streamerName/*" element={<StreamerPage />} />
            </Routes>
        </Page>
    )
}
