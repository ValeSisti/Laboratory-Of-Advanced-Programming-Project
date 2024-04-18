import io from "socket.io-client";

export const API_URL = "http://localhost:5555";
export const socket = io(`${API_URL}/calc`);

/*export const subscribe = (newCallback: (arg0: any) => void) => {
  socket.on("abcdef95", (result) => {
    result = JSON.parse(result);
    newCallback(result);
  });
};*/
