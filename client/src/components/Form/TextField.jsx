import styled from "styled-components";

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  outline: none;
  color: inherit;
  padding: 10px;
  background-color: transparent;
  width: 100%;
`;

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export default function TextField(props) {
  const { state, setState, name, type } = props;

  return (
    <Input
      placeholder={toTitleCase(name)}
      type={type}
      value={name in state ? state[name] : ""}
      onChange={(e) =>
        setState((prev) => ({ ...prev, [name]: e.target.value }))
      }
    />
  );
}
