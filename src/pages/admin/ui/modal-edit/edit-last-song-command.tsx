import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LastSongCommand } from 'shared/types'
import { AnswersSetting, getAnswersWithId } from './answers-setting'
import { CommandEditModalWrapper } from './command-edit-modal-wrapper'
import { CommandsSetting } from './commands-setting'
import { GeneralSettings } from './general-settings'
import { ResponseScripts } from './response-scripts'

interface EditLastSongCommandProps {
    hide: () => void
    command: LastSongCommand
}

export const EditLastSongCommand = ({ command, hide }: EditLastSongCommandProps) => {
    const { t } = useTranslation()
    const [cooldown, setCooldown] = useState(command.cooldown)
    const [enabled, setEnabled] = useState(command.enabled)
    const [commands, setCommands] = useState(command.aliases)
    const [shazamSuccess, setShazamSuccess] = useState(getAnswersWithId(command.answers.shazamAnswers.success.answers))
    const [shazamFailure, setShazamFailure] = useState(getAnswersWithId(command.answers.shazamAnswers.failure.answers))
    const [daSuccess, setDaSuccess] = useState(getAnswersWithId(command.answers.daAnswers.success.answers))

    return (
        <CommandEditModalWrapper getNewCommand={() => {}} hide={hide}>
            <GeneralSettings
                enabled={enabled}
                cooldown={cooldown}
                setCooldown={(newCd) => setCooldown(newCd)}
                setEnabled={() => setEnabled(!enabled)}
            />
            <CommandsSetting commands={commands} setCommands={(newCommands) => setCommands(newCommands)} />
            <ResponseScripts />
            <AnswersSetting
                title={t('edit-commands.titles.last-success-shazam')}
                titleStyle="green"
                answers={shazamSuccess}
                variables={command.answers.shazamAnswers.success.variables}
                setAnswers={(newAnswers) => setShazamSuccess(newAnswers)}
            />
            <AnswersSetting
                title={t('edit-commands.titles.last-success-da')}
                titleStyle="green"
                answers={daSuccess}
                variables={command.answers.daAnswers.success.variables}
                setAnswers={(newAnswers) => setDaSuccess(newAnswers)}
            />
            <AnswersSetting
                title={t('edit-commands.titles.last-faliure')}
                titleStyle="red"
                answers={shazamFailure}
                variables={command.answers.shazamAnswers.failure.variables}
                setAnswers={(newAnswers) => setShazamFailure(newAnswers)}
            />
        </CommandEditModalWrapper>
    )
}
