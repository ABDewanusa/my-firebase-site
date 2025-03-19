-- Function to convert HTML to Markdown
CREATE OR REPLACE FUNCTION html_to_markdown(html_content TEXT)
RETURNS TEXT AS $$
BEGIN
  -- Basic HTML to Markdown conversion
  RETURN html_content
    -- Headers
    .replace('<h1>', '# ')
    .replace('</h1>', '\n\n')
    .replace('<h2>', '## ')
    .replace('</h2>', '\n\n')
    .replace('<h3>', '### ')
    .replace('</h3>', '\n\n')
    -- Lists
    .replace('<ul>', '')
    .replace('</ul>', '')
    .replace('<li>', '- ')
    .replace('</li>', '\n')
    -- Paragraphs
    .replace('<p>', '')
    .replace('</p>', '\n\n')
    -- Bold
    .replace('<strong>', '**')
    .replace('</strong>', '**')
    -- Italic
    .replace('<em>', '*')
    .replace('</em>', '*')
    -- Links
    .replace('<a href="', '[')
    .replace('">', '](')
    .replace('</a>', ')')
    -- Clean up extra whitespace
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
END;
$$ LANGUAGE plpgsql;

-- Update existing demo content to use markdown
UPDATE projects
SET content = jsonb_set(
  jsonb_set(
    content,
    '{aboutContent}',
    to_jsonb(html_to_markdown(content->>'aboutContent'))
  ),
  '{isMarkdown}',
  to_jsonb(true)
)
WHERE content_type = 'demo' 
AND content->>'isMarkdown' IS NULL 
OR content->>'isMarkdown' = 'false';

-- Drop the temporary function
DROP FUNCTION html_to_markdown(TEXT); 