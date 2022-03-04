import 'katex/dist/katex.min.css';
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import remarkLint from "remark-lint";
import remarkMath from "remark-math";
import CopyWrapper from '../copy/CopyWrapper';
import styles from './Markdown.module.scss';

export default function Markdown({ children }) {
    return <ReactMarkdown
        className={styles.wrapper}
        remarkPlugins={[remarkGfm, remarkMath, remarkLint, remarkHtml]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
            code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                    <CopyWrapper
                        text={String(children)}
                        successMessage="Đã sao chép code vào bảng nhớ tạm"
                    >
                        <SyntaxHighlighter
                            style={dracula}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        >
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    </CopyWrapper>

                ) : (
                    <code className={className} {...props}>
                        {children}
                    </code>
                )
            }
        }}
    >
        {children}
    </ReactMarkdown>
}