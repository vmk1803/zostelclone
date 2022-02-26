import {
  ADD_ADDRESS,
  ADD_DATA,
  ADD_PLACE,
  ADD_ROOMS,
  ADD_SELECTED_ROOMS,
} from "./actionTypes";

const init = {
  data: [],
  address: [],
  place: [],
  rooms: [],
  selectedRooms: {
    data: [],
    totalPrice: 0,
    date: getDate(),
  },
};

const productReducer = (state = init, { type, payload }) => {
  switch (type) {
    case ADD_DATA:
      return { ...state, data: [payload] };

    case ADD_ADDRESS:
      return { ...state, address: payload };

    case ADD_PLACE:
      return { ...state, place: payload };

    case ADD_ROOMS:
      return { ...state, rooms: payload };
    case ADD_SELECTED_ROOMS:
      return { ...state, selectedRooms: payload };
    default:
      return { ...state };
  }
};

function getDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var day = today.getDay();

  var date = "";

  switch (day) {
    case 0:
      date = date + "Sun";
      break;

    case 1:
      date = date + "Mon";
      break;

    case 2:
      date = date + "Tue";
      break;

    case 3:
      date = date + "Wed";
      break;

    case 4:
      date = date + "Thu";
      break;

    case 5:
      date = date + "Fri";
      break;

    case 6:
      date = date + "Sat";
      break;
    default:
      date = date + "1";
  }

  date = date + " " + dd;

  switch (mm) {
    case "01":
      date = date + " Jan,";
      break;

    case "02":
      date = date + " Feb,";
      break;

    case "03":
      date = date + " Mar,";
      break;

    case "04":
      date = date + " Apr";
      break;

    case "05":
      date = date + " May,";
      break;

    case "06":
      date = date + " Jun,";
      break;

    case "07":
      date = date + " Jul,";
      break;

    case "08":
      date = date + " Aug,";
      break;

    case "09":
      date = date + " Sep,";
      break;

    case "10":
      date = date + " Oct,";
      break;

    case "11":
      date = date + " Nov,";
      break;

    case "12":
      date = date + " Dec,";
      break;
    default:
      date = date + "1";
  }

  date = date + yyyy;

  return date;
}

export { productReducer };
