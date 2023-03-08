import styles from './SocialMedias.module.css'
import clsx from 'clsx'
import { HandySvg } from 'handy-svg'
import { SocialMedia } from 'models/SocialMedia'
import Postel from 'postel'
import { useState } from 'react'

const getMediaProperty = (socialMedia: SocialMedia) => {
    switch (socialMedia.name) {
        case 'twitch':
            return [styles.purple, '/icons/social/twitch.svg']
        case 'vk':
            return [styles.blue, '/icons/social/vk.svg']
        case 'youtube':
            return [styles.red, '/icons/social/youtube.svg']
        case 'github':
            return [styles.black, '/icons/social/github.svg']
        case 'donationalerts':
            return [styles.orange, '/icons/social/da.svg']
        case 'discord':
            return [styles.black, '/icons/social/discord.svg']
        case 'instagram':
            return [styles.red, '/icons/social/instagram.svg']
        case 'facebook':
            return [styles.blue, '/icons/social/facebook.svg']
        case 'op':
            return [styles.blue, '/icons/social/opgg.svg']
        case 'telegram':
            return [styles.blue, '/icons/social/tg.svg']
        case 't':
            return [styles.blue, '/icons/social/tg.svg']
        default:
            return [styles.blue, '/icons/social/link.svg']
    }
}

const SocialMedias = ({ socialMedias }: { socialMedias: SocialMedia[] }) => {
    const [scrollIndex, setScrollIndex] = useState(0)
    const disableLeftArrow = scrollIndex === 0
    const disableRightArrow = scrollIndex * -1 >= socialMedias.length - 4

    return (
        <div className={styles.container}>
            <div
                className={clsx(
                    styles.arrow,
                    styles.arrow__left,
                    disableLeftArrow && styles.arrow_disable,
                )}
                onClick={() => !disableLeftArrow && setScrollIndex(scrollIndex + 1)}
            >
                <HandySvg className={styles.arrow__icon} src='/icons/arrow-left.svg' />
            </div>
            <div className={styles.social_medias}>
                {socialMedias.map((socialMedia, index) => {
                    const [color, icon] = getMediaProperty(socialMedia)

                    return (
                        <div
                            key={index}
                            className={styles.social_media__container}
                            style={{ left: `${index * 25 + scrollIndex * 25}%` }}
                        >
                            <Postel
                                title={socialMedia.title}
                                content={
                                    <div className={styles.tooltip}>
                                        <span>{socialMedia.title}</span>
                                    </div>
                                }
                            >
                                <a
                                    href={socialMedia.url}
                                    target='_blank'
                                    rel='noreferrer'
                                    className={clsx(styles.social_media, color)}
                                >
                                    <HandySvg className={styles.social_media__icon} src={icon} />
                                </a>
                            </Postel>
                        </div>
                    )
                })}
            </div>
            <div
                className={clsx(
                    styles.arrow,
                    styles.arrow__right,
                    disableRightArrow && styles.arrow_disable,
                )}
                onClick={() => !disableRightArrow && setScrollIndex(scrollIndex - 1)}
            >
                <HandySvg className={styles.arrow__icon} src='/icons/arrow-right.svg' />
            </div>
        </div>
    )
}

export default SocialMedias
