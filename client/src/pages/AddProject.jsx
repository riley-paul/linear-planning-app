import Form from "../components/Form";
import FieldContainer from "../components/Form/FieldContainer";
import FileField from "../components/Form/FileField";
import TextField from "../components/Form/TextField";

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
