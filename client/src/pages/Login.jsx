import { useDispatch, useSelector } from "react-redux";
import { loginHandler } from "../api/auth";
import Form from "../components/Form";
import FieldContainer from "../components/Form/FieldContainer";
import TextField from "../components/Form/TextField";

export default function Login(props) {
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const dispatch = useDispatch();
  const handleLogin = loginHandler(dispatch);

  const submissionHandler = (e, state) => {
    e.preventDefault();
    handleLogin(state);
  };

  return (
    <Form
      actionName="login"
      onSubmission={submissionHandler}
      loading={loading}
      error={error}
    >
      <FieldContainer>
        <TextField name="email" type="email" />
        <TextField name="password" type="password" />
      </FieldContainer>
    </Form>
  );
}
