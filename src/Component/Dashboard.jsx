import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./Firebase";


function Dashboard() {
  const [assets, setAssets] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Assets
        const assetSnap = await getDocs(collection(db, "assests"));

        const assetData = assetSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAssets(assetData);
        console.log("Total Assets:", assetData.length);
        console.log(assetData);
        console.table(
          assetData.map(item => ({
            id: item.id,
            assetName: item.assetName,
            status: item.status,
            location: item.location
          }))
        );
        // Reports
        const reportSnap = await getDocs(collection(db, "reports"));

        const reportData = reportSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReports(reportData);

      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, []);
  return (
    <div className="min-h-screen lg:ml-64 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2563EB]">
          Dashboard
        </h1>

        <p className="text-[#2563EB] mt-2">
          Welcome back! Here's your asset overview.
        </p>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

        <div className="bg-white rounded-xl shadow p-6 ">
          <h3 className="text-gray-500 text-xl">Total Assests</h3>
          <h1 className="text-4xl font-bold mt-10">
            {assets.length}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500 text-xl">Available</h3>
          <h1 className="text-4xl font-bold text-green-600 mt-10">
            {
              assets.filter(item => item.status === "Active").length
            }
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500 text-xl">Maintenance</h3>
          <h1 className="text-4xl font-bold text-yellow-500 mt-10">
            {
              assets.filter(item => item.status === "Maintenance").length
            }
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500 text-xl">Issues Reported</h3>
          <h1 className="text-4xl font-bold text-red-500 mt-10">
            {reports.length}
          </h1>
        </div>

      </div>

      {/* Recent Assets */}
  <div className="bg-white rounded-xl shadow mt-8 p-6">

    <h2 className="text-xl font-semibold mb-4">
        Recent Assets
    </h2>

    <div className="overflow-x-auto">

        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Asset</th>
              <th className="text-left py-3">Department</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>

          <tbody>

            {assets.slice(0, 5).map((item) => (

              <tr key={item.id} className="border-b hover:bg-gray-50">

                <td className="py-4">
                  {item.assetName}
                </td>

                <td>
                  {item.location}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm

${item.status === "Inactive"
                        ? "bg-green-100 text-green-700"

                        : item.status === "Maintenance"

                          ? "bg-yellow-100 text-yellow-700"

                          : "bg-red-100 text-red-700"

                      }`}

                  >

                    {item.status}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;