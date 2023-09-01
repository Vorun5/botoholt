import { ReactNode, useState } from 'react'
import { Tab, Tabs } from 'shared/ui'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import styles from './modal-edit.module.scss'

export const CommandContentWrapper = ({ variables, children }: { variables: string[]; children: ReactNode }) => {
    const { t } = useTranslation()

    const [tab, setTab] = useState<'settings' | 'variables'>('settings')
    const uniqueVariables = [...new Set([...variables])]
    const variableListIsNotEmpty = variables.length !== 0

    return (
        <>
            {variableListIsNotEmpty && (
                <div className={styles.editCommandNav}>
                    <Tabs line>
                        <Tab isFocus={tab === 'settings'} onClick={() => setTab('settings')}>
                            {t('edit-commands.settings')}
                        </Tab>
                        <Tab isFocus={tab === 'variables'} onClick={() => setTab('variables')}>
                            {t('edit-commands.variables')}
                        </Tab>
                    </Tabs>
                </div>
            )}
            {tab === 'settings' ? (
                children
            ) : (
                <div className={styles.editCommandVariables}>
                    <div className={styles.editCommandVariablesHeader}>
                        <span>{t('variables-list.name')}</span>
                        <span>{t('variables-list.description')}</span>
                        <span>{t('variables-list.result')}</span>
                    </div>
                    {uniqueVariables.map((variable) => (
                        <div key={variable} className={styles.editCommandVariable}>
                            <span
                                className={clsx(styles.editCommandVariableDescription, styles.editCommandVariableName)}
                            >
                                {variable}
                            </span>
                            <span className={styles.editCommandVariableDescription}>
                                {t(`variables-list.${variable}.description`)}
                            </span>
                            <span className={styles.editCommandVariableDescription}>
                                {t(`variables-list.${variable}.result`)}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
