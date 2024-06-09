
export type Comment = {
  id: string
  author: string
  author_img_url: string
  timestamp: string
  content: string
  replies: Comment[]

}

export type Post = {
  id: string
  title: string
  desc: string
  author: string
  timestamp: string
  comments: Comment[]
}

export const defaultPosts: Post[] = [
  {
    id: '1',
    title: 'Post Title',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dignissim id tellus eu lobortis. Integer dui lacus, ultrices ac varius quis, varius sed lorem. In molestie elementum nisl eget pulvinar',
    author: 'Author',
    timestamp: '2024-06-06T12:00:00Z',
    comments: [
      {
        id: '1',
        author: 'user1',
        author_img_url: 'https://ui-avatars.com/api/?name=John+Doe',
        timestamp: '2024-06-08T21:58:43.987Z',
        content: 'This is a main comment',
        replies: [],
      },
      {
        id: '2',
        author: 'guest',
        author_img_url: 'https://ui-avatars.com/api/?name=John+Doe',
        timestamp: '2024-06-08T20:58:43.987Z',
        content: 'This is another main comment',
        replies: [
          {
            id: '21',
            author: 'guest',
            author_img_url: 'https://ui-avatars.com/api/?name=John+Doe',
            timestamp: '2024-06-08T19:58:43.987Z',
            content: 'this is sub comment',
            replies: [],
          }
        ],
      }
    ]
  }
]
