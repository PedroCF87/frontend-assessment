import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import styles from '../src/styles/Home.module.css'
import Footer from '../src/components/footer/index.jsx'
import List from '../src/components/list/index.jsx'
import Cart from '../src/components/cart/index.jsx'
import { getItens } from '../src/services/itens'

const Home = props => {
  const [loading, setLoading] = useState(true)
  const [listItens, setListItens] = useState([])
  const selectedItens = Object.values(useSelector((state) => state.itens))
  const appName = process.env.NEXT_PUBLIC_APP_NAME
  const chalengeName = process.env.NEXT_PUBLIC_CHALENGE_NAME

  useEffect(() => {
    if (props.list.length > 0 && listItens !== props.list) setListItens(props.list)
    setLoading(false)
  }, [listItens])

  return (
    <div className={styles.container}>
      <Head>
        <title>Menu | {appName}</title>
        <meta name="description" content="Itens listing page." />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {appName}
        </h1>
        <strong className={styles.subTitle}>
          {chalengeName}
        </strong>
        <div className={styles.grid}>
          <div className={styles.itensGrid}>
            {
              loading 
              ? <div>Loading data from API</div>
              : <List itens={listItens} />
            }
          </div>
          {selectedItens.length > 0 && <Cart />}
        </div>
      </main>
      <Footer />
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  const response = await getItens()
  if (!response || !response.itens) return { list: [] }
  return { list: response.itens }
}

export default Home