import { InputField } from 'shared/ui'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'

import styles from './modal-edit.module.scss'

interface CommandsNameSettingProps {
    commands: string[]
    setCommands: (newCommands: string[]) => void
}

export const getCommandName = (commands: string[]) => {
    if (commands.length === 0 || isEmpty(commands[0].replace(/\s+/g, ''))) {
        return ['Command name']
    }
    return commands
}

export const CommandNameSetting = ({ commands, setCommands }: CommandsNameSettingProps) => {
    const { t } = useTranslation()

    return (
        <>
            <div className={styles.commands}>
                <span className={styles.title}>Command Name</span>
                <InputField
                    placeholder={t('edit-commands.command-name') ?? 'Comman name'}
                    value={commands[0]}
                    className={styles.commandsAddField}
                    width="300px"
                    onChange={(event) => {
                        setCommands([event.target.value])
                    }}
                />
            </div>
            <div className={styles.divider} />
        </>
    )
}
