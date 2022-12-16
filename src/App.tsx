import { log } from 'console';
import * as React from 'react';
import { useEffect } from 'react';
import parseTable from "./tools"
import { Card, Col, List, Rating, Row } from '@douyinfe/semi-ui';
import ColorChip from './components/ColorChip';

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
        renderItem={item =>
          <Card style={{ maxWidth: 360}} >
            <Row >
              <Col span={6} style={{ overflow: 'hidden'}}>
                <img src={item.cover} alt={item.title} style={{ width: '100%', objectFit: 'cover' }} />
              </Col>
              <Col span={18}>
                <h3 style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{item.title}</h3>
                <p>{item.author}</p>
                <Row>
                  <Col>
                    <Rating allowHalf value={item.rating} />
                  </Col>
                  <Col >
                    {item.language}
                  </Col>
                </Row>
                <Row>
                  <Col span={10}>
                    <ColorChip category={item.category}/>
                  </Col>
                  <Col span={14}>
                    {item.time}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        }
      />
    </div>
  );
}

export default App;
