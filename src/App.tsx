import { log } from 'console';
import * as React from 'react';
import { useEffect } from 'react';
import getHelloWorld from './getHelloWorld'; // 导入 getHelloWorld 函数
import parseTable from "./tools"

declare global {
  interface Window {
    getHelloWorld: any;
  }
}

function App() {
  const [result, setResult] = React.useState<any | string | null>(null);

  useEffect(() => {
    if (typeof window.getHelloWorld === 'function') {
      console.log(typeof window.getHelloWorld);
      window.getHelloWorld().then((res: string) => {
        console.log('已加载插件effect');
        const rows = parseTable(res);
        console.log(rows.map((obj: { cover: string }) => obj.cover));
        setResult(rows);
      });
    } else {
      console.log('没加载插件1');
      setResult('Hello World from React App');
    }
  }, []);
  return (
    <div className="App">
      <p></p>
    </div>
  );
}

export default App;
