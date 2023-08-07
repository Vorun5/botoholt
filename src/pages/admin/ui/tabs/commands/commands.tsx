import { useMemo, useState } from 'react';
import { useAdminCommandsQuery } from 'entities/commands';
import { AddIcon } from 'shared/assets/icons';
import { useDocumentTitle } from 'shared/lib/hooks';
import { Button, ButtonIcon, ButtonText, ErrorMessage, Loading, SearchField } from 'shared/ui';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { ALPageContent, ALPageHeader } from '../../admin-layout/admin-layout';
import { CustomCommands } from './ui/custom-commands';
import { DefaultCommands } from './ui/default-commands';

import styles from './commands.module.scss';

export const Commands = () => {
    const { t } = useTranslation()
    const [tab, setTab] = useState<'standard' | 'custom'>('standard')
    useDocumentTitle(t('admin-page.nav.commands'))
    
    const { data: commands, isError, isSuccess, isLoading, fetchStatus } = useAdminCommandsQuery()
    const [searchStr, setSearchStr] = useState('')
    const [filteredCommands, setFilteredCommands] = useState(isSuccess ? commands : [])
    useMemo(() => {
        if (!isSuccess) return
        if (!searchStr) return setFilteredCommands(commands)
        setFilteredCommands(
            commands.filter((command) => {
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
                    {isLoading && <Loading />}
                    {isError && <ErrorMessage title="Error">{`Error status ${fetchStatus}`}</ErrorMessage>}
                    {isSuccess && (
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
