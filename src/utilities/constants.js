import axios from 'axios';




const Constants = {
  BASE_URL: 'https://kartalucia-backend.vercel.app/api',
  
// BASE_URL: "https://1shdeepcreatives.com/api",
getTokens: () => ({
  adminloggedIn: localStorage.getItem("adminToken"),
}),
};

export default Constants;
