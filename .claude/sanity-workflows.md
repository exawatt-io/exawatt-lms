# Sanity CMS Content Workflows

## Content Management Workflows

### Course Creation Process
1. Create/assign **Category** and **Instructor**
2. Create **Course** with metadata and learning objectives
3. Create **Lessons** in sequential order
4. Link relevant **Simulations** to lessons
5. Set prerequisites and publish

### Content Review Process
1. Content created in `draft` status
2. Review content, metadata, and relationships
3. Verify prerequisites and learning paths
4. Update to `published` status
5. Monitor enrollment and ratings

### Simulation Configuration
1. Create simulation with basic metadata
2. Configure `defaultParameters` JSON for initial state
3. Create multiple `scenarios` for different learning objectives
4. Test simulation functionality
5. Link to relevant lessons and courses

## Best Practices

### Content Creation
- Use consistent terminology across all content
- Ensure learning objectives are specific and measurable
- Create realistic prerequisites that match skill progression
- Include rich media (images, diagrams) for complex concepts

### Technical Considerations
- Always include `_key` properties for array items when using API
- Use references instead of duplicate content
- Optimize images for web delivery
- Validate JSON in simulation parameters

### Content Maintenance
- Regular review of course ratings and feedback
- Update content based on industry changes
- Maintain consistent difficulty progression
- Archive outdated content rather than deleting

## Studio Configuration

### Studio Access
- Studio available at `/studio` route
- Environment variables in `.env.local`

### Document Structure
Custom document structure in `/src/sanity/structure.ts` with organized navigation:
- **📚 Learning Content** - Courses, lessons, simulations with smart grouping
- **🎓 Course Management** - Status-based views (published/draft/featured)
- **👥 People** - Instructor management with activity filtering
- **🏷️ Organization** - Categories with content relationship views
- **📊 Content Overview** - Recent updates and analytics
- **➕ Quick Create** - Fast content creation shortcuts

### Field Organization
- Field grouping with tabs (Content, Details, Configuration, SEO)
- Grouped navigation for better content management
- Smart filtering and status-based views

## Content Guidelines

### Writing Standards
- **Course Titles**: Clear, descriptive, professional
- **Descriptions**: Concise but informative (under 200 characters for listings)
- **Learning Objectives**: Specific, measurable, achievable
- **Content Structure**: Use consistent heading hierarchy (H2 → H3 → H4)

### SEO Optimization
- **Meta Titles**: 50-60 characters, include primary keyword
- **Meta Descriptions**: 150-160 characters, compelling and descriptive
- **Keywords**: 3-5 relevant focus keywords per piece of content
- **Structured Data**: Use appropriate schema.org types (Course, LearningResource)

### Content Relationships
- **Prerequisites**: Only reference content that genuinely builds on previous knowledge
- **Simulations**: Link to lessons where they provide direct practice of concepts
- **Categories**: Use consistently across related content for navigation

## Sample Data Management

### Population Scripts
- **Initial Setup**: `/scripts/populate-sanity.js`
- **Additional Content**: `/scripts/add-more-lessons.js`
- Includes realistic content matching existing hardcoded data
- Proper `_key` properties for all array fields

### Data Structure
All sample content includes:
- Realistic professional content
- Proper content relationships
- SEO optimization examples
- Varied difficulty levels and content types

## Publishing Workflow

### Content States
1. **Draft** - Work in progress, not visible to users
2. **Published** - Live content available in the app
3. **Coming Soon** - Preview for marketing, not accessible
4. **Archived** - Deprecated content, hidden from new users

### Publishing Checklist
- [ ] Content reviewed for accuracy and completeness
- [ ] Learning objectives are clear and measurable
- [ ] Prerequisites are correctly set
- [ ] SEO fields are populated
- [ ] Images are optimized and have alt text
- [ ] Relationships to other content are verified
- [ ] Content renders correctly in frontend

### Quality Assurance
- Test content rendering in both Studio and frontend
- Verify navigation flows between courses and lessons
- Check that simulations are properly linked
- Ensure consistent terminology and difficulty progression