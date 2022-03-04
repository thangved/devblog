import { CopyIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import { toast } from 'react-hot-toast';

export default function CopyWrapper({ children, text, successMessage }) {
    return <Box position="relative">
        {children}
        <IconButton
            position="absolute"
            top="2"
            right="2"
            onClick={() => {
                navigator.clipboard.writeText(String(text))
                    .then(() => {
                        toast.success(successMessage)
                    })
                    .catch(error => toast.error(error.toString()))
            }}
        >
            <CopyIcon />
        </IconButton>
    </Box>
}