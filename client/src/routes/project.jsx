import { useParams } from "react-router-dom";
import Map from "../components/Map";

export default function Project(props) {
  let params = useParams();
  return <Map />;
}
