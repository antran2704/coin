import { BsArrowUpCircle } from "react-icons/bs";
import { scrollToTop, useScrollToTop, useViewport } from "../../hooks/hook";
import "./Deposit.scss";
import data from "./index";

function Deposit({render}) {
  const [width] = useViewport();
  const [top] = useScrollToTop()
 
  return (
    <div className="container margin-top">
      {render && <div className="deposit">
        <div className="deposit__header-img"></div>
        <div className="deposit__wrap">
          {data.map((item, index) => {
            return (
              <div key={index} className="deposit__content">
                {item.title && (
                  <div className="deposit__line">
                    <h3 className="deposit__title">{item.title}</h3>
                  </div>
                )}
                <p className="deposit__desc">{item.desc}</p>
                <div
                  style={
                    item.imgs.length < 2
                      ? { gridTemplateColumns: "repeat(1,auto)" }
                      : width < 580
                      ? { gridTemplateColumns: "repeat(1,auto)" }
                      : item.imgs.length > 3
                      ? { gridTemplateColumns: "repeat(4,auto)" }
                      : { gridTemplateColumns: "repeat(3,auto)" }
                  }
                  className="deposit__wrap-img"
                >
                  {item.imgs.map((img, index) => {
                    return (
                      <div key={index} className="deposit__img">
                        <img src={img} alt="" />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>}
      <BsArrowUpCircle onClick={scrollToTop} className={`scroll-top ${top > 500 ? "show" : "hidden"}`} />
    </div>
  );
}

export default Deposit;
