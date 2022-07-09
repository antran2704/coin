import "./Footer.scss";
import data from "./index";
function Footer() {
  return (
    <div className="footer">
      {data.map((item, index) => {
        return (
          <div key={index} className="footer_block">
            <h3 className="footer__title">{item.title}</h3>
            <ul className="footer__list">
              {item.items.map((item, index) => {
                return (
                  <li key={item} className="footer__list-item">
                    <a href="/" className="footer__list-link">
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default Footer;
