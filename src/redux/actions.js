export const types = {
  STORE_DATA: 'get data'
}

export function storeData(payload) {
  return { type: types.STORE_DATA, payload}
}