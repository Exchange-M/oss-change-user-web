import { SOCKET } from '../../config'
import io from 'socket.io-client';

const URL = `http://${SOCKET.IP}:${SOCKET.PORT}?data=KRW-BTC`

export default function socketMiddleware() {
  const socket = io(URL)
  return (dispatch) => (action) => {
    dispatch(action)
    // if (typeof action === 'function') {
    //   return next(action);
    // }

    // const {
    //   event,
    //   leave,
    //   handle,
    //   ...rest
    // } = action;

    // if (!event) {
    //   return next(action);
    // }

    // if (leave) {
    //   socket.removeListener(event);
    // }

    // let handleEvent = handle;
    // if (typeof handleEvent === 'string') {
    //   handleEvent = result => dispatch({ type: handle, result, ...rest });
    // }
    // return socket.on(event, handleEvent);
  };
}