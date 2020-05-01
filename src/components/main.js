
import styled from 'styled-components'
import { css } from '@styled-system/css'
import { sx } from '@raid/ui-core'
import { Box } from '@raid/basic-kit'

export const Main = styled(Box)(
  css({
    flex: 1,
    pl: 1,
    pr: 2,
    py: 3
  }),
  sx
)
Main.defaultProps = {
  as: 'main'
}
