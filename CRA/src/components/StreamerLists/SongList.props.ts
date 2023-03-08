import SongListItem from 'models/SongListItem'
import { ReactNode } from 'react'

export interface SongListProps {
    loading?: boolean
    listIsEmpty?: boolean
    title: string
    items: SongListItem[]
    emptyCard?: ReactNode
}
