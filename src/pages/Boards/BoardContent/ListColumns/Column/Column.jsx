import AddCardIcon from '@mui/icons-material/AddCard'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EditIcon from '@mui/icons-material/Edit'

function Column({ column }) {
  return (
    <Box
      sx={{
        minWidth: '300px',
        maxWidth: '300px',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
        ml: 2,
        borderRadius: '6px',
        height: 'fit-content',
        mb: 2
      }}
    >
      {/* Box Card Header */}
      <Box sx={{
        padding: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography variant='h6' sx={{
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          {column?.questions}
          <Tooltip title="Edit">
            <EditIcon sx={{ color: '#95a5a6', cursor: 'pointer', fontSize: 'large', ml: 1 }} />
          </Tooltip>
        </Typography>
        <Box>
          <Tooltip title="Delete">
            <DeleteOutlineIcon
              sx={{ color: 'text.primary', cursor: 'pointer' }}
              id="basic-card-dropdown"
              aria-controls={open ? 'basic-menu-card-dropdown' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            />
          </Tooltip>
        </Box>
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
          <Typography sx={{ mb: 1, fontStyle: 'italic', color: 'gray' }}>
            No answers yet.
          </Typography>
        )}
      </Box>

      {/* Box Card Footer */}
      <Box sx={{
        padding: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Button startIcon={<AddCardIcon />}>Add new answer</Button>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {column?.likes > 0 ?
            (<><FavoriteIcon color="error" /><Typography sx={{ ml: 0 }}>{column?.likes}</Typography></>) : (<><FavoriteIcon/><Typography sx={{ ml: 0 }}>{column?.likes}</Typography></>)}
        </Box>
      </Box>
    </Box>
  )
}

export default Column
