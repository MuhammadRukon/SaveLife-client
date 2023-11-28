import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import GetLocation from "../../components/shared/GetLocation";
import {
  deleteBloodRequest,
  getSingleBloodRequest,
  updateBloodRequest,
} from "../../api/auth";
import toast from "react-hot-toast";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const CreateDonationRequest = () => {
  const { user, loading } = useAuth();
  const { id } = useParams();

  const { data: request, isLoading } = useQuery({
    enabled: !!id,
    queryKey: ["donationRequest"],
    queryFn: async () => await getSingleBloodRequest(id),
  });
  const navigate = useNavigate();
  const [location, setLocation] = useState({
    upazila: request?.recipientUpazila,
    district: request?.recipientDistrict,
  });
  useEffect(() => {
    setLocation({
      upazila: request?.recipientUpazila,
      district: request?.recipientDistrict,
    });
  }, [request]);
  const [errormsg, setErrorMsg] = useState("");
  // /update
  const handleRequest = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const requesterName = e.target.requesterName.value; //read only in input
    const requesterEmail = e.target.requesterEmail.value; //read only in input
    const recipientName = e.target.recipientName.value;
    const recipientDistrict = location?.district;
    const recipientUpazila = location?.upazila;
    const hospitalName = e.target.hospitalName.value;
    const address = e.target.address.value;
    const requestMsg = e.target.requestMsg.value;
    const donationStatus = "pending";
    const presentDate = moment().format("MM-DD-YYYY");

    const donationDate = moment(e.target.donationDate.value).format(
      "MM-DD-YYYY"
    );
    const donationTime = e.target.time.value;
    if (presentDate > donationDate) {
      toast.error("can not select past time.");
      return;
    }

    //   post object
    const requestInfo = {
      requesterName,
      requesterEmail,
      recipientName,
      recipientDistrict,
      recipientUpazila,
      hospitalName,
      address,
      requestMsg,
      donationStatus,
      donationDate,
      donationTime,
    };
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#FF474C",
      confirmButtonText: "Update",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await updateBloodRequest(request._id, requestInfo);
        if (response.modifiedCount > 0) {
          Swal.fire({
            title: "Updated",
            text: "Blood Donation Request updated.",
            icon: "success",
          });
          navigate("/dashboard/my-blood-donation-requests");
        } else {
          toast.error("could not update");
          navigate("/dashboard/my-blood-donation-requests");
        }
      }
    });
    //   post request to database
  };
  // delete
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteBloodRequest(request._id);
        if (response.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Blood Donation Request deleted.",
            icon: "success",
          });
          navigate("/dashboard/my-blood-donation-requests");
        } else {
          toast.error("could not delete");
        }
      }
    });
  };
  return (
    !isLoading && (
      <div className="flex justify-center items-center my-12 px-4 xl:px-0 xl:my-20 min-h-screen">
        <div className="flex flex-col 2xl:w-2/5 p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Edit Donation Request</h1>
          </div>
          <form
            onSubmit={handleRequest}
            noValidate=""
            action=""
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="requesterName"
                  className="text-gray-500 block mb-2 text-sm"
                >
                  Requester Name
                </label>
                <input
                  type="text"
                  name="requesterName"
                  id="requesterName"
                  value={user?.displayName}
                  className="text-gray-400 cursor-default focus:outline-none w-full px-3 py-2 border rounded-md  bg-gray-200"
                  data-temp-mail-org="0"
                  readOnly
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="requesterEmail"
                  className=" text-gray-500 block mb-2 text-sm"
                >
                  Requester email
                </label>
                <input
                  type="email"
                  name="requesterEmail"
                  id="requesterEmail"
                  value={user?.email}
                  className="text-gray-400 cursor-default focus:outline-none w-full px-3 py-2 border rounded-md  bg-gray-200"
                  data-temp-mail-org="0"
                  readOnly
                  required
                />
              </div>
              <div>
                <label htmlFor="recipientName" className=" block mb-2 text-sm">
                  Recipient Name
                </label>
                <input
                  type="text"
                  name="recipientName"
                  id="recipientName"
                  required
                  defaultValue={request.recipientName}
                  placeholder="Enter Recipient Name"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div className="flex">
                <div>
                  <label htmlFor="donationDate" className=" block mb-2 text-sm">
                    Donation Date & time
                  </label>
                  <div className="flex flex-col gap-3 lg:flex-row justify-between">
                    <input
                      type="date"
                      name="donationDate"
                      id="donationDate"
                      className="w-[278px] mr-3 px-3 py-2 border  rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                      data-temp-mail-org="0"
                      required
                    />

                    <input
                      type="time"
                      name="time"
                      id="time"
                      defaultValue={request?.donationTime}
                      className="border border-gray-300 rounded-lg h-11"
                    />
                  </div>
                  <p className="italic m-2 mb-0 opacity-75 text-sm">
                    previous date: {request.donationDate}
                  </p>
                </div>
              </div>
              <label className="block  text-sm">Recipient's Location:</label>
              <div className="-mt-8">
                <GetLocation
                  location={location}
                  setLocation={setLocation}
                  dontShowBloodInput={true}
                />
              </div>
              <div>
                <label htmlFor="hospitalName" className="block mb-2 text-sm">
                  Hospital name
                </label>
                <input
                  type="text"
                  name="hospitalName"
                  id="hospitalName"
                  required
                  defaultValue={request?.hospitalName}
                  placeholder="Enter hospital name"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div>
                <label htmlFor="address" className="block mb-2 text-sm">
                  Full Address Line
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  required
                  defaultValue={request?.address}
                  placeholder="Road, city"
                  className="w-full px-3 py-2 border placeholder:italic rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div>
                <label htmlFor="requestMsg" className="block mb-2 text-sm">
                  Request Message
                </label>
                <textarea
                  type="text"
                  name="requestMsg"
                  id="requestMsg"
                  defaultValue={request?.requestMsg}
                  required
                  placeholder="Enter Request Message"
                  className="w-full px-3 py-2 h-32 resize-none border placeholder:italic rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>

              <p className="-pt-2 h-3 text-red-700 italic text-sm">
                {errormsg}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-secondary w-full rounded-md py-3 text-white"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "update request"
                )}
              </button>
              <Link
                to={`/dashboard/blood-donation-request/details/${request?._id}`}
                className="bg-blue-700 cursor-pointer text-center w-full rounded-md py-3 text-white"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "view details"
                )}
              </Link>
              <span
                onClick={handleDelete}
                className="bg-red-600 cursor-pointer text-center w-full rounded-md py-3 text-white"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Delete Request"
                )}
              </span>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateDonationRequest;
