const TotalCost = ({ bill, totalTip }) => {
  return (
    <div>
      <h2>
        You pay {bill + totalTip} (${bill} + ${totalTip} tip)
      </h2>
    </div>
  );
};

export default TotalCost;
