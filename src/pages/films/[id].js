
import { Box, H2 } from '@raid/basic-kit'
import { useRouter } from 'next/router'

const Film = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Box>
      <H2>{id}</H2>
    </Box>
  )
}

export default Film
