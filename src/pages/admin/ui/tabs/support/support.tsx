import { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DiscordIcon } from 'shared/assets/icons'
import { Avatar, Button, ButtonIcon, ButtonText, Card, CardDescription, CardProps, CardTitle } from 'shared/ui'
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

    useEffect(() => {
        window.document.title = t('admin-page.nav.support')
    }, [])

    return (
        <>
            <ALPageHeader description={t('admin-page.support.description')!}>
                {t('admin-page.nav.support')}
            </ALPageHeader>
            <ALPageContent className={styles.pageContent}>
                <Card className={styles.support}>
                    <CardTitle>{t('admin-page.support.discord.title')}</CardTitle>
                    <span className={styles.supportAction}>
                        {t('admin-page.support.discord.description')}
                    </span>
                    <div className={styles.supportFooter}>
                        <Avatar
                            alt="Urbinholt"
                            image="https://cdn.discordapp.com/avatars/127927922643304448/890aea72532b5774c1d0301f1193b58c.webp?size=100"
                            size="53px"
                        />
                        <Button
                            style="fill-blue"
                            height="53px"
                            onClick={() => window.open('https://discordapp.com/users/127927922643304448/')}
                        >
                            <ButtonText>Urbinholt</ButtonText>
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

                    <Question question="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quia reprehenderit et harum perspiciatis fuga vero repudiandae labore! Placeat est non inventore ea aut quibusdam, ipsam laborum repellendus maxime quidem!">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, iure non ducimus aliquid saepe
                        magnam repudiandae nemo numquam nisi. Aspernatur dolorem, maxime illo autem similique quo vel
                        quidem est nobis!
                    </Question>
                    <Question question="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quia reprehenderit et harum perspiciatis fuga vero repudiandae labore! Placeat est non inventore ea aut quibusdam, ipsam laborum repellendus maxime quidem!">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, iure non ducimus aliquid saepe
                        magnam repudiandae nemo numquam nisi. Aspernatur dolorem, maxime illo autem similique quo vel
                        quidem est nobis!
                    </Question>
                    <Question question="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quia reprehenderit et harum perspiciatis fuga vero repudiandae labore! Placeat est non inventore ea aut quibusdam, ipsam laborum repellendus maxime quidem!">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, iure non ducimus aliquid saepe
                        magnam repudiandae nemo numquam nisi. Aspernatur dolorem, maxime illo autem similique quo vel
                        quidem est nobis!
                    </Question>
                    <Question question="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quia reprehenderit et harum perspiciatis fuga vero repudiandae labore! Placeat est non inventore ea aut quibusdam, ipsam laborum repellendus maxime quidem!">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, iure non ducimus aliquid saepe
                        magnam repudiandae nemo numquam nisi. Aspernatur dolorem, maxime illo autem similique quo vel
                        quidem est nobis!
                    </Question>
                    <Question question="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quia reprehenderit et harum perspiciatis fuga vero repudiandae labore! Placeat est non inventore ea aut quibusdam, ipsam laborum repellendus maxime quidem!">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, iure non ducimus aliquid saepe
                        magnam repudiandae nemo numquam nisi. Aspernatur dolorem, maxime illo autem similique quo vel
                        quidem est nobis!
                    </Question>
                </div>
            </ALPageContent>
        </>
    )
}
