import clsx from 'clsx'
import { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRightIcon, CircleLeft, CircleRight } from 'shared/assets/icons'
import { Button, ButtonText } from '../button/button'
import { InputField } from '../input-field/input-field'
import styles from './pagination.module.scss'

interface PaginationProps {
    changePage: (page: number) => void
    page: number
    total: number
}

interface PageButtonProps {
    children: ReactNode
    active?: boolean
    onClick?: () => void
}

const PageButton = ({ children, active = false, onClick }: PageButtonProps) => {
    return (
        <Button style={active ? 'fill-blue' : 'default'} className={styles.pageBth} onClick={onClick}>
            <ButtonText>{children?.toString()}</ButtonText>
        </Button>
    )
}

export const Pagination = ({ changePage, page, total }: PaginationProps) => {
    const { t } = useTranslation()
    const end = page > total / 2
    const [goto, setGoto] = useState(page)

    useEffect(() => {
        setGoto(page)
    }, [page])

    return (
        <div className={styles.paginationContainer}>
            <div className={styles.pagination}>
                <button
                    type="button"
                    className={clsx(styles.arrowBth, page <= 1 && styles.arrowBthDisabled)}
                    onClick={() => {
                        if (page <= 1) return
                        changePage(page - 1)
                    }}
                >
                    <CircleLeft width="100%" height="100%" />
                </button>
                <PageButton active={page === 1} onClick={() => changePage(1)}>
                    1
                </PageButton>
                {end && <PageButton>...</PageButton>}
                <PageButton
                    active={!(page === 1 || page === total)}
                    onClick={() => changePage(page === 1 ? 2 : page === total ? total - 1 : page)}
                >
                    {page === 1 ? 2 : page === total ? total - 1 : page}
                </PageButton>
                {!end && <PageButton>...</PageButton>}
                <PageButton active={page === total} onClick={() => changePage(total)}>
                    {total}
                </PageButton>
                <button
                    type="button"
                    className={clsx(styles.arrowBth, page >= total && styles.arrowBthDisabled)}
                    onClick={() => {
                        if (page >= total) return
                        changePage(page + 1)
                    }}
                >
                    <CircleRight width="100%" height="100%" />
                </button>
            </div>
            <div className={styles.goto}>
                <span className={styles.gotoLabel}>{t('go-to')}:</span>
                <InputField
                    type="number"
                    className={styles.gotoInput}
                    icon={<ArrowRightIcon />}
                    value={goto.toString()}
                    onChange={(e) => {
                        if (e.target.value) {
                            setGoto(Number.parseInt(e.target.value))
                            return
                        }
                        setGoto(0)
                    }}
                    onSubmit={() => {
                        if (page === goto) return
                        if (goto >= total) {
                            changePage(total)
                            return
                        }
                        if (goto <= 1) {
                            changePage(1)
                            return
                        }
                        changePage(goto)
                    }}
                />
            </div>
        </div>
    )
}
