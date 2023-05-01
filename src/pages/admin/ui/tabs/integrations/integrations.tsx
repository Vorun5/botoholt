import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DonationAlertsIcon, TwitchIcon } from 'shared/assets/icons/social'
import { Button, ButtonText, Card, CardDescription, CardDivider, CardTitle, Modal } from 'shared/ui'
import { ALPageContent, ALPageHeader } from '../../admin-layout/admin-layout'
import styles from './integrations.module.scss'

const Test = () => {
    const [count, setCount] = useState(0)

    return (
        <Button onClick={() => setCount(count + 1)}>
            <ButtonText>{count.toString()}</ButtonText>
        </Button>
    )
}

export const Integrations = () => {
    const { t } = useTranslation()

    useEffect(() => {
        window.document.title = t('admin-page.nav.integrations')
    }, [])

    const [daModalIsShown, setDaModalIsShow] = useState(false)

    const hideDaModal = () => setDaModalIsShow(false)

    const [i, setI] = useState(0)

    return (
        <>
            <ALPageHeader description="На это странице можно подключить различные платформы">
                {t('admin-page.nav.integrations')}
            </ALPageHeader>
            <ALPageContent className={styles.pageContent}>
                <Card className={styles.card} padding="big">
                    <CardDescription style="green">привязан</CardDescription>
                    <CardTitle className={clsx(styles.cardTitle)}>
                        <TwitchIcon color="#673AB7" />
                        <span>Twitch</span>
                    </CardTitle>
                    <div>Smurf_tv</div>
                    <CardDivider />
                    <Button height="52px">
                        <ButtonText>Отключить</ButtonText>
                    </Button>
                </Card>
                <Modal
                    isShown={daModalIsShown}
                    hide={hideDaModal}
                    headerDivider
                    expandedWidth
                    footerDivider
                    title="Привязка Donation Alerts"
                    footerContent={
                        <Button style="fill-blue" height="52px">
                            <ButtonText>Сохранить изменения</ButtonText>
                        </Button>
                    }
                >
                    <Test />
                </Modal>
                <Card className={styles.card} padding="big">
                    <CardDescription style="red">не привязан</CardDescription>
                    <CardTitle className={clsx(styles.cardTitle)}>
                        <DonationAlertsIcon />
                        <span>Donation Alerts</span>
                    </CardTitle>
                    <div>Подключите Donation Alerts, чтобы редактировать и кастомизировать раздел с командами! </div>
                    <CardDivider />
                    <Button style="green" height="52px" onClick={() => setDaModalIsShow(true)}>
                        <ButtonText>Подключить</ButtonText>
                    </Button>
                </Card>
            </ALPageContent>
        </>
    )
}
