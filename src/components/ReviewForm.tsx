import { useState, FormEvent } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import { MuiSnackBar } from "./MuiSnackbar";

export const ReviewForm = () => {
  const [reviewText, setReviewText] = useState<string>("");
  const isReviewTextOverLimit = reviewText.length > 100;
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);

  const onSubmitReviewForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!reviewText) {
      return;
    }

    if (isReviewTextOverLimit) {
      console.log("Message must be 100 characters or less");
    } else {
      const response = await fetch("http://localhost:4321/submitReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: reviewText,
        }),
      });
      setReviewText("");
      const data = await response.json();
      const { message } = data;
      setSnackBarMessage(message);
      setIsSnackBarOpen(true);
    }
  };

  return (
    <form onSubmit={onSubmitReviewForm}>
      <FormControl fullWidth>
        <p>Please leave a review below</p>
        <TextField
          id="review-input"
          aria-describedby="review-input"
          name="review"
          fullWidth
          multiline
          rows={4}
          label="Review"
          variant="outlined"
          value={reviewText}
          error={isReviewTextOverLimit}
          onChange={(e) => setReviewText(e.target.value)}
          helperText={`Max 100 characters (${reviewText.length} /100)`}
          focused
        />
        <Button
          variant="contained"
          type="submit"
          disabled={isReviewTextOverLimit}
          aria-disabled={isReviewTextOverLimit}
        >
          Submit
        </Button>
        <MuiSnackBar
          open={isSnackBarOpen}
          setOpen={setIsSnackBarOpen}
          message={snackBarMessage}
        />
      </FormControl>
    </form>
  );
};
