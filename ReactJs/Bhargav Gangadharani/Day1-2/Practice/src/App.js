import React from "react";
import { name, greetings } from "./components/message";

const Hello = () => <h2>Hello World</h2>;

const App = () => (
  <>
    <Hello />

    <section>
      <h2>This is just for practice </h2>
      <p>
        {greetings} This is {name}
      </p>
    </section>
  </>
);

class App1 extends React.Component {
  render() {
    return (
      <>
        <Hello />

        <section>
          <h2>This is just for practice </h2>
          <p>
            {greetings} This is {name}
          </p>
        </section>
      </>
    );
  }
}

export default App1;
