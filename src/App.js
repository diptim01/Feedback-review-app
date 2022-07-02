import { v4 as uuidv4 } from "uuid";
import FeedbackList from "./component/FeedbackList";
import Header from "./component/Header";
import FeedbackData from "./data/FeedbackData";
import { useState } from "react";
import FeedbackStats from "./component/FeedbackStats";
import FeedbackForm from "./component/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutIconLink from "./component/AboutIconLink";
import { FeedbackProvider} from "./context/FeedbackContext";

function App() {
  const [FeedBackItems, setFeedBackItems] = useState(FeedbackData);
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to kill?")) {
      setFeedBackItems(FeedBackItems.filter((item) => item.id !== id));
    }
  };
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedBackItems([newFeedback, ...FeedBackItems]);
  };

  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <FeedbackForm handleAdd={addFeedback} />
                  <FeedbackStats />
                  <FeedbackList
                    handleDelete={deleteFeedback}
                  />
                </>
              }
            ></Route>
            <Route path="/about" element={<AboutPage />} />
          </Routes>

          <AboutIconLink />
        </div>
      </Router>
    </FeedbackProvider>
  );
}

export default App;
