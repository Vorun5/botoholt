import { ReactNode } from 'react'
import pepeJAM from 'shared/assets/emotes/pepeJAM.png'
import { DiscordIcon } from 'shared/assets/icons'
import { useDocumentTitle } from 'shared/lib/hooks'
import { Avatar, Button, ButtonIcon, ButtonText, Card, CardDescription, CardProps, CardTitle } from 'shared/ui'
import { useTranslation } from 'react-i18next'

import { ALPageContent, ALPageHeader } from '../../admin-layout/admin-layout'

import styles from './support.module.scss'

interface QuestionProps extends Pick<CardProps, 'style'> {
    question: string
    children?: ReactNode
}

const Question = ({ question, children, style }: QuestionProps) => {
    return (
        <Card className={styles.questionCard} style={style} padding="none" borderRadius="16px">
            <details className={styles.question}>
                <summary className={styles.questionTitle}>{question}</summary>
                <div className={styles.questionAnswer}>{children}</div>
            </details>
        </Card>
    )
}

export const Support = () => {
    const { t } = useTranslation()
    useDocumentTitle(t('admin-page.nav.support'))

    return (
        <>
            <ALPageHeader description={t('admin-page.support.description')!}>
                {t('admin-page.nav.support')}
            </ALPageHeader>
            <ALPageContent className={styles.pageContent}>
                <Card className={styles.support}>
                    <CardTitle>{t('admin-page.support.discord.title')}</CardTitle>
                    <span className={styles.supportAction}>{t('admin-page.support.discord.description')}</span>
                    <div className={styles.supportFooter}>
                        <Avatar alt="Urbinholt" image={pepeJAM} size="53px" />
                        <Button
                            style="fill-blue"
                            height="53px"
                            onClick={() => window.open('https://discord.gg/BgAxx46F4e')}
                        >
                            <ButtonText>{t('join-server')}</ButtonText>
                            <ButtonIcon margin="left">
                                <DiscordIcon width={33} height={25} fill="white" />
                            </ButtonIcon>
                        </Button>
                    </div>
                </Card>
                <div>
                    <Card className={styles.faq} borderRadius="16px">
                        <CardDescription>{t('admin-page.support.faq.description')}</CardDescription>
                        <CardTitle style="green">FAQ</CardTitle>
                    </Card>

                    <Question question={t('admin-page.support.faq.bot-not-work.q')}>
                        {t('admin-page.support.faq.bot-not-work.a')}
                    </Question>
                </div>
            </ALPageContent>
        </>
    )
}
