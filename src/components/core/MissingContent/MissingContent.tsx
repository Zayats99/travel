import React from 'react'

import * as S from './styles'

const MissingContent = () => {
  return (
    <S.Wrapper>
      <S.Text>
        We're sorry but it seems like this part of the application is empty.
      </S.Text>
      <S.Text>
        Please try coming back in a while.
      </S.Text>
      <S.Text className='emoji'>
        🥘
      </S.Text>
    </S.Wrapper>
  )
}

MissingContent.displayName = 'MissingContent'
export default MissingContent
