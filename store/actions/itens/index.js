import { ITENS_UPDATE, ITENS_RESET } from '../'

export const itemUpdate = (item) => {
  return ({
    type: ITENS_UPDATE,
    payload: item,
  })
}

export const itemReset = () => {
  return {
    type: ITENS_RESET,
  }
}