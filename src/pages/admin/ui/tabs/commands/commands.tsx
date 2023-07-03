import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SearchField } from 'shared/ui'
import { ALPageContent, ALPageHeader } from '../../admin-layout/admin-layout'
import { CommandTable } from '../../command-table/command-table'
import styles from './commands.module.scss'

export const Commands = () => {
    const { t } = useTranslation()
    const [tab, setTab] = useState<'standard' | 'custom'>('standard')

    useEffect(() => {
        window.document.title = t('admin-page.nav.commands')
    }, [])

    return (
        <>
            <ALPageHeader>{t('admin-page.nav.commands')}</ALPageHeader>
            <ALPageContent className={styles.pageContent}>
                <div className={styles.tabs}>
                    <button
                        type="button"
                        className={clsx(styles.tab, tab === 'standard' && styles.tabFocus)}
                        onClick={() => setTab('standard')}
                    >
                        Стандартные команды
                    </button>
                    <button
                        type="button"
                        className={clsx(styles.tab, tab === 'custom' && styles.tabFocus)}
                        onClick={() => setTab('custom')}
                    >
                        Кастомные команды
                    </button>
                </div>
                <div className={styles.commands}>
                    <div className={styles.field}>
                        <SearchField plasholder="Поиск по командам" name="commands" onChange={() => {}} />
                    </div>
                    <CommandTable
                        commands={[
                            {
                                access: 'Випы',
                                answer: 'Показывает текущий трек',
                                cdInSeconds: 15,
                                commands: ['!s', '!song', '!ы', '!трекhdsakdjasjdkajsdkajsdkasjdaksdasdj'],
                                status: false,
                                type: 'Длительность очереди',
                            },
                            {
                                access: 'Модераторы',
                                answer: 'Показывает текущий трек',
                                cdInSeconds: 20,
                                commands: ['!s', '!song', '!ы'],
                                status: true,
                                type: 'Длительность очереди',
                            },
                        ]}
                    />
                </div>
            </ALPageContent>
        </>
    )
}
