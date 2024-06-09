import { useAppController } from './hooks/useAppController.ts'
import { PostCard } from './components/PostCard/PostCard.tsx'

export const App = () => {
  const {
    posts,
    isLoading,
    updatePostComments,
    addReplyToComment,
    deleteComment,
  } = useAppController()

  return (
    <div className='container mx-auto px-4 py-4'>
      {isLoading ? (
        <div className='flex justify-center items-center h-screen'>
          <div className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full'>
            <span>Loading...</span>
          </div>
        </div>
      ) : (
        posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            updatePostComments={updatePostComments}
            addReplyToComment={addReplyToComment}
            deleteComment={deleteComment}
          />
        ))
      )}
    </div>
  )
}
