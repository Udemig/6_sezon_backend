import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Header from "./components/header";
import Footer from "./components/footer";
import MyGigs from "./pages/my-gigs";
import Search from "./pages/search";
import Detail from "./pages/detail";
import AddGig from "./pages/add-gig";
import Protected from "./components/protected";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex-1 p-5 max-w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search />} />
            <Route path="/detail/:id" element={<Detail />} />

            {/* Sadece satıcı hesapları erişebilmeli */}
            <Route element={<Protected />}>
              <Route path="/my-gigs" element={<MyGigs />} />
              <Route path="/add-gig" element={<AddGig />} />
            </Route>
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
