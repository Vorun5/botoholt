import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { loadAuthData } from 'entities/admin-auth/model'
import { RootState, useAppDispatch } from 'shared/lib/store'
import { ALPage, ALPageWrapper } from '../admin-layout/admin-layout'
import { NavigationBar } from '../navigation-bar/navigation-bar'
import { Commands, Dashboard, Integrations, NotFound, SongQueue, Support } from '../tabs'
import { api } from 'shared/api'

export const AdminPage = () => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const auth = useSelector((state: RootState) => state.adminAuth)

    useEffect(() => {
        dispatch(loadAuthData())
    }, [])

    const [cookie, setCookie] = useState('')

    const fetch = async () => {
        const respone = await api.get('admin/auth/twitch/callback')
        const respone2 = await api.get('admin/auth/twitch')
        console.log(respone.headers.get('Set-Cookie'))
        console.log(respone2.headers.get('Set-Cookie'));
        setCookie(respone.headers.get('Set-Cookie') ?? '')
    }

    useEffect(() => {
        fetch()
    }, [])

    return <div>{cookie}</div>

    if (auth.status === 'loading') return <div>Loading</div>
    if (auth.status === 'rejected') return <div>{auth.error}</div>

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
