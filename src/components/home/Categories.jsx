import React from 'react';

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { categories } from "../../constants/data";
import { Link, useSearchParams } from "react-router-dom";
const StyledButton = styled(Button)`
  margin: 7%;
  width: 85%;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const StyledTable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
`;
const DisplayCategory = styled(Box)`
  display: flex;
  font-size: 18px;
  font-weight: 600;
  color: #1976d2;
`;
const Categories = () => {
  let [searchParams] = useSearchParams();
  let category = searchParams.get("category");
  return (
    <>
      <StyledLink
        to={`/create?category=${category || "All"}`}
        style={{ textDecoration: "none" }}
      >
        <StyledButton variant="contained">CREATE BLOG</StyledButton>
      </StyledLink>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledLink to={`/?category=All`}>
                <DisplayCategory style={{ textAlign: "center" }}>
                  All Categories
                </DisplayCategory>
              </StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => {
            return (
              <TableRow key={category.id}>
                <TableCell>
                  <StyledLink to={`?category=${category.type}`}>
                    <DisplayCategory>
                      {category.type}&nbsp;{category.symbol}
                    </DisplayCategory>
                  </StyledLink>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </StyledTable>
    </>
  );
};
export default Categories;
