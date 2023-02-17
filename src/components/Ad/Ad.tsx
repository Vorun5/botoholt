import styles from './Ad.module.css'
import { AdProps, AdStyle } from './Ad.props'
import stylesPrimary from './AdPrimary.module.css'
import stylesSecondary from './AdSecondary.module.css'
import clsx from 'clsx'
import { HandySvg } from 'handy-svg'

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
        <div className={clsx(styles.container, dynamicStyles.container)}>
            <div>
                <img className={styles.icon} src={icon} alt='ad img' />
                <div className={clsx(styles.text, dynamicStyles.text)}>{text}</div>
            </div>
            <div className={clsx(styles.bth, dynamicStyles.bth)} onClick={bthOnClick}>
                <HandySvg className={styles.bth__icon} src={bthIcon} width='22' height='22' />
                <span className={clsx(styles.bth__text, dynamicStyles.bth__text)}>{bthText}</span>
            </div>
        </div>
    )
}

export default Ad
