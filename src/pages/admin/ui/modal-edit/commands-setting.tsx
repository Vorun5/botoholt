import clsx from 'clsx'
import { useState } from 'react'
import { AddIcon, DeleteIcon } from 'shared/assets/icons'
import { Button, ButtonIcon, ButtonText, InputField } from 'shared/ui'
import styles from './modal-edit.module.scss'

interface CommandsSettingProps {
    commands: string[]
    addCommand: (command: string) => void
    removeCommand: (command: string) => void
}

const getNewCommand = (str: string) => {
    let command = str.replace(/[\s\t]/g, '')
    if (!command || (command.length === 1 && command === '!')) return null
    if (command[0] !== '!') command = '!' + command
    return command
}

export const CommandsSetting = ({ commands, addCommand, removeCommand }: CommandsSettingProps) => {
    const [input, setInput] = useState('')

    const localAddCommand = () => {
        const newCommand = getNewCommand(input)
        if (!newCommand) return
        setInput('')
        if (commands.includes(newCommand)) return
        addCommand(newCommand)
    }

    return (
        <>
            <div className={styles.divider} />
            <div className={styles.commadns}>
                <span className={styles.title}>Команды</span>
                <span className={styles.description}>
                    Добавьте ключевые названия для команды (минимум 1, максимум 10)
                </span>
                <div className={clsx(styles.commandsList, styles.list)}>
                    {commands.map((command) => (
                        <Button
                            key={command}
                            padding="small"
                            border
                            style="blue"
                            onClick={() => {
                                if (commands.length > 1) removeCommand(command)
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
                            placeholder="!ВведитеКоманду"
                            className={styles.commandsAddField}
                            onChange={(event) => setInput(event.target.value)}
                            onSubmit={localAddCommand}
                        />
                        <Button className={styles.commandsAddBth} padding="big" style='fill-blue' onClick={localAddCommand}>
                            <ButtonText>Добавить команду</ButtonText>
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
        </>
    )
}
