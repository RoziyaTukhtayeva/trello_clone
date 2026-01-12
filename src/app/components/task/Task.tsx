import { useSortable } from '@dnd-kit/sortable'
import React from 'react'
import {CSS} from "@dnd-kit/utilities"

export type TaskT = {
  id: string
  title: string
}

const Task = ({title, id}:TaskT) => {
   const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})
   const style = {
    transition,
    transform:CSS.Transform.toString(transform)
   }
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {title}
    </div>
  )
}

export default Task
