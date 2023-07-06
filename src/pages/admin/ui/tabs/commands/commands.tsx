import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { loadCommands, selectCommands } from 'entities/commands'
import { useAppDispatch } from 'shared/lib/store'
import { ErrorMessage, Loading, SearchField } from 'shared/ui'
import { ALPageContent, ALPageHeader } from '../../admin-layout/admin-layout'
import { CommandTable } from '../../command-table/command-table'
import styles from './commands.module.scss'

export const Commands = () => {
    const { t } = useTranslation()
    const [tab, setTab] = useState<'standard' | 'custom'>('standard')

    useEffect(() => {
        window.document.title = t('admin-page.nav.commands')
    }, [])

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadCommands())
    }, [])

    const commands = useSelector(selectCommands)

    console.log(commands)
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
                    {(commands.status === 'loading' || commands.status === 'idle') && <Loading />}
                    {commands.status === 'rejected' && <ErrorMessage title="Error">{commands.error}</ErrorMessage>}
                    {commands.status === 'received' && <CommandTable commands={commands.commands} />}
                </div>
            </ALPageContent>
        </>
    )
}
