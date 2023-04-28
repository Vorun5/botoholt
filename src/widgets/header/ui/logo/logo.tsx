import { Link } from 'react-router-dom'
import { LogoIcon } from 'shared/assets/icons'

export const Logo = () => {
    return (
        <Link to="/">
            <LogoIcon />
        </Link>
    )
}
