'use client';

import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-x-black dark:text-white mt-6 mb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold text-x-black dark:text-white mt-5 mb-3">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-bold text-x-black dark:text-white mt-4 mb-2">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-[15px] text-x-black dark:text-white leading-relaxed mb-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 text-x-black dark:text-white">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 text-x-black dark:text-white">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-[15px] text-x-black dark:text-white mb-1">
              {children}
            </li>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            
            return isInline ? (
              <code
                className="px-1.5 py-0.5 bg-x-hover dark:bg-[#181818] rounded text-sm text-x-blue"
                {...props}
              >
                {children}
              </code>
            ) : (
              <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-lg overflow-x-auto my-4 text-sm">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-x-blue hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-x-blue pl-4 my-4 text-x-gray italic">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
