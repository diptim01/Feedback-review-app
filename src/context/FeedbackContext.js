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

  //holds the state for edit
  const [feedbackEditState, setfeedbackEditState] = useState({
    item: {},
    edit: false,
  });

  //update feedbackitem
  const updateFeedback = (id, updItem) => {
    //is the id the same, do a clone update of what is in object array
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };

  //delete feeback
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  //set item to be updated
  const editFeedback = (item) => {
    setfeedbackEditState({
      item,
      edit: true,
    });
  };

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
        feedbackEditState,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
