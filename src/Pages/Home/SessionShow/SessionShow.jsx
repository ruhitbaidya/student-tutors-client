import useSecureApi from "../../../Hooks/SecureApi/useSecureApi"


const SessionShow = () => {
    const [secureData] = useSecureApi("/getForeHome");
    console.log(secureData)
  return (
    <div>

    </div>
  )
}

export default SessionShow