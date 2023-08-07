import { api } from 'shared/api'
import { MODE } from 'shared/mode'
import { AllPossibleCommandType, AllPossibleCustomCommandType } from 'shared/types'

export const getCustomCommands = async () => {
    if (MODE === 'dev.') {
        const commands: AllPossibleCustomCommandType[] = [
            {
                _id: 'a',
                function: 'bot.commands.custom',
                aliases: ['!botoholt', '!ботохольт'],
                cooldown: 10,
                enabled: true,
                answers: ['Ботохольт это просто рофлан ебало бот', 'А?'],
            },
            {
                _id: 'b',
                function: 'bot.commands.repeat',
                aliases: ['Срать вечно'],
                cooldown: 10,
                enabled: true,
                answers: ['ну да', 'where is my mind'],
            },
        ]
        await new Promise((resolve) => setTimeout(resolve, 200))
        return commands
    }

    const response = await api.get('admin/commands/custom').json<AllPossibleCommandType[]>()

    return response
}
