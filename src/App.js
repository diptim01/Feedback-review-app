import FeedbackList from "./component/FeedbackList";
import Header from "./component/Header";
import FeedbackData from "./data/FeedbackData";
import { useState } from "react";
import FeedbackItem from "./component/FeedbackItem";

function App() {
  const [FeedBackItems, setFeedBackItems] = useState(FeedbackData);

  return (
    <>
      <Header />
      <div className="container">
        <FeedbackList feedback = {FeedBackItems} />
      </div>
    </>
  );
}

export default App;
