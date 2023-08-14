import { AdminServicesDto } from 'shared/api'
import Sadge from 'shared/assets/emotes/Sadge.gif'
import { Command } from 'shared/types'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'

import { CommandTable } from '../../../command-table/command-table'

import styles from '../commands.module.scss'

interface CustomCommandsProps {
    commands: Command[]
    services: AdminServicesDto
}

export const CustomCommands = ({ commands, services }: CustomCommandsProps) => {
    const { t } = useTranslation()

    if (isEmpty(commands))
        return (
            <div className={styles.empty}>
                <img src={Sadge} alt="Sadge" width={80} height={80} />
                <span className={styles.emptyTitle}>{t('commands.empty.title')}</span>
                <span className={styles.emptyText}>{t('commands.empty.text')}</span>
            </div>
        )

    return <CommandTable services={services} commands={commands} commandsType="custom" />
}
