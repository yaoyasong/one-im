
export function getLoginLoading(state) {
  return state.getIn(['auth','loading']);
}

export function getAuthed(state) {
  return state.getIn(['auth','authed']) && (state.getIn(['auth','authedUser']) !== null);
}

export function getAuthedUser(state) {
  return state.getIn(['auth','authedUser']);
}

export function getOffline(state) {
  return state.getIn(['auth','offline']);
}

export function getNeedAutoLogin(state) {
  return state.getIn(['auth','needAutoLogin']);
}