import { SVGProps, useRef, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from 'shared/assets/icons'
import {
    BoostyIcon,
    DiscordIcon,
    DonationAlertsIcon,
    FacebookIcon,
    GitHubIcon,
    InstagramIcon,
    LinkIcon,
    OPGGIcon,
    SoundcloudIcon,
    SpotifyIcon,
    TelegramIcon,
    TwitchIcon,
    VkIcon,
    XIcon,
    YouTubeIcon,
} from 'shared/assets/icons/social'
import { useElementSize } from 'shared/lib/hooks'
import { StreamerSocialMedia } from 'shared/types'
import clsx from 'clsx'

import styles from './streamer-social-medias.module.scss'

const getMediaProperty = (socialMedia: StreamerSocialMedia, props: SVGProps<SVGSVGElement>) => {
    switch (socialMedia.domain) {
        case 'twitch':
            return [styles.purple, <TwitchIcon title="Twitch" {...props} />]
        case 'vk':
            return [styles.blue, <VkIcon title="VK" {...props} />]
        case 'youtube':
            return [styles.red, <YouTubeIcon title="YouTube" {...props} />]
        case 'github':
            return [styles.black, <GitHubIcon title="GitHub" {...props} />]
        case 'donationalerts':
            return [styles.orange, <DonationAlertsIcon title="DonationAlerts" {...props} />]
        case 'discord':
            return [styles.black, <DiscordIcon title="Discord" {...props} />]
        case 'instagram':
            return [styles.red, <InstagramIcon title="Instagram" {...props} />]
        case 'facebook':
            return [styles.blue, <FacebookIcon title="Facebook" {...props} />]
        case 'op':
            return [styles.blue, <OPGGIcon title="OPGG" {...props} />]
        case 'telegram':
            return [styles.blue, <TelegramIcon title="Telegram" {...props} />]
        case 't':
            return [styles.blue, <TelegramIcon title="Telegram" {...props} />]
        case 'x':
            return [styles.black, <XIcon title="X" {...props} />]
        case 'twitter':
            return [styles.black, <XIcon title="X" {...props} />]
        case 'boosty':
            return [styles.orange, <BoostyIcon title="Boosty" {...props} />]
        case 'soundcloud':
            return [styles.orange, <SoundcloudIcon title="Soundcloud" {...props} />]
        case 'spotify':
            return [styles.black, <SpotifyIcon title="Spotify" {...props} />]
        default:
            return [styles.blue, <LinkIcon title="Link" {...props} />]
    }
}

interface StreamerSocialMediasProps {
    socialMedias: StreamerSocialMedia[]
}

export const StreamerSocialMedias = ({ socialMedias }: StreamerSocialMediasProps) => {
    const sliderCount = 4
    const [scrollIndex, setScrollIndex] = useState(0)

    const disableLeftArrow = scrollIndex === 0
    const disableRightArrow = scrollIndex * -1 >= socialMedias.length - sliderCount

    const socialMediasRef = useRef<HTMLDivElement>(null)
    const socialMediasSize = useElementSize(socialMediasRef)

    return (
        <div ref={socialMediasRef} className={styles.socialMediasWrapper}>
            <button
                type="button"
                className={clsx(styles.arrow, styles.arrowLeft, disableLeftArrow && styles.arrowDisable)}
                onClick={() => !disableLeftArrow && setScrollIndex(scrollIndex + 1)}
            >
                <ArrowLeftIcon className={styles.arrowIcon} />
            </button>
            <div className={styles.socialMedias}>
                {socialMedias.map((socialMedia, index) => {
                    const iconSize = socialMediasSize.width! < 350 ? 20 : 26
                    const [color, icon] = getMediaProperty(socialMedia, {
                        width: iconSize,
                        height: iconSize,
                    })

                    return (
                        <div
                            key={index}
                            className={styles.socialMediaWrapper}
                            style={{ left: `${index * (100 / sliderCount) + scrollIndex * (100 / sliderCount)}%` }}
                        >
                            <a
                                title={socialMedia.title}
                                href={socialMedia.url}
                                target="_blank"
                                rel="noreferrer"
                                className={clsx(styles.socialMedia, color)}
                            >
                                {icon}
                            </a>
                        </div>
                    )
                })}
            </div>
            <button
                type="button"
                className={clsx(styles.arrow, styles.arrowRight, disableRightArrow && styles.arrowDisable)}
                onClick={() => !disableRightArrow && setScrollIndex(scrollIndex - 1)}
            >
                <ArrowRightIcon className={styles.arrowIcon} />
            </button>
        </div>
    )
}
