import { useState } from 'react'
import { CustomCommand } from 'shared/types'
import { useTranslation } from 'react-i18next'

import { AddCommandWrapper } from './add-command-wrapper'
import { AnswersSetting, getAnswers, getAnswersWithId } from './answers-setting'
import { CommandsSetting } from './commands-setting'
import { GeneralSettings } from './general-settings'
import { ResponseScripts } from './response-scripts'

interface AddCustomCommadProps {
    hide: () => void
}

export const AddCustomCommand = ({ hide }: AddCustomCommadProps) => {
    const { t } = useTranslation()
    const [cooldown, setCooldown] = useState(15)
    const [enabled, setEnabled] = useState(true)
    const [commands, setCommands] = useState<string[]>([])
    const [answers, setAnswers] = useState(getAnswersWithId(['']))

    const getNewCommand = () => {
        const newCustomCommand: CustomCommand = {
            function: 'bot.commands.custom',
            _id: 'custom',
            aliases: commands,
            cooldown: cooldown,
            answers: getAnswers(answers, 'new empty command'),
            enabled: enabled,
        }

        return newCustomCommand
    }

    return (
        <AddCommandWrapper hide={hide} getNewCommand={getNewCommand} commandName={t('bot.commands.custom')}>
            <GeneralSettings
                enabled={enabled}
                cooldown={cooldown}
                setCooldown={(newCd) => setCooldown(newCd)}
                setEnabled={() => setEnabled(!enabled)}
            />
            <CommandsSetting commands={commands} setCommands={(newCommands) => setCommands(newCommands)} />
            <ResponseScripts />
            <AnswersSetting
                title={t('edit-commands.titles.answers')}
                titleStyle="green"
                answers={answers}
                variables={['_userName']}
                setAnswers={(newAnswers) => setAnswers(newAnswers)}
            />
        </AddCommandWrapper>
    )
}
