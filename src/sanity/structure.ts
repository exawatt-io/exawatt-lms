import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('ExaWatt CMS')
    .items([
      // Learning Content Section
      S.listItem()
        .title('📚 Learning Content')
        .child(
          S.list()
            .title('Learning Content')
            .items([
              S.listItem()
                .title('Courses')
                .child(
                  S.documentTypeList('course')
                    .title('All Courses')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('Lessons')
                .child(
                  S.documentTypeList('lesson')
                    .title('All Lessons')
                    .defaultOrdering([{field: 'course', direction: 'asc'}, {field: 'orderIndex', direction: 'asc'}])
                ),
              S.listItem()
                .title('Lessons by Course')
                .child(
                  S.documentTypeList('course')
                    .title('Select Course')
                    .child((courseId) =>
                      S.documentList()
                        .title('Lessons')
                        .filter('_type == "lesson" && references($courseId)')
                        .params({courseId})
                        .defaultOrdering([{field: 'orderIndex', direction: 'asc'}])
                    )
                ),
              S.listItem()
                .title('Simulations')
                .child(
                  S.documentTypeList('simulation')
                    .title('All Simulations')
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                ),
            ])
        ),

      // Course Management Section
      S.listItem()
        .title('🎓 Course Management')
        .child(
          S.list()
            .title('Course Management')
            .items([
              S.listItem()
                .title('Published Courses')
                .child(
                  S.documentTypeList('course')
                    .title('Published Courses')
                    .filter('_type == "course" && status == "published"')
                    .defaultOrdering([{field: 'enrollmentCount', direction: 'desc'}])
                ),
              S.listItem()
                .title('Draft Courses')
                .child(
                  S.documentTypeList('course')
                    .title('Draft Courses')
                    .filter('_type == "course" && status == "draft"')
                    .defaultOrdering([{field: '_updatedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('Featured Courses')
                .child(
                  S.documentTypeList('course')
                    .title('Featured Courses')
                    .filter('_type == "course" && isFeatured == true')
                    .defaultOrdering([{field: 'rating', direction: 'desc'}])
                ),
            ])
        ),

      // People Section
      S.listItem()
        .title('👥 People')
        .child(
          S.list()
            .title('People')
            .items([
              S.listItem()
                .title('Instructors')
                .child(
                  S.documentTypeList('instructor')
                    .title('All Instructors')
                    .defaultOrdering([{field: 'name', direction: 'asc'}])
                ),
              S.listItem()
                .title('Active Instructors')
                .child(
                  S.documentTypeList('instructor')
                    .title('Active Instructors')
                    .filter('_type == "instructor" && isActive == true')
                    .defaultOrdering([{field: 'experience', direction: 'desc'}])
                ),
            ])
        ),

      // Organization Section
      S.listItem()
        .title('🏷️ Organization')
        .child(
          S.list()
            .title('Organization')
            .items([
              S.listItem()
                .title('Categories')
                .child(
                  S.documentTypeList('category')
                    .title('All Categories')
                    .defaultOrdering([{field: 'order', direction: 'asc'}])
                ),
              S.listItem()
                .title('Categories with Content')
                .child(
                  S.documentTypeList('category')
                    .title('Categories Overview')
                    .child((categoryId) =>
                      S.list()
                        .title('Category Content')
                        .items([
                          S.listItem()
                            .title('Courses in this Category')
                            .child(
                              S.documentList()
                                .title('Courses')
                                .filter('_type == "course" && references($categoryId)')
                                .params({categoryId})
                            ),
                          S.listItem()
                            .title('Simulations in this Category')
                            .child(
                              S.documentList()
                                .title('Simulations')
                                .filter('_type == "simulation" && references($categoryId)')
                                .params({categoryId})
                            ),
                        ])
                    )
                ),
            ])
        ),

      // Analytics/Overview Section
      S.listItem()
        .title('📊 Content Overview')
        .child(
          S.list()
            .title('Content Overview')
            .items([
              S.listItem()
                .title('Recent Updates')
                .child(
                  S.documentList()
                    .title('Recently Updated Content')
                    .filter('_type in ["course", "lesson", "simulation", "instructor"]')
                    .defaultOrdering([{field: '_updatedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('Content by Status')
                .child(
                  S.list()
                    .title('Content Status')
                    .items([
                      S.listItem()
                        .title('Published Content')
                        .child(
                          S.documentList()
                            .title('Published')
                            .filter('(_type == "course" && status == "published") || (_type == "lesson" && isPublished == true) || (_type == "simulation" && status == "available")')
                            .defaultOrdering([{field: '_updatedAt', direction: 'desc'}])
                        ),
                      S.listItem()
                        .title('Draft Content')
                        .child(
                          S.documentList()
                            .title('Drafts')
                            .filter('(_type == "course" && status == "draft") || (_type == "lesson" && isPublished == false) || (_type == "simulation" && status == "coming-soon")')
                            .defaultOrdering([{field: '_updatedAt', direction: 'desc'}])
                        ),
                    ])
                ),
              S.listItem()
                .title('All Content Types')
                .child(
                  S.documentList()
                    .title('All Documents')
                    .filter('_type in ["course", "lesson", "simulation", "instructor", "category"]')
                    .defaultOrdering([{field: '_updatedAt', direction: 'desc'}])
                ),
            ])
        ),

      // Quick Actions
      S.divider(),
      S.listItem()
        .title('➕ Quick Create')
        .child(
          S.list()
            .title('Create New Content')
            .items([
              S.listItem()
                .title('New Course')
                .child(
                  S.documentTypeList('course')
                    .title('Create Course')
                ),
              S.listItem()
                .title('New Lesson')
                .child(
                  S.documentTypeList('lesson')
                    .title('Create Lesson')
                ),
              S.listItem()
                .title('New Simulation')
                .child(
                  S.documentTypeList('simulation')
                    .title('Create Simulation')
                ),
              S.listItem()
                .title('New Instructor')
                .child(
                  S.documentTypeList('instructor')
                    .title('Create Instructor')
                ),
            ])
        ),
    ])
