import { InputField, Toggle } from 'shared/ui'
import styles from './modal-edit.module.scss'

interface GeneralSettingProps {
    enabled: boolean
    setEnabled: () => void
    cooldown: number
    setCooldown: (newCd: number) => void
}

export const GeneralSettings = ({ enabled, setEnabled, cooldown, setCooldown }: GeneralSettingProps) => {
    return (
        <>
            <div className={styles.generalSetting}>
                <div className={styles.field}>
                    <span className={styles.title}>Статус</span>
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
                            const newCD = Number(event.target.value)

                            if (newCD >= 10) {
                                setCooldown(newCD)
                            }
                        }}
                    />
                </div>
            </div>
            <div className={styles.divider} />
        </>
    )
}
