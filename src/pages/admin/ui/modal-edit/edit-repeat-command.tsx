import { useState } from 'react'
import { CustomCommand, RepeatCommand } from 'shared/types'
import { InputField } from 'shared/ui'
import { useTranslation } from 'react-i18next'
import { isEqual } from 'underscore'

import { AnswersSetting, getAnswers, getAnswersWithId } from './answers-setting'
import { CommandEditModalWrapper } from './command-edit-modal-wrapper'
import { GeneralSettings } from './general-settings'
import { ResponseScripts } from './response-scripts'

import styles from './modal-edit.module.scss'

interface EditRepeatCommandProps {
    hide: () => void
    command: RepeatCommand
}

export const EditRepeatCommand = ({ command, hide }: EditRepeatCommandProps) => {
    const { t } = useTranslation()
    const [cooldown, setCooldown] = useState(command.cooldown)
    const [enabled, setEnabled] = useState(command.enabled)
    const [name, setName] = useState(command.aliases[0])
    const [answers, setAnswers] = useState(getAnswersWithId(command.answers))

    const getNewCommand = () => {
        const newCommand: CustomCommand = {
            ...command,
            enabled,
            cooldown,
            aliases: [name],
            answers: getAnswers(answers, 'defaultRepeat'),
        }
        if (isEqual(newCommand, command)) return null
        return newCommand
    }

    return (
        <CommandEditModalWrapper
            commandsType="custom"
            commandName={t(command.function)}
            getNewCommand={getNewCommand}
            hide={hide}
        >
            <GeneralSettings
                enabled={enabled}
                cooldown={cooldown}
                setCooldown={(newCd) => setCooldown(newCd)}
                setEnabled={() => setEnabled(!enabled)}
            />
            <div className={styles.commands}>
                <span className={styles.title}>Command Name</span>
                <InputField
                    placeholder="Command name"
                    value={name}
                    className={styles.commandsAddField}
                    width="300px"
                    onChange={(event) => {
                        setName(event.target.value)
                    }}
                />
            </div>
            <div className={styles.divider} />
            <ResponseScripts />
            <AnswersSetting
                title={'Ответы'}
                titleStyle="green"
                answers={answers}
                variables={[]}
                setAnswers={(newAnswers) => setAnswers(newAnswers)}
            />
        </CommandEditModalWrapper>
    )
}
