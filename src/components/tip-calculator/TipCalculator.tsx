import { useState } from "react";
import BillInput from "./BillInput";
import ResetBtn from "./ResetBtn";
import TipInput from "./TipInput";
import TotalCost from "./TotalCost";

const TipCalculator = () => {
  const [bill, setBill] = useState("");
  const [tip1, setTip1] = useState(0);
  const [tip2, setTip2] = useState(0);
  const averageTip = (tip1 + tip2) / 2;
  const totalTip = bill * (averageTip / 100);
  const handleReset = () => {
    setBill("");
    setTip1(0);
    setTip2(0);
  };
  return (
    <div>
      <BillInput bill={bill} setBill={setBill} />
      <TipInput tip={tip1} setTip={setTip1}>
        How did you like the service?
      </TipInput>
      <TipInput tip={tip2} setTip={setTip2}>
        How did your friend like the service?
      </TipInput>

      <TotalCost bill={bill} totalTip={totalTip} />
      <ResetBtn onReset={handleReset} />
    </div>
  );
};

export default TipCalculator;
