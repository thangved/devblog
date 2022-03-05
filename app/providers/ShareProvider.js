import { AddIcon, CopyIcon } from '@chakra-ui/icons';
import { Center, HStack, IconButton, Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { createContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import { SocialIcon } from 'react-social-icons';

export const Share = createContext({
    openShare: Function,
})

export default function ShareProvider({ children }) {
    const [open, setOpen] = useState(false)
    const [url, setUrl] = useState('')
    const [quote, setQuote] = useState('')

    const openShare = (url, quote) => {
        console.log(url)
        setUrl(url || document.URL)
        setOpen(true)
        setQuote(quote)
    }

    return <Share.Provider
        value={{ openShare }}>
        {children}
        <Modal
            isCentered
            isOpen={open}
            onClose={() => setOpen(false)}
        >
            <ModalOverlay
                backdropFilter='auto'
                backdropBlur='2px'
            >
                <ModalContent>
                    <ModalBody>
                        <Center>
                            <HStack pt="4" pb="4">

                                <FacebookShareButton
                                    url={url}
                                    hashtag="#devBlog"
                                    quote={quote}
                                >
                                    <SocialIcon url="https://facebook.com" />
                                </FacebookShareButton>

                                <TwitterShareButton
                                    url={url}
                                    hashtags={['devBlog']}
                                >
                                    <SocialIcon url="https://twitter.com" />
                                </TwitterShareButton>

                                <LinkedinShareButton url={url}>
                                    <SocialIcon url="https://linkedin.com" />
                                </LinkedinShareButton>


                                <IconButton
                                    size="lg"
                                    borderRadius="full"
                                    onClick={() => {
                                        navigator.clipboard.writeText(url)
                                            .then(() => toast.success('Đã sao chép liên kết vào bộ nhớ tạm'))
                                            .catch(error => toast.error(error.toString()))
                                    }}
                                >
                                    <CopyIcon />
                                </IconButton>

                                <IconButton
                                    borderRadius="full"
                                    size="lg"
                                    onClick={async () => {
                                        try {
                                            const value = navigator.share({
                                                title: quote,
                                                url,
                                                text: quote,
                                            })
                                            toast.success(value.toString())
                                        }
                                        catch (error) {
                                            toast.error(error.toString())
                                        }
                                    }}>
                                    <AddIcon />
                                </IconButton>

                            </HStack>
                        </Center>
                    </ModalBody>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    </Share.Provider>
}