import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
    const navigate = useNavigate();
  return (
    <div style={{textAlign: "center" , padding: "40px"}}>
        <h1>404-page not found</h1>
        <button onClick={()=>navigate("/")}>
            Return to HOME page
        </button>
    </div>
  )
}

export default NotFoundPage