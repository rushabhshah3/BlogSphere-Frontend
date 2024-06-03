import React from 'react';
import {
  Biotech,
  EnergySavingsLeafRounded,
  Engineering,
  Movie,
  Science,
} from "@mui/icons-material";

export const categories = [
  { id: 1, type: "Technology", symbol: <Engineering /> },
  { id: 2, type: "Biology", symbol: <Biotech /> },
  { id: 3, type: "Environment", symbol: <EnergySavingsLeafRounded /> },
  { id: 4, type: "Science", symbol: <Science /> },
  { id: 5, type: "Movies", symbol: <Movie /> },
];
