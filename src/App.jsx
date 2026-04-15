import NavBar from "./components/NavBar"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import { Provider } from "react-redux"
import {appStore} from "./utils/appStore"
import Feed from "./components/feed"
import Connections from "./components/Connections"
import Request from "./components/Request"
import ProfileView from "./components/ProfileView"
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
    <Route path="connections" element={<Connections />} />
    <Route path="requests" element={<Request />} />
    <Route path="/profile/:id" element={<ProfileView />} />
  </Route>
</Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
