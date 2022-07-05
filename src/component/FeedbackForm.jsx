import Card from "./shared/Card";
import { useState } from "react";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import { useContext, useEffect } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(null);
  const [btnDisabled, setbtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const { addFeedback, feedbackEditState, updateFeedback } = useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEditState.edit) {
      setbtnDisabled(false);
      setText(feedbackEditState.item.text);
      setRating(feedbackEditState.item.rating);
    }
  }, [feedbackEditState]);

  useEffect(() => {
    console.log(rating)

    if (text === "") {
      setbtnDisabled(true);
      setMessage(null);
    }
    else if (text !== "" && text.trim().length < 10) {
      setbtnDisabled(true);
      setMessage("text must be at least 10 charaters");
    }
    else if (!rating && text !== "" && text.trim().length >= 10) {
      setbtnDisabled(true);
      setMessage("you must to chose rating");
    }
    else {
      setbtnDisabled(false);
      setMessage(null);
    }

    setRating(rating)
    setText(text);
  }, [rating, text])


  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length >= 10 && rating !== null) {
      const newFeedback = {
        text,
        rating
      };

      if (feedbackEditState.edit) {
        updateFeedback(feedbackEditState.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }
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
            onChange={(e) => setText(e.target.value)}
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
