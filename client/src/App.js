import "./App.css";
import Login from "./components/login/Login";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./routes/Routing";
function App() {
  return (
    <Router>
      <Routing />
    </Router>
  );
}

export default App;
