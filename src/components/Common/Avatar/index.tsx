import React from 'react'
import styled from 'styled-components'
import { Person } from '@b1nd/dds-web'
import { useTheme } from 'styled-components'

interface AvatarSize { size: number }

const Avatar = ({size}: AvatarSize) => {
  const theme = useTheme()
  return (
    <AvatarContainer>
      <Person size={size-6} color={theme.fillAlternative}/>
    </AvatarContainer>
  )
}

const AvatarContainer = styled.div`
  padding: 8px;
  display: flex;
  aspect-ratio: 1;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.fillNormal};
`
export default Avatar

