import { formatDistanceToNow, parseISO } from 'date-fns'

/**
 * Formats a timestamp to relative time from the current date.
 *
 * @param timestamp - The timestamp to format.
 * @returns A string representing the relative time from the current date.
 */
export const formatTimestampToRelativeTime = (timestamp: string) => {
  const date = parseISO(timestamp)
  return formatDistanceToNow(date, { addSuffix: true })
}
