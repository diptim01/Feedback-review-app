import Card from "./shared/Card";
import propTypes from "prop-types";
import { FaTimes } from "react-icons/fa";

function FeedbackItem({ item }) {
  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button className="close">
        <FaTimes color="purple" />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  );
}

FeedbackItem.propTypes = {
  item: propTypes.object.isRequired,
};

export default FeedbackItem;
