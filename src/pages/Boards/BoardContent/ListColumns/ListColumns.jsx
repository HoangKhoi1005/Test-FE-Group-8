import Box from "@mui/material/Box"
import Column from "./Column/Column"
import Button from "@mui/material/Button"
import NoteAddIcon from "@mui/icons-material/NoteAdd"
import { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

function ListColumns({ columns, loggedInUser, setColumns }) {
  const navigate = useNavigate()
  const columnPairs = []
  for (let i = 0; i < columns?.length; i += 2) {
    columnPairs.push(columns.slice(i, i + 2))
  }

  const [newQuestion, setNewQuestion] = useState([
    { _id: "", userId: "", questions: "", likes: 0, answers: [] }
  ])
  const [addQuestion, setAddQuestion] = useState(false)

  const handleDeleteColumn = (columnId) => {
    setColumns(prevColumns => prevColumns.filter(col => col._id === columnId))
  }

  const transformQuestionData = (question) => {
    return {
      questions: question.questions,
      like: question.likes,
      answers: question.answers,
      id: question._id.replace("id-", ""),
      accountId: question.userId
    }
  }

  const handleAddQuestion = async () => {
    const newQ = document.getElementById("ask").value
    console.log("Câu hỏi: ", newQ)
    const questionToAdd = {
      _id: `id-${columns?.length + 1}`,
      userId: loggedInUser.id, // Sử dụng ID người dùng đã đăng nhập
      questions: newQ,
      likes: 0,
      answers: []
    }

    const transformedQuestion = transformQuestionData(questionToAdd)

    try {
      const response = await fetch(
        "https://66be10c274dfc195586e78a9.mockapi.io/api/questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(transformedQuestion)
        }
      )

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      console.log("New question added:", data)

      setNewQuestion([
        { _id: "", userId: "", questions: "", likes: 0, answers: [] }
      ])
      setAddQuestion(!addQuestion)
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error)
    }
    window.location.reload()
  }

  const handleAddQuestionClick = () => {
    if (!loggedInUser) {
      navigate("/login")
    } else {
      setAddQuestion(!addQuestion)
    }
  }

  return (
    <Box sx={{
      backgroundColor: "inherit",
      width: "100%",
      height: "100%",
      display: "flex",
      overflowX: "auto",
      overflowY: "auto",
      "&::-webkit-scrollbar-track": { margin: 2 }
    }}>
      <Box
        sx={{
          backgroundColor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "auto",
          "&::-webkit-scrollbar-track": { margin: 2 }
        }}
      >
        {columnPairs?.map((pair, pairIndex) => (
          <Box
            key={`box-${pairIndex}`}
            sx={{
              display: "flex",
              flexDirection: "column",
              minWidth: "300px",
              maxWidth: "200px",
              mx: 2
            }}
          >
            {pair.map((column) => (
              <Column
                key={column._id}
                column={column}
                loggedInUser={loggedInUser}
                onDeleteColumn={handleDeleteColumn}
              />
            ))}
          </Box>
        ))}

        {/* Add new column button */}
        <Box
          sx={{
            minWidth: "200px",
            maxWidth: "200px",
            mx: 2,
            borderRadius: "6px",
            height: "fit-content",
            backgroundColor: "#ffffff3d"
          }}
        >
          <Button
            startIcon={<NoteAddIcon />}
            sx={{
              color: "white",
              width: "100%",
              justifyContent: "flex-start",
              paddingLeft: 2.5,
              py: 1
            }}
            onClick={handleAddQuestionClick} // Thay đổi hàm gọi khi bấm nút
          >
            Add New Questions
          </Button>
        </Box>
      </Box>
      {addQuestion && <FormOverlay onClick={() => setAddQuestion(false)} />}
      {addQuestion && (
        <FormAddQuestion>
          <TopForm onClick={() => setAddQuestion(false)}>
            <b>X</b>
          </TopForm>
          <MainForm placeholder="Question?" id="ask"></MainForm>
          <SubmitQuestion type="submit" onClick={handleAddQuestion}>
            Add
          </SubmitQuestion>
        </FormAddQuestion>
      )}
    </Box>
  )
}

const SubmitQuestion = styled.button`
  cursor: pointer;
  position: fixed;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  bottom: 2%;
  right: 2%;
  line-height: 1.5;
  transition: all 0.2s ease-in-out;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  &:focus,
  &:active {
    outline: none;
    box-shadow: 0px 0px 0px 4px rgba(0, 123, 255, 0.5);
  }
`

const MainForm = styled.textarea`
  display: block;
  width: 100%;
  min-height: 80px;
  max-height: 150px;
  border-radius: 8px;
  margin: 20px 0;
  padding: 12px;
  font-family: 'Arial', Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  border: 1px solid #ccc;
  resize: vertical;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    border-color: #007bff;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
    outline: none;
  }
`

const TopForm = styled.button`
  background-color: transparent;
  border: none;
  color: #dc3545;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
  float: right;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #ffc107;
  }

  &:focus,
  &:active {
    outline: none;
  }
`

const FormOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px); /* Làm mờ nền */
  z-index: 999; /* Đảm bảo overlay luôn ở phía trên */
`

const FormAddQuestion = styled.div`
  position: fixed;
  display: block;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  z-index: 1000;
  min-width: 300px;
  max-width: 600px;
  width: 100%;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  opacity: 1;
  visibility: visible;

  &.hidden {
    opacity: 0;
    visibility: hidden;
    transform: translate(-50%, -40%);
  }
`


export default ListColumns
