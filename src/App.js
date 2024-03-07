import './App.css';
import Home from './components/Home/Home';
import Header from './components/header/Header';
import About from './components/about/About';
function App() {
  return (
    <>
    <Header />
    <main className='main'>
      <Home />
      <About />
    </main>
    </>
  );
}

export default App;
