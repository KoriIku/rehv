import { useParams } from "react-router-dom";

function GallaryDetail() {
  const { gid, gtoken } = useParams();;

  return (
    <div>
      /g/{gid}/{gtoken}
    </div>
  );
}

export default GallaryDetail
 