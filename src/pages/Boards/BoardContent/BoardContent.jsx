import Box from "@mui/material/Box"
import ListColumns from "./ListColumns/ListColumns"
import { useEffect, useState } from "react"

function BoardContent({ board, loggedInUser }) {

  const [columns, setColumns] = useState(board?.columns || [])
  useEffect(() => {
    if (board?.columns) {
      setColumns(board.columns)
    }
  }, [board])

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
      <ListColumns columns={columns} loggedInUser={loggedInUser} setColumns={setColumns} />
    </Box>
  )
}

export default BoardContent
