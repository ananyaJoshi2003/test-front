import axios from 'axios';




const Constants = {
  // BASE_URL: 'https://kartalucia-backend.vercel.app/api',
  
BASE_URL: "https://test-back-ashy.vercel.app/",
getTokens: () => ({
  adminloggedIn: localStorage.getItem("adminToken"),
}),
};

export default Constants;
