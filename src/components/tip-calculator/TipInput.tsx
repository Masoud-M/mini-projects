const TipInput = ({ tip, setTip, children }) => {
  return (
    <div>
      {children}
      <select value={tip} onChange={(e) => setTip(Number(e.target.value))}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">it was okay (5%)</option>
        <option value="10">it was good (10%)</option>
        <option value="20">it was amazing! (20%)</option>
      </select>
    </div>
  );
};

export default TipInput;
