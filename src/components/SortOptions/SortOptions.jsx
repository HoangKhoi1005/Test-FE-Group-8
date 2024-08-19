import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"

function SortOptions({ sortOption, setSortOption }) {
  const handleChange = (event) => {
    const selectedOption = event.target.value
    setSortOption(selectedOption)
  }

  return (
    <FormControl size="small" sx={{ minWidth: "200px" }}>
      <InputLabel
        id="label-select-sort-options"
        sx={{
          color: "white",
          "&.Mui-focused": { color: "white" }
        }}
      >
        Sort By
      </InputLabel>
      <Select
        labelId="label-select-sort-options"
        id="select-sort-options"
        value={sortOption}
        label="Sort By"
        onChange={handleChange}
        sx={{
          color: "white",
          ".MuiOutlinedInput-notchedOutline": { borderColor: "white" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
          ".MuiSvgIcon-root": { color: "white" }
        }}
      >
        <MenuItem value="all">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FormatListBulletedIcon fontSize='small' /> All Questions
          </Box>
        </MenuItem>
        <MenuItem value="answered">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CheckCircleIcon fontSize='small' /> Answered
          </Box>
        </MenuItem>
        <MenuItem value="unanswered">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CancelOutlinedIcon fontSize='small' /> Unanswered
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default SortOptions
