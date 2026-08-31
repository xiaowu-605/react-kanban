import { useDraggable } from '@dnd-kit/core'
interface TaskProps {
  title: string
}
export const Task = (props: TaskProps) => {
  const { title } = props
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
    data: {
      type: 'task',
    },
  })
  const style: React.CSSProperties = {
    transform: transform ? transform.toString() : 'transform(0,0)',
  }
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-2 mb-1 bg-white border-gray-100 rounded-md"
    >
      {title}
    </div>
  )
}
