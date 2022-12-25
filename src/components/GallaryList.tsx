import * as React from 'react';
import { useEffect } from 'react';
import { List } from '@douyinfe/semi-ui';
import GallaryCard from './GallaryCard';
import { parseGallaryList } from '../parse/tools';
import { useSWRandAxios } from '../hooks/useSWRGallaryList';


function GallaryList() {
    const { data, error, mutate } = useSWRandAxios(
      '/popular'
    );
  
    if (error) return <div>Failed to load data</div>;
    if (!data) return <div>Loading...</div>;
    const rows = parseGallaryList(data);
    console.log('获取到数据');
  
    return (
        <div>
          <List
            bordered
            dataSource={rows}
            renderItem={item => <GallaryCard item={item} />
            }
          />
        </div>
    );
  }
  export default GallaryList;