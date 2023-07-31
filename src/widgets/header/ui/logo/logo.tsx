import { LogoIcon } from 'shared/assets/icons'
import { Link } from 'react-router-dom'

export const Logo = () => {
    return (
        <Link to="/">
            <LogoIcon />
        </Link>
    )
}
