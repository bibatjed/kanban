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
    <div style={{ display: "flex", flexDirection: "column" }} {...props}>
      <span>{props.title}</span>
      <span>
        {`${props.subtasks.reduce(
          (acc, currentvalue) => acc + (currentvalue.done ? 1 : 0),
          0
        )}
          /${props.subtasks.length}`}
      </span>{" "}
    </div>
  );
}
