import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { Layout } from "./components/Layout";

// Code split all pages so each is its own JS chunk.
// They are only loaded when the user navigates to that route.
const Home = lazy(() => import("./pages/Home").then(m => ({ default: m.Home })));
const About = lazy(() => import("./pages/About").then(m => ({ default: m.About })));
const Projects = lazy(() => import("./pages/Projects").then(m => ({ default: m.Projects })));
const Journal = lazy(() => import("./pages/Journal").then(m => ({ default: m.Journal })));
const JournalPost = lazy(() => import("./pages/JournalPost").then(m => ({ default: m.JournalPost })));
const Photography = lazy(() => import("./pages/Photography").then(m => ({ default: m.Photography })));
const Contact = lazy(() => import("./pages/Contact").then(m => ({ default: m.Contact })));
const Links = lazy(() => import("./pages/Links").then(m => ({ default: m.Links })));
const Books = lazy(() => import("./pages/Books").then(m => ({ default: m.Books })));

// Lightweight fallback shown while a chunk is loading
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[var(--color-gold)] border-t-[var(--color-accent)] rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/links"
          element={
            <Suspense fallback={<PageLoader />}>
              <Links />
            </Suspense>
          }
        />
        <Route
          path="/*"
          element={
            <Layout>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/journal/:id" element={<JournalPost />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/photography" element={<Photography />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Suspense>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

