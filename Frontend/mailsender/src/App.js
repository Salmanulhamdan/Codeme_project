import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRouter from "./routers/routes";

function App() {
  return (
    <BrowserRouter>
   
    <Routes>
      <Route path="/*" element={<UserRouter />} />
    
     
    </Routes>
   
  </BrowserRouter>
  );
}

export default App;
