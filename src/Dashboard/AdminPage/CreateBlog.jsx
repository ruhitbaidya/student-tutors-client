import { FaPlus } from "react-icons/fa6";
import BlogCreateForm from "./BlogCreateForm";
import usePullicApi from "../../Hooks/publicApi/usePullicApi";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import { ToastContainer, toast } from "react-toastify";
const CreateBlog = () => {
  const [blog, setBlog] = useState([]);
  const publicApicall = usePullicApi();
  const secureApiCall = useSecureApi();
  useEffect(() => {
    publicApicall
      .get("/get-blog")
      .then((res) => setBlog(res?.data))
      .catch((err) => console.log(err));
  }, [publicApicall]);
  const handelDelete = (id) => {
    // delete-singal-blog/:id
    secureApiCall
      .delete(`/delete-singal-blog/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          toast.success("Blog Delete Success");
          const finisaldata = blog?.filter((item) => item?._id !== id);
          setBlog(finisaldata);
        }
      })
      .catch((err) => console.log(err));
  };
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
        <div>
          {" "}
          <ToastContainer />
          <div>
            <h4>Blog Table</h4>
            <table className="w-full border-collapse">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="p-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider hidden md:table-cell">
                    Desc
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider hidden sm:table-cell">
                    Date
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-indigo-100">
                {blog &&
                  blog.map((item) => (
                    <tr key={item.id} className="hover:bg-indigo-50">
                      <td className="p-3 whitespace-nowrap">
                        <img
                          className="w-10 h-10 rounded-md object-cover"
                          src={item.image}
                          alt={item.title}
                        />
                      </td>
                      <td className="p-3 whitespace-nowrap text-sm font-medium text-indigo-900">
                        {item.title}
                      </td>
                      <td className="p-3 text-sm text-indigo-800 hidden md:table-cell">
                        {item.description.length > 50
                          ? `${item.description.substring(0, 50)}...`
                          : item.description}
                      </td>
                      <td className="p-3 whitespace-nowrap text-sm text-indigo-500 hidden sm:table-cell">
                        {new Date(item.createAt).toDateString()}
                      </td>
                      <td className="p-3 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                          <CiEdit className="w-5 h-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <MdDelete
                            onClick={() => handelDelete(item._id)}
                            className="w-5 h-5"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
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
