import Box from "@mui/material/Box"
import ListColumns from "./ListColumns/ListColumns"

function BoardContent({ board, loggedInUser }) {
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
      <ListColumns columns={board?.columns} loggedInUser={loggedInUser} />
    </Box>
  )
}

export default BoardContent
