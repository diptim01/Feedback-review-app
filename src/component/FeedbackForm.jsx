import Card from "./shared/Card";
import { useState } from "react";
import Button from "./shared/Button";
function FeedbackForm() {
  const [text, setText] = useState("");
  const handleTextChange = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
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
          <Button type="submit"> Send</Button>
        </div>
      </form>
    </Card>
  );
}

export default FeedbackForm;
