import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const TagItem = styled.span`
  position: relative;
  box-sizing: border-box;
  font-weight: 400;
  height: 32px;
  line-height: 32px;
  border-radius: 3px;
  font-size: 12px;
  background-color: ${p => p.theme.widget.input.bg};
  padding: 0px 16px;
  display: flex;
  align-items: center;
  svg:first-child {
    color: ${p => p.theme.colors.primary};
    margin-right: 2px;
  }
  svg:last-child {
    color: ${p => p.theme.colors.error};
  }
`;

export const TagInput = styled.span`
  width: 110px;
  height: 32px;
  line-height: 32px;
  position: relative;
  box-sizing: border-box;
  font-weight: 400;
  border-radius: 3px;
  font-size: 12px;
  background-color: ${p => p.theme.widget.input.bg};
  padding: 0px 12px;
  display: flex;
  align-items: center;
  input {
    width: 100%;
    height: 100%;
    outline: 0;
    color: ${p => p.theme.colors.text};
    ::placeholder {
      color: ${p => p.theme.colors.text};
    }
  }
`;
