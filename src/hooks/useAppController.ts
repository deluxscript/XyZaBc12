import { useAppLoading } from './useAppLoading.ts'
import { useCallback, useEffect, useState } from 'react'

import { defaultPosts, Comment, Post } from '../constants/posts.ts'
import { getPostsFromLocalStorage, savePostsToLocalStorage } from '../utils/localStorage.ts'

let didInit = false

/**
 * Custom hook to manage the application state, including loading state, posts, and comments.
 *
 * @returns Returns the application state and handlers.
 */
export function useAppController() {
  const loading = useAppLoading()
  const [posts, setPosts] = useState<Post[]>([])

  /**
   * Updates the comments of a specific post.
   *
   * @param {string} postId - The ID of the post to update.
   * @param {Comment[]} updatedComments - The updated comments array.
   */
  const updatePostComments = useCallback((postId: string, updatedComments: Comment[]) => {
    setPosts(prevPosts => {
      const updatedPosts = prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: updatedComments
          }
        }
        return post
      })
      savePostsToLocalStorage(updatedPosts)
      return updatedPosts
    })
  }, [])

  /**
   * Recursively updates the replies of a specific comment.
   *
   * @param {Comment[]} comments - Array of comments.
   * @param {string} commentId - The ID of the comment to reply to.
   * @param {Comment} newReply - The new reply to add.
   * @returns The updated comments array.
   */
  const updateCommentReplies = useCallback((comments: Comment[], commentId: string, newReply: Comment): Comment[] => {
    return comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply]
        }
      }
      return {
        ...comment,
        replies: updateCommentReplies(comment.replies, commentId, newReply)
      }
    })
  }, [])

  /**
   * Adds a reply to a specific comment.
   *
   * @param {string} postId - The ID of the post containing the comment.
   * @param {string} commentId - The ID of the comment to reply to.
   * @param {Comment} newReply - The new reply to add.
   */
  const addReplyToComment = useCallback((postId: string, commentId: string, newReply: Comment) => {
    setPosts(prevPosts => {
      const updatedPosts = prevPosts.map(post => {
        if (post.id === postId) {
          const updatedComments = updateCommentReplies(post.comments, commentId, newReply)
          return {
            ...post,
            comments: updatedComments
          }
        }
        return post
      })
      savePostsToLocalStorage(updatedPosts)
      return updatedPosts
    })
  }, [updateCommentReplies])


  /**
   * Recursively deletes a comment and its replies from an array of comments.
   *
   * @param {Comment[]} comments - The array of comments to search for deletion.
   * @param {string} commentId - The ID of the comment to be deleted.
   * @returns The updated array of comments after deletion.
   */
  const deleteCommentReplies = useCallback((comments: Comment[], commentId: string): Comment[] => {
    return comments.reduce((acc: Comment[], comment) => {
      if (comment.id === commentId) {
        // Exclude the comment to be deleted
        return acc
      }
      // Recursively delete the comment from replies
      const updatedReplies = deleteCommentReplies(comment.replies, commentId);
      return [
        ...acc,
        { ...comment, replies: updatedReplies }
      ]
    }, [])
  }, [])

  /**
   * Deletes a comment from a post.
   *
   * @param {string} postId - The ID of the post from which the comment will be deleted.
   * @param {string} commentId - The ID of the comment to be deleted.
   */
  const deleteComment = useCallback((postId: string, commentId: string) => {
    setPosts(prevPosts => {
      const updatedPosts = prevPosts.map(post => {
        if (post.id === postId) {
          const updatedComments = deleteCommentReplies(post.comments, commentId)
          return {
            ...post,
            comments: updatedComments
          }
        }
        return post
      })
      savePostsToLocalStorage(updatedPosts)
      return updatedPosts
    })
  }, [deleteCommentReplies])

  useEffect(() => {
    if (!didInit) {
      let storedPosts = getPostsFromLocalStorage()
      if(storedPosts.length === 0){
        savePostsToLocalStorage(defaultPosts)
        storedPosts = defaultPosts
      }
      setPosts(storedPosts)
      didInit = true
      loading.done()
    }
  }, [loading, posts])

  return {
    /**
     * Array of posts
     */
    posts,
    /**
     * Flag indicating if the app is still loading.
     */
    isLoading: loading.isLoading,
    updatePostComments,
    addReplyToComment,
    deleteComment
  }
}
