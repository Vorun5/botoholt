import { ReactNode, useRef, useState } from 'react'
import { useTheme } from 'features'
import D from 'shared/assets/emotes/D.png'
import {
    ApprovalIcon,
    CloseIcon,
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
    SunIcon,
} from 'shared/assets/icons'
import { useMediaQuery, useModal, useOnClickOutside } from 'shared/lib/hooks'
import { MODE } from 'shared/mode'
import { AdminAuth } from 'shared/types'
import { Avatar, Button, ButtonIcon, ButtonText, CreatedWithLove, Dropdown, Modal } from 'shared/ui'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

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

const ChangeLanguage = ({ hideNavigation }: { hideNavigation: () => void }) => {
    const { t, i18n } = useTranslation()
    const [langModalIsShown, setLangModalIsShown] = useModal()
    const hideLangModal = () => {
        if (langModalIsShown) setLangModalIsShown()
    }

    const languages = ['Русский', 'English']

    const getLangByCode = (code: string) => {
        switch (code) {
            case 'ru':
                return 'Русский'
            case 'en':
                return 'English'
            default:
                return 'English'
        }
    }

    const getCodeByLang = (lang: string) => {
        switch (lang) {
            case 'Русский':
                return 'ru'
            case 'English':
                return 'en'
            default:
                return 'en'
        }
    }

    return (
        <>
            <Modal
                className={styles.changeLang}
                hideScroll
                expandedWidth
                hide={hideLangModal}
                isShown={langModalIsShown}
                footerDivider
                headerDivider
                title={t('admin-page.languages.title') ?? ''}
            >
                <div className={styles.changeLangTitle}>
                    <LanguageIcon />
                    <span>{t('admin-page.languages.site')}</span>
                </div>
                <Dropdown
                    label={t('admin-page.languages.site-label') ?? ''}
                    selectedItem={getLangByCode(i18n.language)}
                    items={languages}
                    onSelect={(lang) => i18n.changeLanguage(getCodeByLang(lang))}
                />
            </Modal>
            <Tab
                onClick={() => {
                    hideNavigation()
                    setLangModalIsShown()
                }}
                icon={<LanguageIcon />}
            >
                {t('admin-page.nav.language')}
            </Tab>
        </>
    )
}

const SignOut = ({ hideNavigation }: { hideNavigation: () => void }) => {
    const { t } = useTranslation()
    const [singOutModalIsShown, setSingOutModalIsShown] = useModal()
    const hideSingOutModal = () => {
        if (singOutModalIsShown) setSingOutModalIsShown()
    }

    return (
        <>
            <Modal
                className={styles.changeLang}
                hideScroll
                expandedWidth
                hide={hideSingOutModal}
                isShown={singOutModalIsShown}
                footerDivider
                headerDivider
                title={t('admin-page.nav.sign-out') ?? 'Sing Out'}
                footerContent={
                    <div className={styles.singOutFooter}>
                        <Button
                            style="red"
                            border
                            padding="big"
                            onClick={() => {
                                hideNavigation()
                                window.location.href = `https://${MODE}bho.lt/api/v1/admin/auth/logout`
                            }}
                        >
                            <ButtonText>{t('yes')}</ButtonText>
                        </Button>
                        <Button border onClick={() => setSingOutModalIsShown()}>
                            <ButtonText>{t('no')}</ButtonText>
                        </Button>
                    </div>
                }
            >
                <div className={styles.singOut}>
                    <img src={D} alt="" width={112} height={112} className={styles.singOutEmote} />
                    <span className={styles.singOutText}>{t('admin-page.sing-out')}</span>
                </div>
            </Modal>
            <Tab
                onClick={() => {
                    hideNavigation()
                    setSingOutModalIsShown()
                }}
                icon={<LogoutIcon />}
            >
                {t('admin-page.nav.sign-out')}
            </Tab>
        </>
    )
}

export const NavigationBar = ({ authData }: { authData: AdminAuth }) => {
    const { t } = useTranslation()
    const approval = authData.type === 'partner'
    const pathname = useLocation().pathname

    const isDesktop = useMediaQuery('(min-width: 1100px)')
    const [isOpen, setIsOpen] = useState(false)
    const navRef = useRef(null)
    useOnClickOutside(navRef, () => {
        if (isDesktop || !isOpen) return
        setIsOpen(false)
    })
    const navButtonHandler = () => setIsOpen(!isOpen)
    const hideNavigation = () => {
        if (!isDesktop && isOpen) {
            setIsOpen(false)
        }
    }

    const [theme, toggleTheme] = useTheme()

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
                        <Avatar size="44px" isOnline image={authData.image} alt={authData.name} />
                        <span className={styles.userName}>{authData.name}</span>
                        {approval && <ApprovalIcon className={styles.userApproval} />}
                    </div>

                    <div className={clsx(styles.navigationTabs, styles.tabs)}>
                        <h5 className={styles.tabsTitle}>{t('admin-page.nav.menu')}</h5>
                        <Link to="/admin">
                            <Tab
                                onClick={hideNavigation}
                                selected={pathname === '/admin' || pathname === '/admin/'}
                                icon={<DashboardIcon />}
                            >
                                {t('admin-page.nav.dashboard')}
                            </Tab>
                        </Link>
                        <Link to="/admin/commands">
                            <Tab
                                onClick={hideNavigation}
                                selected={pathname.includes('/admin/commands')}
                                icon={<CommandsIcons />}
                            >
                                {t('admin-page.nav.commands')}
                            </Tab>
                        </Link>
                        {authData.services.da_api && (
                            <Link to="/admin/songs">
                                <Tab
                                    onClick={hideNavigation}
                                    selected={pathname.includes('/admin/songs')}
                                    icon={<SongQueueIcon />}
                                >
                                    {t('admin-page.nav.song-queue')}
                                </Tab>
                            </Link>
                        )}
                        <Link to="/admin/integrations">
                            <Tab
                                onClick={hideNavigation}
                                selected={pathname.includes('/admin/integrations')}
                                icon={<IntegrationsIcons />}
                            >
                                {t('admin-page.nav.integrations')}
                            </Tab>
                        </Link>
                        <h5 className={styles.tabsTitle}>{t('admin-page.nav.setting')}</h5>
                        {!isDesktop && (
                            <Tab
                                onClick={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')}
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
                        <ChangeLanguage hideNavigation={hideNavigation} />
                        <Link to="/admin/support">
                            <Tab
                                onClick={hideNavigation}
                                selected={pathname.includes('/admin/support')}
                                icon={<CustomerSupportIcon />}
                            >
                                {t('admin-page.nav.support')}
                            </Tab>
                        </Link>
                        <SignOut hideNavigation={hideNavigation} />
                    </div>
                </div>
                <div className={styles.navigationCreators}>
                    <CreatedWithLove />
                </div>
            </div>
        </nav>
    )
}
