import "./Home.scss"
import imgs from "../../assets/imgs";
function Home() {
  return (
    <div className="home margin-top">
      <div className="home-overlay">
        <div className="home__content">
          <h1 className="home__title">Download Shop Coin USA App</h1>
          <div className="home__body">
            <p className="home__body-desc">
              Manage crypto assets at your fingertips
            </p>
            <div className="home__footer">
              <img src= {imgs.btnLogo} alt="" className="home__body-btn" />
              <p className="home__body-recomend">For Androi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
