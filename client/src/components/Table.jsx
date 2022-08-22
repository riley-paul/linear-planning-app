import { DataGrid } from "@mui/x-data-grid";
import styled from "@emotion/styled";

const GridContainer = styled.div`
  background-color: ${({ theme }) => theme.bgDarker};
  color: ${({ theme }) => theme.textSoft};
  height: calc(100vh - 56px);
  padding: 10px;
`;

export default function Table({data}) {
  return (
    <GridContainer>
      <DataGrid
        {...data}
        density="compact"
        sx={{
          color: "inherit",
          backgroundColor: "inherit",
          "& .MuiToolbar-root": {
            color: "inherit",
          },
        }}
        autoPageSize
      />
    </GridContainer>
  );
}
