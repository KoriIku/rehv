import React from 'react';
import { Card, Col, List, Rating, Row } from '@douyinfe/semi-ui';
import ColorChip from './ColorChip';

type Props = {
  item: {
    cover: string;
    title: string;
    author: string;
    rating: number;
    language: string;
    category: string;
    time: string;
  }
}

const GallaryCard: React.FC<Props> = ({ item }) => {
  return (
    <Card style={{ maxWidth: 360 }}>
      <Row>
        <Col span={6} style={{ overflow: 'hidden' }}>
          <img src={item.cover} alt={item.title} style={{ width:"100%", objectFit: 'cover' }} />
        </Col>
        <Col span={18}>
          <h3 style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{item.title}</h3>
          <p>{item.author}</p>
          <Row>
            <Col>
              <Rating allowHalf value={item.rating} />
            </Col>
            <Col>
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
  );
}

export default GallaryCard;