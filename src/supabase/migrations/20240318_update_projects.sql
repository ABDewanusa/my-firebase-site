-- Drop existing columns that are no longer needed
ALTER TABLE projects DROP COLUMN demo_component;
ALTER TABLE projects DROP COLUMN about_content;

-- Add new columns for content type and content
ALTER TABLE projects ADD COLUMN content_type TEXT NOT NULL DEFAULT 'demo';
ALTER TABLE projects ADD COLUMN content JSONB;

-- Add check constraint for content_type
ALTER TABLE projects ADD CONSTRAINT valid_content_type 
  CHECK (content_type IN ('demo', 'text', 'youtube'));

-- Update existing records to use the new structure
UPDATE projects 
SET content_type = 'demo',
    content = jsonb_build_object(
      'demoComponent', demo_component,
      'aboutContent', about_content,
      'isMarkdown', false
    )
WHERE content IS NULL;

-- Add comment to explain content structure
COMMENT ON COLUMN projects.content IS 'JSONB object containing content based on content_type:
- For "demo": { "demoComponent": string, "aboutContent": string, "isMarkdown": boolean }
- For "text": { "text": string, "isMarkdown": boolean }
- For "youtube": { "videoId": string, "videoTitle": string }'; 