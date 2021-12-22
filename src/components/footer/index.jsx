import Image from 'next/image'
import styles from '../../styles/Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}>
          <a href='https://pedrocf87.github.io' target="_blank" rel="noopener noreferrer">
            Powered by{' '}
            <strong className={styles.logo}>
              Pedro Figueira
            </strong>
          </a>
      </footer>
    )
}

export default Footer
