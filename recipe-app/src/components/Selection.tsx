import { useEffect, useState } from "react";

type SelectionProps = {
  label: string;
  list: string[];
  setList: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Selection({ label, list, setList }: SelectionProps) {
  const [selected, setSelected] = useState(false);

  const base =
    "flex items-start rounded-md group-hover:bg-green-200 bg-gray-100 border-gray-900/30 group-hover:border-green-900 border p-3 ";
  const selectedStyle = "bg-green-200 border-green-600";
  const baseStyle = "bg-gray-100 border-gray-900/30";

  useEffect(() => {
    if (selected) {
      setList([...list, label]);
    } else {
      setList(list.filter((item) => item !== label));
    }
  }, [selected]);

  return (
    <fieldset
      className="group hover:cursor-pointer"
      onClick={() => {
        setSelected(!selected);
      }}
    >
      <div className={base + (selected ? selectedStyle : baseStyle)}>
        <div className="flex items-center h-5">
          <input
            id={label}
            name={label}
            type="checkbox"
            className="h-4 w-4 rounded-md hover:cursor-pointer"
            checked={selected}
            onChange={(e) => {
              if (e.target.checked) {
                console.log("checked", label);
              }
            }}
          />
        </div>
        <div className="ml-3 text-sm">
          <label className="font-bold hover:cursor-pointer">{label}</label>
        </div>
      </div>
    </fieldset>
  );
}
