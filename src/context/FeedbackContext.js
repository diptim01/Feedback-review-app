import { useState, createContext, Children } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "This is from context sample 1",
      rating: 10,
    },
    {
      id: 2,
      text: "This is from context sample 2",
      rating: 7,
    },
    {
      id: 3,
      text: "This is from context sample 3",
      rating: 5,
    },
  ]);

  const [feedbackEdit, setfeedbackEdit] = useState({
    item: {},
    edit: false,
  });


  //delete feeback
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  //set item to be updated
  const editFeedback = (item) => {
    setfeedbackEdit({
        item,
        edit : true
    })
  }

  //add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
