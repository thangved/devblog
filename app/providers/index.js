import { ChakraProvider } from "@chakra-ui/react";
import AlertProvider from "./AlertProvider";
import AuthProvider from "./AuthProvider";
import LocationProvider from "./LocationProvider";
import ShareProvider from "./ShareProvider";

export default function Providers({ children }) {
    return <ChakraProvider>
        <AuthProvider>
            <AlertProvider>
                <ShareProvider>
                    <LocationProvider>
                        {children}
                    </LocationProvider>
                </ShareProvider>
            </AlertProvider>
        </AuthProvider>
    </ChakraProvider>
}