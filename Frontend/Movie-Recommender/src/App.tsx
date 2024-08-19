import './App.css'
import { Grid, GridItem } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import MainLayout from './components/MainLayout'

function App() {

  return (
    <>
      <Grid templateAreas={`"nav" "main"`}
      >
      <GridItem area='nav'>
        <Navbar />
      </GridItem>
      <GridItem area='main'>
        <MainLayout />
      </GridItem>
      </Grid>
    </>
  )
}

export default App
