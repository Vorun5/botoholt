import { AdminServicesDto } from 'shared/api'
import { Command } from 'shared/types'

import { CommandTable } from '../../../command-table/command-table'

interface DefaultCommandsProps {
    commands: Command[]
    services: AdminServicesDto
}

export const DefaultCommands = ({ commands, services }: DefaultCommandsProps) => {
    return <CommandTable services={services} commands={commands} commandsType="default" />
}
