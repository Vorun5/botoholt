import { Command } from 'shared/types'

import { CommandTable } from '../../../command-table/command-table'

interface DefaultCommandsProps {
    commands: Command[]
}

export const DefaultCommands = ({ commands }: DefaultCommandsProps) => {
    return <CommandTable commands={commands} commandsType="default" />
}
