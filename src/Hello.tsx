import { useEffect, useRef, useState } from 'react';

// declare global {
//   interface Window {
//     getHelloWorld: any;
//   }
// }

// function Hello() {
//   // 定义组件的 state
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     if (window.getHelloWorld) {
//       window.getHelloWorld().then(res=> {
//         console.log("已加载插件");
//         setResult(res);
//       });
//     } else {
//       console.log("没加载插件1");
//       setResult('Hello World from React App');
//     }
//   }, []);

//   return (
//     <div>
//       {result ? `结果：${result}` : '脚本尚未加载。'}
//     </div>
//   );
// }
