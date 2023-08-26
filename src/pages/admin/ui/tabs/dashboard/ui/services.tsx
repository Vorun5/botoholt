import { useBotoholtServiceMutation, useDaServiceQeury, useToggleDaServiceMutation } from 'entities/admin-auth'
import { AdminServicesDto } from 'shared/api'
import LoadingGif from 'shared/assets/emotes/FeelsLoadingMan.gif'
import { StatusNotOkIcon, StatusOkIcon } from 'shared/assets/icons'
import { Button, ButtonIcon, ButtonText, Card, CardDescription, CardExpanded, CardTitle } from 'shared/ui'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'

import styles from '../dashboard.module.scss'

export const Services = ({ services }: { services: AdminServicesDto }) => {
    const { t } = useTranslation()
    const { mutate: toggleBotoholtService, isLoading: isBotoholtLoading } = useBotoholtServiceMutation()
    const { mutate: toggleDaService, isLoading: isDaLoading } = useToggleDaServiceMutation()
    const { data: daService, isLoading, isError, isSuccess } = useDaServiceQeury()

    const toggleBotoholt = () => {
        if (isBotoholtLoading) return
        toggleBotoholtService()
    }

    const toggleDa = () => {
        if (isSuccess && isEmpty(daService.daToken)) {
            window.location.href = '/admin/integrations?open=donationalerts'
            return
        }
        if (isDaLoading) return
        toggleDaService()
    }

    return (
        <div className={styles.statuses}>
            <Card className={styles.status}>
                <CardDescription style={services.botoholt ? 'green' : 'red'}>
                    {t('admin-page.dashboard.bot-status')}
                </CardDescription>
                <CardExpanded>
                    <CardTitle className={styles.statusText}>
                        {t(`admin-page.dashboard.bot-status-${services.botoholt ? 'connected' : 'not-connected'}`)}
                    </CardTitle>
                </CardExpanded>
                <div className={styles.statusButtons}>
                    <Button padding="big" onClick={toggleBotoholt}>
                        <ButtonText>{t(services.botoholt ? 'disable' : 'connect')!}</ButtonText>
                    </Button>
                    <Button
                        style={services.botoholt ? 'green' : 'red'}
                        padding="none"
                        borderRadius="50%"
                        width="50px"
                        height="50px"
                        alignment="center"
                        onClick={toggleBotoholt}
                    >
                        <ButtonIcon
                            margin="none"
                            style={{
                                padding: 0,
                            }}
                        >
                            {isBotoholtLoading ? (
                                <img width={30} height={30} src={LoadingGif} alt="loading" />
                            ) : (
                                <>{services.botoholt ? <StatusOkIcon /> : <StatusNotOkIcon />}</>
                            )}
                        </ButtonIcon>
                    </Button>
                </div>
            </Card>
            <Card className={styles.status}>
                <CardDescription style={services.da_api ? 'green' : 'red'}>
                    {t('admin-page.dashboard.da-status')}
                </CardDescription>
                <CardExpanded>
                    <CardTitle className={styles.statusText}>
                        {t(`admin-page.dashboard.da-status-${services.da_api ? 'connected' : 'not-connected'}`)}
                    </CardTitle>
                </CardExpanded>
                <div className={styles.statusButtons}>
                    <Button padding="big" onClick={toggleDa}>
                        <ButtonText>{t(services.da_api ? 'disable' : 'connect')!}</ButtonText>
                    </Button>
                    <Button
                        style={services.da_api ? 'green' : 'red'}
                        borderRadius="50%"
                        padding="none"
                        width="50px"
                        height="50px"
                        alignment="center"
                        onClick={toggleDa}
                    >
                        <ButtonIcon
                            margin="none"
                            style={{
                                padding: 0,
                            }}
                        >
                            {isDaLoading ? (
                                <img width={30} height={30} src={LoadingGif} alt="loading" />
                            ) : (
                                <>{services.da_api ? <StatusOkIcon /> : <StatusNotOkIcon />}</>
                            )}
                        </ButtonIcon>
                    </Button>
                </div>
            </Card>
        </div>
    )
}
