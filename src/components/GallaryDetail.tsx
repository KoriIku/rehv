import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { parseGallaryDetail } from "../parse/tools";


function GallaryDetail() {
  const { gid, gtoken } = useParams();

  const [result, setResult] = React.useState<any | string | null>(null);
  
  useEffect(() => {
    if (typeof window.xhrGet === 'function') {
      window.xhrGet(`https://e-hentai.org/g/${gid}/${gtoken}/`).then((res: string) => {
        console.log('已加载插件effect');
        parseGallaryDetail(res);
        setResult(res);
      });
    } else {
      console.log('没加载插件1');
      setResult('Hello World from React GallaryList');
    }
  }, []);

  return (
    <div>
      /g/{gid}/{gtoken}
    </div>
  );
}

export default GallaryDetail
 