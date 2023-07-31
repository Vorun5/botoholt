import { api } from 'shared/api'
import { AllPossibleCommandType } from 'shared/types'

export const setCommand = async (command: AllPossibleCommandType): Promise<AllPossibleCommandType> => {
    // await new Promise((resolve) => setTimeout(resolve, 500))
    // if (Math.random() >= 0.9) throw new Error('Unlucky')

    // return command

    const response = await api.put('admin/commands', { json: command }).json<AllPossibleCommandType>()
    return response
}
