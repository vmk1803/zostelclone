import {
  ADD_ADDRESS,
  ADD_DATA,
  ADD_PLACE,
  ADD_ROOMS,
  ADD_SELECTED_ROOMS,
} from "./actionTypes";

const addAddress = (payload) => ({
  type: ADD_ADDRESS,
  payload,
});

const addData = (payload) => ({
  type: ADD_DATA,
  payload,
});

const addPlace = (payload) => ({
  type: ADD_PLACE,
  payload,
});

const addRooms = (payload) => ({
  type: ADD_ROOMS,
  payload,
});

const addSelectedRooms = (payload) => ({
  type: ADD_SELECTED_ROOMS,
  payload,
});

export { addAddress, addData, addPlace, addRooms, addSelectedRooms };
