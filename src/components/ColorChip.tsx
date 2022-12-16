import React from 'react'

const tagColors: Record<string, string>  = {
  'Doujinshi': '#9E2720',
  'Manga': '#DB6C24',
  'Artist CG': '#D38F1D',
  'Game CG': '#6A936D',
  'Western': '#AB9F60',
  'Non-H': '#5FA9CF',
  'Image Set': '#325CA2',
  'Cosplay': '#6A32A2',
  'Asian Porn': '#A23282',
  'Misc': '#777777',
}

interface Props {
  category: string;
}

const Tag: React.FC<Props> = ({ category }) => {
  const color = tagColors[category] || '#000000';

  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: '4px',
        padding: '4px 8px',
        color: 'white',
      }}
    >
      {category}
    </div>
  );
};

export default Tag;

