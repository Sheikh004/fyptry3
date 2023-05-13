import { Box, InputBase, styled } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const Component = styled(Box)`
  //background: #fff;
  height: 45px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
`;

const Wrapper = styled(Box)`
  position: relative;
  border-radius: 15px;
  background-color: #f0f2f5;
  margin: 12px;
  width: 100%;
`;

const Icon = styled(Box)`
  color: #919191;
  padding: 3px;
  height: 200%;
  position: absolute;
`;

const InputField = styled(InputBase)`
  width: 100%;
  padding: 16px;
  padding-left: 65px;
  font-size: 14px;
  height: 15px;
  width: 100%;
`;

const Search = ({ setText }) => {
  return (
    <Component>
      <Wrapper>
        <Icon>
          <SearchIcon fontSize="small" />
        </Icon>
        <InputField
          placeholder="Search group or person"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setText(e.target.value)}
        />
      </Wrapper>
    </Component>
  );
};

export default Search;
