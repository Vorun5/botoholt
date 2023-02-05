import TopListItem from 'models/TopListItem'
import { ReactNode } from 'react'

export interface TopListProps {
    loading?: boolean
    listIsEmpty?: boolean
    title: string
    items: TopListItem[]
    emptyCard?: ReactNode
}
