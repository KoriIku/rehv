import { log } from 'console';
import * as React from 'react';
import { useEffect } from 'react';
import parseTable from "./tools"
import { Card, Col, List, Rating, Row } from '@douyinfe/semi-ui';
import ColorChip from './components/ColorChip';
import GallaryCard from './components/GallaryCard';

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
        console.log(rows.map((obj: { time: string }) => obj.time));
        setResult(rows);
      });
    } else {
      console.log('没加载插件1');
      setResult('Hello World from React App');
    }
  }, []);
  return (
    <div style={{}}>
      <List
        bordered
        dataSource={result}
        renderItem={item => <GallaryCard item={item} />
        }
      />
    </div>
  );
}

export default App;
