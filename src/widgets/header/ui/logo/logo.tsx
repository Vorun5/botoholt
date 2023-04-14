import { Link } from 'react-router-dom'
import { ReactComponent as LogoImg } from 'shared/assets/icons/logo.svg'

export const Logo = () => {
    return (
        <Link to="/">
            <LogoImg />
        </Link>
    )
}
