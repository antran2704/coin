import { scrollToTop, useScrollToTop, useViewport } from "../../hooks/hook";
import { BsArrowUpCircle } from "react-icons/bs";

import data from "./index";
import "./Blog.scss";
function Blog() {
  const [width] = useViewport();
  const [top] = useScrollToTop()
  return (
    <div className="blog">
      <div className="container">
        <div
          className="blog__list"
          style={{
            gridTemplateColumns: `repeat(${
              width > 900 ? 3 : width > 600 ? 2 : 1
            }, auto)`,
          }}
        >
          {data.map((item, index) => {
            return (
              <div key={index} className="blog__item">
                <div className="blog__header">
                  <h2 className="blog__title">{item.title}</h2>
                  <p className="blog__desc">{item.desc}</p>
                </div>
                <div className="blog__footer">
                  <p className="blog__date">{item.date}</p>
                  <p className="blog__time">{item.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <BsArrowUpCircle onClick={scrollToTop} className={`scroll-top ${top > 500 ? "show" : "hidden"}`} />
    </div>
  );
}

export default Blog;
