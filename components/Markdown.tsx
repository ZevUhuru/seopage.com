import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Article bodies from Compose. Rendered server-side so the whole body is in the
 * HTML — this is the text that ranks and the text an assistant quotes, so none
 * of it may depend on client JS.
 *
 * Headings render as real h2/h3 rather than styled divs, for the same reason.
 */
export function Markdown({ content }: { content: string }) {
  return (
    <div className="prose-page">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="display mt-12 text-balance text-[1.6rem] leading-[1.15] text-ink sm:text-[1.9rem]">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h2 className="display mt-12 text-balance text-[1.5rem] leading-[1.18] text-ink sm:text-[1.8rem]">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-9 text-[1.12rem] font-semibold text-ink">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mt-5 max-w-[64ch] text-[1.05rem] leading-[1.7] text-ink-2">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="mt-5 max-w-[64ch] space-y-2.5">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-5 max-w-[64ch] list-decimal space-y-2.5 pl-5">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-[1.02rem] leading-[1.65] text-ink-2 marker:text-line-strong">
              {children}
            </li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-accent underline underline-offset-4 hover:text-accent-strong"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-ink">{children}</strong>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mt-7 border-l-2 border-accent pl-5 text-[1.05rem] leading-[1.65] text-ink-2">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="mono rounded bg-surface-3 px-1.5 py-0.5 text-[0.88em] text-ink">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="mono mt-6 overflow-x-auto rounded-lg border border-line bg-surface-2 p-4 text-[0.85rem] leading-relaxed text-ink-2">
              {children}
            </pre>
          ),
          hr: () => <hr className="mt-10 border-line" />,
          table: ({ children }) => (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-[0.95rem]">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-line-strong px-3 py-2 text-left font-semibold text-ink">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-line px-3 py-2 align-top text-ink-2">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
