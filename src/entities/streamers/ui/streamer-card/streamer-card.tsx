import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Approval } from 'shared/assets/icons/approval.svg'
import { Streamer } from 'shared/types'
import { Avatar } from 'shared/ui'
import { StreamerSocialMedias } from '../streamer-social-medias/streamer-social-medias'
import styles from './streamer-card.module.scss'



type Degree = 'thousands' | 'none'

const getNumberFollowersAndDegree = (followers: number): [string, Degree] => {
    let result = followers.toString()
    let degree: Degree = 'none'
    const thousands = Math.floor(followers / 1000)
    if (thousands >= 1) {
        result = thousands.toString()
        degree = 'thousands'
    }

    return [result, degree]
}

interface StreamerCardProps {
    title?: string
    streamer: Streamer
    className?: string
}

export const StreamerCard = ({ title, streamer, className }: StreamerCardProps) => {
    const { t } = useTranslation()
    const [followers, degree] = getNumberFollowersAndDegree(streamer.followers)
    const isOnline = streamer.streamInfo !== null

    return (
        <div className={clsx(styles.streamer, className)}>
            <div className={styles.cardWrapper}>
                <div className={styles.card}>
                    {title && <h2 className={styles.cardTitle}>{title}</h2>}
                    <div className={styles.info}>
                        <div className={styles.infoAvatar}>
                            <Avatar
                                size="100%"
                                image={streamer.image}
                                alt={streamer.name}
                                isOnline={isOnline}
                                showCircleIndicator
                            />
                        </div>
                        <div className={styles.infoMain}>
                            <h3 className={styles.infoName}>
                                {streamer.name}
                                {streamer.type === 'partner' && (
                                    <Approval width={18} height={18} style={{ marginLeft: '7px' }} />
                                )}
                            </h3>
                            <p>
                                {followers}
                                {degree === 'thousands' && t('thousands')}
                                <span className={styles.infoFollowers}>{t('streamer-card.followers')}</span>
                            </p>
                        </div>
                    </div>
                    <span className={styles.description}>
                        {isOnline ? streamer.streamInfo?.title : streamer.description}
                    </span>
                    <div className={styles.status}>
                        <span className={clsx(isOnline ? styles.statusOnline : styles.statusOffline)}>
                            {isOnline ? t('streamer-card.online') : t('streamer-card.offline')}
                        </span>
                    </div>
                    {isOnline && <span className={styles.category}>{streamer.streamInfo?.category}</span>}
                </div>
            </div>

            {streamer.socialMedias && streamer.socialMedias.length && (
                <StreamerSocialMedias
                    socialMedias={[
                        { domain: 'twitch', id: '1', title: 'Twitch', url: `https://twitch.tv/${streamer.login}` },
                        ...streamer.socialMedias,
                    ]}
                />
            )}
        </div>
    )
}
