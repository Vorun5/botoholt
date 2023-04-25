import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { ThemeSwitcher } from 'features/index'
import { Button, ButtonText, Dropdown, Toggle } from 'shared/ui'
import { NavigationBar } from '../navigation-bar/navigation-bar'
import styles from './admin-page.module.scss'

export const AdminPage = () => {
    useEffect(() => {
        window.document.title = 'Admin'
    }, [])

    const [checked, setChecked] = useState(false)

    const dropdownItems = ['Everyone', 'Subscriber', 'Vip', 'Moderator', 'Broadcaster']
    const [selectedDropdownItem, setSelectedDropdownItem] = useState(dropdownItems[0])

    return (
        <div className={styles.pageWrapper}>
            <NavigationBar />
            <div className={styles.pageContent}>
                <header className={clsx(styles.pageHeader, styles.header)}>
                    <h1 className={styles.headerTitle}>
                        <span>Приветствуем, </span>Smurf_tv!
                    </h1>
                    <div className={styles.headerSetting}>
                        <div className={styles.settingsThemeSwitcher}>
                            <ThemeSwitcher short />
                        </div>
                    </div>
                </header>
                <div className={styles.test}>
                    <br />
                    <Dropdown
                        name="Access"
                        items={dropdownItems}
                        selectedItem={selectedDropdownItem}
                        onSelect={(item) => setSelectedDropdownItem(item)}
                    />
                    <br />
                    <Button border style="default">
                        <ButtonText>default</ButtonText>
                    </Button>
                    <br />
                    <Button border style="blue">
                        <ButtonText>fill blue</ButtonText>
                    </Button>
                    <br />
                    <Button padding="big" style="fill-blue">
                        <ButtonText>fill blue</ButtonText>
                    </Button>
                    <br />
                    <Button border padding="small" style="transparent">
                        <ButtonText>transparent</ButtonText>
                    </Button>
                    <br />
                    <Button border style="green" borderRadius="5px">
                        <ButtonText>green</ButtonText>
                    </Button>
                    <br />
                    <Button width="300px" height="70px" alignment="left" border style="fill-red">
                        <ButtonText>fill red</ButtonText>
                    </Button>
                    <br />
                    <Button width="300px" height="70px" alignment="right" border style="red">
                        <ButtonText>red</ButtonText>
                    </Button>
                    <br />
                    <Toggle
                        checked={checked}
                        onChange={() => {
                            setChecked(!checked)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
