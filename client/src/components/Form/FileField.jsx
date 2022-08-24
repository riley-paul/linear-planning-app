import { useState } from "react";
import axios from "axios";

import LoadingButton from "@mui/lab/LoadingButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import styled from "styled-components";

const FileName = styled.div`
  font-size: 0.8em;
  font-style: italic;
  color: ${({ theme }) => theme.textSoft};
  padding-right: 10px;
`;

const Container = styled.div`
  border-radius: 8px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const mimeTypes = {
  geojson: "application/zip, application/json",
  json: "text/csv",
};

export default function FileField(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { setState, state, name, ftype = "geojson" } = props;
  const mime = mimeTypes[ftype];

  const handleFileChange = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      const url = `http://localhost:5000/conversion/${ftype}`;
      const res = await axios.post(url, formData);

      setState((prev) => ({ ...prev, [name]: res.data }));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.error(err);
    }
  };

  const getFileInfo = () => {
    try {
      return ftype === "geojson"
        ? `${state[name].features.length} feature(s)`
        : `${state[name].rows.length} rows`;
    } catch (err) {
      console.error(err);
      return "could not determine size";
    }
  };

  return (
    <Container>
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
          accept={mime}
          onChange={handleFileChange}
          hidden
        />
      </LoadingButton>
      <FileName>
        {error ? (
          <div style={{ color: "red" }}>Could not convert to JSON</div>
        ) : name in state && state[name] ? (
          getFileInfo()
        ) : (
          "Select a file"
        )}
      </FileName>
    </Container>
  );
}
