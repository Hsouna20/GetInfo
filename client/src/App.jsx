import { BrowserRouter, Route, Routes } from "react-router-dom"
import IPAddressSearch from "./pages/ipAdressSearch"
import Header from "./component/Header"
import FooterCom from "./component/footer"



function App() {
 

  return (
  <BrowserRouter>
  <Header/>
    <Routes>
      <Route path="/" element={<IPAddressSearch/>}/>
    </Routes>
    <FooterCom/>
  </BrowserRouter>
  )
}

export default App
