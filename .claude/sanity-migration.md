# Sanity CMS Migration & Troubleshooting

## Content Migration Tools

### Available Scripts
- **`scripts/migrate-mdx-to-sanity.js`** - Converts MDX files to Sanity documents with proper content structure
- **`scripts/fix-content-formatting.js`** - Fixes bold text formatting in migrated content  
- **`scripts/fix-list-structure.js`** - Converts bullet point text to proper Sanity list structures
- **`scripts/test-migration.js`** - Tests and validates migrated content structure

### Migration Process
1. **Parse MDX** - Extract title, headers, paragraphs, lists, and metadata
2. **Convert to Portable Text** - Transform markdown to Sanity's rich text format
3. **Fix Formatting** - Ensure bold text uses proper marks instead of raw `**` syntax
4. **Structure Lists** - Convert bullet point text to proper list/listItem blocks
5. **Validate Content** - Test rendering consistency between Studio and frontend

### Usage Example
```bash
# Migrate MDX content to Sanity
node scripts/migrate-mdx-to-sanity.js

# Fix content formatting issues
node scripts/fix-content-formatting.js

# Convert text lists to proper structures  
node scripts/fix-list-structure.js

# Test the migration results
node scripts/test-migration.js
```

## Migration Script Details

### MDX to Sanity Migration
The main migration script handles:
- **Content Parsing**: Extracts markdown elements (headers, paragraphs, lists, bold text)
- **Portable Text Conversion**: Creates proper Sanity block structures
- **Metadata Extraction**: Pulls learning objectives and key terms
- **Course/Lesson Creation**: Creates full document structures in Sanity
- **Relationship Management**: Links lessons to courses and instructors

### Content Structure Fixes
Post-migration scripts address common issues:
- **Bold Text**: Converts `**text**` to proper `marks: ['strong']`
- **List Structure**: Transforms bullet point text to `listItem: 'bullet'` blocks
- **Content Validation**: Ensures rendering consistency between Studio and frontend

## Troubleshooting

### Common Issues

#### Array Key Errors
**Problem**: Sanity requires `_key` properties for array items
**Solution**: 
- Always include `_key` properties when creating array items via API
- Use `randomUUID().replace(/-/g, '').substring(0, 12)` for generating keys

#### Routing Issues
**Problem**: Content not displaying on frontend routes
**Solution**:
- Ensure all lesson pages use AppLayout for proper scrolling
- Check slug consistency between Sanity and Next.js routes
- Verify course-lesson relationships in Sanity

#### Content Not Displaying
**Problem**: Content exists in Sanity but doesn't show on frontend
**Solution**:
- Check if content is marked as `isPublished: true`
- Verify references between courses, lessons, and instructors
- Ensure proper GROQ query structure

#### Studio Structure Issues
**Problem**: Custom Studio structure not working correctly
**Solution**:
- Use `S.documentList()` instead of `S.documentTypeList()` for filtered content views
- Check custom structure syntax and remove invalid icon references
- Ensure all documentTypeList calls have proper parameters
- Verify that schema types exist before referencing in structure

#### SEO Implementation
**Problem**: SEO metadata not appearing correctly
**Solution**:
- Always populate SEO fields for better search visibility
- Use 50-60 characters for meta titles and 150-160 for descriptions
- Include relevant focus keywords (3-5 maximum)
- Set appropriate schema.org types for structured data
- Add Open Graph images for social media sharing

#### Performance Issues
**Problem**: Slow content loading or queries
**Solution**:
- Use parallel queries with `Promise.all()` for multiple data fetches
- Implement proper error handling in fetch functions
- Consider caching for frequently accessed content

### Content Rendering Issues

#### Lists Not Displaying Properly
**Problem**: Bullet points showing as inline text instead of proper lists
**Root Cause**: Content migrated as text blocks instead of proper list structures
**Solution**: Run `scripts/fix-list-structure.js` to convert to proper Sanity lists

#### Bold Text Not Rendering
**Problem**: Seeing `**text**` instead of bold formatting
**Root Cause**: Markdown syntax not converted to Sanity marks
**Solution**: Run `scripts/fix-content-formatting.js` to fix mark structures

#### Frontend vs Studio Differences
**Problem**: Content looks different in Studio vs frontend
**Root Cause**: Custom Portable Text components not handling all content types
**Solution**: 
- Check Portable Text component configuration
- Ensure all content types have corresponding renderers
- Test with standard Portable Text components first

### Environment Setup Issues

#### Sanity Client Connection
**Problem**: Cannot connect to Sanity
**Solution**:
- Verify environment variables in `.env.local`
- Check project ID and dataset name
- Ensure API token has correct permissions

#### Schema Changes Not Appearing
**Problem**: Schema updates not visible in Studio
**Solution**:
- Restart development server after schema changes
- Clear browser cache and reload Studio
- Check for TypeScript errors in schema files

#### GROQ Query Errors
**Problem**: GROQ queries returning unexpected results
**Solution**:
- Use Sanity Vision tab in Studio for testing queries
- Check field names and reference syntax
- Validate query structure with Sanity documentation

## Migration Best Practices

### Pre-Migration Checklist
- [ ] Backup existing content
- [ ] Test migration scripts on sample data
- [ ] Verify environment configuration
- [ ] Check schema compatibility

### During Migration
- [ ] Run migrations in correct order
- [ ] Validate each step before proceeding
- [ ] Monitor for errors and warnings
- [ ] Test content rendering after each script

### Post-Migration Validation
- [ ] Verify all content migrated correctly
- [ ] Test frontend rendering matches expectations
- [ ] Check content relationships and links
- [ ] Validate SEO metadata and structured data
- [ ] Test navigation flows between content

### Rollback Strategy
- Keep original content files as backup
- Document all migration steps for potential reversal
- Test rollback procedures before production migration
- Have database backup and restore procedures ready