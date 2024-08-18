import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Board from "~/pages/Boards/_id"
import Login from "~/pages/Login/Login"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Board />} />
      </Routes>
    </Router>
  )
}

export default App