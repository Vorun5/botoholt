import { Link } from 'react-router-dom'
import { TabButton } from './tab-button/tab-button'

interface LinkButtonProps {
    url: string
    children: string
    active?: boolean
}

export const LinkButton = ({ children, url, active }: LinkButtonProps) => {
    return (
        <Link to={url}>
            <TabButton active={active}>{children}</TabButton>
        </Link>
    )
}
