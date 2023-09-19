import { SongList, SongListNavigation, useSongListSearchParams } from 'widgets/song-list'
import { CurrentSong } from 'entities/streamer-song-data'
import { PauseIcon, SkipIcon } from 'shared/assets/icons'
import { useDocumentTitle } from 'shared/lib/hooks'
import { AdminAuth } from 'shared/types'
import { Button, ButtonIcon, ButtonText } from 'shared/ui'
import { useTranslation } from 'react-i18next'

import { ALPageContent, ALPageHeader } from '../../admin-layout/admin-layout'

import styles from './songs.module.scss'

interface SongsProps {
    streamer: AdminAuth
}

export const Songs = ({ streamer }: SongsProps) => {
    const { t } = useTranslation()
    useDocumentTitle(t('admin-page.nav.song-queue'))

    const { tab, period, page, limit, searchStr, searchType } = useSongListSearchParams('/admin/songs')

    return (
        <>
            <ALPageHeader description={t('admin-page.songs.description') ?? undefined}>
                {t('admin-page.nav.song-queue')}
            </ALPageHeader>
            <ALPageContent className={styles.pageContent}>
                <CurrentSong streamerName={streamer.name} />
                <div className={styles.actions}>
                    <Button border height="44px">
                        <ButtonText>{t('admin-page.songs.pause')}</ButtonText>
                        <ButtonIcon margin="left">
                            <PauseIcon
                                style={{
                                    position: 'relative',
                                    top: '3px',
                                }}
                            />
                        </ButtonIcon>
                    </Button>
                    <Button border height="44px" style="orange">
                        <ButtonText>{t('admin-page.songs.skip')}</ButtonText>
                        <ButtonIcon margin="left">
                            <SkipIcon
                                style={{
                                    position: 'relative',
                                    top: '2px',
                                }}
                            />
                        </ButtonIcon>
                    </Button>
                </div>
                <SongListNavigation
                    tab={tab}
                    period={period}
                    login={streamer.login}
                    baseUrlForRedirect={`/admin/songs`}
                />
                <SongList
                    period={period}
                    login={streamer.name}
                    page={page}
                    tab={tab}
                    limit={limit}
                    searchStr={searchStr}
                    searchType={searchType}
                />
            </ALPageContent>
        </>
    )
}
