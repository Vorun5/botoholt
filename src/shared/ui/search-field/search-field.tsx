import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import styles from './search-field.module.scss'

interface SearchFieldProps {
    className?: string
    plasholder?: string
    name?: string
    value?: string
    defaultValue?: string
    onChange: (searchString: string) => void
}

export const SearchField = ({ value, onChange, className, plasholder, name, defaultValue }: SearchFieldProps) => {
    const { t } = useTranslation()

    return (
        <div className={styles.search}>
            <input
                className={clsx(className, styles.searchField)}
                type="search"
                name={name ?? 'search'}
                defaultValue={defaultValue}
                value={value}
                placeholder={plasholder ?? t('search')!}
                onChange={(event) => onChange(event.target.value)}
            />
            <span className={styles.searchIcon}>
                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.1552 0.778718C8.05811 0.98124 6.17685 2.06659 4.93425 3.79077C4.60285 4.2506 4.1189 5.20695 3.94614 5.74335C3.68285 6.56094 3.63336 6.90341 3.63154 7.92045C3.62965 8.95674 3.66883 9.243 3.92858 10.0906C4.10955 10.6813 4.53426 11.5512 4.8674 12.0136L5.1143 12.3563L2.67377 14.7948C1.3315 16.136 0.188495 17.3091 0.133774 17.4018C-0.0630817 17.7353 -0.0429033 18.0548 0.195825 18.3845C0.447023 18.7314 0.944237 18.8522 1.31284 18.656C1.41142 18.6035 2.50286 17.5433 3.94298 16.101L6.40458 13.6356L6.55674 13.7561C7.0406 14.1395 7.90654 14.5867 8.58465 14.8034C9.42637 15.0723 9.77252 15.1227 10.7912 15.1246C11.8121 15.1265 12.1963 15.072 13.0105 14.8096C13.5406 14.6388 14.5008 14.1538 14.9489 13.8306C17.3125 12.1256 18.4419 9.24974 17.8406 6.4676C17.3795 4.33378 15.9525 2.48638 14.015 1.51506C12.8446 0.928271 11.4202 0.656555 10.1552 0.778718ZM11.6809 2.65439C13.3735 2.94659 14.8268 4.02203 15.6002 5.55477C16.0225 6.39145 16.1876 7.17731 16.1496 8.1697C16.0959 9.57139 15.5749 10.7648 14.5837 11.7563C13.8299 12.5103 12.8999 13.0091 11.8233 13.2366C11.3236 13.3421 10.2549 13.3409 9.75912 13.2341C8.66725 12.999 7.80978 12.5312 7.01692 11.7381C6.03046 10.7513 5.51159 9.60169 5.43648 8.23649C5.28849 5.54656 7.20021 3.13933 9.86675 2.6578C10.32 2.57593 11.2168 2.57424 11.6809 2.65439Z"
                        fill="#6F6F75"
                    />
                </svg>
            </span>
        </div>
    )
}
