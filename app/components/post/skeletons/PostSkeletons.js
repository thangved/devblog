import { Box, Divider, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

function Post() {
    return <Box
        padding='6'
        boxShadow='lg'
        bg='white'
        borderRadius="10px">
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' />
    </Box>
}

export default function PostSkeletons() {
    return <Box>
        <Post />
        <Divider />
        <Post />
        <Divider />
        <Post />
    </Box>
}