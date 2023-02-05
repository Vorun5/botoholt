import styles from './Ad.module.css'
import { HandySvg } from 'handy-svg'
import stylesSecondary from './AdSecondary.module.css'
import stylesPrimary from './AdPrimary.module.css'
import { AdProps, AdStyle } from './Ad.props'

const getDynamicStyles = (adStyle: AdStyle) => {
    switch (adStyle) {
        case 'secondary':
            return stylesSecondary
        case 'primary':
            return stylesPrimary
        default:
            return stylesPrimary
    }
}

const Ad = ({ adStyle, icon, text, bthText, bthIcon, bthOnClick }: AdProps) => {
    const dynamicStyles = getDynamicStyles(adStyle)

    return (
        <div className={`${styles.container} ${dynamicStyles.container}`}>
            <div>
                <img className={styles.icon} src={icon} alt="ad img" />
                <div className={`${styles.text} ${dynamicStyles.text}`}>
                    {text}
                </div>
            </div>
            <div
                className={`${styles.bth} ${dynamicStyles.bth}`}
                onClick={bthOnClick}
            >
                <HandySvg
                    className={styles.bth__icon}
                    src={bthIcon}
                    width="22"
                    height="22"
                />
                <span
                    className={`${styles.bth__text} ${dynamicStyles.bth__text}`}
                >
                    {bthText}
                </span>
            </div>
        </div>
    )
}

export default Ad
