import axios from "axios"

const publicApicall = axios.create({
    baseURL : 'http://localhost:5000'
})

const usePullicApi = () => {
  return publicApicall
}

export default usePullicApi