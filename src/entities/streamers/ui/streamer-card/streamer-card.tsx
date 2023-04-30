import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { ApprovalIcon } from 'shared/assets/icons'
import { Streamer, StreamerSocialMedia } from 'shared/types'
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
    short?: boolean
}

export const StreamerCard = ({ title, streamer, className, short = false }: StreamerCardProps) => {
    const { t } = useTranslation()
    const [followers, degree] = getNumberFollowersAndDegree(streamer.followers)
    const isOnline = streamer.streamInfo !== null

    const twitchUrl = `https://twitch.tv/${streamer.login}`

    let socialMedias: StreamerSocialMedia[] = [
        {
            domain: 'twitch',
            id: '1',
            title: 'Twitch',
            url: twitchUrl,
        },
    ]

    if (streamer.socialMedias && streamer.socialMedias.length)
        socialMedias = [...socialMedias, ...streamer.socialMedias]

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
                                <a href={twitchUrl} target="_blank">
                                    {streamer.name}
                                    {streamer.type === 'partner' && (
                                        <ApprovalIcon width={18} height={18} style={{ marginLeft: '7px' }} />
                                    )}
                                </a>
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

            {!short && <StreamerSocialMedias socialMedias={socialMedias} />}
        </div>
    )
}
