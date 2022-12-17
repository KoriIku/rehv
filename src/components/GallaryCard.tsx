import React from 'react';
import { Card, Col, List, Rating, Row } from '@douyinfe/semi-ui';
import ColorChip from './ColorChip';
import { IndexListItemPorps } from '../interface/gallery';

type Props = {
  item: IndexListItemPorps
}

const GallaryCard: React.FC<Props> = ({ item }) => {
  return (
    <Card style={{ maxWidth: 360 }}>
      <Row>
        <Col span={6} style={{ overflow: 'hidden' }}>
          <img src={item.thumb} alt={item.title} style={{ width:"100%", objectFit: 'cover' }} />
        </Col>
        <Col span={18}>
          <h3>{item.title}</h3>
          <p>{item.uploader}</p>
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
              {item.uploadtime}
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

export default GallaryCard;