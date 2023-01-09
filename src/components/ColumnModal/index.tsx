import { ChangeEvent, useState } from "react";

interface IColumnModal {
  submit: (e: string) => void;
}
export default function ColumnModal(props: IColumnModal) {
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
