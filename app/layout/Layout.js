import Header from './Header'
import styles from './Layout.module.scss'
import { ChakraProvider } from '@chakra-ui/react'
import AuthProvider from '../providers/AuthProvider'
import { Toaster } from 'react-hot-toast'
import AlertProvider from '../providers/AlertProvider'

export default function Layout({ children }) {

    return <ChakraProvider>
        <AuthProvider>
            <AlertProvider>
                <div className={styles.wrapper}>
                    <Header />
                    <div className={styles.content}>
                        {children}
                    </div>
                </div>
                <Toaster />
            </AlertProvider>
        </AuthProvider>
    </ChakraProvider>
}
