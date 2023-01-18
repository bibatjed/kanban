export default function Item({
  id,
  subtaskComplete,
  ...props
}: {
  id: string;
  title: string;
  subtasks: { name: string; done: boolean }[];
  subtaskComplete: number;
}) {
  return (
    <div className="kanban-item" {...props}>
      <span className=" text-[15px] font-bold">{props.title}</span>
      <span className="text-xs font-medium text-kanban-medium-grey">
        {`${subtaskComplete} of ${props.subtasks?.length || 0} subtasks`}
      </span>{" "}
    </div>
  );
}
