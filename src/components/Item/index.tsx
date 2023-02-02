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
    <div className="kanban-item hover:opacity-100" {...props}>
      <span className=" text-base font-semibold">{props.title}</span>
      <span className="text-xs font-medium text-kanban-medium-grey">
        {`${subtaskComplete} of ${props.subtasks?.length || 0} subtasks`}
      </span>{' '}
    </div>
  );
}
