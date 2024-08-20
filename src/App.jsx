import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Board from "~/pages/Boards/_id"
import Login from "~/pages/Login/Login"
import SignUp from "~/pages/SignUp/Signin"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Board />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App