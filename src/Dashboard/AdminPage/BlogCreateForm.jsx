import { useState } from "react";
import { useForm } from "react-hook-form";
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import { ToastContainer, toast } from "react-toastify";
const BlogCreateForm = () => {
  const [loading, setLoading] = useState(false);
  const secureApiCall = useSecureApi();
  const [image, setImage] = useState(null);
  const [prevImage, setPrevImage] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_secrate
      }`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await res.json();
    if (result?.data?.display_url) {
      secureApiCall
        .post(`/create-blog`, { ...data, image: result.data.display_url })
        .then((res) => {
          if (res.data.acknowledged) {
            reset();
            setPrevImage("");
            setLoading(false);
            toast.success("Blog Create Success");
          }
          console.log(res);
        });
      console.log(result);
      console.log({ ...data, image: result.data.display_url });
    }
  };
  return (
    <div>
      <ToastContainer />
      <div>
        <img className="h-[150px] w-[100px]" src={prevImage} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPrevImage(URL.createObjectURL(e.target.files[0]));
            }}
            type="file"
            className="w-full p-[10px]"
          />
        </div>
        <div>
          <label htmlFor="title">Blog Title</label>
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="Blog Title"
            className="w-full p-[10px] focus:outline-none border"
          />
          {errors.title && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="desc">Blog Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full p-[10px] focus:outline-none border"
            id=""
            placeholder="Blog Details"
          ></textarea>
          {errors.description && <span>This field is required</span>}
        </div>
        <div>
          <button className="w-full bg-indigo-800 text-white py-[8px]">
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogCreateForm;
