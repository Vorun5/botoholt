import { useRef, useState } from 'react'
import { ArrowDownIcon } from 'shared/assets/icons'
import { useOnClickOutside } from 'shared/lib/hooks'
import clsx from 'clsx'

import styles from './dropdown.module.scss'

interface DropdownProps {
    label?: string
    name?: string
    items: string[]
    selectedItem?: string
    width?: string
    onSelect: (item: string) => void
}

export const Dropdown = ({ items, selectedItem, name, label, width, onSelect }: DropdownProps) => {
    const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false)
    const dropdownRef = useRef(null)

    useOnClickOutside(dropdownRef, () => {
        if (dropdownIsOpen) {
            setDropdownIsOpen(false)
        }
    })
    return (
        <>
            <label className={styles.dropdownLabel}>{label}</label>
            <div style={{ width: width }} ref={dropdownRef} className={styles.dropdownWrapper}>
                <button
                    type="button"
                    className={clsx(
                        styles.dropdownItem,
                        styles.dropdownSelectedItem,
                        dropdownIsOpen && styles.dropdownOpen,
                    )}
                    onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
                >
                    {selectedItem ?? name}
                    <div className={styles.arrow}>
                        <ArrowDownIcon />
                    </div>
                </button>
                {dropdownIsOpen && (
                    <div className={styles.dropdownItems}>
                        {name && (
                            <div className={clsx(styles.dropdownItem, styles.dropdownName)}>
                                {name}
                                <div className={styles.arrow}>
                                    <ArrowDownIcon />
                                </div>
                            </div>
                        )}
                        {items.map((item) => (
                            <button
                                key={item}
                                className={clsx(
                                    styles.dropdownItem,
                                    item === selectedItem && styles.dropdownHoveredItem,
                                )}
                                type="button"
                                onClick={() => {
                                    onSelect(item)
                                    setDropdownIsOpen(!dropdownIsOpen)
                                }}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
