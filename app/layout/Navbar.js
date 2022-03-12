import { HamburgerIcon, LinkIcon, SettingsIcon } from "@chakra-ui/icons";
import { Avatar, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useContext, useState } from "react";
import { Auth } from '../providers/AuthProvider';

export default function Navbar() {
    const router = useRouter()
    const { user, setToken } = useContext(Auth)

    const [showModal, setShowModal] = useState(false)

    return <Wrap dir="rtl" width="100%" padding="0 10px">
        <WrapItem>
            {
                user.login ? <Avatar
                    cursor="pointer"
                    name={user.fullName}
                    size="sm"
                    onClick={() => setShowModal(true)}
                /> : <Link href="/auth/login">
                    <a>
                        <Button>
                            Đăng nhập
                        </Button>
                    </a>
                </Link>
            }
        </WrapItem>
        <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}>
            <ModalOverlay
                backdropFilter='auto'
                backdropBlur='2px'
            >
                <ModalContent>
                    <ModalHeader>
                        Tài khoản
                    </ModalHeader>
                    <ModalCloseButton onClick={() => setShowModal(false)} />
                    <ModalBody>

                        <Stack>
                            <Link href="/l">
                                <a>
                                    <Button
                                        leftIcon={<LinkIcon />}
                                        isFullWidth>
                                        Link shorter
                                    </Button>
                                </a>
                            </Link>
                            <Button leftIcon={<SettingsIcon />} isFullWidth>
                                Cài đặt
                            </Button>

                            <Link href="/me/posts">
                                <a>
                                    <Button
                                        isFullWidth
                                        leftIcon={<HamburgerIcon />}>
                                        Bài viết của tôi
                                    </Button>
                                </a>
                            </Link>
                        </Stack>

                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="red"
                            onClick={() => {
                                setToken('')
                                router.push('/auth/login')
                                setShowModal(false)
                            }}>
                            Đăng xuất
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    </Wrap>
}