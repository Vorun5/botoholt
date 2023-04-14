import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Copy } from 'shared/assets/icons/copy.svg'
import { useCopyToClipboard } from 'shared/lib/hooks'
import { useToast } from 'shared/lib/hooks/use-toast'
import styles from './copied-text.module.scss'

export const CopiedText = ({ children }: { children: string }) => {
    const { t } = useTranslation()
    const [value, copy] = useCopyToClipboard()
    const toastTools = useToast()

    const copyHandler = useCallback(async () => {
        const success = await copy(children)
        if (toastTools) {
            toastTools.addToast(
                {
                    text: t(success ? 'copied-to-clipboard' : 'failed-to-copy') ?? '',
                },
                { position: 'top-right' },
            )
        }
    }, [copy, toastTools])

    return (
        <button type="button" className={styles.copiedTextWrapper} onClick={() => copyHandler()}>
            <span className={styles.copiedText}>
                {children}
                <Copy className={styles.copiedTextIcon} />
            </span>
        </button>
    )
}
