import styled from 'styled-components'

export type ButtonProps = {
  bg?: string,
  fg?: string,
}

export const Button = styled.button<ButtonProps>`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  background-color: ${((props: ButtonProps) => props.bg ?? 'var(--primaryDark)')};
  color: ${((props: ButtonProps) => props.fg ?? 'var(--mainLight)')};
  cursor: pointer;
  transition: border-color 0.25s;
  &:hover {
    border-color: var(--primaryLight);
  }
`
