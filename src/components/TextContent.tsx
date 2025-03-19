import React from 'react';
import ReactMarkdown from 'react-markdown';

interface TextContentProps {
  content: string;
  isMarkdown?: boolean;
}

const TextContent: React.FC<TextContentProps> = ({ content, isMarkdown = true }) => {
  // Unescape newlines if they're escaped
  const processedContent = content.replace(/\\n/g, '\n');

  if (isMarkdown) {
    return (
      <div className="prose prose-indigo max-w-none">
        <ReactMarkdown 
          components={{
            h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-4" aria-hidden="true" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-bold mb-3" aria-hidden="true" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-xl font-bold mb-2" aria-hidden="true" {...props} />,
            p: ({node, ...props}) => <p className="mb-4" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
            li: ({node, ...props}) => <li className="mb-1" {...props} />,
            strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
            em: ({node, ...props}) => <em className="italic" {...props} />,
            code: ({node, ...props}) => (
              <code className="bg-gray-100 rounded px-1 py-0.5" {...props} />
            ),
            pre: ({node, ...props}) => (
              <pre className="bg-gray-100 rounded p-4 mb-4 overflow-x-auto" {...props} />
            ),
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-4" {...props} />
            ),
            a: ({node, children, ...props}) => (
              <a 
                className="text-indigo-600 hover:text-indigo-800 underline" 
                {...props}
                aria-label={typeof children === 'string' ? children : 'Link'}
              />
            ),
            img: ({node, alt = '', ...props}) => (
              <img 
                className="rounded-lg my-4 max-w-full h-auto" 
                alt={alt} 
                {...props} 
              />
            ),
          }}
        >
          {processedContent}
        </ReactMarkdown>
      </div>
    );
  }

  return (
    <div 
      className="prose prose-indigo max-w-none"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};

export default TextContent; 