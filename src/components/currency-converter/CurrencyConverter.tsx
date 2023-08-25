// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

const CurrencyConverter = () => {
  const [input, setInput] = useState<number>(1000);
  //   console.log(input);
  const [output, setOutput] = useState([]);
  const [from, setFrom] = useState("USD");
  //   console.log(from);
  const [to, setTo] = useState("EUR");
  //   console.log(to);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function conversion() {
      setIsLoading(true);
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${input}&from=${from}&to=${to}`
      );

      const data = await res.json();
      setOutput(data.rates[to]);
      setIsLoading(false);
    }

    if (from === to) return setOutput(input);
    conversion();
  }, [input, from, to]);
  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output}</p>
    </div>
  );
};

export default CurrencyConverter;
