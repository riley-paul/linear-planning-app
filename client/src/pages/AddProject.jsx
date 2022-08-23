import styled from "styled-components";
import Form from "../components/Form";

import FieldContainer from "../components/Form/FieldContainer";
import FileField from "../components/Form/FileField";
import TextField from "../components/Form/TextField";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  max-width: 600px;
  min-width: 450px;
  padding-top: 20px;
`;

export default function AddProject(props) {
  return (
    <Form title="Add new Centerline" actionName="create">
      <FieldContainer>
        <TextField name="name" />
        <TextField name="description" />
      </FieldContainer>
      <FieldContainer title="Select files for the following">
        <FileField name="line" />
        <FileField name="markers" />
        <FileField name="footprint" />
        <FileField name="elevation" />
      </FieldContainer>
    </Form>
  );
}
