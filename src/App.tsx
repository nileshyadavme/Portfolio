import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { Layout } from "./components/Layout";

// Code split all pages so each is its own JS chunk.
// Each import() is fired IMMEDIATELY (preload) so the module cache is warm
// before the user navigates. This prevents the blank-page bug caused by
// AnimatePresence mode="wait" holding the old page while Suspense delays
// the new page's mount.
const preloadHome = () => import("./pages/Home").then(m => ({ default: m.Home }));
const preloadAbout = () => import("./pages/About").then(m => ({ default: m.About }));
const preloadProjects = () => import("./pages/Projects").then(m => ({ default: m.Projects }));
const preloadJournal = () => import("./pages/Journal").then(m => ({ default: m.Journal }));
const preloadJournalPost = () => import("./pages/JournalPost").then(m => ({ default: m.JournalPost }));
const preloadPhotography = () => import("./pages/Photography").then(m => ({ default: m.Photography }));
const preloadContact = () => import("./pages/Contact").then(m => ({ default: m.Contact }));
const preloadLinks = () => import("./pages/Links").then(m => ({ default: m.Links }));
const preloadBooks = () => import("./pages/Books").then(m => ({ default: m.Books }));

// Kick off all preloads immediately at module load time
preloadHome();
preloadAbout();
preloadProjects();
preloadJournal();
preloadJournalPost();
preloadPhotography();
preloadContact();
preloadLinks();
preloadBooks();

const Home = lazy(preloadHome);
const About = lazy(preloadAbout);
const Projects = lazy(preloadProjects);
const Journal = lazy(preloadJournal);
const JournalPost = lazy(preloadJournalPost);
const Photography = lazy(preloadPhotography);
const Contact = lazy(preloadContact);
const Links = lazy(preloadLinks);
const Books = lazy(preloadBooks);

// Fallback for /links only (outside of Layout, which has its own Suspense)
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
        {/* /links is outside Layout so it needs its own Suspense */}
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
              {/* Suspense is handled inside Layout.tsx above AnimatePresence */}
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
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

