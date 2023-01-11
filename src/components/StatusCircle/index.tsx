const colorObject: string[] = ["bg-[#49C4E5]", "bg-[#8471F2]", "bg-[#62E2AE]"];
function ColorPicker(id: number) {
  return colorObject[id];
}

type StatusCircleProps = {
  id: number;
};
export default function StatusCircle(props: StatusCircleProps) {
  return (
    <div
      className={`rounded-full w-4 h-4 ${ColorPicker(props.id)}
  `}
    ></div>
  );
}
