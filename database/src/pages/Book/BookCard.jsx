import { Button, notification, Pagination } from "antd";
import { wrapper, text, info, progress, flexrow } from "./BookCard.module.css";
import axios from 'axios';

const BookCard = ({ book, refresh }) => {
  const handleBorrow = () => {
    console.log("借阅");
    axios.post("/book",{
      "operation": "borrow",
      "book_id": book.id,
      "token": localStorage.getItem("token")
    })
    .then(() => notification.success({message: '借阅成功'}))
    .then(refresh);
  }
  return (
    <div className={wrapper}>
      <div className={flexrow} >
        <div className={flexrow} >
          <img src= {book.cover_img} style={{width:"10rem",height:"10.625rem",display:"block"}}/>
          <div className={text}>
            <h3>{book.title}</h3>
            <p className={info}>{book.author}</p>
            <p className={info}>{book.publisher}</p>
            <p className={info}>剩余数量：{book.remain_number}</p>
          </div>
        </div>
        <Button 
          type="primary"
          size="large"
          shape="round"
          style={{backgroundColor:"#929cf7"}}
          onClick={handleBorrow}>
          点击借阅
        </Button>
      </div>
    </div>
  )
}

export default BookCard