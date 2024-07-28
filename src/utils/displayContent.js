import DOMPurify from 'dompurify';

export const displayContent = function ({ content }) {
    return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />;
}

