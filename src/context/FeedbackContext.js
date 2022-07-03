import { useState, createContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  //holds the state for edit
  const [feedbackEditState, setfeedbackEditState] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  //fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch(
      `http://localhost:9000/feedback?_sort=id&_order=desc`
    );
    const data = await response.json();
    setFeedback(data);
    setisLoading(false)
  };

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
        isLoading,
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
