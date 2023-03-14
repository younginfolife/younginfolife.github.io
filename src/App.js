import {Route, Routes} from "react-router-dom";
import HomePage from "./homepage/HomePage";
import Contacts from "./contacts/Contacts";
import Team from "./team/Team";

const App = () => {
  return (
      <>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/contacts" element={<Contacts/>}></Route>
          <Route path="/team" element={<Team/>}></Route>
        </Routes>
      </>
  );
};

export default App;