import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { useToast } from 'shared/lib/hooks'
import { SongCommand } from 'shared/types'
import { AnswersSetting, getAnswersWithId, getAnswersWithoutId } from './answers-setting'
import { CommandEditModalWrapper } from './command-edit-modal-wrapper'
import { CommandsSetting } from './commands-setting'
import { GeneralSettings } from './general-settings'
import { ResponseScripts } from './response-scripts'

interface EditSongCommandProps {
    hide: () => void
    command: SongCommand
}

export const EditSongCommand = ({ command, hide }: EditSongCommandProps) => {
    const { t } = useTranslation()
    const toast = useToast()
    const [cooldown, setCooldown] = useState(command.cooldown)
    const [enabled, setEnabled] = useState(command.enabled)
    const [commands, setCommands] = useState(command.aliases)
    const [shazamSuccess, setShazamSuccess] = useState(getAnswersWithId(command.answers.shazamAnswers.success.answers))
    const [shazamFailure, setShazamFailure] = useState(getAnswersWithId(command.answers.shazamAnswers.failure.answers))
    const [daSuccess, setDaSuccess] = useState(getAnswersWithId(command.answers.daAnswers.success.answers))

    const getNewCommand = () => {
        const newCommand: SongCommand = {
            ...command,
            enabled,
            cooldown,
            aliases: commands,
            answers: {
                shazamAnswers: {
                    success: {
                        ...command.answers.shazamAnswers.success,
                        answers: getAnswersWithoutId(shazamSuccess),
                    },
                    failure: {
                        ...command.answers.shazamAnswers.failure,
                        answers: getAnswersWithoutId(shazamFailure),
                    },
                },
                daAnswers: {
                    success: {
                        ...command.answers.daAnswers.success,
                        answers: getAnswersWithoutId(daSuccess),
                    },
                },
            },
        }
        if (_.isEqual(newCommand, command)) return null
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
                title={t('edit-commands.titles.success-shazam')}
                titleStyle="green"
                answers={shazamSuccess}
                variables={command.answers.shazamAnswers.success.variables}
                setAnswers={(newAnswers) => setShazamSuccess(newAnswers)}
            />
            <AnswersSetting
                title={t('edit-commands.titles.failure-shazam')}
                titleStyle="red"
                answers={shazamFailure}
                variables={command.answers.shazamAnswers.failure.variables}
                setAnswers={(newAnswers) => setShazamFailure(newAnswers)}
            />
            <AnswersSetting
                title={t('edit-commands.titles.success-da-song')}
                titleStyle="green"
                answers={daSuccess}
                variables={command.answers.daAnswers.success.variables}
                setAnswers={(newAnswers) => setDaSuccess(newAnswers)}
            />
        </CommandEditModalWrapper>
    )
}
