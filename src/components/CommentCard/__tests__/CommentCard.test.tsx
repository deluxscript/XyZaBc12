import { render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import { CommentCard } from '../CommentCard.tsx'

describe('CommentCard component', () => {
  const mockComment = {
    id: '1',
    author: 'User',
    author_img_url: 'https://ui-avatars.com/api/?name=User',
    timestamp: '2024-06-08T23:04:58.418Z',
    content: 'Comment content',
    replies: []
  }

  const mockAddReplyToComment = vi.fn()
  const mockDeleteComment = vi.fn()

  it('renders CommentCard component', () => {
    render(
      <CommentCard
        comment={mockComment}
        postId='postId'
        addReplyToComment={mockAddReplyToComment}
       deleteComment={mockDeleteComment}
      />
    )
  })

  it('adds a new reply when "Reply" button is clicked', () => {
    const { getByText, getByPlaceholderText } = render(
      <CommentCard
        comment={mockComment}
        postId='postId'
        addReplyToComment={mockAddReplyToComment}
        deleteComment={mockDeleteComment}
      />
    )

    // Click on the "Reply" button
    fireEvent.click(getByText('Reply'))

    // Fill and submit the reply text
    fireEvent.change(getByPlaceholderText('Write your reply...'), { target: { value: 'New reply content' } })
    fireEvent.click(getByText('Submit'))

    // Check if addReplyToComment was called with the correct arguments
    expect(mockAddReplyToComment).toHaveBeenCalledWith('postId', '1', expect.any(Object))
  })
})
