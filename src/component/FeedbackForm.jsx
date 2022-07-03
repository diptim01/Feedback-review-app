import Card from "./shared/Card";
import { useState } from "react";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import { useContext, useEffect } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setbtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const { addFeedback, feedbackEditState, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEditState.edit) {
      setbtnDisabled(false);
      setText(feedbackEditState.item.text);
      setRating(feedbackEditState.item.rating);
    }
  }, [feedbackEditState]);

  const handleTextChange = ({ target: { value } }) => {
    if (value === "") {
      setbtnDisabled(true);
      setMessage(null);
    } else if (value !== "" && value.trim().length < 10) {
      setbtnDisabled(true);
      setMessage("text must be at least 10 charaters");
    } else {
      setbtnDisabled(false);
      setMessage(null);
    }

    setText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length >= 10) {
      const newFeedback = {
        text,
        rating,
      };

      if (feedbackEditState.edit) {
        updateFeedback(feedbackEditState.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }

      // NOTE: reset to default state after submission
      setbtnDisabled(true); // 👈  add this line to reset disabled
      setRating(10); //👈 add this line to set rating back to 10
      setText("");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        {/* todo - rating select component */}
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="write a review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
