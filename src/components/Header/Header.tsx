import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from './HeaderMobile'
import { useMediaQuery } from 'react-responsive'

const Header = () => {
    const isDesktop = useMediaQuery({ query: '(min-width: 992px)' })

    if (isDesktop) return <HeaderDesktop />

    return <HeaderMobile />
}

export default Header
