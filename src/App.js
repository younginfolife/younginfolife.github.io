import {Route, Routes} from "react-router-dom";
import HomePage from "./homepage/HomePage";
import Contacts from "./contacts/Contacts";
import Team from "./team/Team";
import Events from "./events/Events";

const App = () => {
  return (
      <>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/contacts" element={<Contacts/>}/>
          <Route path="/team" element={<Team/>}/>
            <Route path="/events" element={<Events/>}/>
        </Routes>
      </>
  );
};

export default App;