import { api } from 'shared/api'
import { MODE } from 'shared/mode'
import { AllPossibleCustomCommandType } from 'shared/types'

export const deleteCustomCommand = async (command: AllPossibleCustomCommandType) => {
    if (MODE === 'dev.') {
        await new Promise((resolve) => setTimeout(resolve, 500))
        if (Math.random() >= 0.9) throw new Error('Unlucky')

        return command._id
    }

    const response = await api.delete('admin/commands/custom', { json: { _id: command._id } }).json()
    return command._id
}
