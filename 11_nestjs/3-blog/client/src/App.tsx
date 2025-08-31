import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./components/header";
import Footer from "./components/footer";
import Protected from "./components/protected";

const App = () => {
  return (
    <div className="bg-dark-08 text-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<Protected />}>
            <Route path="/blog/create" element={<h1>CRATE</h1>} />
            <Route path="/blog/:id/edit" element={<h1>EDIT</h1>} />
            <Route path="/own-blogs" element={<h1>OWN</h1>} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
