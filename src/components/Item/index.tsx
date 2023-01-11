import React, { forwardRef } from "react";

export default function Item({
  id,
  ...props
}: {
  id: string;
  title: string;
  subtasks: { name: string; done: boolean }[];
}) {
  return (
    <div className="kanban-item" {...props}>
      <span className=" text-[15px] font-bold">{props.title}</span>
      <span className="text-xs font-medium text-kanban-medium-grey">
        {`${props.subtasks.reduce(
          (acc, currentvalue) => acc + (currentvalue.done ? 1 : 0),
          0
        )} 
          of ${props.subtasks.length} subtasks`}
      </span>{" "}
    </div>
  );
}
