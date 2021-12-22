import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import { itemUpdate, itemReset } from '../../../store/actions/itens'
import { Button } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import styles from '../../styles/Cart.module.css'
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})
const getTotal = props => {
    const { selectedItens, amount, discount, taxRate } = props
    let discountText = null
    let total = amount > 0 ? amount : 0
    if (discount && discount.amount > 0) {
        let checkDiscount = true
        if (discount.itemId !== null) {
            checkDiscount = false
            const result = selectedItens.filter(item => discount.itemId === item._id)
            if (result.length > 0) checkDiscount = true
        }
        if (checkDiscount) {   
            let discountAmount = discount.amount
            if (discount.type === '%') {
                total = total - (total*(discountAmount/100))
                discountText = `- ${discountAmount} %`
            }
            if (discount.type === '$') {
                total = total - discountAmount
                discountText = `- U$ ${discountAmount}`
            }
        }
    }
    if (taxRate !== 0) total = total + (total*(taxRate/100))

    return { total, discountText }
}

const Cart = props => {
    const { btn = true } = props
    const [totalSum, setTotalSum] = useState(0)
    const dispatch = useDispatch()
    const selectedItens = Object.values(useSelector((state) => state.itens))
    const handleUpdateItens = itens => {
        dispatch(itemUpdate(itens))
    }
    const removeItem = props => {
        const { key } = props
        let selItens = Object.values(selectedItens)
        let newItensList = new Array()
        if (selItens.length > 0) {
            selItens.forEach(item => {
                if (item.key !== key) newItensList.push(item)
            })
            dispatch(itemReset())
        }
        handleUpdateItens(newItensList)
    }
    let itensSum = 0
    selectedItens.map(item => {
        if (!item.financial) return false
        const { amount, discount, taxRate = 0 } = item.financial 
        let { total, discountText } = getTotal({ selectedItens, amount, discount, taxRate })
        itensSum = itensSum + total
        if (itensSum > 0 && totalSum < itensSum) setTotalSum(itensSum)
    })

    const ItensList = () => selectedItens.map(item => {
        if (!item.financial) return false
        const { amount, discount, taxRate = 0 } = item.financial        
        let { total, discountText } = getTotal({ selectedItens, amount, discount, taxRate })        
        return (
            <a href='#' className={styles.card} key={item.key} title={item.description}>
                <h2>
                    {item.name}
                    {btn &&
                        <Button 
                            className='deleteBtn'
                            variant={'contained'} 
                            color={'error'}
                            size={'small'}
                            onClick={() => removeItem({ key: item.key })}
                        >
                            <DeleteForeverIcon fontSize="small" />
                        </Button>
                    }
                    <span className={styles.cardSpan}>U{formatter.format(total)}</span>
                    {taxRate !== 0 && <small className={styles.cardSmall}>+ {taxRate} % (tax)</small>}
                    {discountText !== null && <div className={ styles.cardDiscount }>{discountText}</div>}                    
                </h2>
            </a>
        )
    })

    return (
        <div className={ styles.itensCart }>
            <div className={ styles.titleCart }>
                <h2>Shopping Cart</h2>
            </div>
            <div className={ styles.cartBody }>
                <ItensList />
            </div>
            <div className={ styles.footerCart }>
                <h2>
                    {btn 
                    ?   <Link href="/checkout">
                            <a>
                            <Button 
                                variant={'contained'} 
                                color={'info'} 
                                size={'small'}
                                fullWidth={true}
                                className='PaymentBtn'
                            >Pay</Button>
                            </a>
                        </Link>
                    :   <LoadingButton
                            loading
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="outlined"
                        >
                            Preparing
                        </LoadingButton>
                    }
                    <span className={ styles.totalSum }>Total = U{formatter.format(itensSum)}</span>
                </h2>
            </div>
        </div>
    )
}

export default Cart
