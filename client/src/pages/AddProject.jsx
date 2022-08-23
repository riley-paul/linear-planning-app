import { useDispatch, useSelector } from "react-redux";
import Form from "../components/Form";
import FieldContainer from "../components/Form/FieldContainer";
import TextField from "../components/Form/TextField";

export default function AddProject(props) {
  const dispatch = useDispatch();
  // const handleAddProject = addProjectHandler(dispatch);

  const error = useSelector((state) => state.projects.error);
  const loading = useSelector((state) => state.projects.loading);

  const handleSubmission = async (e, state) => {
    e.preventDefault();
    // handleAddProject();
  };

  return (
    <Form title="Add new Project" actionName="create">
      <FieldContainer>
        <TextField name="name" />
        <TextField name="description" />
      </FieldContainer>
    </Form>
  );
}
