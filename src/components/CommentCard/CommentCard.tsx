import { FC, useState } from 'react'

import { Comment } from '../../constants/posts.ts'
import { formatTimestampToRelativeTime } from '../../utils/date.ts'

import { Button } from '../Button/Button.tsx'
import { TextAreaField } from '../TextAreaField/TextAreaField.tsx'

type CommentCardProps = {
  /**
   * The comment data.
   */
  comment: Comment
  /**
   * The ID of the post containing the comment.
   */
  postId: string
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

export const CommentCard:FC<CommentCardProps> = ({ comment, postId, addReplyToComment, deleteComment }) => {
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [foldComment, setFoldComment] = useState(false)

  const handleReplyClick = () => setIsReplying(true)
  const handleCancelClick = () => {
    setIsReplying(false)
    setReplyText('')
  }
  // Toggles the fold/unfold state of comment replies.
  const toggleFoldComment = () => setFoldComment(prevState => !prevState)

  /**
   * Handles submission of a new reply to a comment.
   */
  const handleSubmitClick = () => {
    if (!replyText.trim()) return
    const newReply: Comment = {
      id: String(new Date().getTime()),
      author: 'guest',
      author_img_url: 'https://ui-avatars.com/api/?name=Guest',
      timestamp: new Date().toISOString(),
      content: replyText,
      replies: []
    }
    addReplyToComment(postId, comment.id, newReply)
    setIsReplying(false)
    setReplyText('')
    setFoldComment(true)
  }

  return (
    <div className='my-5'>
      <div className='flex items-center mb-2'>
        <img src={comment.author_img_url} className='rounded-full' width={30} alt='author_image'/>
        <div className='px-2 font-medium'>{comment.author}</div>
        <div className='text-gray-400 text-sm'>{formatTimestampToRelativeTime(comment.timestamp)}</div>
        <Button
          className='ml-auto p-2 text-sm hover:bg-red-500 hover:text-white'
          onClick={() => deleteComment(postId, comment.id)}
        >
          Delete
        </Button>
      </div>
      <div className='px-3'>
        <div className='mb-2 text-gray-500'>{comment.content}</div>
        <Button
          className='p-2 hover:bg-black hover:rounded hover:text-white'
          onClick={handleReplyClick}
        >
          Reply
        </Button>
        {isReplying && (
          <div className='mt-2'>
            <TextAreaField
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder='Write your reply...'
            />
            <div className='flex justify-end mt-2'>
              <Button
                className='py-2.5 px-5 mr-2 bg-gray-200 rounded hover:bg-gray-300'
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
              <Button
                className='py-2.5 px-5 bg-blue-500 text-white rounded hover:bg-blue-600'
                onClick={handleSubmitClick}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
        {comment.replies.length > 0 && (
          <Button
            className="p-2 mt-2 text-sm hover:bg-gray-200 rounded"
            onClick={toggleFoldComment}
          >
            {foldComment ? 'Hide Replies' : `Show Replies (${comment.replies.length})`}
          </Button>
        )}
        { foldComment && (
          <div className="mt-2 pl-5 border-l-2 border-gray-300 ml-4">
            {comment.replies.map(reply => (
              <CommentCard
                key={reply.id}
                comment={reply}
                addReplyToComment={addReplyToComment}
                postId={postId}
                deleteComment={deleteComment}
              />
            ))}
          </div>
        ) }
      </div>
    </div>
  )
}
