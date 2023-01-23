import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Text = styled.p`
  text-align: center;

  &.emoji {
    font-size: 45px;
  }
`

export { Wrapper, Text }
