import { combineReducers } from 'redux'
import itensReducer from './itens'

export default combineReducers({
    itens: itensReducer
})
