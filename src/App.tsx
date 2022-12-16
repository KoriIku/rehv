import GallaryList from './components/GallaryList';

declare global {
  interface Window {
    getHelloWorld: any;
  }
}

function App() {

  return (
    <GallaryList />
  );
}

export default App;
