// "use client";

// import { useState } from "react";
// import styles from "./page.module.css";
// import {
//   closestCorners,
//   DndContext,
//   KeyboardSensor,
//   PointerSensor,
//   TouchSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import Column from "./components/column/Column";
// import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
// import Input from "./components/input/Input";
// export type Task = {
//   id: string
//   title: string
// }

// export type Column = {
//   id: string
//   title: string
//   tasks: Task[]
// }

// export default function Home() {

//   const [columns, setColumns] = useState<Column[]>([
//   {
//     id: 'tasks',
//     title: 'Tasks',
//     tasks: [
//       { id: '1', title: 'Something' },
//       { id: '2', title: 'Anything' },
//     ],
//   },
//   {
//     id: 'progress',
//     title: 'In Progress',
//     tasks: [
//       { id: '3', title: 'Nothing' },
//     ],
//   },
//   {
//     id: 'done',
//     title: 'Done',
//     tasks: [],
//   },
// ])

//   const [tasks, setTasks] = useState([
//     { id: 1, title: "Something" },
//     { id: 2, title: "Anything" },
//     { id: 3, title: "Nothing" },
//   ]);

//   const addTasks =(title: string)=>{
//     setTasks(tasks=>[...tasks, {id:tasks.length+1,title:title }])
//   }

//   const getTasksPos = (id: number) => tasks.findIndex((task) => task.id === id);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const handleDragEnd = (event: { active: any; over: any }) => {
//     const { active, over } = event;
//     if (active.id === over.id) return;

//     setTasks((tasks) => {
//       const originPos = getTasksPos(active.id);
//       const newPos = getTasksPos(over.id);
//       return arrayMove(tasks, originPos, newPos);
//     });
//   };

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(TouchSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   return (
//     <div className={styles.page}>

//       <div className={styles.blocks}>
//         <h1>Daily</h1>
//         <DndContext
//           sensors={sensors}
//           onDragEnd={handleDragEnd}
//           collisionDetection={closestCorners}
//         >
//           <Input onSubmit={addTasks}/>
//           <Column tasks={tasks} />
//         </DndContext>
//       </div>

//     </div>
//   );
// }
"use client"; 

import { DndContext, DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import React, { useState } from "react";
import Column from "@/components/column/Column";
import style from './page.module.css'
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

type Task = {
  id: string;
  title: string;
};

type ColumnT = {
  id: string;
  title: string;
  tasks: Task[];
};

export default function Home() {
  const initialData = [
    {
      id: "tasks",
      title: "Tasks",
      tasks: [
        { id: "t1", title: "Learn React" },
        { id: "t2", title: "Read docs" },
      ],
    },
    {
      id: "progress",
      title: "In Progress",
      tasks: [{ id: "t3", title: "Build Trello clone" }],
    },
    {
      id: "done",
      title: "Done",
      tasks: [],
    },
  ];

  const addTask = (columnId: string, title: string) => {
  setColumns(prev =>
    prev.map(column =>
      column.id === columnId
        ? {
            ...column,
            tasks: [
              ...column.tasks,
              {
                id: crypto.randomUUID(),
                title,
                order: column.tasks.length,
                createdAt: new Date().toISOString(),
              },
            ],
          }
        : column
    )
  )
}


  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const fromColumn = columns.find((col) =>
      col.tasks.some((task) => task.id === active.id)
    );

    const toColumn = columns.find((col) => col.id === over.id);

    if (!fromColumn || !toColumn) return;
    if (fromColumn.id === toColumn.id) return;

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === fromColumn.id) {
          return {
            ...col,
            tasks: col.tasks.filter((task) => task.id !== active.id),
          };
        }

        if (col.id === toColumn.id) {
          const movedTask = fromColumn.tasks.find(
            (task) => task.id === active.id
          );
          return {
            ...col,
            tasks: [...col.tasks, movedTask!],
          };
        }

        return col;
      })
    );
  };
    const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [columns, setColumns] = useState<ColumnT[]>(initialData);
  return (
    <div className={style.body}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className={style.blocks}>
          {columns.map((column, index) => (
            <Column key={column.id} column={column}     onAddTask={index === 0 ? addTask : undefined}
 />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
