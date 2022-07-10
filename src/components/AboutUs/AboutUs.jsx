import { useEffect, useRef } from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import { scrollToTop, useScrollToTop } from "../../hooks/hook";
import "./AboutUs.scss";
import data from "./index";

function AboutUs() {
  const [top] = useScrollToTop();
  const convas = useRef();
  
  useEffect(() => {
    function flower() {
      var canvas = convas.current,
        ctx = canvas.getContext("2d"),
        things = [],
        thingsCount = 124,
        mouse = {
          x: -100,
          y: -100,
        },
        minDist = 150;
  
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      // object image
      var image = new Image();
      image.src =
        "http://www.clipartqueen.com/image-files/red-lobed-fall-clipart-leaf.png";
  
        for (var i = 0; i < thingsCount; i++) {
          let thingWidth = Math.floor(Math.random() * 20) + 20;
          let thingHeight = image.naturalHeight / image.naturalWidth * thingWidth;
          let speed = Math.floor(Math.random() * 2) + 0.5;
          things.push({
            width: thingWidth,
            height: thingHeight,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - thingHeight,
            speed: speed,
            vY: speed,
            vX: 0,
            d: Math.random() * 1.2 - 0.6,
            stepSize: (Math.random()) / 20,
            step: 0,
            angle: Math.random() * 180 - 90,
            rad: Math.floor(Math.random()),
            opacity: Math.random() + 0.4,
            _ratate: Math.floor(Math.random()) 
          });
        }
          
        function drawThings() {
          things.map((thing) => {
            ctx.beginPath();
            thing.rad = (thing.angle * Math.PI) / 180;
            ctx.save();
            var cx = thing.x + thing.width / 2;
            var cy = thing.y + thing.height / 2;
            ctx.globalAlpha = thing.opacity;
            ctx.setTransform(
              Math.cos(thing.rad),
              Math.sin(thing.rad),
              -Math.sin(thing.rad),
              Math.cos(thing.rad),
              cx - cx * Math.cos(thing.rad) + cy * Math.sin(thing.rad),
              cy - cx * Math.sin(thing.rad) - cy * Math.cos(thing.rad)
            );
            ctx.drawImage(image, thing.x, thing.y, thing.width, thing.height);
            ctx.restore();
          });
        }
        
        function draw() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        
          drawThings();
        }
        
  
        function update() {
          things.map((thing) => {
            var dist = Math.sqrt((thing.x - mouse.x) ** 2 + (thing.y - mouse.y) ** 2);
            
            if (dist < minDist) {
              var force = minDist / (dist * dist),
                  xcomp = (mouse.x - thing.x) / dist,
                  ycomp = (mouse.y - thing.y) / dist,
                  deltaV = force * 2; // deplay when hover mouse
        
              thing.vX -= deltaV * xcomp;
              thing.vY -= deltaV * ycomp;
              
              if (thing.d * xcomp > 0) {
                thing.d = 0 - thing.d;
              }
            } else {
              thing.vX *= .98;
        
              if (thing.vY < thing.speed) {
                thing.vY = thing.speed
              }
        
              thing.vX += Math.cos(thing.step += (Math.random() * 0.05)) * thing.stepSize;
            }
            
            thing.y += thing.vY;
            thing.x += thing.vX + thing.d;
            
            var _angle = Math.random() + 0.2;
            // stuff.angle += _angle;
            if (thing._ratate == 0) {
              thing.angle += _angle;
            } else {
              thing.angle -= _angle;
            }
            
            if (thing.y > canvas.height) {
              reset(thing);
            }
        
            if (thing.x > canvas.width || thing.x < (0 - thing.width)) {
              reset(thing);
            }
          });
        }
        
        canvas.addEventListener('mousemove', function(e){
          mouse.x = e.clientX;
          mouse.y = e.clientY;
        });
       
        function reset(thing) {
          thing.width = Math.floor(Math.random() * 20) + 20;
          thing.height = image.naturalHeight / image.naturalWidth * thing.width;
          thing.x = Math.floor(Math.random() * canvas.width);
          thing.y = 0 - thing.height;
          thing.speed = Math.floor(Math.random() * 2) + 0.5
          thing.vY = thing.speed;
          thing.vX = 0;
          // thing.angle = 0;
          // thing.rad = 0;
          thing._ratate = Math.floor(Math.random());
        }
  
        function tick() {
          draw();
          update();
          requestAnimationFrame(tick);
        }
        
        tick();
    }
    flower()
  },[])
  
  return (
    <div className="container">
      <div className="about">
        <div className="about__header">
          <canvas ref={convas} id="canvas"></canvas>
        </div>
        <h2 className="about__title">
          SHOP COIN GROUP NƠI ĐÁNG TIN CẬY, AN TOÀN CHO MỌI GIAO DỊCH TIỀN ĐIỆN
          TỬ.
        </h2>
        <div className="about__body">
          {data.map((item, index) => {
            return (
              <div key={index} className="about__content">
                <h3 className="about__content-title">{item.title}</h3>
                {item.titleDesc && (
                  <ul className="about__content-list">
                    {item.titleDesc.map((item, index) => {
                      return (
                        <li key={index} className="about__item">
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                )}
                {item.titleSecond &&
                  item.titleSecond.map((item, index) => {
                    if (item.desc) {
                      return (
                        <div key={index} className="about__item-second">
                          <h3 className="about__item-title">{item.title}</h3>
                          {item.desc &&
                            item.desc.map((item, index) => {
                              return (
                                <p key={index} className="about__item-desc">
                                  {item}
                                </p>
                              );
                            })}
                        </div>
                      );
                    }

                    if (item.listDesc) {
                      return (
                        <div key={index} className="about__item-second">
                          <h3 className="about__item-title">{item.title}</h3>
                          <ul className="about__content-list">
                            {item.listDesc.map((item, index) => {
                              return (
                                <li key={index} className="about__item">
                                  {item}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    }
                  })}
              </div>
            );
          })}
        </div>
      </div>
      <BsArrowUpCircle
        onClick={scrollToTop}
        className={`scroll-top ${top > 500 ? "show" : "hidden"}`}
      />
    </div>
  );
}

export default AboutUs;
