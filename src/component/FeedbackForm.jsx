import Card from "./shared/Card";
import { useState } from "react";
import Button from "./shared/Button";
function FeedbackForm() {
  const [text, setText] = useState("");
  const [btnDisabled, setbtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

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

  return (
    <Card>
      <form action="">
        <h2>How would you rate your service with us?</h2>
        {/* todo - rating select component */}
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="write a review"
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
