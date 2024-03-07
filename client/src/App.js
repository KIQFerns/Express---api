import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import api from "./Api";

//componentes principais
import TabelaClientes from "./components/TabelaClientes";

function App() {
  const [info, setInfo] = useState();

  useEffect(() => {
    api
      .get("/")
      .then((response) => setInfo(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h3>{info?.titulo}</h3>
        <TabelaClientes/>
      </header>
    </div>
  );
}

export default App;
