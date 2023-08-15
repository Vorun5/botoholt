import { useState } from 'react'
import { RepeatCommand } from 'shared/types'
import { useTranslation } from 'react-i18next'

import { AddCommandWrapper } from './add-command-wrapper'
import { AnswersSetting, getAnswers, getAnswersWithId } from './answers-setting'
import { CommandNameSetting } from './command-name-setting'
import { GeneralSettings } from './general-settings'
import { ResponseScripts } from './response-scripts'

interface AddRepeatCommadProps {
    hide: () => void
}

export const AddRepeatCommand = ({ hide }: AddRepeatCommadProps) => {
    const { t } = useTranslation()
    const [cooldown, setCooldown] = useState(15)
    const [enabled, setEnabled] = useState(true)
    const [commands, setCommands] = useState<string[]>(['Command name'])
    const [answers, setAnswers] = useState(getAnswersWithId(['']))

    const getNewCommand = () => {
        const newCustomCommand: RepeatCommand = {
            function: 'bot.commands.repeat',
            _id: 'repeat',
            aliases: commands,
            cooldown: cooldown,
            answers: getAnswers(answers, 'new empty command'),
            enabled: enabled,
        }

        return newCustomCommand
    }

    return (
        <AddCommandWrapper hide={hide} getNewCommand={getNewCommand} commandName={t('bot.commands.repeat')}>
            <GeneralSettings
                enabled={enabled}
                cooldown={cooldown}
                setCooldown={(newCd) => setCooldown(newCd)}
                setEnabled={() => setEnabled(!enabled)}
            />
            <CommandNameSetting commands={commands} setCommands={(newCommands) => setCommands(newCommands)} />
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
