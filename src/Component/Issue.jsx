import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./Firebase";

const Issue = () => {

  const [issues, setIssues] = useState([]);

  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, "reports"),
      (snapshot) => {

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setIssues(data);
      }
    );

    return () => unsubscribe();

  }, []);

  return (
    <div className="bg-white rounded-xl shadow mt-8 p-6 lg:ml-64 p-4 sm:p-6 lg:p-8">
   <h2 className="text-2xl font-bold mb-4">
        Report Issues
    </h2>

    <div className="overflow-x-auto">

        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b">
            <th className="text-left py-3">Asset</th>
            <th className="text-left py-3">Serial</th>
            <th className="text-left py-3">Location</th>
            <th className="text-left py-3">Description</th>
            <th className="text-left py-3">Status</th>
          </tr>
        </thead>

        <tbody>

          {issues.map((issue) => (

            <tr key={issue.id} className="border-b hover:bg-gray-50">
              <td className="py-4">{issue.assetName}</td>
              <td>{issue.serialNumber}</td>
              <td>{issue.location}</td>
              <td>{issue.description}</td>
              <td>{issue.status}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
    </div>
  );
};

export default Issue;