import axios from "axios";
axios.defaults.baseURL = 'http://localhost:5174'

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { getQueryStringParams } from "./utils/getQueryStringParams";
import "./App.css";
import Login from "./pages/Login/Login";
import Signup from './pages/Signup/Signup';
import SignupStudent from './pages/Signup/SignupStudent';
import LoginAdmin from "./pages/Login/LoginAdmin";

import BookShore from './pages/Book/BookShore';
import Layout2 from './layout/Layout--.tsx';
import UserPage from './pages/UserPage/UserPage';
import Borrowed from './pages/UserPage/Borrowed';
import Contact from './pages/Book/Contact';

import Layout from './layout/Layout-.tsx';
import UserList from "./pages/Manage/UserList";
import BookList from "./pages/Manage/BookList";
import BorrowList from "./pages/Manage/BorrowList";
import CheckList from './pages/Manage/CheckList';
                      
function App() {
  const queryParams = getQueryStringParams(location.search);
  const queryClient = new QueryClient();
  if (queryParams.sid) {
    localStorage.setItem("sid", queryParams.sid);
    location.replace("/login");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          {/* <Route path="/admin" element={<StageList />} /> */}
            <Route path="/user" element={<UserList />} />
            <Route path="/book" element={<BookList />} />
            <Route path="/borrow" element={<BorrowList />} />
            <Route path="/check" element={<CheckList />} />            
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signups" element={<SignupStudent />} />
          <Route path="/logina" element={<LoginAdmin />} />
          <Route path="/" element={<Layout2 />}>
            <Route path="/userpage" element={<UserPage />} />
            <Route path="/borrowed" element={<Borrowed />} />
            <Route path="/contactus" element={<Contact />} />
          </Route>
          <Route path="/bookshore" element={<BookShore />} />
          <Route path="*" element={<h1 style={{marginLeft:"40%", marginTop:"10%"}}>404 Not Found</h1>} /> 
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
