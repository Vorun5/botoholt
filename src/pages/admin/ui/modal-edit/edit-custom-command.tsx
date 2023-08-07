import { useState } from 'react'
import { CustomCommand } from 'shared/types'
import { useTranslation } from 'react-i18next'
import { isEqual } from 'underscore'

import { AnswersSetting, getAnswers, getAnswersWithId } from './answers-setting'
import { CommandEditModalWrapper } from './command-edit-modal-wrapper'
import { CommandsSetting } from './commands-setting'
import { GeneralSettings } from './general-settings'
import { ResponseScripts } from './response-scripts'

interface EditCustomCommandProps {
    hide: () => void
    command: CustomCommand
}

export const EditCustomCommand = ({ command, hide }: EditCustomCommandProps) => {
    const { t } = useTranslation()
    const [cooldown, setCooldown] = useState(command.cooldown)
    const [enabled, setEnabled] = useState(command.enabled)
    const [commands, setCommands] = useState(command.aliases)
    const [answers, setAnswers] = useState(getAnswersWithId(command.answers))

    const getNewCommand = () => {
        const newCommand: CustomCommand = {
            ...command,
            enabled,
            cooldown,
            aliases: commands,
            answers: getAnswers(answers, 'defaultCustom'),
        }
        if (isEqual(newCommand, command)) return null
        return newCommand
    }

    return (
        <CommandEditModalWrapper commandName={t(command.function)} getNewCommand={getNewCommand} hide={hide}>
            <GeneralSettings
                enabled={enabled}
                cooldown={cooldown}
                setCooldown={(newCd) => setCooldown(newCd)}
                setEnabled={() => setEnabled(!enabled)}
            />
            <CommandsSetting commands={commands} setCommands={(newCommands) => setCommands(newCommands)} />
            <ResponseScripts />
            <AnswersSetting
                title={'Ответы'}
                titleStyle="green"
                answers={answers}
                variables={['_userName']}
                setAnswers={(newAnswers) => setAnswers(newAnswers)}
            />
        </CommandEditModalWrapper>
    )
}
