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

  parseGallaryDetail(data);


  return (
    <div>
      /g/{gid}/{gtoken}
    </div>
  );
}

export default GallaryDetail
 