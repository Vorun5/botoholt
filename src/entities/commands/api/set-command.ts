import { api } from 'shared/api'
import { AllPossibleCommandType } from 'shared/types'

export const setCommand = async (command: AllPossibleCommandType): Promise<AllPossibleCommandType> => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    if (Math.random() >= 0.5) throw new Error('Unlucky')
    
    return command

    const response = await api.post('admin/commands', { json: command }).json<AllPossibleCommandType>()
    return response
}
