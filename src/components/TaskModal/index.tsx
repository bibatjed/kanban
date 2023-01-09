import { ChangeEvent, useState } from "react";

interface ITaskModal {
  submit: (e: string) => void;
}
export default function TaskModal(props: ITaskModal) {
  const [value, setValue] = useState("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <input value={value} onChange={onChange} />

      <button onClick={() => props.submit(value)}>submit</button>
    </div>
  );
}
