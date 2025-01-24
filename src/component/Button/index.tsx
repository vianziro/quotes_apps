import Style from './button.module.css'


export default function Button({ children, onClick, disable }) {
    return (
        <button className={Style.btn} onClick={onClick} disabled={disable}>{children }</button>
    )
}