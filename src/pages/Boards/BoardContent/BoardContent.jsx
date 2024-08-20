import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { useEffect, useState } from "react";

function BoardContent({ board, loggedInUser, sortOption, valueSearch }) {
  const [columns, setColumns] = useState(board?.columns || []);

  useEffect(() => {
    const filterColumns = () => {
      if (sortOption === "answered") {
        return board?.columns.filter(
          (col) => col.answers.length > 0 && !col.isDelete
        );
      } else if (sortOption === "unanswered") {
        return board?.columns.filter(
          (col) => col.answers.length === 0 && !col.isDelete
        );
      } else {
        return board?.columns.filter((col) => !col.isDelete);
      }
    };
    const filterColumnsBySearch = () => {
      if (valueSearch) {
        return board?.columns.filter((col) =>
          col.questions.toLowerCase().includes(valueSearch.toLowerCase())
        );
      }
      return board?.columns;
    };
    setColumns(filterColumnsBySearch());
    // setColumns(filterColumns());
  }, [sortOption, board?.columns, valueSearch]);

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
        width: "100%",
        height: (theme) => theme.trello.boardContentHeight,
        padding: "10px 0",
      }}
    >
      <ListColumns
        columns={columns}
        loggedInUser={loggedInUser}
        setColumns={setColumns}
      />
    </Box>
  );
}

export default BoardContent;
