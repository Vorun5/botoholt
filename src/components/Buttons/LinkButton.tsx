import {Link} from "react-router-dom";
import Button from "./Button";

interface LinkButtonProps {
    text: string;
    url: string;
    isActive: boolean;
}

const LinkButton = ({text, url, isActive}: LinkButtonProps) =>
    <Link to={url}>
        <Button text={text} isActive={isActive}/>
    </Link>;

export default LinkButton;
