import { useState } from 'react'
import { AddIcon, DangerIcon, DeleteIcon } from 'shared/assets/icons'
import { Button, ButtonIcon, ButtonText, Card, CardExpanded, InputField } from 'shared/ui'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import styles from './modal-edit.module.scss'

interface CommandsSettingProps {
    commands: string[]
    setCommands: (newCommands: string[]) => void
}

const getNewCommand = (str: string) => {
    let command = str.replace(/[\s\t]/g, '')
    if (!command || (command.length === 1 && command === '!')) return null
    if (command[0] !== '!') command = '!' + command
    return command
}

export const CommandsSetting = ({ commands, setCommands }: CommandsSettingProps) => {
    const { t } = useTranslation()
    const [input, setInput] = useState('')

    const localAddCommand = () => {
        const newCommand = getNewCommand(input)
        if (!newCommand) return
        setInput('')
        if (commands.includes(newCommand)) return
        setCommands([...commands, newCommand])
    }

    return (
        <>
            <div className={styles.commadns}>
                <span className={styles.title}>{t('commands.commands')}</span>
                <span className={styles.description}>{t('edit-commands.commands.description')}</span>
                <div className={clsx(styles.commandsList, styles.list)}>
                    {commands.length === 0 && (
                        <Card style="red" padding="small" borderRadius="9px">
                            <CardExpanded>
                                <DangerIcon
                                    style={{
                                        margin: '0px 10px 0 0',
                                        position: 'relative',
                                        top: '3px',
                                    }}
                                />
                                <span>{t('edit-commands.empty-command-list')}</span>
                            </CardExpanded>
                        </Card>
                    )}
                    {commands.map((command) => (
                        <Button
                            key={command}
                            padding="small"
                            border
                            style="blue"
                            onClick={() => {
                                if (commands.length > 1) setCommands(commands.filter((c) => c !== command))
                            }}
                            className={styles.listItem}
                        >
                            <ButtonText>{command}</ButtonText>
                            <ButtonIcon margin="left">
                                <DeleteIcon
                                    style={{
                                        position: 'relative',
                                        top: '3px',
                                    }}
                                />
                            </ButtonIcon>
                        </Button>
                    ))}
                </div>
                {commands.length < 10 && (
                    <div className={styles.commandsAdd}>
                        <InputField
                            value={input}
                            placeholder={t('edit-commands.commands.placeholder') ?? '!EnterCommand'}
                            className={styles.commandsAddField}
                            onChange={(event) => setInput(event.target.value)}
                            onSubmit={localAddCommand}
                        />
                        <Button
                            className={styles.commandsAddBth}
                            padding="small"
                            height="50px"
                            style="fill-blue"
                            onClick={localAddCommand}
                        >
                            <ButtonText>{t('edit-commands.commands.add')}</ButtonText>
                            <ButtonIcon margin="left">
                                <AddIcon
                                    style={{
                                        position: 'relative',
                                        top: '3px',
                                    }}
                                />
                            </ButtonIcon>
                        </Button>
                    </div>
                )}
            </div>
            <div className={styles.divider} />
        </>
    )
}
