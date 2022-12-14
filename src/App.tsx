import { log } from 'console';
import * as React from 'react';
import { useEffect } from 'react';
import parseTable from "./tools"
import { List, Descriptions, ButtonGroup, Rating, Button } from '@douyinfe/semi-ui';


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
    <div style={{ marginRight: 16 }}>
    <List
      bordered
      dataSource={result}
      renderItem={item => <List.Item>

            <img src={item.cover} alt={item.title} style={{ width: '100%' }} />

            <h3 style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{item.title}</h3>
            <p>{item.author}</p>

                <Rating allowHalf value={item.rating} />

                {item.language}

                {item.category}

                {item.time}

      </List.Item>}
    />
  </div>
  );
}

export default App;
