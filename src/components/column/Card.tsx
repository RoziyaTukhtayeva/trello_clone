import { useDraggable } from '@dnd-kit/core'
import { TaskT } from '../task/Task'

export const Card = ({ task }: { task: TaskT }) => {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: task.id,
    })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        cursor: 'grab',
      }}
      className="bg-white p-2 mb-2 rounded shadow"
    >
      {task.title}
    </div>
  )
}
