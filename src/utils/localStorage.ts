import { Post } from '../constants/posts.ts'

export const savePostsToLocalStorage = (posts: Post[]) => localStorage.setItem('post', JSON.stringify(posts))
export const getPostsFromLocalStorage = (): Post[] => {
  const posts = localStorage.getItem('post')
  return posts ? JSON.parse(posts) : []
}
