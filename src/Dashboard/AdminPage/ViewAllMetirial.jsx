import { useEffect, useState } from "react";
import useQueryGetSecure from "../../Hooks/QueryGet/useQueryGetSecure";
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import { FiExternalLink, FiTrash2 } from "react-icons/fi";

const ViewAllMetirial = () => {
  const [metrial, setMetrial] = useState([]);
  const [secureData, refetch] = useQueryGetSecure("/getallmetrial");
  const secureApiCall = useSecureApi();

  useEffect(() => {
    setMetrial(secureData?.data);
  }, [secureData]);

  const handelMetrialdelete = (id) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      secureApiCall
        .delete(`/deleteMetrial/${id}`)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          refetch();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Learning Materials
      </h1>

      {metrial?.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No materials available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {metrial?.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  src={item.imageurl}
                  alt={item.title}
                  onError={(e) => {
                    e.target.src =
                      'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"%3E%3Crect fill="%23f3f4f6" width="400" height="200"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="16" dy=".35em" text-anchor="middle" x="200" y="100"%3ENo Image Available%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {item.title}
                </h2>

                <div className="flex items-center justify-between mt-4">
                  <a
                    href={item.links}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FiExternalLink className="mr-2" />
                    View Resource
                  </a>

                  <button
                    onClick={() => handelMetrialdelete(item._id)}
                    className="flex items-center text-red-600 hover:text-red-800 transition-colors"
                  >
                    <FiTrash2 className="mr-2" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllMetirial;
