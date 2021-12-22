import { HYDRATE } from 'next-redux-wrapper'
import { ITENS_UPDATE, ITENS_RESET } from '../../actions'
const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.user }
    case ITENS_UPDATE:
      const newState = { ...state, ...action.payload }
        //   newState.fullName = `${newState.firstName} ${newState.lastName}`

        // Implementar a soma dos Itens!!!

      return newState
    case ITENS_RESET:
      return initialState
    default:
      return state
  }
}

export default reducer
