import { InputField, Toggle } from 'shared/ui'
import { useTranslation } from 'react-i18next'

import styles from './modal-edit.module.scss'

interface GeneralSettingProps {
    enabled: boolean
    setEnabled: () => void
    cooldown: number
    setCooldown: (newCd: number) => void
}

export const GeneralSettings = ({ enabled, setEnabled, cooldown, setCooldown }: GeneralSettingProps) => {
    const { t } = useTranslation()

    return (
        <>
            <div className={styles.generalSetting}>
                <div className={styles.field}>
                    <span className={styles.title}>{t('commands.status')}</span>
                    <Toggle checked={enabled} onChange={setEnabled} />
                </div>
                <div className={styles.field}>
                    <span className={styles.title}>Cooldown</span>
                    <InputField
                        type="number"
                        name="cooldown"
                        defaultValue={cooldown.toString()}
                        placeholder="Cooldown"
                        onChange={(event) => {
                            let newCd = Number(event.target.value)
                            if (newCd < 10) newCd = 10
                            if (newCd > 18_000) newCd = 18000
                            setCooldown(newCd)
                        }}
                    />
                </div>
            </div>
            <div className={styles.divider} />
        </>
    )
}
