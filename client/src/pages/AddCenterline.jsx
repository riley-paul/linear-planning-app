import Form from "../components/Form";
import FieldContainer from "../components/Form/FieldContainer";
import FileField from "../components/Form/FileField";
import TextField from "../components/Form/TextField";

import { useDispatch, useSelector } from "react-redux";
import { addCenterlineHandler } from "../api/centerline";

export default function AddCenterline(props) {
  const project = useSelector((state) => state.project.currentProject);
  const dispatch = useDispatch();
  const handleAddCenterline = addCenterlineHandler(dispatch);

  const error = useSelector((state) => state.centerline.error);
  const loading = useSelector((state) => state.centerline.loading);

  const handleSubmission = async (e, state) => {
    e.preventDefault();
    handleAddCenterline({ projectId: project.id, ...state });
  };

  return (
    <Form
      title="Add new Centerline"
      actionName="create"
      onSubmission={handleSubmission}
      error={error}
      loading={loading}
    >
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
