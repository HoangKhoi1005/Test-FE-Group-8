import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import PersonIcon from '@mui/icons-material/Person'

function Footer() {
  const members = [
    { name: 'Trần Hoàng Khôi', icon: <PersonIcon /> },
    { name: 'Nguyễn Thanh Vi', icon: <PersonIcon /> },
    { name: 'Võ Tuấn Kiệt', icon: <PersonIcon /> },
    { name: 'Lê Văn Tú', icon: <PersonIcon /> }
  ]

  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.footerHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'),
      padding: '1rem'
    }}>
      <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white', mr: 2 }}>
        Nhóm 8
      </Typography>
      <Stack direction="row" spacing={2}>
        {members.map((member, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
            <Avatar sx={{ bgcolor: 'white', color: '#1565c0', mr: 1 }}>
              {member.icon}
            </Avatar>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {member.name}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export default Footer
