import { Button } from "@mui/material";
import styled from "styled-components";
import filesize from "filesize";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

import { useState } from "react";

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

const FormTitle = styled.div`
  padding-bottom: 10px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 0.9em;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const FormSubmitBlock = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

const FormContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.soft};
  background-color: ${({ theme }) => theme.bgDarker};
  padding: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormFileName = styled.div`
  font-size: 0.8em;
  font-style: italic;
  color: ${({ theme }) => theme.textSoft};
  padding-right: 10px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  outline: none;
  color: inherit;
  padding: 10px;
  background-color: transparent;
  width: 100%;
`;

function FormFileBlock(props) {
  const {
    setFiles,
    files,
    fileKey,
    ftype = "application/zip, application/json",
  } = props;

  return (
    <FormContainer>
      <Button
        component="label"
        color="inherit"
        variant="outlined"
        startIcon={<AttachFileIcon />}
      >
        {fileKey}
        <input
          type="file"
          id={fileKey}
          name={fileKey}
          accept={ftype}
          onChange={(e) =>
            setFiles((prev) => ({ ...prev, [fileKey]: e.target.files[0] }))
          }
          hidden
        />
      </Button>
      <FormFileName>
        {files[fileKey]
          ? `${files[fileKey].name} • ${filesize(files[fileKey].size)}`
          : "Select a file"}
      </FormFileName>
    </FormContainer>
  );
}

export default function AddCenterline(props) {
  const [files, setFiles] = useState({
    line: null,
    markers: null,
    footprint: null,
    elevation: null,
  });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmission = (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("line", files.line);
    formData.append("markers", files.markers);
    formData.append("footprint", files.footprint);
    formData.append("elevation", files.elevation);
    console.log(formData);
  };

  return (
    <Container>
      <Wrapper>
        <FormTitle>Create a new Centerline</FormTitle>
        <Form>
          <FormContainer style={{ flexDirection: "column", gap: "10px" }}>
            <Input
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormContainer>
          <FormFileBlock files={files} setFiles={setFiles} fileKey="line" />
          <FormFileBlock files={files} setFiles={setFiles} fileKey="markers" />
          <FormFileBlock
            files={files}
            setFiles={setFiles}
            fileKey="footprint"
          />
          <FormFileBlock
            files={files}
            setFiles={setFiles}
            fileKey="elevation"
            ftype="text/csv"
          />

          <FormSubmitBlock>
            <Button
              component="label"
              variant="contained"
              endIcon={<AddCircleOutlinedIcon />}
              onClick={handleSubmission}
            >
              create
              <input hidden type="submit" />
            </Button>
          </FormSubmitBlock>
        </Form>
      </Wrapper>
    </Container>
  );
}
