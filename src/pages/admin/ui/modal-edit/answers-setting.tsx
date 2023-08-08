import { ReactNode, useRef, useState } from 'react'
import { Button, ButtonText } from 'shared/ui'
import clsx from 'clsx'
import { nanoid } from 'nanoid'
import { useTranslation } from 'react-i18next'
import { compact, isEmpty } from 'underscore'

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

export const getAnswers = (answersWithId: { value: string; id: string }[], defaultAnswer: string) => {
    const newAnswers = compact(answersWithId.map((answerWithId) => answerWithId.value))
    if (isEmpty(newAnswers)) return [defaultAnswer]
    return newAnswers
}

const getChangedAnswers = (answers: Answer[], index: number, newAnswerValue: string): Answer[] => {
    return answers.map((answer, i) =>
        index === i
            ? {
                  ...answer,
                  value: newAnswerValue,
              }
            : answer,
    )
}
const removeAnswerByIndex = (answers: Answer[], index: number): Answer[] => {
    return answers.filter((_, i) => i !== index)
}

interface AnswersSettingPorps {
    answers: Answer[]
    setAnswers: (newAnswers: Answer[]) => void
    variables: string[]
    titleStyle?: 'red' | 'green'
    title?: ReactNode
}

const MAX_LENGTH = 350

export const AnswersSetting = ({ titleStyle, title, answers, variables, setAnswers }: AnswersSettingPorps) => {
    const { t } = useTranslation()
    const [selectedAnswer, setSelectedAnswer] = useState(0)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    return (
        <>
            <span
                className={clsx(
                    styles.answersTitle,
                    titleStyle === 'red' && styles.answersTitleRed,
                    titleStyle === 'green' && styles.answersTitleGreen,
                )}
            >
                {title}
            </span>
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
                        <ButtonText>{`${t('answer')} ${index + 1}`}</ButtonText>
                    </Button>
                ))}
            </div>

            <div className={styles.answers}>
                <div
                    className={clsx(
                        styles.answersFieldContainer,
                        variables.length === 0 && styles.answersFieldContainerNoVariables,
                    )}
                >
                    <textarea
                        className={styles.answersField}
                        ref={textAreaRef}
                        maxLength={MAX_LENGTH}
                        name="command-answer"
                        placeholder={t('bot-answer') ?? 'Bot answer...'}
                        value={answers[selectedAnswer].value}
                        onChange={(event) => setAnswers(getChangedAnswers(answers, selectedAnswer, event.target.value))}
                    />
                    <span className={styles.answersFieldCounter}>
                        {answers[selectedAnswer].value.length}/{MAX_LENGTH}
                    </span>
                </div>
                {variables.length > 0 && (
                    <div className={styles.variables}>
                        <span className={styles.variablesTitle}>{t('variables')}</span>
                        <span className={clsx(styles.variablesDescription, styles.description)}>
                            {t('variables-description')}
                        </span>
                        <div className={styles.variablesList}>
                            {variables.map((variable) => (
                                <Button
                                    key={variable}
                                    style="orange"
                                    padding="small"
                                    border
                                    onClick={(event) => {
                                        event.preventDefault()
                                        const value = answers[selectedAnswer].value
                                        const possible = MAX_LENGTH - value.length >= variable.length + 2
                                        const textarea = textAreaRef.current
                                        if (possible && textarea) {
                                            const startPos = textarea.selectionStart
                                            const endPos = textarea.selectionEnd
                                            if ((startPos && endPos) || startPos === 0) {
                                                setAnswers(
                                                    getChangedAnswers(
                                                        answers,
                                                        selectedAnswer,
                                                        `${value.substring(0, startPos)} ${variable} ${value.substring(
                                                            endPos,
                                                            value.length,
                                                        )}`.trim(),
                                                    ),
                                                )
                                                setTimeout(() => {
                                                    const newPos = startPos + variable.length + 1
                                                    textarea.focus()
                                                    textarea.setSelectionRange(newPos, newPos)
                                                }, 0)
                                            } else {
                                                setAnswers(
                                                    getChangedAnswers(
                                                        answers,
                                                        selectedAnswer,
                                                        `${value} ${variable}`.trim(),
                                                    ),
                                                )
                                                textarea.focus()
                                            }
                                        }
                                    }}
                                >
                                    <ButtonText>{variable}</ButtonText>
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.answersActions}>
                {answers.length < 10 && (
                    <Button
                        style="fill-blue"
                        padding="big"
                        onClick={() => {
                            setAnswers([
                                ...answers,
                                {
                                    value: '',
                                    id: nanoid(),
                                },
                            ])
                            setSelectedAnswer(answers.length)
                        }}
                    >
                        <ButtonText>{t('add-answer')}</ButtonText>
                    </Button>
                )}
                {answers.length > 1 && (
                    <Button
                        style="fill-red"
                        padding="big"
                        onClick={() => {
                            if (answers.length <= 1) return
                            setSelectedAnswer(0)
                            setAnswers(removeAnswerByIndex(answers, selectedAnswer))
                        }}
                    >
                        <ButtonText>{t('delete-answer')}</ButtonText>
                    </Button>
                )}
            </div>
        </>
    )
}
