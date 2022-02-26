import { useEffect, useState } from "react";
import axios from "axios";
import { addData, addRooms } from "../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  HotTub,
  AcUnit,
  LocalCafe,
  Bathtub,
  ImportContacts,
  Wifi,
  Kitchen,
  Games,
  FreeBreakfast,
  SingleBed,
  Opacity,
  VideogameAsset,
  WbIncandescent,
  Storage,
} from "@material-ui/icons";

const ImgDiv = styled.div`
  display: flex;

  & .box {
    width: 75%;
    margin-right: 5px;

    & img {
      width: 100%;
    }
  }

  & .box1 {
    width: 24%;

    & img {
      width: 100%;
      height: 200px;
    }
  }
`;

const PlaceDescription = styled.div`
  display: flex;
  padding: 0px 10px;

  & .place-desc {
    width: 50%;
    height: 160px;
    margin-right: 20px;
    overflow-y: hidden;
    letter-spacing: normal;

    & h2 {
      font-size: 36px;
      font-weight: 700;
      color: #f15824;
      line-height: 0;
    }
    & p {
      font-size: 16px;
      font-weight: 400;
      color: #4d585b;
    }
  }

  & .place-facilites-div {
    width: 50%;
    line-height: 0;
  }

  & .place-facilities {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    & p {
      display: flex;
      align-items: center;

      & span {
        font-size: 14px;
        font-weight: 500;
        color: #4d585b;
        margin-left: 3px;
      }
    }
  }

  & .place-desc-toggle {
    width: 50%;
    margin-right: 20px;
    & h2 {
      font-size: 36px;
      font-weight: 700;
      color: #f15824;
    }
    & p {
      font-size: 16px;
      font-weight: 400;
      color: #4d585b;
    }
  }
`;

const ButtonDiv = styled.div`
  padding: 0px 10px;
  color: #f15824;

  & .button-toggle-off {
    position: relative;
    top: -55px;
    border: none;
    color: orange;
    background-color: white;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
  }
  & .button-toggle-on {
    position: relative;
    top: 0;
    border: none;
    color: orange;
    background-color: white;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
  }
`;

export const FrontDisplay = () => {
  const { data } = useSelector((store) => store);
  const dispatch = useDispatch();
  let [addClass, setClass] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:2345/hotels/Alleppey").then((res) => {
      dispatch(addData(res.data));
      dispatch(addRooms(res.data.rooms));
    });
  }, []);

  function handleDescription() {
    setClass(!addClass);
  }

  return (
    <>
      {data.map((e) => (
        <div key={e._id}>
          <section>
            <ImgDiv>
              <div className="box">
                <img src={e.placeImg[0]} alt="" />
              </div>
              <div className="box1">
                <img src={e.placeImg[1]} alt="" />
                <img src={e.placeImg[2]} alt="" />
                <img src={e.placeImg[3]} alt="" />
              </div>
            </ImgDiv>
          </section>
          <section>
            <PlaceDescription>
              <div className={addClass ? "place-desc-toggle" : "place-desc"}>
                <h2>Zostel {e.placeName}</h2>
                <p>{e.placeDescription}</p>
              </div>
              <div className="place-facilites-div">
                <h2>Amenities</h2>
                <div className="place-facilities">
                  <div>
                    <p>
                      <HotTub style={{ fontSize: 15 }} />
                      <span> Hot water</span>
                    </p>
                    <p>
                      <AcUnit style={{ fontSize: 15 }} />
                      <span>Air-Conditioing</span>
                    </p>
                    <p>
                      <LocalCafe style={{ fontSize: 15 }} />
                      <span>Cafe</span>
                    </p>
                    <p>
                      <Bathtub style={{ fontSize: 15 }} />
                      <span>Shower</span>
                    </p>
                    <p>
                      <ImportContacts style={{ fontSize: 15 }} />

                      <span>Towels on rent</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <Wifi style={{ fontSize: 15 }} />
                      <span>Free Wifi</span>
                    </p>
                    <p>
                      <Kitchen style={{ fontSize: 15 }} />
                      <span>24/7 Reception</span>
                    </p>
                    <p>
                      <Games style={{ fontSize: 15 }} />
                      <span>In-house Activities</span>
                    </p>
                    <p>
                      <FreeBreakfast style={{ fontSize: 15 }} />
                      <span>Breakfast (Extra)</span>
                    </p>
                    <p>
                      <SingleBed style={{ fontSize: 15 }} />
                      <span>Linen Included</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <Opacity style={{ fontSize: 15 }} />
                      <span>Water Dispenser</span>
                    </p>
                    <p>
                      <VideogameAsset style={{ fontSize: 15 }} />
                      <span>Common hangout area</span>
                    </p>
                    <p>
                      <WbIncandescent style={{ fontSize: 15 }} />
                      <span>Bedside Lamps</span>
                    </p>
                    <p>
                      <Storage style={{ fontSize: 15 }} />
                      <span>Storage Facility</span>
                    </p>
                    <p>
                      <ImportContacts style={{ fontSize: 15 }} />
                      <span>Air-conditioning</span>
                    </p>
                  </div>
                </div>
              </div>
            </PlaceDescription>
            <ButtonDiv>
              <button
                onClick={handleDescription}
                className={addClass ? "button-toggle-on" : "button-toggle-off"}
              >
                {addClass ? "show less" : "show more"}
              </button>
            </ButtonDiv>
            <div>{/* <iframe src="" frameborder="0"></iframe> */}</div>
          </section>
        </div>
      ))}
    </>
  );
};
