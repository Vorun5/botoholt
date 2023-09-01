import { useMemo, useState } from 'react'
import { useAdminCommandsQuery, useAdminCustomCommandsQuery } from 'entities/commands'
import { AdminServicesDto } from 'shared/api'
import { AddIcon } from 'shared/assets/icons'
import { useDocumentTitle, useModal } from 'shared/lib/hooks'
import { Button, ButtonIcon, ButtonText, ErrorMessage, Loading, SearchField, Tab, Tabs } from 'shared/ui'
import { useTranslation } from 'react-i18next'

import { ALPageContent, ALPageHeader } from '../../admin-layout/admin-layout'
import { AddNewCustomCommand } from '../../modal-edit/add-new-custom-coomand'
import { CustomCommands } from './ui/custom-commands'
import { DefaultCommands } from './ui/default-commands'

import styles from './commands.module.scss'

export const Commands = ({ services }: { services: AdminServicesDto }) => {
    const { t } = useTranslation()
    const [tab, setTab] = useState<'default' | 'custom'>('default')
    useDocumentTitle(t('admin-page.nav.commands'))

    const {
        data: defaultCommands,
        isError: isDefaultError,
        isSuccess: isDefaultSuccess,
        isLoading: isDefaultLoading,
        fetchStatus: defaultfetchStatus,
    } = useAdminCommandsQuery()

    const {
        data: customCommands,
        isError: isCustomError,
        isSuccess: isCustomSuccess,
        isLoading: isCustomLoading,
        fetchStatus: customFetchStatus,
    } = useAdminCustomCommandsQuery()
    const isLoding = tab === 'custom' ? isCustomLoading : isDefaultLoading

    const [searchStr, setSearchStr] = useState('')
    const [filteredCommands, setFilteredCommands] = useState(isDefaultSuccess ? defaultCommands : [])
    const [filteredCustomCommands, setFilteredCustomCommands] = useState(isCustomSuccess ? customCommands : [])

    useMemo(() => {
        if (tab === 'default') {
            if (!isDefaultSuccess) return
            if (!searchStr) return setFilteredCommands(defaultCommands)
            setFilteredCommands(
                defaultCommands.filter((command) => {
                    if (command.aliases.includes(searchStr.trim())) return true
                    return false
                }),
            )
        }
        if (tab === 'custom') {
            if (!isCustomSuccess) return
            if (!searchStr) return setFilteredCustomCommands(customCommands)
            setFilteredCustomCommands(
                customCommands.filter((command) => {
                    if (command.aliases.includes(searchStr.trim())) return true
                    return false
                }),
            )
        }
    }, [searchStr, tab, defaultCommands, customCommands])

    const [showAddNewCommand, toggleShowNewCommand] = useModal()

    return (
        <>
            <ALPageHeader>{t('admin-page.nav.commands')}</ALPageHeader>
            <ALPageContent className={styles.pageContent}>
                <Tabs>
                    <Tab isFocus={tab === 'default'} onClick={() => setTab('default')}>
                        {t('commands.default-coommands')}
                    </Tab>
                    <Tab isFocus={tab === 'custom'} onClick={() => setTab('custom')}>
                        {t('commands.custom-coomands')}
                    </Tab>
                </Tabs>
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
                            <>
                                <AddNewCustomCommand isShown={showAddNewCommand} hide={toggleShowNewCommand} />
                                <Button
                                    className={styles.addCommand}
                                    height="50px"
                                    style="green"
                                    border
                                    onClick={toggleShowNewCommand}
                                >
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
                            </>
                        )}
                    </div>
                    {isLoding && <Loading />}
                    {tab === 'default' && (
                        <>
                            {isDefaultError && (
                                <ErrorMessage title="Error">{`Error status ${defaultfetchStatus}`}</ErrorMessage>
                            )}
                            {isDefaultSuccess && <DefaultCommands services={services} commands={filteredCommands} />}
                        </>
                    )}
                    {tab === 'custom' && (
                        <>
                            {isCustomError && (
                                <ErrorMessage title="Error">{`Error status ${customFetchStatus}`}</ErrorMessage>
                            )}
                            {isCustomSuccess && (
                                <CustomCommands services={services} commands={filteredCustomCommands} />
                            )}
                        </>
                    )}
                </div>
            </ALPageContent>
        </>
    )
}
