import LoveMods from 'shared/assets/emotes/lovemods.gif'
import { Card, CopiedText } from 'shared/ui'
import { useTranslation } from 'react-i18next'

import styles from '../dashboard.module.scss'

export const ModBotoholt = () => {
    const { t } = useTranslation()

    return (
        <Card className={styles.modBotoholt}>
            <img src={LoveMods} alt="Mod" width={110} height={110} className={styles.modBotoholtEmote} />
            <div className={styles.modBotoholtTextContainer}>
                <span className={styles.modBotoholtText}>{t('mod-botoholt.plea')}</span>
                <CopiedText>/mod Botoholt</CopiedText>
                <br />
                <span className={styles.modBotoholtText}>{t('mod-botoholt.causes')}</span>
            </div>
        </Card>
    )
}
