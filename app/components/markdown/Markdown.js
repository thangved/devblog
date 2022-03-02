import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import 'katex/dist/katex.min.css'
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import styles from './Markdown.module.scss'

export default function Markdown({ children, className }) {
    return <ReactMarkdown
        className={styles.wrapper}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
            code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                    <SyntaxHighlighter
                        style={dracula}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
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