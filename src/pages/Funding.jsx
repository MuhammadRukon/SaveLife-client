import React from "react";
import Container from "../components/shared/Container";
import { useState } from "react";
import FundDonationModal from "../components/Modal/FundDonationModal";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getAllTransactionInfo, getUser } from "../api/auth";
import { useEffect } from "react";
import FundDonorRow from "../components/FundDonorRow";

const Funding = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [transactionInfo, setTransactionInfo] = useState({});

  const { data: userInfo } = useQuery({
    enabled: !!user,
    queryKey: ["getUserInfo"],
    queryFn: async () => await getUser(user?.email),
  });
  const {
    data: loadedData,
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!user,
    queryKey: ["getFundDonors"],
    queryFn: async () => await getAllTransactionInfo(),
  });

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
    setAmount(0);
    refetch();
  };
  useEffect(() => {
    setTransactionInfo({
      displayName: userInfo?.displayName,
      photoURL: userInfo?.photoURL,
      email: userInfo?.email,
      amount: Number(amount),
    });
  }, [amount]);
  console.log(loadedData);
  return (
    <Container>
      <h1 className="text-center mt-20 text-4xl lg:text-6xl font-bold font-primary capitalize">
        Fundings
      </h1>
      <p className="text-center text-base lg:text-lg italic leading-7 tracking-widest opacity-80 font-semibold mt-5">
        Your Contribution Ensures the Lifeline of Our Blood Donation Initiative
        <br /> Give Today to Keep Us Saving Lives
      </p>
      <div className="text-center mt-10">
        <p className="pb-4 text-xl font-semibold">Enter Amount</p>
        <input
          type="number"
          name="number"
          id=""
          value={amount || ""}
          onChange={(e) => setAmount(e.target.value)}
          className="border px-4 border-gray-300 h-10 lg:w-60 focus:outline-none rounded-lg"
        />
      </div>
      <div className="text-center mt-4">
        <p className="text-red-500 text-sm italic">{errorMsg}</p>
        <button
          onClick={() => {
            setErrorMsg("");
            if (transactionInfo.amount < 1) {
              setErrorMsg("Enter valid amount");
              return;
            }
            setIsOpen(true);
          }}
          className="btn hover:scale-110 mt-10 animate-bounce px-14 h-20 bg-primary font-bold text-2xl text-white hover:bg-primary"
        >
          Donate Now
        </button>
        <FundDonationModal
          isOpen={isOpen}
          closeModal={closeModal}
          transactionInfo={transactionInfo}
        />
      </div>
      {/* fund donors */}
      <div className="">
        <h1 className="text-center mt-10 mb-10 text-3xl  lg:text-5xl font-bold font-primary capitalize">
          Our Honorable Donors
        </h1>
        <div className="drop-shadow-[0_2px_7px_rgba(0,0,0,0.10)]  flex justify-center rounded-lg">
          <table className="w-full">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-2 lg:px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-2 lg:px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-4 lg:px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-1 lg:px-3 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-2 lg:px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {/* User data table row */}
              {!isLoading &&
                loadedData?.map((data, index) => (
                  <FundDonorRow key={index} user={data} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default Funding;
