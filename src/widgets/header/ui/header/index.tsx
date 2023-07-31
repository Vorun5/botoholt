import { useMediaQuery } from 'shared/lib/hooks'

import { HeaderDesktop } from './header-desktop'
import { HeaderMobile } from './header-mobile'

export const Header = () => {
    const isDesktop = useMediaQuery('(min-width: 992px)')

    return isDesktop ? <HeaderDesktop /> : <HeaderMobile />
}
