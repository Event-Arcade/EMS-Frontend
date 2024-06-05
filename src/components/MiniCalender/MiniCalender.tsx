import { useState } from "react";
import Calendar from "react-calendar";
import "./miniCalender.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const MiniCalender = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <Calendar onChange={onChange} value={value} selectRange={true} />
    </div>
  );
};

export default MiniCalender;
