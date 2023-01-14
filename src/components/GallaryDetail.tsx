import { ImageList, ImageListItem } from "@mui/material";
import { it } from "node:test";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSWRandAxios } from "../hooks/useSWRGallaryList";
import { parseGallaryDetail } from "../parse/tools";


function GallaryDetail() {
  const { gid, gtoken } = useParams();

  const { data, error, mutate } = useSWRandAxios(
    `/g/${gid}/${gtoken}/`
  );

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  const itemData = parseGallaryDetail(data);


  return (
    <>
      /g/{gid}/{gtoken}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}>

        {itemData.map((item) => (
          <div key={item.pageNo} style={{ width: `${item.width}px`, height: `${item.height}px`, background: `transparent url(${item.imageUrl}) -${item.xOffset}px 0 no-repeat` }}>
          </div>
        ))}

      </div>
    </>
  );
}

export default GallaryDetail
