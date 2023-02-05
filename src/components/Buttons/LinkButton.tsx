import { LinkButtonProps } from './LinkButton.props'
import { Link } from 'react-router-dom'
import Button from './Button'

const LinkButton = ({ text, url, isActive }: LinkButtonProps) => (
    <Link to={url}>
        <Button text={text} isActive={isActive} />
    </Link>
)

export default LinkButton
