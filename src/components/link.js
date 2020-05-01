
import { Link as StyledLink, Button } from '@raid/basic-kit'
import BaseLink from 'next/link'

export const Link = ({ children, href, ...rest }) => {
  return (
    <BaseLink href={href} passHref {...rest}>
      <StyledLink>{children}</StyledLink>
    </BaseLink>
  )
}

export const NavLink = ({ children, href, ...rest }) => {
  return (
    <BaseLink href={href} passHref {...rest}>
      <Button
        as='a'
        variant='naked'
        sx={{
          display: 'block',
          textAlign: 'left'
        }}
      >
        {children}
      </Button>
    </BaseLink>
  )
}
