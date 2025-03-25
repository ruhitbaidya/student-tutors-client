import axios from "axios";

const UserSetRole = (user) => {
  return axios.post("http://localhost:5000/user-role-set", user);
};

export default UserSetRole;
