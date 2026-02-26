import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";
import { Journal } from "./pages/Journal";
import { JournalPost } from "./pages/JournalPost";
import { Photography } from "./pages/Photography";
import { Contact } from "./pages/Contact";
import { Links } from "./pages/Links";
import { AdminDashboard } from "./pages/AdminDashboard";
import { DataProvider } from "./context/DataContext";

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/links" element={<Links />} />
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/journal/:id" element={<JournalPost />} />
                  <Route path="/photography" element={<Photography />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}
