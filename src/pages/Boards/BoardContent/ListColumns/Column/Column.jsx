import { useState } from "react"
import AddCardIcon from "@mui/icons-material/AddCard"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import FavoriteIcon from "@mui/icons-material/Favorite"
import EditIcon from "@mui/icons-material/Edit"
import styled from "styled-components"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

function Column({ column, loggedInUser, onDeleteColumn }) {
  const [showForm, setShowForm] = useState(false)
  const [newAnswer, setNewAnswer] = useState("")
  const [likes, setLikes] = useState(column.likes || 0)
  const [isLiked, setIsLiked] = useState(false)

  const handleLikeClick = async () => {
    setIsLiked(!isLiked)
    const updatedLikes = isLiked ? likes - 1 : likes + 1
    setLikes(updatedLikes)

    try {
      const response = await fetch(
        `https://66be10c274dfc195586e78a9.mockapi.io/api/questions/${column._id.replace("id-", "")}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ likes: updatedLikes })
        }
      )

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      console.log("Likes updated:", updatedLikes)
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error)
    }
  }


  const handleButtonClick = () => {
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true)
  }

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false)
  }

  const handleAddAnswer = async () => {
    if (!newAnswer.trim()) {
      alert("Câu trả lời không được để trống!")
      return
    }

    const answerToAdd = {
      name: loggedInUser.userName,
      answer: newAnswer
    }

    const questionId = column._id.replace("id-", "")

    try {
      const updatedColumn = {
        questions: column.questions,
        likes: column.likes,
        answers: [
          ...column.answers.map(answer => ({
            name: answer.userName || answer.name || answer.adminId,
            answer: answer.answer
          })),
          answerToAdd
        ],
        accountId: column.accountId
      }

      const response = await fetch(
        `https://66be10c274dfc195586e78a9.mockapi.io/api/questions/${questionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedColumn)
        }
      )

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      console.log("New answer added:", data)

      setShowForm(false)
      setNewAnswer("")
      window.location.reload()
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error)
    }
  }

  const handleDeleteConfirm = async () => {
    const questionIdDelete = column._id.replace("id-", "")

    try {
      const response = await fetch(
        `https://66be10c274dfc195586e78a9.mockapi.io/api/questions/${questionIdDelete}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ isDelete: "true" })
        }
      )

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      console.log("Question marked as deleted successfully")
      // Notify parent component about the deletion
      onDeleteColumn(column._id)
      handleCloseDeleteDialog()
    } catch (error) {
      console.error("There was a problem with the delete operation:", error)
    }
  }


  return (
    <Box
      sx={{
        minWidth: "300px",
        maxWidth: "300px",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
        ml: 2,
        borderRadius: "6px",
        height: "fit-content",
        mb: 2
      }}
    >
      {/* Box Card Header */}
      <Box
        sx={{
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {column?.questions}
          <Tooltip title="Edit">
            <EditIcon
              sx={{
                color: "#95a5a6",
                cursor: "pointer",
                fontSize: "large",
                ml: 1
              }}
            />
          </Tooltip>
        </Typography>
        {(loggedInUser?.role === "admin" || loggedInUser?.id === column?.userId) ? (
          <Box>
            <Tooltip title="Delete">
              <DeleteOutlineIcon
                sx={{ color: "text.primary", cursor: "pointer" }}
                onClick={handleDeleteClick}
              />
            </Tooltip>
          </Box>
        ) : null}
      </Box>

      {/* List of Answers */}
      <Box sx={{ padding: 2 }}>
        {column?.answers.length > 0 ? (
          column.answers.map((answer, index) => (
            <Typography key={index} sx={{ mb: 1 }}>
              <strong>{answer.userName}:</strong> {answer.answer}
            </Typography>
          ))
        ) : (
          <Typography sx={{ mb: 1, fontStyle: "italic", color: "gray" }}>
            No answers yet.
          </Typography>
        )}
      </Box>

      {/* Box Card Footer */}
      <Box
        sx={{
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {loggedInUser?.role === "admin" ? (
          <Button onClick={handleButtonClick} startIcon={<AddCardIcon />}>
            Add new answer
          </Button>
        ) : null}

        <Tooltip title="Like">
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={handleLikeClick}
          >
            <FavoriteIcon color={isLiked ? "error" : "inherit"} />
            <Typography sx={{ ml: 0 }}>{likes}</Typography>
          </Box>
        </Tooltip>

      </Box>

      {/* Form Add Answer */}
      {showForm && (
        <>
          <FormOverlay onClick={handleCloseForm} />
          <FormAddQuestion>
            <TopForm onClick={handleCloseForm}>
              <b>X</b>
            </TopForm>
            <MainForm
              placeholder="Enter your answer here"
              id="answer"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            ></MainForm>
            <SubmitQuestion type="submit" onClick={handleAddAnswer}>
              Add
            </SubmitQuestion>
          </FormAddQuestion>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận xóa câu hỏi"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn xóa câu hỏi này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Hủy</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Xác nhận xóa
          </Button>
        </DialogActions>
      </Dialog>
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
  backdrop-filter: blur(5px);
  z-index: 999;
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

export default Column
