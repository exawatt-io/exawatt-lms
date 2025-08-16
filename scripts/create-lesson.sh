#!/bin/bash

# ExaWatt Lesson Creation Helper Script
# Usage: ./scripts/create-lesson.sh [course-name] [lesson-title]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
COURSE_NAME=${1:-"grid-fundamentals"}
LESSON_TITLE=${2:-""}

# Function to display usage
show_usage() {
    echo -e "${BLUE}ExaWatt Content Creation Helper${NC}"
    echo ""
    echo "Usage: $0 [course-name] [lesson-title]"
    echo ""
    echo "Examples:"
    echo "  $0 grid-fundamentals \"Transmission Systems\""
    echo "  $0 market-operations \"Day-Ahead Markets\""
    echo "  $0 risk-management \"Portfolio Optimization\""
    echo ""
    echo "Available courses:"
    echo "  - grid-fundamentals"
    echo "  - market-operations" 
    echo "  - risk-management"
    echo ""
}

# Check if lesson title is provided
if [ -z "$LESSON_TITLE" ]; then
    echo -e "${RED}Error: Lesson title is required${NC}"
    echo ""
    show_usage
    exit 1
fi

# Generate filename from title
FILENAME=$(echo "$LESSON_TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9 ]//g' | sed 's/ /-/g')

# Find next lesson number
COURSE_DIR="content/courses/$COURSE_NAME/lessons"
if [ -d "$COURSE_DIR" ]; then
    # Count existing lessons and add 1
    LESSON_COUNT=$(find "$COURSE_DIR" -name "*.mdx" | wc -l | xargs)
    LESSON_NUMBER=$(printf "%02d" $((LESSON_COUNT + 1)))
else
    LESSON_NUMBER="01"
fi

LESSON_FILE="$COURSE_DIR/$LESSON_NUMBER-$FILENAME.mdx"

echo -e "${BLUE}Creating new lesson...${NC}"
echo "Course: $COURSE_NAME"
echo "Title: $LESSON_TITLE"
echo "File: $LESSON_FILE"
echo ""

# Create directory if it doesn't exist
mkdir -p "$COURSE_DIR"

# Check if file already exists
if [ -f "$LESSON_FILE" ]; then
    echo -e "${YELLOW}Warning: File already exists at $LESSON_FILE${NC}"
    read -p "Overwrite? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Cancelled."
        exit 1
    fi
fi

# Create lesson file from template
cat > "$LESSON_FILE" << EOF
# $LESSON_TITLE

[Brief introduction paragraph describing what this lesson covers and why it's important for power markets education.]

## Learning Objectives

By the end of this lesson, you will understand:

- [Specific, measurable objective 1]
- [Specific, measurable objective 2]
- [Specific, measurable objective 3]
- [Additional objectives as needed]

## [Main Section 1 - Core Concept]

[Introduction paragraph explaining the main concept...]

### [Subsection - Detailed Explanation]

[Detailed explanation with examples...]

- **Key Point 1**: Explanation
- **Key Point 2**: Explanation
- **Key Point 3**: Explanation

### [Subsection - Technical Details]

[Technical content when relevant...]

\`\`\`javascript
// Code examples when relevant
const example = {
  property: "value",
  calculation: "formula or logic"
};
\`\`\`

## [Main Section 2 - Practical Application]

[How this concept applies in the real world...]

### [Subsection - Industry Examples]

[Specific examples from power markets...]

## Key Terms

**[Term 1]**: Clear, concise definition of important terminology

**[Term 2]**: Another key term definition

**[Term 3]**: Additional term relevant to the lesson

## Real-World Example

[Detailed practical example or case study that demonstrates the concepts in action. This should be concrete and help students connect theory to practice.]

## Summary

[Brief recap of the main points covered in this lesson - 2-3 sentences maximum]

## Looking Ahead

[Brief preview of the next lesson or how this lesson connects to upcoming content]

## Review Questions

1. [Question testing understanding of key concept 1]
2. [Question testing understanding of key concept 2]
3. [Question testing practical application]
4. [Question testing terminology]

---

*Ready to continue? Proceed to [Next Lesson Title]*
EOF

echo -e "${GREEN}✅ Lesson file created successfully!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Edit the lesson: code $LESSON_FILE"
echo "2. Migrate to Sanity: node scripts/migrate-mdx-to-sanity.js $LESSON_FILE"
echo "3. View result: npm run dev"
echo ""
echo -e "${YELLOW}Happy writing! 🚀${NC}"