export const RECEIVED_WS_MSG = "app/RECEIVED_WS_MSG";

export function receivedWsMsg(msg) {
  return createAction(RECEIVED_WS_MSG)(msg);
}
