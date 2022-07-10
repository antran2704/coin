import { BiLoaderAlt } from "react-icons/bi";
import "./Loading.scss";

function Loading() {
  return (
    <div className="loading">
      <BiLoaderAlt className="loading__icon" />
    </div>
  );
}

export default Loading;
