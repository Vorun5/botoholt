import { useState } from 'react'
import pikaHappy from 'shared/assets/emotes/pikaHappy.png'
import { CommandType } from 'shared/types'
import { Button, ButtonText, Modal } from 'shared/ui'
import { useTranslation } from 'react-i18next'

import { AddCustomCommand } from './add-custom-coomand'
import { AddRepeatCommand } from './add-repeat-command'

import styles from './modal-edit.module.scss'

const AddCommandButton = ({ children, onClick }: { children: string; onClick?: () => void }) => {
    return (
        <Button borderRadius="5px" height="50px" onClick={onClick}>
            <ButtonText>{children}</ButtonText>
        </Button>
    )
}

interface AddNewCustomCommadProps {
    isShown: boolean
    hide: () => void
}

export const AddNewCustomCommand = ({ isShown, hide }: AddNewCustomCommadProps) => {
    const { t } = useTranslation()
    const [commandType, setCommandType] = useState<null | CommandType>()
    const hideAddCommandModal = () => setCommandType(null)

    return (
        <>
            <Modal isShown={isShown} hide={hide} title={t('add-command.modal.title') ?? 'Adding new command'}>
                <img src={pikaHappy} alt="pikaHappy" className={styles.newCommandEmote} />
                <span className={styles.newCommandText}>{t('add-command.modal.select-command-type')}</span>
                <div className={styles.newCommandTypes}>
                    <AddCommandButton
                        onClick={() => {
                            setCommandType('bot.commands.custom')
                            hide()
                        }}
                    >
                        {t('bot.commands.custom')}
                    </AddCommandButton>
                    <AddCommandButton
                        onClick={() => {
                            setCommandType('bot.commands.repeat')
                            hide()
                        }}
                    >
                        {t('bot.commands.repeat')}
                    </AddCommandButton>
                </div>
            </Modal>
            {commandType === 'bot.commands.custom' && <AddCustomCommand hide={hideAddCommandModal} />}
            {commandType === 'bot.commands.repeat' && <AddRepeatCommand hide={hideAddCommandModal} />}
        </>
    )
}
