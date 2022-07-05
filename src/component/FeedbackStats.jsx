import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext);
  //calculate ratings avg
  let average = feedback.reduce((accumulator, current) => {
      return accumulator + current.rating;
    }, 0);
    average = average / feedback.length

    average = average.toFixed(1).replace(/[.,]0$/, "");
  return (
    <div className="feedback-stats">
      <h4>{feedback.length} Reviews</h4>
      <h4>Average rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  );
}

export default FeedbackStats;
