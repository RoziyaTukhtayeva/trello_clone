// "use client"
// import React, { useState } from "react";
// import style from "./Column.module.css";
// import {
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import Task from "../task/Task";
// import Input from "../input/Input";

// type Task = {
//   id: string;
//   title: string;
// };
// type Column = {
//   id: string;
//   title: string;
//   tasks: Task[];
// };

// type ColumnProps = {
//   tasks: Task[];
//    column: Column
//   onAddTask?: (columnId: string, title: string) => void
// };

// const Column = ({ tasks,column, onAddTask  }: ColumnProps) => {
//     const [value, setValue] = useState('')

//   return (
//     <div className={style.body}>
//           {onAddTask && (
//         <div className="mt-2">
//           <input
//             value={value}
//             onChange={e => setValue(e.target.value)}
//             placeholder="Add a task..."
//             className="border p-1 w-full"
//           />
//           <button
//             onClick={() => {
//               if (!value.trim()) return
//               onAddTask(column.id, value)
//               setValue('')
//             }}
//           >
//             Add
//           </button>
//         </div>
//       )}
//       <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
//         {tasks.map((tasks) => (
//             <Task id={tasks.id} title={tasks.title} key={tasks.id} />
//         ))}
//       </SortableContext>
//     </div>
//   );
// };

// export default Column;

"use client";

import { useDroppable } from "@dnd-kit/core";
import { Card } from "./Card";
import style from "./Column.module.css";
import { useState } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

type Task = {
  id: string;
  title: string;
};
type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

type ColumnT = {
  column: Column;
  onAddTask?: (columnId: string, title: string) => void;
};

const Column = ({ column, onAddTask }: ColumnT) => {
  const [value, setValue] = useState("");

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div ref={setNodeRef} className={style.body}>
      <h3>{column.title}</h3>
         {onAddTask && (
        <div className={style.add}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add a task..."
            className="border p-1 w-full"
          />
          <button
            onClick={() => {
              if (!value.trim()) return;
              onAddTask(column.id, value);
              setValue("");
            }}
          >
            Add
          </button>
        </div>
      )}
        <SortableContext
      items={column.tasks.map(t => t.id)}
      strategy={verticalListSortingStrategy}
    >
      <div className={style.box}>
        {column.tasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </div>
</SortableContext>
   
    </div>
  );
};

export default Column;
