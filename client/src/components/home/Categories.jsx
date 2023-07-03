import {
  Button,
  styled,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";
import { Link , useSearchParams } from "react-router-dom";
import { categories } from "../../constants/data";

const StyledButton = styled(Button)`
  margin: 20px;
  background: #65b0f5;
  color: #fff;
  width: 85%;
`;

const StyledLink = styled(Link)`
  text-decoration : none;
  color : inherit;
`

const Categories = () => {

  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')

  return (
    <>
      <StyledLink to={`/create?category=${category || ""}`} style={{textDecoration : "none"}}>
        <StyledButton variant="contained">Create BLOG</StyledButton>
      </StyledLink>
      <TableContainer component={Paper} elevation={6}>
        <Table>
          {/* <TableHead>
            <TableRow>
              <TableCell><StyledLink to="/">All Categories</StyledLink></TableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            {categories.map((category) => {
              return (
                <TableRow key={category.id}>
                  <TableCell><StyledLink to={category.name === 'All' ? '/' : `?category=${category.name}`}>{category.name}</StyledLink></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Categories;
