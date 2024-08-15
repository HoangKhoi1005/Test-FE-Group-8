import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import Footer from '~/components/Footer/Footer'

function Board() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar users={mockData?.users}/>
      <BoardBar board={mockData?.board} users={mockData?.users} />
      <BoardContent board={mockData?.board} users={mockData?.users} />
      <Footer />
    </Container>
  )
}

export default Board
