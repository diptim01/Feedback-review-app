import { motion, AnimatePresence } from "framer-motion";
import FeedbackItem from "./FeedbackItem";
import propTypes from "prop-types";

function FeedbackList({ feedback, handleDelete }) {
  if (!feedback || feedback.length < 0) {
    return <p>No feedback yet</p>;
  } else {
    return (
      <div className="feedback-list">
        <AnimatePresence>
          {feedback.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FeedbackItem
                key={item.id}
                item={item}
                handleDelete={handleDelete}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );

    // return (
    //   <div className="feedback-list">
    //     {feedback.map((item) => (
    //       <FeedbackItem
    //         key={item.id}
    //         item={item}
    //         handleDelete={handleDelete}
    //       />
    //     ))}
    //   </div>
    // );
  }
}

FeedbackList.propTypes = {
  feedback: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      text: propTypes.string.isRequired,
      rating: propTypes.number.isRequired,
    })
  ),
};

export default FeedbackList;
