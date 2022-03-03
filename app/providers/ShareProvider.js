import { Center, HStack, IconButton, Modal, ModalBody, ModalOverlay } from '@chakra-ui/react';
import { createContext, useState } from 'react';
import { ModalContent } from '@chakra-ui/react';
import { EmailShareButton, FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, LinkedinIcon, LinkedinShareButton, MailruIcon, TwitterShareButton } from 'react-share';
import { SocialIcon } from 'react-social-icons';
import { CopyIcon } from '@chakra-ui/icons';
import { toast } from 'react-hot-toast';

export const Share = createContext({
    openShare: Function,
})

export default function ShareProvider({ children }) {
    const [open, setOpen] = useState(true)
    const [url, setUrl] = useState('')
    const [quote, setQuote] = useState('')

    const openShare = (url, quote) => {
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

                                <FacebookMessengerShareButton url={url}>
                                    <SocialIcon url="" />
                                </FacebookMessengerShareButton>

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

                            </HStack>
                        </Center>
                    </ModalBody>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    </Share.Provider>
}