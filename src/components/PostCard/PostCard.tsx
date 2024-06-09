import { FC, useState } from 'react'

import { Post, Comment } from '../../constants/posts.ts'
import { formatTimestampToRelativeTime } from '../../utils/date.ts'

import { TextAreaField } from '../TextAreaField/TextAreaField.tsx'
import { CommentCard } from '../CommentCard/CommentCard.tsx'
import { Button } from '../Button/Button.tsx'

type PostCardProp = {
  /**
   * The post data.
   */
  post: Post
  /**
   * Function to update comments of a specific post.
   *
   * @param postId - The ID of the post to update comments for.
   * @param updatedComments - The updated comments array.
   */
  updatePostComments: (postId: string, updatedComments: Comment[]) => void
  /**
   * Function to add a reply to a specific comment.
   *
   * @param postId - The ID of the post containing the comment.
   * @param commentId - The ID of the comment to reply to.
   * @param newReply - The new reply to add.
   */
  addReplyToComment: (postId: string, commentId: string, newReply: Comment) => void
  /**
   * Function to delete a comment.
   *
   * @param postId - The ID of the post containing the comment.
   * @param commentId - The ID of the comment to reply to.
   */
  deleteComment: (postId: string, commentId: string) => void
}

export const PostCard:FC<PostCardProp> = ({ post, updatePostComments, addReplyToComment, deleteComment }) => {
  const [postComment, setPostComment] = useState('')
  const isCommentsAvailable = post.comments.length > 0

  /**
   * Handles submission of a new comment.
   */
  const handleCommentSubmit = () => {
    if (!postComment.trim()) return;
    const newComment: Comment = {
      id: String(new Date().getTime()),
      author: 'Current User',
      author_img_url: 'https://ui-avatars.com/api/?name=Current+User',
      timestamp: new Date().toISOString(),
      content: postComment,
      replies: []
    };
    updatePostComments(post.id, [newComment, ...post.comments]);
    setPostComment('');
  }

  return (
    <>
      <div className='mb-3'>
        <div className='font-bold text-xs'>{post.author}</div>
        <h1 className='font-bold text-2xl'>{post.title}</h1>
        <div className='text-xs'>{formatTimestampToRelativeTime(post.timestamp)}</div>
      </div>
      <div className='mb-3 text-lg'>{post.desc}</div>
      <TextAreaField
        value={postComment}
        onChange={(event) => setPostComment(event.target.value)}
        placeholder='Add your comment'
      />
      <div className='flex justify-end mt-2'>
        <Button
          className='py-2.5 px-5 bg-blue-500 text-white rounded hover:bg-blue-600'
          onClick={handleCommentSubmit}
        >
          Submit
        </Button>
      </div>
      <div>
        { isCommentsAvailable && post.comments.map(comment =>
          <CommentCard
            key={comment.id}
            postId={post.id}
            comment={comment}
            addReplyToComment={addReplyToComment}
            deleteComment={deleteComment}
          />
        ) }
      </div>
    </>
  )
}
