import { ApprovalIcon } from 'shared/assets/icons'
import { Streamer, StreamerSocialMedia } from 'shared/types'
import { Avatar } from 'shared/ui'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

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

const StreamerName = ({ children }: { children: Streamer }) => {
    return (
        <>
            {children.name}
            {children.type === 'partner' && <ApprovalIcon width={18} height={18} style={{ marginLeft: '7px' }} />}
        </>
    )
}

interface StreamerCardProps {
    title?: string
    streamer: Streamer
    className?: string
    short?: boolean
    twitchLinkActive?: boolean
}

export const StreamerCard = ({
    title,
    streamer,
    className,
    short = false,
    twitchLinkActive = true,
}: StreamerCardProps) => {
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
        <>
            {title && <h2 className={styles.cardTitle}>{title}</h2>}
            <div className={clsx(styles.streamer, short && styles.streamerShort, className)}>
                <div className={styles.cardWrapper}>
                    <div className={styles.card}>
                        <div className={styles.info}>
                            {streamer.backgroundImage.length !== 0 && (
                                <div className={styles.infoBacgroundImgContainer}>
                                    <img className={styles.infoBacgroundImg} src={streamer.backgroundImage} alt="" />
                                    <div className={styles.infoBacgroundImgOverlay} />
                                </div>
                            )}
                            <div className={styles.infoContainer}>
                                <div className={styles.infoAvatar}>
                                    <Avatar
                                        size="100%"
                                        image={streamer.image}
                                        alt={streamer.name}
                                        isOnline={isOnline}
                                    />
                                </div>
                                <div className={styles.infoMain}>
                                    <h3 className={styles.infoName}>
                                        {twitchLinkActive ? (
                                            <a href={twitchUrl} target="_blank">
                                                <StreamerName>{streamer}</StreamerName>
                                            </a>
                                        ) : (
                                            <span>
                                                <StreamerName>{streamer}</StreamerName>
                                            </span>
                                        )}
                                    </h3>
                                    <p>
                                        {followers}
                                        {degree === 'thousands' && t('thousands')}
                                        <span className={styles.infoFollowers}>{t('streamer-card.followers')}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.descriptionContainer}>
                            {streamer.description.length !== 0 && (
                                <span className={styles.descriptionLabel}>Описание</span>
                            )}
                            <span className={styles.description}>{streamer.description}</span>
                        </div>
                        <div className={styles.status}>
                            <span className={clsx(isOnline ? styles.statusOnline : styles.statusOffline)}>
                                {isOnline ? t('streamer-card.online') : t('streamer-card.offline')}
                            </span>
                        </div>
                        {!short && isOnline && (
                            <>
                                <span className={clsx(styles.streamTitle)}>{streamer.streamInfo?.title}</span>
                                <span className={styles.category}>{streamer.streamInfo?.category}</span>
                            </>
                        )}
                    </div>
                </div>
                {!short && <StreamerSocialMedias socialMedias={socialMedias} />}
            </div>
        </>
    )
}
