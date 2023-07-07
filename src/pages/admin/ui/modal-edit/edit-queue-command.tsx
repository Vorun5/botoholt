import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { QueueCommand } from 'shared/types'
import { AnswersSetting, getAnswersWithId } from './answers-setting'
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

    return (
        <CommandEditModalWrapper saveChanges={() => {}} hide={hide}>
            <GeneralSettings
                enabled={enabled}
                cooldown={cooldown}
                setCooldown={(newCd) => setCooldown(newCd)}
                setEnabled={() => setEnabled(!enabled)}
            />
            <CommandsSetting commands={commands} setCommands={(newCommands) => setCommands(newCommands)} />
            <ResponseScripts />
            <AnswersSetting
                title={'Ответ если очередь песен не пуста'}
                titleStyle="green"
                answers={daSuccess}
                variables={command.answers.daAnswers.success.variables}
                setAnswers={(newAnswers) => setDaSuccess(newAnswers)}
            />
            <AnswersSetting
                title={'Ответ если очередь пуста и песни на паузе'}
                titleStyle="red"
                answers={daFailure}
                variables={command.answers.daAnswers.failure.variables}
                setAnswers={(newAnswers) => setDaFailure(newAnswers)}
            />
        </CommandEditModalWrapper>
    )
}
