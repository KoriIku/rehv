import { BrowserRouter } from 'react-router-dom';
import GallaryList from './components/GallaryList';

declare global {
  interface Window {
    getHelloWorld: any;
  }
}

function App() {

  return (
    <BrowserRouter>
    
    <GallaryList />
    </BrowserRouter>
  );
}

export default App;
