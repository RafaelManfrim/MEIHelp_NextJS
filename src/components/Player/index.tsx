import { Player as VimePlayer, Youtube, DefaultUi } from '@vime/react'

interface PlayerProps {
  videoId: string
}

const Player = ({ videoId }: PlayerProps) => (
  <VimePlayer>
    <Youtube videoId={videoId} />
    <DefaultUi />
  </VimePlayer>
)

export default Player