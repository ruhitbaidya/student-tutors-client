import { useEffect, useState } from "react"
import useQueryGetSecure from "../../Hooks/QueryGet/useQueryGetSecure"
import useUserContext from "../../Hooks/UserContext/useUserContext"
import useSecureApi from "../../Hooks/SecureApi/useSecureApi"
import { ToastContainer, toast } from "react-toastify"


const ManagePersonalNotes = () => {
  const [notes, setNotes] = useState([])
  const [upids, seupids]= useState("")
  const [siNote, setSiNote] = useState('')
  const {user} = useUserContext()
  const [secureData, refetch] = useQueryGetSecure(`/getPersonalNote/${user.email}`);
  const secureApiCall = useSecureApi();
  console.log(secureData)
  useEffect(()=>{
    setNotes(secureData?.data)
  }, [secureData])
  const handelUpdate = (id)=>{
    seupids(id)
    console.log(id)
    secureApiCall.get(`/getPersonalNoteSingl/${id}`)
    .then((res)=> {
      if(res.data._id){
        setSiNote(res?.data)
        document.getElementById('my_modal_3').showModal()
      }
    })
    .catch((err)=> console.log(err))
   
  }
  const handelSubmits = (e)=>{
    e.preventDefault();
      const noteTitle = e.target.noteTitle.value;
      const noteDescription = e.target.noteDescription.value;
      const notes = {noteTitle, noteDescription}

      secureApiCall.patch(`/updateNote/${upids}`, notes)
      .then((res)=> {
        if(res.data.matchedCount > 0){
          console.log(res.data)
          e.target.reset();
          toast.success("Note Update");
          refetch();
        }
      })
      .catch((err)=> console.log(err))
    console.log({noteTitle, noteDescription})
  }
  const handeldelete = (id)=>{
    secureApiCall.delete(`/deleteNote/${id}`)
    .then((res)=> {
      if(res.data){
        refetch()
      }
    })
  }
  return (
    <div>
      <div>
      <ToastContainer />
        <div>
          {
            notes?.map((item)=>{
              return <div key={item._id} className="bg-gray-100 rounded-lg mb-[10px] p-[20px]">
                <div>
                  <h2>{item.noteTitle}</h2>
                  <p>{item.noteDescription}</p>
                </div>
                <div>
                  <button onClick={()=> handelUpdate(item._id)} className="py-[8px] w-full px-[30px] border bg-yellow-400 mt-[10px]">Update</button>
                  <button onClick={()=> handeldelete(item._id)} className="py-[8px] px-[30px] border bg-red-400  w-full mt-[10px]">Delete</button>
                </div>
              </div>
            })
          }
        </div>

<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">{user.displayName} Update Your Note</h3>
    <form onSubmit={handelSubmits}>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Your Note Title</span>
                </div>
                <input
                defaultValue={siNote.noteTitle}
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
                <textarea defaultValue={siNote.noteDescription}  className="border border-gray-200 focus:outline-gray-200 rounded-lg p-[15px]" name="noteDescription" id="" cols="30" rows="7" placeholder="Enter Your Note"></textarea>
              </label>
            </div>
            <div className="mt-[20px]">
              <button className="w-full py-[12px] bg-gray-300 rounded-lg">Save</button>
            </div>
          </form>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
      </div>
    </div>
  )
}

export default ManagePersonalNotes