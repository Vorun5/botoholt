import { ListItem, ListItemProps } from './list-item/list-item'
import { ListItemName } from './list-item-name/list-item-name'

interface TopListItem extends Omit<ListItemProps, 'children'> {
    link?: string
    text: string
}

export const TopListItem = ({ link, text, number, extraInfo }: TopListItem) => {
    return (
        <ListItem number={number} extraInfo={extraInfo}>
            <ListItemName link={link}>{text}</ListItemName>
        </ListItem>
    )
}
