import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.footer`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: ${rem(16)} ${rem(24)};
  color: ${_ => _.theme.colors.secondary};
`

const A = styled.a`
  color:${_ => _.theme.colors.secondary};
`

function Footer() {
  return (
    <Wrapper>
      <div style={{ marginRight: rem(24) }}>©2022 All Rights Reserved</div>
      <div><A target="__blank" href="https://beian.miit.gov.cn/">闽ICP备18021344号-1</A></div>
    </Wrapper>
  )
}

export default Footer
