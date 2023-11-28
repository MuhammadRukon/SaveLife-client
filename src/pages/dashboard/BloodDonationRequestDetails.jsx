import { useLoaderData, useNavigate } from "react-router-dom";
import { updateBloodRequest } from "../../api/auth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const BloodDonationRequestDetails = () => {
  const { user } = useAuth();
  const { data } = useLoaderData();
  const navigate = useNavigate();

  return data ? (
    <div className="my-10 xl:w-3/5 mx-auto lg:my-24 px-4 lg:px-5">
      <h2 className="text-center font-primary xl:text-5xl">
        Blood Donation Request Details
      </h2>

      <div className=" mt-10 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.15)]">
        <div className="p-8 py-10 space-y-3  font-semibold flex flex-col justify-between flex-1">
          <h2 className="mb-5 2xl:mb-0 text-3xl capitalize font-semibold">
            <strong>Recipient's Name: </strong> {data.recipientName}
          </h2>
          <h2 className="mb-5 2xl:mb-0 text-3xl capitalize font-semibold">
            <strong>Requester's Name: </strong> {data.requesterName}
          </h2>
          <p className="text-lg">
            <strong>Requester's email:</strong> {data.requesterEmail}
          </p>

          <p>
            <strong>Full Address Line:</strong> {data.address}
          </p>
          <p>
            <strong>District:</strong> {data.recipientDistrict}
          </p>
          <p>
            <strong>Upazila:</strong> {data.recipientUpazila}
          </p>
          <p>
            <strong>Donation Date:</strong> {data.donationDate}
            <span className="text-xs opacity-60"> (mm-dd-yyyy)</span>
          </p>
          <p>
            <strong>Donation Time:</strong> {data.donationTime}{" "}
            <span className="text-xs opacity-60">(24h)</span>
          </p>
          <p className="">
            <strong>Hospital Name:</strong> {data.hospitalName}
          </p>
          <p className="">
            <strong>Requester's Message:</strong> {data.requestMsg}
          </p>
          <p>
            <strong>Requester's Message:</strong>{" "}
            <span
              className={`${
                (data.donationStatus === "pending" ||
                  data.donationStatus === "inprogress") &&
                "bg-yellow-200 text-yellow-600"
              } ${
                data.donationStatus === "cancelled" && "bg-red-200 text-red-800"
              } ${
                data.donationStatus === "done" && "bg-green-200 text-green-800"
              } px-2 rounded-full py-1 `}
            >
              {data.donationStatus}
            </span>
          </p>
          <button
            onClick={() =>
              Swal.fire({
                title: "Are you sure?",
                html:
                  `<input class="swal-input" style="border: 1px solid gray; padding: 5px; border-radius: 8px;  width: 300px" readOnly placeholder="${user?.displayName}" />` +
                  `<br/>` +
                  `<input class="swal-input" style="border: 1px solid gray; padding: 5px; border-radius: 8px; width: 300px; margin-top: 20px" readOnly placeholder="${user?.email}" />`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "blue",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "confirm",
              }).then(async (result) => {
                const statusInfo = {
                  donationStatus: "inprogress",
                  donorName: user?.displayName,
                  donorEmail: user?.email,
                };
                if (result.isConfirmed) {
                  const response = await updateBloodRequest(
                    data._id,
                    statusInfo
                  );
                  if (response.modifiedCount > 0) {
                    Swal.fire({
                      title: "Updated",
                      text: "Blood Donation Request updated.",
                      icon: "success",
                    });
                    navigate("/dashboard/my-blood-donation-requests");
                  } else {
                    toast.error("could not update");
                  }
                }
              })
            }
            className={`btn w-fit ${
              data.donationStatus !== "pending" && "btn-disabled"
            } bg-primary text-white hover:bg-primary font-bold`}
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default BloodDonationRequestDetails;
