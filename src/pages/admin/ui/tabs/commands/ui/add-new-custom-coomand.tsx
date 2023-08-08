import { useAdminCustomCommandsAddMutation } from 'entities/commands'
import { CustomCommand, RepeatCommand } from 'shared/types'
import { Button, ButtonText, ErrorMessage, Loading, Modal } from 'shared/ui'
import { useTranslation } from 'react-i18next'

import styles from '../commands.module.scss'

interface AddNewCustomCommadProps {
    isShown: boolean
    hide: () => void
}

export const AddNewCustomCommand = ({ isShown, hide }: AddNewCustomCommadProps) => {
    const { mutate: addCommand, isLoading, isError } = useAdminCustomCommandsAddMutation()
    const { t } = useTranslation()

    const addCustomCommand = () => {
        const newCustomCommand: CustomCommand = {
            function: 'bot.commands.custom',
            _id: 'custom',
            aliases: ['!newCommand'],
            cooldown: 10,
            answers: ['new custom command. change it'],
            enabled: false,
        }
        addCommand(newCustomCommand)
    }

    const addRepeatCommand = () => {
        const newRepeatCommand: RepeatCommand = {
            function: 'bot.commands.repeat',
            _id: 'repeat',
            aliases: ['New Repeat command'],
            cooldown: 10,
            answers: ['new repeat command. change it'],
            enabled: false,
        }
        addCommand(newRepeatCommand)
    }

    return (
        <>
            <Modal isShown={isShown} hide={hide} title="New command" headerDivider footerDivider dontHide={isLoading}>
                <span className={styles.newCommandTitle}>Select the type of new command</span>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className={styles.newCommandTypes}>
                        <Button borderRadius="5px" height="50px" onClick={addCustomCommand}>
                            <ButtonText>Custom</ButtonText>
                        </Button>
                        <Button borderRadius="5px" height="50px" onClick={addRepeatCommand}>
                            <ButtonText>Repeat</ButtonText>
                        </Button>
                    </div>
                )}
                {isError && <ErrorMessage>{t('try-again')}</ErrorMessage>}
            </Modal>
        </>
    )
}
