import clsx from 'clsx'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as ApprovalIcon } from 'shared/assets/icons/approval.svg'
import { ReactComponent as CommandsIcons } from 'shared/assets/icons/commands.svg'
import { ReactComponent as CustomerSupportIcon } from 'shared/assets/icons/customer-support.svg'
import { ReactComponent as DashboardIcon } from 'shared/assets/icons/dashboard.svg'
import { ReactComponent as IntegrationsIcons } from 'shared/assets/icons/Integrations.svg'
import { ReactComponent as LanguageIcon } from 'shared/assets/icons/language.svg'
import { ReactComponent as LogoIcon } from 'shared/assets/icons/logo.svg'
import { ReactComponent as LogoutIcon } from 'shared/assets/icons/logout.svg'
import { ReactComponent as SongQueueIcon } from 'shared/assets/icons/song-queue.svg'
import { Avatar, Button, ButtonIcon, ButtonText, CreatedWithLove } from 'shared/ui'
import styles from './navigation-bar.module.scss'

interface TabProps {
    onClick?: () => void
    children: string
    icon: ReactNode
}

const Tab = ({ onClick, children, icon }: TabProps) => {
    return (
        <Button style='transparent' width='100%' height='58px' alignment="left" onClick={onClick}>
            <ButtonIcon>{icon}</ButtonIcon>
            <ButtonText>{children}</ButtonText>
        </Button>
    )
}

// TODO: tabulation
export const NavigationBar = () => {
    const { t } = useTranslation()
    const approval = true

    return (
        <nav className={styles.navigation}>
            <div className={styles.navigationLogo}>
                <LogoIcon />
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
                <Tab icon={<DashboardIcon />}>{t('admin-page.nav.dashboard')}</Tab>
                <Tab icon={<CommandsIcons />}>{t('admin-page.nav.commands')}</Tab>
                <Tab icon={<SongQueueIcon />}>{t('admin-page.nav.song-queue')}</Tab>
                <Tab icon={<IntegrationsIcons />}>{t('admin-page.nav.integrations')}</Tab>
                <h5 className={styles.tabsTitle}>{t('admin-page.nav.setting')}</h5>
                <Tab icon={<LanguageIcon />}>{t('admin-page.nav.language')}</Tab>
                <Tab icon={<CustomerSupportIcon />}>{t('admin-page.nav.support')}</Tab>
                <Tab icon={<LogoutIcon />}>{t('admin-page.nav.sign-out')}</Tab>
            </div>

            <div className={styles.navigationCreators}>
                <CreatedWithLove />
            </div>
        </nav>
    )
}
