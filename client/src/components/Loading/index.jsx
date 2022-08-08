import * as m from "@mui/material";

export default function Loading(props) {
  return (
    <m.Box sx={{ width: "100%" }}>
      <m.Skeleton variant="text" animation="wave" />
      <m.Skeleton variant="text" animation="wave" />
      <m.Skeleton variant="text" animation="wave" />
    </m.Box>
  );
}
