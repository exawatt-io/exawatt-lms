# ExaWatt Content Creation Workflow

## 🚀 Quick Start

### 1. Write Content in MDX
```bash
# Navigate to content directory
cd content/courses/[course-name]/lessons

# Create new lesson file
code 03-new-lesson-name.mdx
```

### 2. Use the Template Structure
```markdown
# Lesson Title

Brief introduction paragraph describing the lesson.

## Learning Objectives
- Objective 1
- Objective 2  
- Objective 3

## Main Section
Content here...

## Key Terms
**Term**: Definition
```

### 3. Migrate to Sanity
```bash
# Migrate specific file
node scripts/migrate-mdx-to-sanity.js content/courses/grid-fundamentals/lessons/03-new-lesson.mdx

# Or migrate default file
node scripts/migrate-mdx-to-sanity.js
```

### 4. View Results
```bash
# Start development server
npm run dev

# View in browser
open http://localhost:3000/app/courses/grid-fundamentals
```

## 📁 Directory Structure

```
content/
├── lesson-template.mdx          # Template for new lessons
└── courses/
    ├── grid-fundamentals/
    │   └── lessons/
    │       ├── 01-introduction.mdx
    │       ├── 02-power-generation.mdx
    │       └── 03-new-lesson.mdx
    ├── market-operations/
    │   └── lessons/
    │       └── [lessons here]
    └── risk-management/
        └── lessons/
            └── [lessons here]
```

## ✍️ Writing Guidelines

### Lesson Structure
Every lesson should follow this structure:

1. **Title** (H1) - Clear, descriptive lesson name
2. **Introduction** - 1-2 paragraphs explaining what this lesson covers
3. **Learning Objectives** - 3-5 specific, measurable goals
4. **Main Content** - Organized with H2 and H3 headings
5. **Key Terms** - Important vocabulary with definitions
6. **Real-World Example** - Practical application
7. **Summary** - Brief recap
8. **Looking Ahead** - Connection to next lesson
9. **Review Questions** - 3-4 questions testing understanding

### Content Guidelines

#### Headings
- **H1**: Lesson title only
- **H2**: Main sections (3-5 per lesson)
- **H3**: Subsections within main sections
- **H4**: Rare, for deep sub-topics

#### Learning Objectives
- Start with action verbs: "understand", "analyze", "explain", "calculate"
- Be specific and measurable
- 3-5 objectives per lesson
- Align with lesson content

#### Key Terms
Use this format:
```markdown
**Term Name**: Clear, concise definition that a beginner can understand

**Another Term**: Definition focusing on practical meaning
```

#### Code Examples
Use code blocks for formulas, calculations, or technical examples:
```markdown
```javascript
// Example calculation
const marketPrice = (supply, demand) => {
  return supply === demand ? clearingPrice : null;
};
```
```

#### Lists and Bullets
- Use bullet lists for features, characteristics, examples
- Use numbered lists for procedures, steps, sequences
- Keep list items parallel in structure

### Writing Style
- **Conversational but professional** - Write like you're explaining to a colleague
- **Active voice** - "The grid operator dispatches generators" vs "Generators are dispatched"
- **Clear transitions** - Connect ideas between paragraphs and sections
- **Define acronyms** - Spell out on first use: "Independent System Operator (ISO)"
- **Use examples** - Include real-world cases from actual power markets

## 🔧 Technical Details

### Migration Script Features
- **Auto-generates slugs** from lesson titles
- **Extracts learning objectives** from "## Learning Objectives" sections
- **Parses key terms** from "**Term**: Definition" format
- **Converts Markdown** to Sanity Portable Text
- **Auto-numbers lessons** based on existing content
- **Handles code blocks** and formatted text

### Supported Markdown Features
- ✅ Headings (H1-H4)
- ✅ Bold and italic text
- ✅ Bullet and numbered lists
- ✅ Code blocks with syntax highlighting
- ✅ Inline code
- ✅ Horizontal rules
- ✅ Links (converted to Sanity link annotations)

### Content Processing
The migration script automatically:
1. **Extracts title** from first H1 heading
2. **Generates description** from first paragraph
3. **Parses learning objectives** from bulleted list under "## Learning Objectives"
4. **Extracts key terms** from "**Term**: Definition" patterns
5. **Converts content** to Sanity's Portable Text format
6. **Sets order index** by counting existing lessons
7. **Creates SEO-friendly slug** from title

## 📚 Course Organization

### Current Courses
1. **Grid Fundamentals** (`grid-fundamentals`)
   - Introduction to Power Systems
   - Power Generation Technologies
   - [Add more lessons here]

2. **Market Operations** (`market-operations`)
   - [Ready for content]

3. **Risk Management** (`risk-management`)
   - [Ready for content]

### Adding New Courses
1. Create directory: `content/courses/new-course-name/lessons/`
2. Update migration script to handle new course
3. Add course metadata to Sanity through Studio or populate script

## 🛠️ Troubleshooting

### Common Issues

**Migration fails with "Course not found"**
- Ensure the course exists in Sanity
- Check course slug matches directory name
- Run `scripts/populate-sanity.js` to create sample courses

**Content not displaying properly**
- Check that lesson was successfully created in Sanity
- Verify course-lesson relationships are correct
- Restart development server: `npm run dev`

**Markdown not converting correctly**
- Ensure proper markdown syntax (double spaces for line breaks)
- Check that headings start at beginning of line
- Verify key terms use exact "**Term**: Definition" format

### Debugging
- Check Sanity Studio at `http://localhost:3000/studio`
- View migration script output for detailed information
- Use browser dev tools to inspect GraphQL queries

## 🎯 Best Practices

### Content Creation
1. **Start with template** - Copy `content/lesson-template.mdx`
2. **Write in stages** - Draft → Review → Polish → Migrate
3. **Test locally** - Always check frontend rendering
4. **Keep it focused** - One main concept per lesson
5. **Include examples** - Real power market cases work best

### Version Control
```bash
# Commit source MDX files
git add content/courses/
git commit -m "Add lesson: Power Generation Technologies"

# Migration creates Sanity content automatically
# No need to commit generated content
```

### Content Updates
1. **Edit MDX file** - Make changes to source
2. **Re-run migration** - Updates existing Sanity document
3. **Test changes** - Verify in frontend
4. **Commit updates** - Track changes in Git

## 📊 Content Metrics

### Recommended Lesson Length
- **Reading time**: 10-15 minutes
- **Word count**: 1500-2500 words
- **Learning objectives**: 3-5 items
- **Key terms**: 4-8 definitions
- **Sections**: 3-5 main sections

### Quality Checklist
- [ ] Clear, specific learning objectives
- [ ] Logical flow from basic to advanced concepts
- [ ] Real-world examples included
- [ ] Key terms defined clearly
- [ ] Review questions test understanding
- [ ] Links to next lesson/topic
- [ ] Proper markdown formatting
- [ ] No spelling/grammar errors

---

## Next Steps

1. **Create your first lesson** using the template
2. **Test the migration workflow** with a simple lesson
3. **Review output** in both Sanity Studio and frontend
4. **Iterate and improve** based on results

Happy content creation! 🚀