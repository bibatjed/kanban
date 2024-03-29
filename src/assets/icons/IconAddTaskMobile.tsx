export default function IconAddTaskMobile(props: {
  className?: string;
  height?: string;
  width?: string;
}) {
  const { width = "12", height = "12" } = props;
  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <path
        className={props.className}
        d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
      />
    </svg>
  );
}
