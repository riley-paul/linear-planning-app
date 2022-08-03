import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

export default function FileUpload(props) {
  const [selectedFiles, setSelectedFiles] = useState(null);

  return (
    <form action={API_URL + "/to_json/"} method="post">
      <input type="file" name="filename" multiple webkitdirectory mozdirectory directory/>
      <input type="submit" />
    </form>
  );
}
