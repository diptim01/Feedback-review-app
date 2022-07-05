import App from "./App";
import './index.css'
import { createRoot } from 'react-dom/client';

// StrictMode is a bad idea because it enforce useEffect to run two time.
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
