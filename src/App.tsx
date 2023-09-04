import JumpOnFocus from "./components/JumpOnFocus";
import CurrencyConverter from "./components/currency-converter/CurrencyConverter";
import ReactQuiz from "./components/react-quiz/ReactQuiz";
import SplitTheBill from "./components/splitthebill/SplitTheBill";
import TipCalculator from "./components/tip-calculator/TipCalculator";
import Geolocation from "./components/useGeolocation/Geolocation";
import BankAccount from "./components/useReducer-bankAccount/BankAccount";
function App() {
  return (
    <>
      <div>
        <BankAccount />
      </div>
    </>
  );
}

export default App;
