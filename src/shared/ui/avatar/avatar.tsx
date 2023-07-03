import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './avatar.module.scss'

interface AvatarProps {
    image?: string
    alt?: string
    isOnline?: boolean
    showCircleIndicator?: boolean
    children?: ReactNode
    size?: string
}

export const Avatar = ({ image, alt, children, isOnline, showCircleIndicator, size = '100%' }: AvatarProps) => (
    <div
        style={{
            height: size,
            width: size,
        }}
        className={clsx(
            styles.avatar,
            isOnline ? styles.online : styles.offline,
            showCircleIndicator && styles.circleIndicator,
        )}
    >
        {image ? (
            <img className={styles.image} src={image} alt={alt} draggable={false} />
        ) : (
            children && <div className={styles.avatarChild}>{children}</div>
        )}
    </div>
)
