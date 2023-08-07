import { Emote, TopEmotes } from 'pages/admin/ui/top-emotes/top-emotes'
import { Card, CardDescription, CardDivider, CardExpanded, CardTitle } from 'shared/ui'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { Soon } from './soon'

import styles from '../dashboard.module.scss'

export const Emotes = () => {
    const emotes: Emote[] = [
        {
            name: 'catRave',
            number: 1,
            source: 'BetterTTV',
            url: 'https://cdn.betterttv.net/emote/5f899609473f4802fe47046f/2x.webp',
            amount: 95734,
        },
        {
            name: 'AYAYA',
            number: 2,
            source: 'FrankerFaceZ',
            url: 'https://cdn.frankerfacez.com/emoticon/162146/4',
            amount: 58348,
        },
        {
            name: 'Okayge',
            source: '7TV',
            url: 'https://cdn.7tv.app/emote/60bcb44f7229037ee386d1ab/2x.webp',
            number: 3,
            amount: 43294,
        },
        
        {
            name: 'WideBoris',
            source: '7TV',
            url: 'https://cdn.7tv.app/emote/635d0b71159caaff1827d595/3x.webp',
            number: 4,
            amount: 36921,
        },
    ]
    const { t } = useTranslation()

    return (
        <div className={styles.emotes}>
            <Soon>
                <Card className={clsx(styles.soonCard)}>
                    <CardDescription>{t('top-emotes.channel-emotes')}</CardDescription>
                    <CardTitle>{t('top-emotes.top-emotes')}</CardTitle>
                    <CardDescription textTransform="none">{t('top-emotes.description')}</CardDescription>
                    <CardDivider />
                    <CardExpanded>
                        <div className={styles.emotesTopWrapper}>
                            <TopEmotes emotes={emotes} />
                        </div>
                    </CardExpanded>
                </Card>
            </Soon>
        </div>
    )
}
