import { useDispatch, useSelector } from "react-redux";
import { registerHandler } from "../api/auth";
import Form from "../components/Form";
import FieldContainer from "../components/Form/FieldContainer";
import TextField from "../components/Form/TextField";

export default function Register(props) {
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const dispatch = useDispatch();
  const handleRegister = registerHandler(dispatch);

  const submissionHandler = (e, state) => {
    e.preventDefault();
    handleRegister(state);
  };

  return (
    <Form
      actionName="register"
      onSubmission={submissionHandler}
      loading={loading}
      error={error}
    >
      <FieldContainer>
        <TextField name="name" />
        <TextField name="email" type="email" />
        <TextField name="password" type="password" />
      </FieldContainer>
    </Form>
  );
}
