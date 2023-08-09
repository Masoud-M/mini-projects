import React, { useRef, useState, useEffect } from "react";

const App = () => {
  // for storing the input values
  const [inputs, setInputs] = useState({
    firstInput: "",
    selectInput: "",
    secondInput: "",
    thirdInput: "",
  });

  // for keep tracking of inputs and changing the focus
  const inputRefs = useRef({
    firstInput: [] as string[],
    selectInput: [] as string[],
    secondInput: [] as string[],
    thirdInput: [] as string[],
  });

  const handleChange = (e: React.BaseSyntheticEvent) => {
    const { name, value, id } = e.target;

    // updating the values
    setInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    // changing the focus to the next element
    if (id === "firstInput" && value.length === 2) {
      inputRefs.current.selectInput.focus();
    } else if (id === "selectInput") {
      inputRefs.current.secondInput.focus();
    } else if (id === "secondInput" && value.length === 3) {
      inputRefs.current.thirdInput.focus();
    }
  };

  useEffect(() => {
    inputRefs.current.firstInput.focus();
  }, []);

  return (
    <div>
      <input
        style={{ width: 50, marginRight: 10 }}
        name="firstInput"
        id="firstInput"
        type="number"
        placeholder="--"
        value={inputs.firstInput}
        onChange={handleChange}
        maxLength={2}
        ref={(input) => (inputRefs.current.firstInput = input)}
      />
      <select
        style={{ width: 100, marginRight: 10 }}
        name="selectInput"
        id="selectInput"
        value={inputs.selectInput}
        onChange={handleChange}
        ref={(select) => (inputRefs.current.selectInput = select)}
      >
        <option disabled selected value="">
          choose
        </option>
        <option value="الف">الف</option>
        <option value="ب">ب</option>
        <option value="پ">پ</option>
      </select>
      <input
        style={{ width: 50, marginRight: 10 }}
        name="secondInput"
        id="secondInput"
        type="number"
        placeholder="---"
        value={inputs.secondInput}
        onChange={handleChange}
        maxLength={3}
        ref={(input) => (inputRefs.current.secondInput = input)}
      />

      {/* maxLength attribute does not work with the type of number and that's why I have changed the type to text and limited the input to numbers by defining a pattern */}
      <input
        style={{ width: 50, marginRight: 10 }}
        name="thirdInput"
        id="thirdInput"
        type="text"
        pattern="\d*"
        placeholder="--"
        value={inputs.thirdInput}
        onChange={handleChange}
        maxLength={2}
        ref={(input) => (inputRefs.current.thirdInput = input)}
      />
    </div>
  );
};

export default App;
