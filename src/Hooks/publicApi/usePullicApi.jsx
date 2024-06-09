import axios from "axios"

const publicApicall = axios.create({
    baseURL : 'https://student-tutor.vercel.app'
})

const usePullicApi = () => {
  return publicApicall
}

export default usePullicApi