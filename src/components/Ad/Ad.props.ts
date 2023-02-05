export type AdStyle = 'primary' | 'secondary'

export interface AdProps {
    adStyle: AdStyle
    icon: string
    text: string
    bthText: string
    bthIcon: string
    bthOnClick: () => void
}
