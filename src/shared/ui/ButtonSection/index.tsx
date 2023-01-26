import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

type buttonSectionProps = {
    children: any,
    link: string,
    styleSheet: string
}

export const ButtonSection = ({ children, link, styleSheet }: buttonSectionProps) => {

    const configureStyle = () => {
        if(styleSheet === 'documentation'){
            return styles.documentation
        }else if(styleSheet === 'klavaogr'){
            return styles.klavaogr
        }else if(styleSheet === 'clikclik'){
            return styles.clikclik
        }
    }

  return (
    <Link to = {link} className = {styles.linkButton}>
        <button className={configureStyle()}>
            {children}
        </button>
    </Link>
  )
}
