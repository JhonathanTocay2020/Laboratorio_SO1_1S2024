import './App.css';
import Graphviz from 'graphviz-react'

function App() {
  return (
    <div className="App">
      <h1>Clase 6</h1>
      <Graphviz dot={`graph {
        grandparent -- "parent A";
        child;
        "parent B" -- child;
        grandparent --  "parent B";
      }`} />

      <Graphviz dot={`digraph {
        a -> b;
        c;
        d -> c;
        a -> d;
      }`} />
    </div>
  );
}

export default App;
