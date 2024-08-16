import Box from "@mui/material/Box"
import Column from "./Column/Column"
import Button from "@mui/material/Button"
import NoteAddIcon from "@mui/icons-material/NoteAdd"
import { useState } from "react"
import styled from "styled-components"

function ListColumns({ columns }) {
  const columnPairs = []
  for (let i = 0; i < columns?.length; i += 2) {
    columnPairs.push(columns.slice(i, i + 2))
  }

  const [newQuestion, setNewQuestion] = useState([
    { _id: "", userId: "", questions: "", likes: 0, answers: [] }
  ])
  const [addQuestion, setAddQuestion] = useState(false)

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
      userId: "3",
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
  }

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
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
              <Column key={column.id} column={column} />
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
            onClick={() => {
              setAddQuestion(!addQuestion)
            }}
          >
            Add New Questions
          </Button>
        </Box>
      </Box>
      {addQuestion && (
        <FormAddQuestion>
          <TopForm onClick={() => setAddQuestion(!addQuestion)}>
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
  float: right;
  position: fixed;
  background-color: #007bff;
  color: #fff;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  bottom: 2%;
  right: 2%;
  line-height: 1.5;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:hover {
    background-color: #0056b3;
    border-color: #004085;
    color: #fff;
  }

  &:focus,
  &:active {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
  }
`

const MainForm = styled.textarea`
  display: block;
  min-width: 50px;
  max-width: 500px;
  width: 100%;
  min-height: 25px;
  max-height: 63px;
  height: 100%;
  border-radius: 5px;
  margin: 20px 10px 20px 10px;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 300;
`

const TopForm = styled.button`
  background-color: transparent;
  display: block;
  border: none;
  color: red;
  float: right;
  cursor: pointer;
  &:hover {
    color: yellow;
  }
`

const FormAddQuestion = styled.div`
  position: fixed;
  display: block;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  min-width: 250px;
  max-width: 500px;
  width: 100%;
  min-height: 150px;
  max-height: 300px;
  height: auto;
  background-color: white;
  padding: 16px;
  border-radius: 10px;
  visibility: visible;
`

export default ListColumns
