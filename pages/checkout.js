import { useState } from 'react'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import styles from '../src/styles/Home.module.css'
import Footer from '../src/components/footer/index.jsx'
import Cart from '../src/components/cart/index.jsx'

const Checkout = () => {
  const [loading, setLoading] = useState(true)
  const selectedItens = Object.values(useSelector((state) => state.itens))
  const appName = process.env.NEXT_PUBLIC_APP_NAME
  const chalengeName = process.env.NEXT_PUBLIC_CHALENGE_NAME

  setTimeout(() => {
    setLoading(false)
  }, 10000);

  return (
    <div className={styles.container}>
      <Head>
        <title>Menu | {appName}</title>
        <meta name="description" content="Itens listing page." />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Checkout {appName}
        </h1>
        <strong className={styles.subTitle}>
          {chalengeName}
        </strong>
        {loading &&
            <p className={ styles.finalMessage }>
                We are preparing your order. Please wait a few seconds.
            </p>
        }
        {loading
            ?   <div className={styles.grid}>
                    <Cart btn={false} />
                </div>
            :   <>
                <h1>Order successfully completed!</h1>
                <div>
                    <p>
                        You can now collect your order at the counter.
                    </p>
                </div>
            </>}        
      </main>
      <Footer />
    </div>
  )
}

export default Checkout