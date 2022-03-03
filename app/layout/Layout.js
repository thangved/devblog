import Providers from '../providers/index'
import Header from './Header'
import styles from './Layout.module.scss'

export default function Layout({ children }) {

    return <Providers>
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.content}>
                {children}
            </div>
        </div>
    </Providers>
}
