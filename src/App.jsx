import NavBar from "./components/NavBar"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import { Provider } from "react-redux"
import {appStore} from "./utils/appStore"
import Feed from "./components/feed"

function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="">
    <Routes>
  <Route path="/login" element={<Login />} />

  <Route path="/" element={<Body />}>
    <Route index element={<Feed />} />
    <Route path="feed" element={<Feed />} />
    <Route path="profile" element={<Profile />} />
  </Route>
</Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
