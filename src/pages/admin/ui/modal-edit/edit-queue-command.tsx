import { useState } from 'react'
import { QueueCommand } from 'shared/types'
import { useTranslation } from 'react-i18next'
import { isEqual } from 'underscore'

import { AnswersSetting, getAnswers, getAnswersWithId } from './answers-setting'
import { CommandEditModalWrapper } from './command-edit-modal-wrapper'
import { CommandsSetting } from './commands-setting'
import { GeneralSettings } from './general-settings'
import { ResponseScripts } from './response-scripts'

interface EditQueueCommandProps {
    hide: () => void
    command: QueueCommand
}

export const EditQueueCommand = ({ command, hide }: EditQueueCommandProps) => {
    const { t } = useTranslation()
    const [cooldown, setCooldown] = useState(command.cooldown)
    const [enabled, setEnabled] = useState(command.enabled)
    const [commands, setCommands] = useState(command.aliases)
    const [daSuccess, setDaSuccess] = useState(getAnswersWithId(command.answers.daAnswers.success.answers))
    const [daFailure, setDaFailure] = useState(getAnswersWithId(command.answers.daAnswers.failure.answers))

    const getNewCommand = () => {
        const newCommand: QueueCommand = {
            ...command,
            enabled,
            cooldown,
            aliases: commands,
            answers: {
                daAnswers: {
                    success: {
                        ...command.answers.daAnswers.success,
                        answers: getAnswers(daSuccess, 'daSuccess'),
                    },
                    failure: {
                        ...command.answers.daAnswers.failure,
                        answers: getAnswers(daFailure, 'daFailure'),
                    },
                },
            },
        }
        if (isEqual(newCommand, command)) return null
        return newCommand
    }

    return (
        <CommandEditModalWrapper
            commandsType="default"
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
            <CommandsSetting commands={commands} setCommands={(newCommands) => setCommands(newCommands)} />
            <ResponseScripts />
            <AnswersSetting
                title={t('edit-commands.titles.queue-success')}
                titleStyle="green"
                answers={daSuccess}
                variables={command.answers.daAnswers.success.variables}
                setAnswers={(newAnswers) => setDaSuccess(newAnswers)}
            />
            <AnswersSetting
                title={t('edit-commands.titles.queue-faliure')}
                titleStyle="red"
                answers={daFailure}
                variables={command.answers.daAnswers.failure.variables}
                setAnswers={(newAnswers) => setDaFailure(newAnswers)}
            />
        </CommandEditModalWrapper>
    )
}
