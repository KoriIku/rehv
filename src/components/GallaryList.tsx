import * as React from 'react';
import { useEffect } from 'react';
import parseTable from "../tools"
import { List } from '@douyinfe/semi-ui';
import GallaryCard from './GallaryCard';


function GallaryList() {
    const [result, setResult] = React.useState<any | string | null>(null);
  
    useEffect(() => {
      if (typeof window.getHelloWorld === 'function') {
        console.log(typeof window.getHelloWorld);
        window.getHelloWorld().then((res: string) => {
          console.log('已加载插件effect');
          const rows = parseTable(res);
          console.log(rows.map((obj: { uploadtime: string }) => obj.uploadtime));
          setResult(rows);
        });
      } else {
        console.log('没加载插件1');
        setResult('Hello World from React GallaryList');
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
  export default GallaryList;