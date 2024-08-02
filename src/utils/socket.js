import io from 'socket.io-client';
import config from '../config';

const socket = io(config.SOCKET_URL, {
  autoConnect: false,
});
export const connectSocket = () => {
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export const onPlayerUpdate = (callback) => {
  socket.on('playerUpdate', callback);
};

export const onAuctionStatusUpdate = (callback) => {
  socket.on('auctionStatusUpdate', callback);
};

export default socket;