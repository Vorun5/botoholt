import { Dispatch, SetStateAction } from 'react'

export interface SearchFieldProps {
    value: string
    setValue: Dispatch<SetStateAction<string>>
}
