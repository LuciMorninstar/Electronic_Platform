import { IoWarningOutline } from 'react-icons/io5'

const Error = () => {
  return (
  <div className ="flex flex-col  justify-center items-center gap-5 w-full h-screen">
    <IoWarningOutline className="text-red-500 bg-secondary-color dark:bg-dark-primary-color border-none text-5xl" />
    <span className="text-red-500 text-3xl">404 Error</span>
    <h1 className = "text-white text-3xl font-bold">
        This page does not exist. 
    </h1>

   {/* <Link className = "slide_btn" to ="/"> Go back</Link> */}

  </div>
  )
}

export default Error