import { useState, useEffect } from "react"
import Container from "@mui/material/Container"
import AppBar from "~/components/AppBar/AppBar"
import BoardBar from "./BoardBar/BoardBar"
import BoardContent from "./BoardContent/BoardContent"
import { mockData as initialMockData } from "~/apis/mock-data"
import Footer from "~/components/Footer/Footer"
import axios from "axios"

const getAPI = () => {
  return axios
    .get("https://66be10c274dfc195586e78a9.mockapi.io/api/questions")
    .then((response) => response.data)
    .catch((error) => {
      console.error(error)
      return []
    })
}

const transformData = (data) => {
  return data
    .filter((item) => item.isDelete !== "true")
    .map((item) => ({
      _id: `id-${item.id}`,
      userId: item.accountId,
      questions: item.questions,
      likes: item.like,
      answers: item.answers.map((answer) => ({
        adminId: answer.name,
        answer: answer.answer,
        userName: answer.name
      }))
    }))
}


function Board() {
  const [board, setBoard] = useState(initialMockData.board)
  const [loggedInUser, setLoggedInUser] = useState(null)

  const storedUser = localStorage.getItem("loggedInUser")

  useEffect(() => {
    const updateMockData = async () => {
      try {
        const questionsData = await getAPI()
        setBoard((prevBoard) => ({
          ...prevBoard,
          columns: transformData(questionsData)
        }))
      } catch (error) {
        console.error("Error updating mock data:", error)
      }
    }
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser))
    }

    updateMockData()
  }, [storedUser])


  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar loggedInUser={loggedInUser} />
      <BoardBar board={board} loggedInUser={loggedInUser} />
      <BoardContent board={board} loggedInUser={loggedInUser} />
      <Footer />
    </Container>
  )
}


export default Board
