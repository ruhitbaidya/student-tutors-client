
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div>
        <div className='h-screen flex justify-center items-center'>
            <div>
                <h4 className='text-center text-6xl text-gray-500'>404 Page not Found</h4>
                <Link to="/" className='px-[30px] py-[12px] border mt-[50px] block text-center'> Go To Home</Link>
            </div>
        </div>
    </div>
  )
}

export default ErrorPage