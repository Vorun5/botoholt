import Button from './Button'
import { LinkButtonProps } from './LinkButton.props'
import { Link } from 'react-router-dom'

const LinkButton = ({ text, url, isActive }: LinkButtonProps) => (
    <Link to={url}>
        <Button text={text} isActive={isActive} />
    </Link>
)

export default LinkButton
