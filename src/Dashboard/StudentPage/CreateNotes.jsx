import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import useUserContext from "../../Hooks/UserContext/useUserContext";
import { ToastContainer, toast } from 'react-toastify';
const CreateNotes = () => {
  const {user} = useUserContext();
  const secureApiCall = useSecureApi();

  const handelSubmits = (e)=>{
    e.preventDefault();
      const studentEmail = user.email;
      const noteTitle = e.target.noteTitle.value;
      const noteDescription = e.target.noteDescription.value;
      const notes = {studentEmail, noteTitle, noteDescription}

      secureApiCall.post("/createNote", notes)
      .then((res)=> {
        if(res.data.insertedId){
          toast.success("Note Created");
          e.target.reset();
        }
      })
      .catch((err)=> console.log(err))
    console.log({studentEmail, noteTitle, noteDescription})
  }

  return (
    <div>
      <div>
        <ToastContainer />
        <div>
          <h2 className="text-center text-3xl font-[600]">Create your Personal Note</h2>
        </div>
        <div>
          <form onSubmit={handelSubmits}>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Your Note Title</span>
                </div>
                <input
                name="noteTitle"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Your Note Title</span>
                </div>
                <textarea  className="border border-gray-200 focus:outline-gray-200 rounded-lg p-[15px]" name="noteDescription" id="" cols="30" rows="7" placeholder="Enter Your Note"></textarea>
              </label>
            </div>
            <div className="mt-[20px]">
              <button className="w-full py-[12px] bg-white rounded-lg">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNotes;
