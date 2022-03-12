import { Box, Button, Heading, Image, Input, InputGroup, InputLeftAddon, Skeleton, Stack, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import constants from '../../config/constants';
import { Auth } from '../../providers/AuthProvider';

const CreateLink = ({ setMyLinks }) => {
    const { token } = useContext(Auth)

    const [url, setUrl] = useState('')
    const [preview, setPreview] = useState({
        title: '',
        img: '',
        description: '',
        show: false,
    })

    const onSubmit = async () => {
        try {
            const res = await axios.post(`${constants.api}/url/create`, {
                url,
                ...preview,
                token,
            })
            if (!res.data.success)
                return toast.error(data.message)
            toast.success('Created!')
            setMyLinks(prev => [...prev, res.data.data])
        }
        catch (error) {
            toast.error(error.toString())
        }
    }

    const getPreview = async (url) => {
        try {
            const data = (await axios.get(
                `${constants.api}/url/info?url=${url}`
            )).data

            if (!data.success)
                return toast.error(data.message)

            setPreview({
                ...data.data,
                show: true
            })
        }
        catch (error) {
            toast.error(error.toString())
        }
    }

    return (
        <VStack pt="2" pb="2">
            <InputGroup>
                <InputLeftAddon>
                    https://
                </InputLeftAddon>
                <Input
                    placeholder="Nhập link cần rút gọn"
                    onChange={event => {
                        setUrl(event.target.value)
                        clearTimeout(setTimeout(() => getPreview(event.target.value), 2000) - 1)
                    }} />
            </InputGroup>
            {
                preview.show ? <Box
                    width="100%"
                    border="1px solid #ddd">
                    {
                        preview.img && <Image
                            width="100%"
                            src={preview.img}
                            alt={preview.title}
                            onError={() => setPreview(prev => ({ ...prev, img: null }))}
                        />
                    }
                    <Box p="2" backgroundColor="gray.100">
                        <Heading size="sm">
                            {preview.title || preview.description}
                        </Heading>
                        <Text>
                            {preview.description || preview.title}
                        </Text>
                    </Box>
                </Box> : <Stack width="100%">
                    <Skeleton height="150px" width="100%" />
                    <Skeleton height="50px" width="100%" />
                </Stack>
            }
            <Button
                colorScheme="blue"
                isFullWidth
                onClick={onSubmit}
            >
                Tạo
            </Button>
        </VStack>
    )
}

export default CreateLink