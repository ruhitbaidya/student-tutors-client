import { FaPlus } from "react-icons/fa6";
import BlogCreateForm from "./BlogCreateForm";

const CreateBlog = () => {
  return (
    <div>
      <div>
        <div className="flex justify-end items-center">
          <button
            onClick={() => document.getElementById("my_modal_4").showModal()}
            className="btn bg-indigo-800 text-white"
          >
            <span>Create Blogs</span> <FaPlus />
          </button>
        </div>
      </div>
      {/** Create blogs Modal */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <BlogCreateForm />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CreateBlog;
