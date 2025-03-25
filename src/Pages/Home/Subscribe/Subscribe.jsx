const Subscribe = () => {
  return (
    <div>
      <div className="mb-[20px] text-center">
        <h2 className="text-[25px] font-[600]">Subscribe Now</h2>
        <p>Choice your category cource and get more Tutors Cources</p>
      </div>
      <hr className="w-[20%] mx-auto border border-gray-500 mt-[10px]" />
      <div className="container mx-auto px-[20px] my-[30px]">
        <div className="grid grid-cols-2 gap-[25px] border p-[30px]">
          <div className="flex justify-center items-center">
            <img
              className="rounded-lg"
              src="https://yamm.com/blog/content/images/size/w300/2021/04/3-steps-to-create-beautiful-and-engaging-emails-with-Google-Docs-1.png"
              alt=""
            />
          </div>
          <div>
            <form className="space-y-7">
              <div>
                <input
                  className="w-full border p-[10px] rounded-lg focus:outline-none"
                  type="text"
                  placeholder="Enter Your Name"
                />
              </div>
              <div>
                <input
                  className="w-full border p-[10px] rounded-lg focus:outline-none"
                  type="email"
                  placeholder="Enter Your Email"
                />
              </div>
              <div>
                <button className="w-full bg-green-400 py-[8px] rounded-lg">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
