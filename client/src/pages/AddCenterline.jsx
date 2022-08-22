import { Button } from "@mui/material";
import styled from "styled-components";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

import LoadingButton from "@mui/lab/LoadingButton";

import { useState } from "react";
import http from "../utils/http";
import axios from "axios";
import { useSelector } from "react-redux";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    setState,
    state,
    name,
    selectFtype = "application/zip, application/json",
    outputFtype = "geojson",
  } = props;

  const handleFileChange = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      const url = `http://localhost:5000/conversion/${outputFtype}`;
      const res = await axios.post(url, formData);

      setState(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.error(err);
    }
  };

  const getFileInfo = () =>
    outputFtype === "geojson"
      ? `${state.features.length} feature(s)`
      : `${state.rows?.length} rows`;

  return (
    <FormContainer>
      <LoadingButton
        loading={loading}
        component="label"
        color="inherit"
        variant="outlined"
        startIcon={<AttachFileIcon />}
      >
        {name}
        <input
          type="file"
          id={name}
          name={name}
          accept={selectFtype}
          onChange={handleFileChange}
          hidden
        />
      </LoadingButton>
      <FormFileName>
        {error ? (
          <div style={{ color: "red" }}>Could not convert to JSON</div>
        ) : state ? (
          getFileInfo()
        ) : (
          "Select a file"
        )}
      </FormFileName>
    </FormContainer>
  );
}

export default function AddCenterline(props) {
  const project = useSelector((state) => state.project.currentProject);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [line, setLine] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [footprint, setFootprint] = useState(null);
  const [elevation, setElevation] = useState(null);

  const handleSubmission = async (e) => {
    e.preventDefault();

    const centerline = {
      projectId: project._id,
      name,
      description,
      line,
      markers,
      footprint,
      elevation,
    };

    try {
      const res = await http.post("/centerlines", centerline);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
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
          <FormFileBlock state={line} setState={setLine} name="line" />
          <FormFileBlock state={markers} setState={setMarkers} name="markers" />
          <FormFileBlock
            state={footprint}
            setState={setFootprint}
            name="footprint"
          />
          <FormFileBlock
            state={elevation}
            setState={setElevation}
            name="elevation"
            selectFtype="text/csv"
            outputFtype="json"
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
