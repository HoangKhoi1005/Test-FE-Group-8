import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

function ListColumns({ columns }) {

  const columnPairs = []
  for (let i = 0; i < columns?.length; i += 2) {
    columnPairs.push(columns.slice(i, i + 2))
  }

  return (
    <Box sx={{
      backgroundColor: 'inherit',
      width: '100%',
      height: '100%',
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden',
      '&::-webkit-scrollbar-track': { margin: 2 }
    }}>
      {columnPairs?.map((pair, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', minWidth: '300px', maxWidth: '200px', mx: 2 }}>
          {pair.map(column => (
            <Column key={column._id} column={column} />
          ))}
        </Box>
      ))}

      {/* Add new column button */}
      <Box sx={{
        minWidth: '200px',
        maxWidth: '200px',
        mx: 2,
        borderRadius: '6px',
        height: 'fit-content',
        backgroundColor: '#ffffff3d'
      }}>
        <Button
          startIcon={<NoteAddIcon />}
          sx={{
            color: 'white',
            width: '100%',
            justifyContent: 'flex-start',
            paddingLeft: 2.5,
            py: 1
          }}
        >
          Add New Questions
        </Button>
      </Box>
    </Box>
  )
}

export default ListColumns
