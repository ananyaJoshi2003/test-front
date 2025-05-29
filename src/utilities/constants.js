import axios from 'axios';




const Constants = {
  // BASE_URL: 'https://kartalucia-backend.vercel.app/api',
  
BASE_URL: "https://test-back-psi.vercel.app/api",
getTokens: () => ({
  adminloggedIn: localStorage.getItem("adminToken"),
}),
};

export default Constants;
