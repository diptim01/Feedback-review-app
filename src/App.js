import {v4 as uuidv4} from 'uuid'
import FeedbackList from "./component/FeedbackList";
import Header from "./component/Header";
import FeedbackData from "./data/FeedbackData";
import { useState } from "react";
import FeedbackStats from "./component/FeedbackStats";
import FeedbackForm from "./component/FeedbackForm";

function App() {
  const [FeedBackItems, setFeedBackItems] = useState(FeedbackData);
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to kill?")) {
      setFeedBackItems(FeedBackItems.filter((item) => item.id !== id));
    }
  };
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedBackItems([newFeedback,...FeedBackItems])
  };

  return (
    <>
      <Header />
      <div className="container">
        <FeedbackForm handleAdd={addFeedback} />
        <FeedbackStats feedback={FeedBackItems} />
        <FeedbackList feedback={FeedBackItems} handleDelete={deleteFeedback} />
      </div>
    </>
  );
}

export default App;
