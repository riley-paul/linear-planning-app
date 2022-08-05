import { useParams } from "react-router-dom";

export default function Project(props) {
  let params = useParams();
  return <div style={{ padding: "1rem" }}>Project: {params.id}</div>;
}
