import { Routes, Route, Navigate } from "react-router-dom";
import Layout from '../Layout';
import { HomePage } from 'pages';


export default function App() {
  return (
     <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<HomePage/>} />
          <Route path="movies" element={<div>It's movies</div>} />
          <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
  )
};


// API_KEY
// 3b94c1b54af7d429587ecf26a37007c0