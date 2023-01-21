import styles from "./Ad.module.css";
import stylesSecondary from "./AdSecondary.module.css";
import stylesPrimary from "./AdPrimary.module.css";
import {HandySvg} from "handy-svg";

type AddStyle = "primary" | "secondary";

interface AddProps {
    style: AddStyle;
    icon: string;
    text: string;
    bthText: string;
    bthHoverIcon: string;
    bthIcon: string;
}

const getDynamicStyles = (style: AddStyle) => {
    switch (style) {
        case "secondary":
            return stylesSecondary;
        case "primary":
            return stylesPrimary;
        default:
            return stylesPrimary;
    }
}

const Ad = ({style, icon, text, bthText, bthIcon, bthHoverIcon}: AddProps) => {
    const dynamicStyles = getDynamicStyles(style);

    return (
        <div className={`${styles.container} ${dynamicStyles.container}`}>
            <img className={styles.icon} src={icon} alt="ad img"/>
            <div className={`${styles.text} ${dynamicStyles.text}`}>{text}</div>
            <div className={`${styles.bth} ${dynamicStyles.bth}`}>
                <HandySvg
                    className={styles.bth__icon}
                    src={bthIcon}
                    width="22"
                    height="22"
                />
                <span className={`${styles.bth__text} ${dynamicStyles.bth__text}`}>{bthText}</span>
            </div>
        </div>
    );
}

export default Ad;
