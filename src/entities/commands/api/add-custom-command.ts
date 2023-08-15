import { api } from 'shared/api'
import { MODE } from 'shared/mode'
import { AllPossibleCustomCommandType } from 'shared/types'

export const addCustomCommand = async (
    command: AllPossibleCustomCommandType,
): Promise<AllPossibleCustomCommandType> => {
    if (MODE === 'dev.') {
        await new Promise((resolve) => setTimeout(resolve, 500))
        if (Math.random() >= 0.9) throw new Error('Unlucky')

        return { ...command, _id: new Date().toString() }
    }
    const response = await api
        .post('admin/commands/custom', { json: { ...command, _id: undefined } })
        .json<AllPossibleCustomCommandType>()
        
    return response
}
