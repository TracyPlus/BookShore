import { Select, Pagination } from "antd";
import BookCard from "./BookCard";
import Layout from "../../layout/Layout";
import SliderCard from "./SliderCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { content, filterswrapper, cardwrapper } from "./BookCard.module.css";

export default function BookShore() {
  const [books, setBooks] = useState([]);
  const [books0, setBooks0] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 当前页数
  const [pageSize, setPageSize] = useState(5); // 每页显示的数量
  const totalItems = books.length; // 总共的图书数量

  const fetchAll = async () => {
    const res = await axios.post("/book",{
      "operation": "get_all_books",
      "token": localStorage.getItem("token")
    });
    console.log(res.data.books);
    setBooks(res.data.books);
    setBooks0(res.data.books)
  };
  const books1 = [];
  const books2 = [];
  const books3 = [];
  const books4 = [];

  for(let i=0; i<4; i++){
    books2.push(books0[i])
  }
  for(let i=4; i<6; i++){
    books1.push(books0[i])
  }
  for(let i=6; i<10; i++){
    books3.push(books0[i])
  }
  for(let i=10; i<12; i++){
    books4.push(books0[i])
  }
  console.log(books0);
  console.log(books1);
  console.log(books2);
  console.log(books3);
  console.log(books4);

  useEffect(() => {
    fetchAll();
    console.log(books);
  }, [])

  const filters = {
    typechosen: {
      options: [
        {
          label: "所有图书",
          value: "0",
        },
        {
          label: "中国名著",
          value: "1",
        },
        {
          label: "外国名著",
          value: "2",
        },
        {
          label: "教辅书",
          value: "3",
        },
        {
          label: "其他",
          value: "4",
        },
      ],
      defaultValue: "0",
    },
    status: {
      options: [
        {
          label: "全部",
          value: "全部",
        },
        {
          label: "已解答",
          value: "已解答",
        },
        {
          label: "未解答",
          value: "未解答",
        },
      ],
      defaultValue: "全部问题",
    },
    sortByNum: {
      options: [
        {
          label: "降序",
          value: "dsc",
        },
        {
          label: "升序",
          value: "asc",
        },
      ],
      defaultValue: "剩余数量",
    },
  };
  
  const handleChange = (values) => {
    console.log(values);
    switch (values){
      case "0": setBooks(books0); break;
      case "1": setBooks(books1); break;
      case "2": setBooks(books2); break;
      case "3": setBooks(books3); break;
      case "4": setBooks(books4); break;
      default: break;
    }
  }
  
  const handleSort = (value) => {
    console.log(value);
    let newBooks = [...books];
    if (value === "asc") {
      newBooks.sort((a, b) =>
        a.remain_number> b.remain_number
      );
    } else {
      newBooks.sort((a, b) =>
        b.remain_number>a.remain_number
      );
    }
    setBooks(newBooks);
  };
   // 处理分页改变事件
    // 根据当前页数和每页显示数量计算需要显示的图书数据
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = books.slice(startIndex, endIndex);
  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  return (
    <Layout main={
      <div className={content}>
        <div style={{width:"100vw"}}>
          <div style={{height:"3rem"}}></div>
          <SliderCard />
          <div style={{height:"3rem"}}></div>
        </div>
        <div style={{display:"flex", justifyContent:"center"}}>
          <div className={filterswrapper}>
            <Select
              {...filters.typechosen}
              onChange={handleChange}
            />
            <Select
              style={{marginLeft:"2rem"}}
              {...filters.sortByNum}
              onChange={handleSort}
            />
          </div>
        </div>
        <div style={{display:"flex", justifyContent:"center"}}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            onChange={handlePaginationChange}
            style={{ 
              backgroundColor:"white", 
              marginTop: "2rem", 
              marginBottom: "1rem", 
              padding: "0.5rem",
              textAlign: "center",
              minWidth:"10rem",
              borderRadius: "1.2rem",  
              boxShadow: "6px 4px 15px #a2a2d8"
            }}
          />
        </div>
        <div className={cardwrapper}>
          <div>
            {paginatedData?.map((item, idx) => (
              <BookCard key={idx} book={item} refresh={fetchAll} />
            ))}
          </div>
        </div>
        <div style={{minHeight:"5rem"}}></div>
      </div>
    } />
  );
}
  