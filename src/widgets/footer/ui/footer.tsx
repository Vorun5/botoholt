import { EasterEgg } from 'features/easter-egg';
import { CreatedWithLove, PageFooter } from 'shared/ui';
import styles from './footer.module.scss';

export const Footer = ({ short = false }: { short?: boolean }) => {
    console.log('footer rander');
    
    return (
        <PageFooter className={styles.footer}>
            {!short && (
                <div className={styles.footerCreators}>
                    <CreatedWithLove />
                </div>
            )}
            <EasterEgg />
        </PageFooter>
    )
}
