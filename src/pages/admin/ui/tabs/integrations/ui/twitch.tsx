import { TwitchIcon } from 'shared/assets/icons/social'
import { AdminAuth } from 'shared/types'
import { Button, ButtonText, Card, CardDescription, CardDivider, CardExpanded, CardFooter, CardTitle } from 'shared/ui'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import styles from '../integrations.module.scss'

export const Twitch = ({ authData }: { authData: AdminAuth }) => {
    const { t } = useTranslation()
    return (
        <Card className={styles.card} padding="big">
            <CardDescription style="green">{t('admin-page.integrations.connected')}</CardDescription>
            <CardTitle className={clsx(styles.cardTitle)}>
                <TwitchIcon color="#673AB7" />
                <span>Twitch</span>
            </CardTitle>
            <CardExpanded>{authData.name}</CardExpanded>
            <CardFooter>
                <CardDivider />
                <Button height="52px">
                    <ButtonText>{t('disable')}</ButtonText>
                </Button>
            </CardFooter>
        </Card>
    )
}
