import Router from "./routers/Router.tsx";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header.tsx";
function App() {
  return (
      <BrowserRouter>
          <div className='container'>
              <Header />
              <Router />
          </div>
      </BrowserRouter>
  )
}

export default App
