import { Button, FormControl, FormLabel, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Textarea } from "@chakra-ui/react";
import { TagsInput } from "react-tag-input-component";
import { useState } from 'react';
import Markdown from "../../markdown/Markdown";
import { useContext } from 'react';
import { Auth } from '../../../providers/AuthProvider';
import axios from "axios";
import constants from '../../../config/constants';
import { toast } from 'react-hot-toast';
import { useFormik } from "formik";

export default function PostCreate({ update, post, onCreate = Function, onCancel = Function }) {
    const { token } = useContext(Auth)
    const [topics, setTopics] = useState(post?.topics || [])

    const formik = useFormik({
        initialValues: {
            title: post?.title,
            content: post?.content,
        },
        onSubmit: async (values) => {
            const method = update ? 'update' : 'create'
            const message = `Đã ${update ? 'lưu' : 'tạo'} bài viết`
            try {
                const data = (await axios.post(`${constants.api}/post/${method}`, {
                    ...values,
                    token,
                    topics,
                    postId: post?._id,
                })).data

                if (!data.success)
                    return toast.error(data.message)

                toast.success(message)
                onCreate(data.data)
            }
            catch (error) {
                toast.error(error.toString())
            }
        }
    })

    return <Tabs>
        <TabList>
            <Tab>
                Chỉnh sửa
            </Tab>
            <Tab>
                Xem trước
            </Tab>
        </TabList>

        <TabPanels>
            <TabPanel>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel htmlFor="title">
                            Tiêu đề
                        </FormLabel>
                        <Input
                            value={formik.values.title}
                            name="title"
                            id="title"
                            placeholder="Nhập tiêu đề"
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="content">
                            Nội dung
                        </FormLabel>
                        <Textarea
                            value={formik.values.content}
                            name="content"
                            id="content"
                            placeholder="Viết gì đó..."
                            height="xs"
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            Chủ đề
                        </FormLabel>
                        <TagsInput
                            value={topics}
                            placeHolder="Thêm chủ đề"
                            onChange={setTopics}
                        />
                    </FormControl>
                </form>
            </TabPanel>
            <TabPanel
                maxHeight="700"
                overflow="auto"
                marginBottom="2"
                borderBottom="1px solid #ddd"
            >
                <Markdown>
                    {formik.values.content}
                </Markdown>
            </TabPanel>
        </TabPanels>

        <Button
            ml="4"
            mr="4"
            mb="4"
            colorScheme="blue"
            type="submit"
            onClick={formik.handleSubmit}
        >
            {
                update ? 'Lưu' : 'Tạo'
            }
        </Button>

        <Button
            mr="4"
            mb="4"
            onClick={onCancel}
        >
            Hủy
        </Button>


    </Tabs>
}