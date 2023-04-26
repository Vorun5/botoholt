import { useTranslation } from 'react-i18next'
import { Route, Routes } from 'react-router-dom'
import { ALPage, ALPageWrapper } from '../admin-layout/admin-layout'
import { NavigationBar } from '../navigation-bar/navigation-bar'
import { Commands, Dashboard, Integrations, NotFound, SongQueue, Support } from '../tabs'

export const AdminPage = () => {
    const { t } = useTranslation()

    return (
        <ALPageWrapper>
            <NavigationBar />
            <ALPage>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/commands" element={<Commands />} />
                    <Route path="/integrations" element={<Integrations />} />
                    <Route path="/song-queue" element={<SongQueue />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ALPage>
        </ALPageWrapper>
    )
}
