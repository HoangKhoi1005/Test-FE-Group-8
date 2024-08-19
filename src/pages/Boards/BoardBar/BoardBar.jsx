import Chip from "@mui/material/Chip"
import Box from "@mui/material/Box"
import DashboardIcon from "@mui/icons-material/Dashboard"
import VpnLockIcon from "@mui/icons-material/VpnLock"
import Avatar from "@mui/material/Avatar"
import AvatarGroup from "@mui/material/AvatarGroup"
import { Tooltip } from "@mui/material"
import Button from "@mui/material/Button"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import { capitalizeFirstLetter } from "~/utils/formatters"
import SortOptions from "~/components/SortOptions/SortOptions"

const MENU_STYLES = {
  color:"white",
  backgroundColor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  "& .MuiSvgIcon-root": {
    color: "white"
  },
  "&:hover": {
    backgroundColor: "primary.50"
  }
}

function BoardBar({ board, sortOption, setSortOption }) {

  return (
    <Box sx={{
      width: "100%",
      height: (theme) => theme.trello.boardBarHeight,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 2,
      paddingX: 2,
      overflowX: "auto",
      backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#34495e" : "#1976d2")
    }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label= {board?.title}
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label= {capitalizeFirstLetter(board?.type)}
          clickable
        />
        <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={ <PersonAddIcon/> }
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": {
              borderColor: "white"
            }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{
            gap: "10px",
            "& .MuiAvatar-root": {
              width: 34,
              height: 34,
              fontSize: 16,
              border: "none",
              color: "white",
              cursor: "pointer",
              "&:first-of-type": { backgroundColor: "#a4b0be" }
            }
          }}
        >
          <Tooltip title="HoangKhoiDev">
            <Avatar alt="HoangKhoiDev" src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/275253747_1072102423713589_4612179048140960110_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFXLmledEki0IJrIZG56lUYLlgfC2oNXtAuWB8Lag1e0BhIdURdF0Zv82HzYLgFvxkhgEvpEyBM9xONwlzGv4Bt&_nc_ohc=0DftG3g4P1cQ7kNvgEMKrQf&_nc_ht=scontent.fsgn5-10.fna&gid=Aa1Pn0UNWd6eVdf26MOitd0&oh=00_AYCCztGFbKHBdYH1-dF1rcINGqrAMjYA_JCKD4mFuBhdGw&oe=668CCA96" />
          </Tooltip>
          <Tooltip title="HoangKhoiDev">
            <Avatar alt="HoangKhoiDev" src="https://img.freepik.com/premium-photo/cartoon-portrait-girl-with-aviator-glasses-bomber-jacket_1015980-392029.jpg?w=740" />
          </Tooltip>
          <Tooltip title="HoangKhoiDev">
            <Avatar alt="HoangKhoiDev" src="https://img.freepik.com/premium-photo/dazzling-symmetry-exploring-sparklecore-through-neon-men-with-terrapin-tortoise-shell-frame-eye-gla_1015980-40289.jpg?w=740" />
          </Tooltip>
          <Tooltip title="HoangKhoiDev">
            <Avatar alt="HoangKhoiDev" src="https://img.freepik.com/premium-photo/shades-nostalgia-unveiling-cool-boy-through-80s-anime-art_1015980-16809.jpg?w=826" />
          </Tooltip>
          <Tooltip title="HoangKhoiDev">
            <Avatar alt="HoangKhoiDev" src="https://img.freepik.com/premium-photo/rediscovering-fiery-spirit-capturing-anime-essence-22yearold-redhaired-male_1015980-94713.jpg?w=740" />
          </Tooltip>
          <Tooltip title="HoangKhoiDev">
            <Avatar alt="HoangKhoiDev" src="https://img.freepik.com/premium-photo/enigmatic-charm-anime-aesthetic-journey-through-sandara-tang-luminous-dreamscapes-kris_1015980-50159.jpg?w=360" />
          </Tooltip>

          <Tooltip title="HoangKhoiDev">
            <Avatar alt="HoangKhoiDev" src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/275253747_1072102423713589_4612179048140960110_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFXLmledEki0IJrIZG56lUYLlgfC2oNXtAuWB8Lag1e0BhIdURdF0Zv82HzYLgFvxkhgEvpEyBM9xONwlzGv4Bt&_nc_ohc=0DftG3g4P1cQ7kNvgEMKrQf&_nc_ht=scontent.fsgn5-10.fna&gid=Aa1Pn0UNWd6eVdf26MOitd0&oh=00_AYCCztGFbKHBdYH1-dF1rcINGqrAMjYA_JCKD4mFuBhdGw&oe=668CCA96" />
          </Tooltip>
          <Tooltip title="HoangKhoiDev">
            <Avatar alt="HoangKhoiDev" src="https://img.freepik.com/premium-photo/cartoon-portrait-girl-with-aviator-glasses-bomber-jacket_1015980-392029.jpg?w=740" />
          </Tooltip>
          <Tooltip title="HoangKhoiDev">
            <Avatar alt="HoangKhoiDev" src="https://img.freepik.com/premium-photo/dazzling-symmetry-exploring-sparklecore-through-neon-men-with-terrapin-tortoise-shell-frame-eye-gla_1015980-40289.jpg?w=740" />
          </Tooltip>
          <Tooltip title="HoangKhoiDev">
            <Avatar alt="HoangKhoiDev" src="https://img.freepik.com/premium-photo/shades-nostalgia-unveiling-cool-boy-through-80s-anime-art_1015980-16809.jpg?w=826" />
          </Tooltip>
          <Tooltip title="HoangKhoiDev">
            <Avatar alt="HoangKhoiDev" src="https://img.freepik.com/premium-photo/rediscovering-fiery-spirit-capturing-anime-essence-22yearold-redhaired-male_1015980-94713.jpg?w=740" />
          </Tooltip>
          <Tooltip title="HoangKhoiDev">
            <Avatar alt="HoangKhoiDev" src="https://img.freepik.com/premium-photo/enigmatic-charm-anime-aesthetic-journey-through-sandara-tang-luminous-dreamscapes-kris_1015980-50159.jpg?w=360" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
