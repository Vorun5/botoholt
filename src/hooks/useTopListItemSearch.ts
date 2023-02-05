import { useEffect, useState } from 'react'
import TopListItem from 'models/TopListItem'

const useTopListItemSearch = (items: TopListItem[]) => {
    const [search, setSearch] = useState('')
    const [topItems, setTopItems] = useState(items)

    useEffect(() => {
        setTopItems(items.filter((item) => item.text.includes(search)))
    }, [search, items])

    return { search, setSearch, topItems }
}

export default useTopListItemSearch
