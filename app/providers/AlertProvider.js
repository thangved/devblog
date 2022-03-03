import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { createContext, useState } from "react";

export const Alert = createContext({
    open: Function
})

export default function AlertProvider({ children }) {
    const [data, setData] = useState({
        message: '',
        okText: '',
        cancelText: '',
        title: '',
        onOk: Function,
        open: false,
    })

    const open = (data) => {
        setData({
            ...data,
            open: true,
        })
    }
    return <Alert.Provider value={{ open }}>
        {children}
        <AlertDialog isOpen={data.open} onClose={() => {
            setData(prev => ({
                ...prev,
                open: false,
            }))
        }}>
            <AlertDialogOverlay
                backdropFilter='auto'
                backdropBlur='2px'
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        {data.title}
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        {data.message}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button
                            colorScheme="red"
                            onClick={() => {
                                data.onOk()
                                setData(prev => ({
                                    ...prev,
                                    open: false,
                                }))
                            }}
                        >
                            {data.okText}
                        </Button>
                        <Button ml={3} onClick={() => setData(prev => ({
                            ...prev,
                            open: false,
                        }))}>
                            {data.cancelText}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    </Alert.Provider>
}
