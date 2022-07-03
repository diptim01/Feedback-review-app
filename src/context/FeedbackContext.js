import { useState, createContext, useEffect } from "react";

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
    const response = await fetch(`https://feedback-json-server-heroku.herokuapp.com/feedback?_sort=id&_order=desc`);
    const data = await response.json();
    setFeedback(data);
    setisLoading(false);
  };

  //update feedbackitem
  const updateFeedback = async (id, updItem) => {
    //is the id the same, do a clone update of what is in object array
    const response = await fetch(`https://feedback-json-server-heroku.herokuapp.com/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updItem),
    });

    const data = await response.json();
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );

    setFeedbackEdit({
      item: {},
      edit: false,
    })
  };

  //delete feeback
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`https://feedback-json-server-heroku.herokuapp.com/feedback/${id}`, {
        method: "DELETE",
      });
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
  const addFeedback = async (newFeedback) => {
    const response = await fetch("https://feedback-json-server-heroku.herokuapp.com/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();

    setFeedback([data, ...feedback]);
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
