import type { NextPage } from 'next'
import { Header } from '../components/template/Header'
import { LandingPageContainer } from './styles'

const Home: NextPage = () => {
  return (
    <LandingPageContainer>
      <Header landingHeader />
    </LandingPageContainer>
  )
}

export default Home
