import Box from "@mui/material/Box"
import ListColumns from "./ListColumns/ListColumns"
import { useEffect, useState } from "react"

function BoardContent({ board, loggedInUser, sortOption, valueSearch }) {
  const [columns, setColumns] = useState(board?.columns || [])

  useEffect(() => {
    const filterAndSortColumns = () => {
      let filteredColumns = board?.columns.filter((col) => !col.isDelete)

      if (valueSearch) {
        filteredColumns = filteredColumns.filter((col) =>
          col.questions.toLowerCase().includes(valueSearch.toLowerCase())
        )
      }

      if (sortOption === "answered") {
        filteredColumns = filteredColumns.filter(
          (col) => col.answers.length > 0
        )
      } else if (sortOption === "unanswered") {
        filteredColumns = filteredColumns.filter(
          (col) => col.answers.length === 0
        )
      }

      return filteredColumns
    }

    setColumns(filterAndSortColumns())
  }, [sortOption, board?.columns, valueSearch])

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
        width: "100%",
        height: (theme) => theme.trello.boardContentHeight,
        padding: "10px 0"
      }}
    >
      <ListColumns
        columns={columns}
        loggedInUser={loggedInUser}
        setColumns={setColumns}
      />
    </Box>
  )
}

export default BoardContent
