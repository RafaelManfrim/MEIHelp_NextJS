import type { NextPage } from 'next'
import { Base } from '../../components/template'
import { MainContainer, Training, TrainingsContainer, TrainingsTitle } from './styles'

const Trainings: NextPage = () => {
    return (
        <Base>
            <MainContainer>
                <TrainingsTitle>
                    Treinamentos
                </TrainingsTitle>
                <TrainingsContainer>
                    <Training>
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/r9buAwVBDhA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </Training>
                    <Training>
                        <iframe width="100%" height="100%"src="https://www.youtube.com/embed/r9buAwVBDhA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </Training>
                    <Training>
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/r9buAwVBDhA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </Training>
                    <Training>
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/r9buAwVBDhA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </Training>
                    <Training>
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/r9buAwVBDhA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </Training>
                    <Training>
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/r9buAwVBDhA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </Training>
                </TrainingsContainer>
            </MainContainer>
        </Base>
    )
}

export default Trainings
