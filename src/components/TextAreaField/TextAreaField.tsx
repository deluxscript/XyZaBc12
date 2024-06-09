import { ChangeEvent, FC } from 'react'
import cl from 'classnames'

type TextAreaFieldProps = {
  /**
   * The placeholder text to display
   */
  placeholder?: string
  /**
   * The value of the text area field
   */
  value: string | number | undefined
  /**
   * The `name` prop specifies the name attribute for the textarea element,
   */
  name?: string
  /**
   * Event handler for changes
   */
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  /**
   * Additional classnames for the text area field
   */
  className?: string
}

export const TextAreaField: FC<TextAreaFieldProps> = props => {
  return (
    <div className='pb-2.5'>
      <textarea
        className={cl('w-full p-4 outline-0 border rounded', props.className)}
        rows={3}
        value={props.value}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  )
}
