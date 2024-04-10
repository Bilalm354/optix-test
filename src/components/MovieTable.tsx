import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getMeanAverage } from "../lib/math/getMeanAverage";
import { Movie, MovieCompany } from "../App";

export function MovieTable({
  movies,
  selectedMovie,
  setSelectedMovie,
  movieCompanyData,
}: {
  movies: Movie[];
  selectedMovie: Movie | undefined;
  setSelectedMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
  movieCompanyData: MovieCompany[];
}) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const MovieTableHead = () => (
    <TableHead>
      <TableRow>
        <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
        <TableCell
          sx={{ fontWeight: "bold" }}
          align="right"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          style={{ cursor: "pointer" }}
        >
          Reviews
          {sortOrder === "asc" ? " ↓" : " ↑"}
        </TableCell>
        <TableCell sx={{ fontWeight: "bold" }} align="right">
          Film Company
        </TableCell>
      </TableRow>
    </TableHead>
  );

  const sortedMovies = [...movies].sort((a, b) => {
    const meanAverageA = getMeanAverage(a.reviews);
    const meanAverageB = getMeanAverage(b.reviews);
    if (sortOrder === "asc") {
      return meanAverageA - meanAverageB;
    } else {
      return meanAverageB - meanAverageA;
    }
  });

  const MovieRow = ({ movie }: { movie: Movie }) => (
    <TableRow
      key={movie.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
      selected={selectedMovie === movie}
      onClick={() => {
        setSelectedMovie(movie);
      }}
    >
      <TableCell component="th" scope="row">
        {movie.title}
      </TableCell>
      <TableCell align="right">
        {getMeanAverage(movie.reviews).toFixed(1)}
      </TableCell>
      <TableCell align="right">
        {movieCompanyData.find((f: any) => f.id === movie.filmCompanyId)?.name}
      </TableCell>
    </TableRow>
  );

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: {
            sm: 650,
          },
        }}
        aria-label="simple table"
      >
        <MovieTableHead />
        <TableBody>
          {sortedMovies.map((movie) => (
            <MovieRow movie={movie} key={movie.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
