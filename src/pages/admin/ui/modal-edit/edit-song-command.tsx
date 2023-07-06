import { useState } from 'react'
import { SongCommand } from 'shared/types'
import { AnswersSetting, getAnswersWithId, getChangedAnswers, removeAnswerByIndex } from './answers-setting'
import { CommandEditModalWrapper } from './command-edit-modal-wrapper'
import { CommandsSetting } from './commands-setting'
import { GeneralSettings } from './general-settings'
import { ResponseScripts } from './response-scripts'

interface EditSongCommandProps {
    hide: () => void
    command: SongCommand
}

export const EditSongCommand = ({ command, hide }: EditSongCommandProps) => {
    const [cooldown, setCooldown] = useState(command.cooldown)
    const [enabled, setEnabled] = useState(command.enabled)
    const [commands, setCommands] = useState(command.aliases)
    const [shazamSuccess, setShazamSuccess] = useState(getAnswersWithId(command.answers.shazamAnswers.success.answers))
    const [shazamFailure, setShazamFailure] = useState(getAnswersWithId(command.answers.shazamAnswers.failure.answers))
    const [daSuccess, setDaSuccess] = useState(getAnswersWithId(command.answers.daAnswers.success.answers))

    return (
        <CommandEditModalWrapper saveChanges={() => {}} hide={hide}>
            <GeneralSettings
                enabled={enabled}
                cooldown={cooldown}
                setCooldown={(newCd) => setCooldown(newCd)}
                setEnabled={() => setEnabled(!enabled)}
            />
            <ResponseScripts />
            <AnswersSetting
                title={'Ответы при успешном шазаминге песни'}
                answers={shazamSuccess}
                variables={command.answers.shazamAnswers.success.variables}
                addAnswer={(newAnswer) => setShazamSuccess([...shazamSuccess, newAnswer])}
                removeAnswer={(index) => setShazamSuccess(removeAnswerByIndex(shazamSuccess, index))}
                changeAnwer={(index, value) => setShazamSuccess(getChangedAnswers(shazamSuccess, index, value))}
            />
            <AnswersSetting
                title={'Ответы при провальном шазаминге песни'}
                answers={shazamFailure}
                variables={command.answers.shazamAnswers.failure.variables}
                addAnswer={(newAnswer) => setShazamFailure([...shazamFailure, newAnswer])}
                removeAnswer={(index) => setShazamFailure(removeAnswerByIndex(shazamFailure, index))}
                changeAnwer={(index, value) => setShazamFailure(getChangedAnswers(shazamFailure, index, value))}
            />
            <AnswersSetting
                title={'Ответы если песня играет в DonationAlerts'}
                answers={daSuccess}
                variables={command.answers.daAnswers.success.variables}
                addAnswer={(newAnswer) => setDaSuccess([...daSuccess, newAnswer])}
                removeAnswer={(index) => setDaSuccess(removeAnswerByIndex(daSuccess, index))}
                changeAnwer={(index, value) => setDaSuccess(getChangedAnswers(daSuccess, index, value))}
            />
            <CommandsSetting
                commands={commands}
                addCommand={(command) => setCommands([...commands, command])}
                removeCommand={(command) => setCommands(commands.filter((c) => c !== command))}
            />
        </CommandEditModalWrapper>
    )
}
