
import styled from 'styled-components'
import { css } from '@styled-system/css'
import { sx } from '@raid/ui-core'
import { Box, Aspect } from '@raid/basic-kit'
import { Icon } from 'react-icons-kit'
import { sun } from 'react-icons-kit/feather/sun'

const NavWrapper = styled(Box)(
  css({
    flex: 1,
    pl: 1,
    pr: 2,
    py: 3,
    height: 'full'
  }),
  sx
)
NavWrapper.defaultProps = {
  as: 'aside'
}

const NavBody = styled(Box)(
  css({
    py: 4,
    '> *': {
      my: 2
    }
  })
)
NavBody.defaultProps = {
  as: 'nav'
}

export const Nav = ({
  children
}) => {
  return (
    <NavWrapper>
      <Aspect ratio={4 / 3}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'secondary'
          }}
        >
          <Icon icon={sun} size={64} color='inherit' />
        </Box>
      </Aspect>
      <NavBody>
        {children}
      </NavBody>
    </NavWrapper>
  )
}
