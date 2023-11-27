import { useLoaderData, useNavigate } from "react-router-dom";
import { updateBloodRequest } from "../../api/auth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const BloodDonationRequestDetails = () => {
  const { data } = useLoaderData();
  const navigate = useNavigate();

  return data ? (
    <div className="my-10 w-3/5 mx-auto lg:my-24 px-3 lg:px-5">
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
            <strong>requester's email:</strong> {data.requesterEmail}
          </p>

          <p>
            <strong>Address:</strong> {data.address}
          </p>
          <p>
            <strong>Donation Date:</strong> {data.donationDate}
          </p>
          <p>
            <strong>Donation Time:</strong> {data.donationTime}
          </p>
          <p className="">
            <strong>Hospital Name:</strong> {data.hospitalName}
          </p>

          <button
            onClick={() =>
              Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "confirm",
              }).then(async (result) => {
                const statusInfo = { donationStatus: "inprogress" };
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
