import clsx from 'clsx'
import { ReactNode, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from 'features'
import {
    ApprovalIcon,
    CommandsIcons,
    CustomerSupportIcon,
    DashboardIcon,
    DotsIcon,
    IntegrationsIcons,
    LanguageIcon,
    LogoIcon,
    LogoutIcon,
    MoonIcon,
    SongQueueIcon,
    CloseIcon,
    SunIcon,
} from 'shared/assets/icons'
import { useMediaQuery, useModal, useOnClickOutside } from 'shared/lib/hooks'

import {
    Avatar,
    Button,
    ButtonIcon,
    ButtonText,
    CreatedWithLove,
    Modal,
    ModalDivider,
    ModalFooter,
    ModalHeader,
} from 'shared/ui'
import styles from './navigation-bar.module.scss'

interface TabProps {
    selected?: boolean
    onClick?: () => void
    children: string
    icon: ReactNode
}

const Tab = ({ selected, onClick, children, icon }: TabProps) => {
    return (
        <Button
            style={selected ? 'fill-blue' : 'transparent'}
            className={styles.tab}
            alignment="left"
            onClick={onClick}
        >
            <ButtonIcon>{icon}</ButtonIcon>
            <ButtonText>{children}</ButtonText>
        </Button>
    )
}

const NavButton = ({
    onClick,
    className,
    children,
}: {
    onClick: () => void
    className?: string
    children: ReactNode
}) => {
    return (
        <Button border width="50px" height="50px" style="transparent" className={clsx(className)} onClick={onClick}>
            <ButtonIcon margin="none">{children}</ButtonIcon>
        </Button>
    )
}

export const NavigationBar = () => {
    const { t } = useTranslation()
    const approval = true
    const pathname = useLocation().pathname

    const isDesktop = useMediaQuery('(min-width: 1100px)')
    const [isOpen, setIsOpen] = useState(true)
    const navRef = useRef(null)
    useOnClickOutside(navRef, () => {
        if (isDesktop || !isOpen) return
        setIsOpen(false)
    })
    const navButtonHandler = () => setIsOpen(!isOpen)
    const tabButtonHandler = () => {
        if (!isDesktop && isOpen) {
            setIsOpen(false)
        }
    }

    const [theme, handleChange] = useTheme()
    const { isShown, toggle } = useModal()
    const hide = () => {
        if (isShown) toggle()
    }

    return (
        <nav ref={navRef}>
            {!isDesktop && (
                <NavButton className={styles.burger} onClick={navButtonHandler}>
                    <DotsIcon width="32px" height="32px" />
                </NavButton>
            )}
            <div className={clsx(styles.navigation, isOpen && styles.navigationOpen)}>
                <div>
                    <div className={styles.navigationHeader}>
                        <div className={styles.navigationLogo}>
                            <LogoIcon />
                        </div>
                        {!isDesktop && (
                            <NavButton className={styles.navigationHeaderBurger} onClick={navButtonHandler}>
                                <CloseIcon width="25px" height="25px" />
                            </NavButton>
                        )}
                    </div>

                    <div className={clsx(styles.navigationUser, styles.user)}>
                        <Avatar
                            size="44px"
                            isOnline
                            image="https://i.pinimg.com/originals/9b/b4/05/9bb4059a23af5ff46d090e0b1515036d.jpg"
                            alt="EvangelionAyanamiRei"
                        />
                        <span className={styles.userName}>EvangelionAyanamiRei</span>
                        {approval && <ApprovalIcon className={styles.userApproval} />}
                    </div>

                    <div className={clsx(styles.navigationTabs, styles.tabs)}>
                        <h5 className={styles.tabsTitle}>{t('admin-page.nav.menu')}</h5>
                        <Link to="/admin">
                            <Tab
                                onClick={tabButtonHandler}
                                selected={pathname === '/admin' || pathname === '/admin/'}
                                icon={<DashboardIcon />}
                            >
                                {t('admin-page.nav.dashboard')}
                            </Tab>
                        </Link>
                        <Link to="/admin/commands">
                            <Tab
                                onClick={tabButtonHandler}
                                selected={pathname.includes('/admin/commands')}
                                icon={<CommandsIcons />}
                            >
                                {t('admin-page.nav.commands')}
                            </Tab>
                        </Link>
                        <Link to="/admin/song-queue">
                            <Tab
                                onClick={tabButtonHandler}
                                selected={pathname.includes('/admin/song-queue')}
                                icon={<SongQueueIcon />}
                            >
                                {t('admin-page.nav.song-queue')}
                            </Tab>
                        </Link>
                        <Link to="/admin/integrations">
                            <Tab
                                onClick={tabButtonHandler}
                                selected={pathname.includes('/admin/integrations')}
                                icon={<IntegrationsIcons />}
                            >
                                {t('admin-page.nav.integrations')}
                            </Tab>
                        </Link>
                        <h5 className={styles.tabsTitle}>{t('admin-page.nav.setting')}</h5>
                        {!isDesktop && (
                            <Tab
                                onClick={() => {
                                    handleChange(theme === 'dark' ? 'light' : 'dark')
                                    tabButtonHandler()
                                }}
                                icon={
                                    theme === 'dark' ? (
                                        <MoonIcon width="22px" height="22px" />
                                    ) : (
                                        <SunIcon width="22px" height="22px" />
                                    )
                                }
                            >
                                {t('header.change-theme')}
                            </Tab>
                        )}
                        <Modal hide={hide} isShown={isShown}>
                            <ModalHeader hide={hide}>New command</ModalHeader>
                            Какой-то текст
                            <ModalDivider />
                            <ModalFooter>Footer</ModalFooter>
                        </Modal>
                        <Tab
                            onClick={() => {
                                tabButtonHandler()
                                toggle()
                            }}
                            icon={<LanguageIcon />}
                        >
                            {t('admin-page.nav.language')}
                        </Tab>
                        <Link to="/admin/support">
                            <Tab
                                onClick={tabButtonHandler}
                                selected={pathname.includes('/admin/support')}
                                icon={<CustomerSupportIcon />}
                            >
                                {t('admin-page.nav.support')}
                            </Tab>
                        </Link>
                        <Tab onClick={tabButtonHandler} icon={<LogoutIcon />}>
                            {t('admin-page.nav.sign-out')}
                        </Tab>
                    </div>
                </div>
                <div className={styles.navigationCreators}>
                    <CreatedWithLove />
                </div>
            </div>
        </nav>
    )
}
