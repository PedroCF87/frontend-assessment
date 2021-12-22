import { Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { itemUpdate } from '../../../store/actions/itens'
import styles from '../../styles/Home.module.css'

const List = props => {
    const dispatch = useDispatch()
    const { itens } = props
    const selectedItens = useSelector((state) => state.itens)

    const handleUpdateItens = itens => {
        dispatch(itemUpdate(itens))
    }
    const addItem = props => {
        const { item } = props
        let selItens = Object.values(selectedItens)
        selItens.push({ key: Math.random(), ...item })
        handleUpdateItens(selItens)
    }

    const itensList = itens.length > 0 ? itens.map((item) => {
        let amount = item.financial.amount
        let amountSplited = amount.toString().split('.')
        if (!amountSplited[1]) amount = amountSplited[0]+'.'+amountSplited[1]+'.00'
        if (amountSplited[1] && amountSplited[1].length === 1) amount = amountSplited[0]+'.'+amountSplited[1]+'0'
        else amount = amountSplited.join('.')
        return (
            <a href='#' className={styles.card} key={item._id} title={item.description}>
                <h2>{item.name}</h2>
                <p>U$ {amount}</p>
                <Button 
                    variant={'contained'} 
                    color={'info'} 
                    fullWidth={true}
                    onClick={() => addItem({ item })}
                >ADD TO CART</Button>
            </a>
    )})
    : <div className={ styles.notFoundWarning }>Nenhum item encontrado</div>
    return itensList
}

export default List
