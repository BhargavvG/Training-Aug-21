import "./App.css";
import BookApp from "./Components/Book/BookApp";

// Passing Method to Child Component / Prop Drilling
function App() {
  return (
    <div>
      <BookApp></BookApp>
    </div>
  );
}

export default App;
