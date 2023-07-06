import clsx from 'clsx'
import { nanoid } from 'nanoid'
import { ReactNode, useRef, useState } from 'react'
import { Button, ButtonText } from 'shared/ui'
import styles from './modal-edit.module.scss'

interface Answer {
    value: string
    id: string
}

export const getAnswersWithId = (answers: string[]): Answer[] => {
    return answers.map((answer) => ({
        value: answer,
        id: nanoid(),
    }))
}

export const getChangedAnswers = (answers: Answer[], index: number, newAnswerValue: string): Answer[] => {
    return answers.map((answer, i) =>
        index === i
            ? {
                  ...answer,
                  value: newAnswerValue,
              }
            : answer,
    )
}

export const removeAnswerByIndex = (answers: Answer[], index: number): Answer[] => {
    return answers.filter((_, i) => i !== index)
}

interface AnswersSettingPorps {
    answers: Answer[]
    variables: string[]
    changeAnwer: (index: number, newAnswerValue: string) => void
    addAnswer: (newAnswer: Answer) => void
    removeAnswer: (index: number) => void
    title?: ReactNode
}

const MAX_LENGTH = 350

export const AnswersSetting = ({
    title,
    answers,
    variables,
    addAnswer,
    removeAnswer,
    changeAnwer,
}: AnswersSettingPorps) => {
    const [selectedAnswer, setSelectedAnswer] = useState(0)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    return (
        <>
            <span className={styles.subtitle}>{title}</span>
            <div className={styles.list}>
                {answers.map((answer, index) => (
                    <Button
                        key={answer.id}
                        padding="small"
                        className={styles.listItem}
                        style={index === selectedAnswer ? 'fill-blue' : 'blue'}
                        border
                        onClick={() => setSelectedAnswer(index)}
                    >
                        <ButtonText>{`Ответ ${index + 1}`}</ButtonText>
                    </Button>
                ))}
            </div>

            <div className={styles.answers}>
                <div className={styles.answersFieldContainer}>
                    <textarea
                        className={styles.answersField}
                        ref={textAreaRef}
                        maxLength={MAX_LENGTH}
                        name="command-answer"
                        placeholder="Ответ бота"
                        value={answers[selectedAnswer].value}
                        onChange={(event) => changeAnwer(selectedAnswer, event.target.value)}
                    />
                    <span className={styles.answersFieldCounter}>
                        {answers[selectedAnswer].value.length}/{MAX_LENGTH}
                    </span>
                </div>
                <div className={styles.variables}>
                    <span className={styles.variablesTitle}>Переменные</span>
                    <span className={clsx(styles.variablesDescription, styles.description)}>
                        Чтобы использовать просто перетащите в текстовое поле
                    </span>
                    <div className={styles.variablesList}>
                        {variables.map((variable) => (
                            <Button
                                key={variable}
                                style="blue"
                                padding="small"
                                border
                                onClick={() => {
                                    changeAnwer(selectedAnswer, `${answers[selectedAnswer].value} ${variable} `)
                                    if (textAreaRef.current) textAreaRef.current.focus()
                                }}
                            >
                                <ButtonText>{variable}</ButtonText>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.answersActions}>
                {answers.length < 10 && (
                    <Button
                        style="fill-blue"
                        padding="big"
                        onClick={() => {
                            addAnswer({
                                value: `Ответ ${answers.length + 1}`,
                                id: nanoid(),
                            })
                            setSelectedAnswer(answers.length)
                        }}
                    >
                        <ButtonText>Добавить ответ</ButtonText>
                    </Button>
                )}
                {answers.length > 1 && (
                    <Button
                        style="fill-red"
                        padding="big"
                        onClick={() => {
                            if (answers.length <= 1) return
                            setSelectedAnswer(0)
                            removeAnswer(selectedAnswer)
                        }}
                    >
                        <ButtonText>Удалить ответ</ButtonText>
                    </Button>
                )}
            </div>
        </>
    )
}
