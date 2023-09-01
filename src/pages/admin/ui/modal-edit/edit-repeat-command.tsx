import { useState } from 'react'
import { CustomCommand, RepeatCommand } from 'shared/types'
import { useTranslation } from 'react-i18next'
import { isEqual } from 'underscore'

import { AnswersSetting, getAnswers, getAnswersWithId } from './answers-setting'
import { CommandEditModalWrapper } from './command-edit-modal-wrapper'
import { CommandNameSetting, getCommandName } from './command-name-setting'
import { GeneralSettings } from './general-settings'
import { ResponseScripts } from './response-scripts'

interface EditRepeatCommandProps {
    hide: () => void
    command: RepeatCommand
}

export const EditRepeatCommand = ({ command, hide }: EditRepeatCommandProps) => {
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
            aliases: getCommandName(commands),
            answers: getAnswers(answers, 'defaultRepeat'),
        }
        if (isEqual(newCommand, command)) return null
        return newCommand
    }

    const variables: string[] = []

    return (
        <CommandEditModalWrapper
            commandsType="custom"
            commandName={t(command.function)}
            getNewCommand={getNewCommand}
            hide={hide}
            variables={variables}
        >
            <GeneralSettings
                enabled={enabled}
                cooldown={cooldown}
                setCooldown={(newCd) => setCooldown(newCd)}
                setEnabled={() => setEnabled(!enabled)}
            />
            <CommandNameSetting commands={commands} setCommands={(newCommands) => setCommands(newCommands)} />
            <ResponseScripts />
            <AnswersSetting
                title={'Ответы'}
                titleStyle="green"
                answers={answers}
                variables={variables}
                setAnswers={(newAnswers) => setAnswers(newAnswers)}
            />
        </CommandEditModalWrapper>
    )
}
