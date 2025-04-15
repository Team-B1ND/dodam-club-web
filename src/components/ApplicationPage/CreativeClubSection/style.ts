import { DodamShape } from '@b1nd/dds-web';
import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';

export const ClubDescriptionSection = styled.div`
  position: absolute;
  top: -60px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.backgroundNormal};
  ${DodamShape.Large};
  padding: 20px;
  border: 1px ${({ theme }) => theme.lineAlternative} solid;
  overflow-y: auto;
  color: ${({ theme }) => theme.labelNormal};
`;

export const MarkDownViewer = styled(MDEditor.Markdown)`
  background-color: ${({ theme }) => theme.backgroundNormal};
  & * {
    color: ${({ theme }) => theme.labelNormal};
  }
  & pre {
    background-color: ${({ theme }) => theme.labelStrong};
  }
  & span {
    color: ${({ theme }) => theme.labelDisabled};
  }
`;