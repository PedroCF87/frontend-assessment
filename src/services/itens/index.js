import { api } from '../api'

export async function getItens() {
    const response = await api(`${process.env.NEXT_PUBLIC_API_URL}/itens`)
    if (!response.data) return false
    return response.data
}
