import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_DELETE_SUCCESS,
} from './types';

export const employeeUpdate = ({ prop, value }) => ({
  type: EMPLOYEE_UPDATE,
  payload: { prop, value },
});

export const employeeCreate = ({ name, phone, shift }) => (dispatch) => {
  const { currentUser } = firebase.auth();

  dispatch({ type: EMPLOYEE_CREATE });

  firebase
    .database()
    .ref(`/users/${currentUser.uid}/employees`)
    .push({ name, phone, shift })
    .then(() => {
      Actions.pop();
      dispatch({ type: EMPLOYEE_CREATE_SUCCESS });
    });
};

export const employeesFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/employees`)
      .on('value', (snapshot) => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const employeeSave = ({
  name, phone, shift, uid,
}) => (dispatch) => {
  const { currentUser } = firebase.auth();

  dispatch({ type: EMPLOYEE_CREATE });

  firebase
    .database()
    .ref(`/users/${currentUser.uid}/employees/${uid}`)
    .set({ name, phone, shift })
    .then(() => {
      Actions.pop();
      dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
    });
};

export const employeeDelete = ({ uid }) => (dispatch) => {
  const { currentUser } = firebase.auth();

  dispatch({ type: EMPLOYEE_CREATE });

  console.log(currentUser.uid, uid);

  firebase
    .database()
    .ref(`/users/${currentUser.uid}/employees/${uid}`)
    .remove()
    .then(() => {
      Actions.pop();
      dispatch({ type: EMPLOYEE_DELETE_SUCCESS });
    });
};
