import { useState, useEffect } from "react";
import { ReviewForm } from "./components/ReviewForm";
import { Box, Container, useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import MuiModal from "./components/Modal";
import { MovieTable } from "./components/MovieTable";
import {
  useGetMovieCompaniesQuery,
  useGetMoviesQuery,
} from "./lib/rtkQuery/movieApi";
import { RefreshButton } from "./components/RefreshButton";

export interface MovieCompany {
  id: string;
  name: string;
}
export interface Movie {
  id: string;
  reviews: number[];
  title: string;
  filmCompanyId: string;
  cost: number;
  releaseYear: number;
}

export const App = () => {
  const theme = useTheme();
  const isMobileOrSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedMovie, setSelectedMovie] = useState<Movie>();

  const {
    data: movieData,
    error: isMovieDataError,
    isLoading: isMoveDataLoading,
  } = useGetMoviesQuery("");

  const {
    data: movieCompanyData,
    error: isMovieCompanyDataError,
    isLoading: isMovieCompanyDataLoading,
  } = useGetMovieCompaniesQuery("");

  if (isMovieDataError || isMovieCompanyDataError) {
    return (
      <>
        <Box sx={{ my: 8 }}>
          <Container maxWidth="lg">
            <h2>Error</h2>
            <RefreshButton />
          </Container>
        </Box>
      </>
    );
  }

  if (
    isMoveDataLoading ||
    isMovieCompanyDataLoading ||
    !movieData ||
    !movieCompanyData
  ) {
    return (
      <Box sx={{ my: 8 }}>
        <Container maxWidth="lg">
          <h2>Loading...</h2>
        </Container>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 8 }}>
        <div>
          <h2>Welcome to Movie database!</h2>
          <RefreshButton />
          <p>Total movies displayed: {movieData.length} </p>
          <br />
          <MovieTable
            movies={movieData}
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
            movieCompanyData={movieCompanyData}
          />

          <div>
            {selectedMovie
              ? selectedMovie.title
                ? "You have selected: " + selectedMovie.title
                : "No Movie Title"
              : "No Movie Selected"}
          </div>

          {selectedMovie && isMobileOrSmall && (
            <MuiModal modalButtonText="Write Review">
              <ReviewForm />
            </MuiModal>
          )}

          {selectedMovie && !isMobileOrSmall && <ReviewForm />}
        </div>
      </Box>
    </Container>
  );
};
