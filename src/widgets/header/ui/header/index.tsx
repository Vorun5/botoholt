import { useEffect } from 'react'
import { loadStreamers } from 'entities/streamers'
import { useMediaQuery } from 'shared/lib/hooks'
import { useAppDispatch } from 'shared/lib/store'
import { HeaderDesktop } from './header-desktop'
import { HeaderMobile } from './header-mobile'

export const Header = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadStreamers())
    }, [dispatch])

    const isDesktop = useMediaQuery('(min-width: 992px)')

    return isDesktop ? <HeaderDesktop /> : <HeaderMobile />
}
