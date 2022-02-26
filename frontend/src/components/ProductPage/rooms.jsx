import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import {
  Person,
  VpnKey,
  LocalLaundryService,
  Wifi,
  LocalParking,
  AcUnit,
  ArrowRightAlt,
  FreeBreakfast,
  Hotel,
  PartyMode,
  VideogameAsset,
  WbIncandescent,
  KeyboardArrowDown,
  Add,
  Remove,
  Delete,
} from "@material-ui/icons";
import styled from "styled-components";
import { useState } from "react";
import { addSelectedRooms } from "../../Redux/actions";

const RoomDetails = styled.div`
  display: flex;
  background-color: #e8f0f2;

  & .hotelRoom-details {
    width: 66%;
    /* margin-right: 30px; */
  }

  & .room-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:nth-child(1) {
      line-height: 0.8;
      & p {
        font-size: 16px;
        font-weight: 500;
        color: #4d585b;
      }
      & h1 {
        font-size: 30px;
        font-weight: bold;
      }
    }
  }

  & .date {
    display: flex;
    align-items: center;
    border-radius: 10px;
    width: 45%;
    justify-content: space-around;
    padding: 8px 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  }

  & .room-card {
    display: flex;
    margin-top: 20px;
    background-color: white;
    border-radius: 10px;
    &:hover {
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    }

    & img {
      width: 100%;
      height: 100%;
    }
    & .room-imgs {
      width: 28%;
      /* border: 1px solid red; */
      /* margin-right: 20px; */
    }
    & .room-details {
      width: 70%;
      padding: 15px;

      & .room-title {
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        font-weight: 600;
        line-height: 0;
        & span {
          font-size: 12px;
          font-weight: lighter;
        }
      }

      & .total-beds {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        line-height: 0;
      }

      & .room-descp {
        font-size: 14px;
        font-weight: 500;
        color: #4d585b;
      }

      & .facility-icons {
        width: 50%;
        display: flex;
        justify-content: space-evenly;
      }

      & .room-selection {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        align-items: center;
        background-color: white;

        & .show-calender {
          width: 25%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 600;
          color: #f15824;
        }

        & .selectButton {
          padding: 10px;
          font-weight: 500;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-size: 14px;
          color: white;
          background-color: #f15824;
        }
      }
    }
  }

  & .availability-check-on {
    /* margin-top: 5px; */
    display: flex;
    justify-content: space-around;
    line-height: 1;
    background-color: white;
    border-radius: 10px;
    &:hover {
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    }

    & .calender {
      text-align: center;
      cursor: pointer;
      width: 15%;

      &:hover {
        background-color: whitesmoke;
      }
    }

    & .week-day {
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 400;
    }

    & .week-date {
      font-size: 14px;
      font-weight: 600;
    }
    & .room-price {
      font-size: 16px;
      font-weight: 600;
      color: #48bb78;
    }
  }
  & .availability-check-off {
    display: none;
  }

  /* all styled about booking details */

  & .booking-details {
    padding-top: 20px;
    width: 30%;
    margin-left: 33px;
    & .booking-heading {
      line-height: 0.5;
      & h2 {
        font-size: 24px;
        font-weight: bold;
      }

      & p {
        font-weight: bold;
        font-size: 14px;
      }

      & span {
        color: #4d585b;
        font-size: 14px;
      }
    }
    & .noSelectedRoom {
      text-align: center;
      & img {
        /* border: 1px solid red; */
        width: 180px;
      }
      & div {
        display: flex;
        justify-content: center;
      }

      & p {
        font-weight: 500;
        font-size: 18px;
      }
    }
  }
`;

const ToggleRoomButton = styled.div`
  display: flex;
  width: 80px;
  justify-content: space-between;
  align-items: center;
  /* border-radius: 10px; */
  & .remove {
    background-color: #f15824;
    color: white;
    padding: 5px 8px;
    border-radius: 5px;
    cursor: pointer;
  }
  & .add {
    background-color: #f15824;
    color: white;
    padding: 5px 8px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const BookingDetails = styled.div`
  margin-top: 30px;

  & .booked-room-heading {
    /* border: 1px solid blue; */
    display: flex;
    justify-content: space-between;
    padding: 0;
    align-items: center;
    line-height: 0.5;
    & h3 {
      font-size: 16px;
      font-weight: bold;
    }
    & span {
      font-size: 16px;
      font-weight: 400;
      color: #4d585b;
    }
    & .deleteRoom {
      cursor: pointer;
    }
  }
  & .booked-room-price {
    display: flex;
    justify-content: space-between;
    position: relative;
    top: -20px;
    & p:nth-child(1) {
      font-size: 16px;
      font-weight: 500;
    }
    & span {
      font-size: 16px;
      font-weight: 400;
      color: #4d585b;
    }
    & p:nth-child(2) {
      font-size: 16px;
      font-weight: bold;
    }
  }
  & .totalBill {
    line-height: 0;
  }
  & .totalBill > div {
    display: flex;
    justify-content: space-between;
    & p {
      font-size: 18px;
      font-weight: bold;
    }
  }

  & .booking-button {
    margin-top: 20px;
    cursor: pointer;
    & button {
      width: 100%;
      height: 50px;
      background-color: #f15824;
      font-size: 15px;
      font-weight: 500;
      color: white;
      border: none;
      border-radius: 10px;
    }
  }
`;

const CustomLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

export const Rooms = () => {
  const { rooms, selectedRooms } = useSelector((store) => store);
  let days = sevenWeeks();
  console.log(selectedRooms);
  let [selection, setSelection] = useState({});
  const dispatch = useDispatch();

  return (
    <RoomDetails>
      <div className="hotelRoom-details">
        <div className="room-heading">
          <div>
            <h1>Book your stay</h1>
            <p>Select from a range of beautiful rooms</p>
          </div>
          <div className="date">
            <div>{selectedRooms.date}</div>
            <div>
              <ArrowRightAlt />
            </div>
            <div>{selectedRooms.date}</div>
          </div>
        </div>
        <div className="rooms">
          {rooms.map((e) => (
            <div key={e._id}>
              <div className="room-card">
                <div className="room-imgs">
                  <img src={e.roomImg[1]} alt="" />
                </div>
                <div className="room-details">
                  <div className="room-title">
                    <h3>{e.title}</h3>
                    <h3>
                      ₹ {e.basicPrice} <span className="">/ night</span>
                    </h3>
                  </div>
                  <span className="total-beds">
                    <Person style={{ fontSize: 18 }} /> x {e.totalBeds}
                  </span>
                  <p className="room-descp">{e.roomDescription}</p>
                  <div className="facility-icons">
                    <VpnKey style={{ fontSize: 18 }} />
                    <LocalLaundryService style={{ fontSize: 18 }} />
                    <Wifi style={{ fontSize: 18 }} />
                    <LocalParking style={{ fontSize: 15 }} />
                    <AcUnit style={{ fontSize: 18 }} />
                    <FreeBreakfast style={{ fontSize: 18 }} />
                    <PartyMode style={{ fontSize: 18 }} />
                    <VideogameAsset style={{ fontSize: 18 }} />
                    <WbIncandescent style={{ fontSize: 18 }} />
                    <Hotel style={{ fontSize: 18 }} />
                  </div>
                  <div className="room-selection">
                    <div
                      className="show-calender"
                      onClick={() => {
                        if (selection[`${e._id}`]) {
                          var selected = { ...selection, [e._id]: false };
                          setSelection(selected);
                        } else {
                          var selected = { ...selection, [e._id]: true };
                          setSelection(selected);
                        }
                      }}
                    >
                      Avalibility calender{" "}
                      <KeyboardArrowDown fontSize="small" />
                    </div>
                    <div>
                      {selectedRooms[`${e._id}`] !== undefined ? (
                        <ToggleRoomButton className="toggle-room-button">
                          <div
                            className="remove"
                            onClick={() => {
                              var data = selectedRooms.data;
                              var newData = [];
                              var totalPrice = 0;
                              data.forEach((r) => {
                                if (r.title === e.title) {
                                  r.rooms = r.rooms - 1;
                                }
                                if (r.rooms !== 0) {
                                  newData.push(r);
                                  totalPrice = totalPrice + r.price * r.rooms;
                                }
                              });
                              var roomSelected = selectedRooms[`${e._id}`] - 1;

                              if (roomSelected === 0) {
                                roomSelected = undefined;
                              }
                              var selected = {
                                ...selectedRooms,
                                [e._id]: roomSelected,
                                data: newData,
                                totalPrice: totalPrice,
                              };
                              dispatch(addSelectedRooms(selected));
                            }}
                          >
                            <Remove style={{ fontSize: 12, fontWeight: 700 }} />
                          </div>
                          <div>{selectedRooms[`${e._id}`]}</div>
                          <div
                            className="add"
                            onClick={() => {
                              var data = selectedRooms.data;
                              var roomSelected = selectedRooms[`${e._id}`] + 1;
                              var newData = [];
                              var totalPrice = 0;
                              data.forEach((r) => {
                                if (r.title === e.title) {
                                  r.rooms = r.rooms + 1;
                                }
                                totalPrice = totalPrice + r.price * r.rooms;
                                newData.push(r);
                              });
                              var selected = {
                                ...selectedRooms,
                                [e._id]: roomSelected,
                                data: newData,
                                totalPrice: totalPrice,
                              };
                              dispatch(addSelectedRooms(selected));
                            }}
                          >
                            <Add style={{ fontSize: 12, fontWeight: 700 }} />
                          </div>
                        </ToggleRoomButton>
                      ) : (
                        <button
                          className="selectButton"
                          onClick={() => {
                            var thisRoom = {
                              id: e._id,
                              title: e.title,
                              rooms: 1,
                              price: e.basicPrice,
                            };
                            var selected = {
                              ...selectedRooms,
                              [e._id]: 1,
                              data: [...selectedRooms.data, thisRoom],
                              totalPrice:
                                selectedRooms.totalPrice + e.basicPrice,
                            };
                            dispatch(addSelectedRooms(selected));
                          }}
                        >
                          Select Unit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={
                  selection[`${e._id}`]
                    ? "availability-check-on"
                    : "availability-check-off"
                }
              >
                {days.map((item) => (
                  <div
                    key={item[1]}
                    className="calender"
                    onClick={() => {
                      var thisRoom = {
                        id: e._id,
                        title: e.title,
                        rooms: 1,
                        price: e.basicPrice,
                      };
                      var selected = {
                        ...selectedRooms,
                        [e._id]: 1,
                        data: [...selectedRooms.data, thisRoom],
                        totalPrice: selectedRooms.totalPrice + e.basicPrice,
                        date: `${item[0]} ${item[1]} ${item[2]} , ${item[3]}`,
                      };

                      dispatch(addSelectedRooms(selected));
                    }}
                  >
                    <p className="week-day">{item[0]}</p>
                    <p className="week-date">
                      {item[2]} {item[1]}
                    </p>
                    <p className="room-price">₹ {e.basicPrice}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="booking-details">
        <div className="booking-heading">
          <h2>Summary</h2>
          <p>
            1 night <span>starting from</span> {selectedRooms.date}
          </p>
        </div>
        {selectedRooms.data.length !== 0 ? (
          <BookingDetails>
            {selectedRooms.data.map((s) => (
              <div key={s.id}>
                <div className="book-headings">
                  <div className="booked-room-heading">
                    <h3>
                      {s.title} <span> x {s.rooms}</span>
                    </h3>
                    <div>
                      <Delete
                        className="deleteRoom"
                        style={{ fontSize: 15, color: "#4d585b" }}
                        onClick={() => {
                          var data = selectedRooms.data;
                          var newData = [];
                          var totalPrice = 0;
                          data.forEach((w) => {
                            if (w.id !== s.id) {
                              newData.push(w);
                              totalPrice = totalPrice + w.price * w.rooms;
                            }
                          });
                          var selected = {
                            ...selectedRooms,
                            [`${s.id}`]: undefined,
                            data: newData,
                            totalPrice: totalPrice,
                          };
                          dispatch(addSelectedRooms(selected));
                        }}
                      />
                    </div>
                  </div>
                  <div className="booked-room-price">
                    <p>
                      ₹{s.price}
                      <span> x {s.rooms} night</span>
                    </p>
                    <p>₹{s.price * s.rooms}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="totalBill">
              <div>
                <p>Tax</p>
                <p>₹ {0}</p>
              </div>
              <div>
                <p>Total (tax incl.)</p>
                <p>₹ {selectedRooms.totalPrice}</p>
              </div>
              <div>
                <p>Payable Now</p>
                <p>₹ {115.29}</p>
              </div>
              <div className="booking-button">
                <button>
                  <CustomLink to={"/payment"}>Book Now</CustomLink>
                </button>
              </div>
            </div>
          </BookingDetails>
        ) : (
          <div className="noSelectedRoom">
            <div>
              <img
                src="https://book.zostel.com/static/media/gray-zobu.018014d9.svg"
                alt="No rooms selected"
              />
            </div>
            <p>No room selected</p>
          </div>
        )}
      </div>
    </RoomDetails>
  );
};

function sevenWeeks() {
  function GetDates(startDate, daysToAdd) {
    var aryDates = [];

    for (var i = 0; i <= daysToAdd; i++) {
      var currentDate = new Date();
      currentDate.setDate(startDate.getDate() + i);
      aryDates.push(
        DayAsString(currentDate.getDay()) +
          ", " +
          currentDate.getDate() +
          " " +
          MonthAsString(currentDate.getMonth()) +
          " " +
          currentDate.getFullYear()
      );
    }

    return aryDates;
  }

  function MonthAsString(monthIndex) {
    var d = new Date();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    return month[monthIndex];
  }

  function DayAsString(dayIndex) {
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";

    return weekdays[dayIndex];
  }

  var startDate = new Date();
  var aryDates = GetDates(startDate, 7);

  var dateFormate = [];

  for (var i = 0; i < aryDates.length; i++) {
    var splited = aryDates[i].split(",");
    var original = [];
    var day = splited[0].split("");
    day = day.splice(0, 3).join("");
    original.push(day);
    var date = splited[1].split(" ");
    date[2] = date[2].split("").splice(0, 3).join("");
    original.push(date[1], date[2], date[3]);
    dateFormate.push(original);
  }

  dateFormate.pop();

  return dateFormate;
}
