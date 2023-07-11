import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { loadCommands, selectCommands } from 'entities/commands'
import { AddIcon } from 'shared/assets/icons'
import { useAppDispatch } from 'shared/lib/store'
import { Button, ButtonIcon, ButtonText, ErrorMessage, Loading, SearchField } from 'shared/ui'
import { ALPageContent, ALPageHeader } from '../../admin-layout/admin-layout'
import styles from './commands.module.scss'
import { CustomCommands } from './custom-commands'
import { DefaultCommands } from './default-commands'

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
    const [searchStr, setSearchStr] = useState('')
    const [filteredCommands, setFilteredCommands] = useState(commands.commands)
    useMemo(() => {
        if (!searchStr) {
            setFilteredCommands(commands.commands)
            return
        }
        setFilteredCommands(
            commands.commands.filter((command) => {
                if (command.aliases.includes(searchStr.trim())) return true
                return false
            }),
        )
    }, [searchStr, commands])

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
                        {t('commands.default-coommands')}
                    </button>
                    <button
                        type="button"
                        className={clsx(styles.tab, tab === 'custom' && styles.tabFocus)}
                        onClick={() => setTab('custom')}
                    >
                        {t('commands.custom-coomands')}
                    </button>
                </div>
                <div className={styles.commands}>
                    <div className={styles.commandsHeader}>
                        <div className={styles.field}>
                            <SearchField
                                plasholder={t('commands.search-by-command') ?? 'Search by command'}
                                name="commands"
                                onChange={(str) => setSearchStr(str)}
                            />
                        </div>
                        {tab === 'custom' && (
                            <Button className={styles.addCommand} height="50px" style="green" border>
                                <ButtonText>{t('commands.add')}</ButtonText>
                                <ButtonIcon margin="left">
                                    <AddIcon
                                        style={{
                                            position: 'relative',
                                            top: '2px',
                                        }}
                                    />
                                </ButtonIcon>
                            </Button>
                        )}
                    </div>
                    {(commands.status === 'loading' || commands.status === 'idle') && <Loading />}
                    {commands.status === 'rejected' && <ErrorMessage title="Error">{commands.error}</ErrorMessage>}
                    {commands.status === 'received' && (
                        <>
                            {tab === 'standard' && <DefaultCommands commands={filteredCommands} />}
                            {tab === 'custom' && <CustomCommands commands={[]} />}
                        </>
                    )}
                </div>
            </ALPageContent>
        </>
    )
}
