import axios from "axios";

const UserSetRole = (user) => {
    return axios.post("https://student-tutor.vercel.app/user-role-set", user);
}

export default UserSetRole