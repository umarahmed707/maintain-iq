import React, { useEffect, useState } from 'react'
  import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./Firebase";
import { useParams } from 'react-router-dom';

const Report = () => {
  const [description ,setDescription]=useState("")
  const [image ,setImage]=useState("")
const { id } = useParams();

const [asset, setAsset] = useState(null);
  

// const submitReport = async () => {
//   if (!asset) {
//     alert("Asset not found");
//     return;
//   }

//   try {
//     await addDoc(collection(db, "reports"), {
//       assetId: id,
//       assetName: asset.assetName,
//       serialNumber: asset.serialNumber,
//       location: asset.location,
//       description,
//       imageName: image ? image.name : "",
//       status: "Pending",
//       createdAt: serverTimestamp(),
//     });

//     alert("Report Submitted Successfully");

//     setDescription("");
//     setImage(null);
// console.log("Route ID:", id);
//   } catch (error) {
//     console.log(error);
//   }
// };
const submitReport = async () => {
  if (!asset) {
    alert("Asset not found");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "reports"), {
      assetId: id,
      assetName: asset.assetName,
      serialNumber: asset.serialNumber,
      location: asset.location,
      description,
      imageName: image ? image.name : "",
      status: "Pending",
      createdAt: serverTimestamp(),
    });

    console.log("✅ Report Saved:", docRef.id);
    alert("Report Submitted Successfully");

  } catch (error) {
    console.error("❌ Error:", error);
    alert(error.message);
  }
};
useEffect(() => {
  const getAsset = async () => {
  console.log("ID:", id);

  const docRef = doc(db, "assests", id); // ya assests
  const docSnap = await getDoc(docRef);

  console.log("Exists:", docSnap.exists());

  if (docSnap.exists()) {
    console.log(docSnap.data());
    setAsset(docSnap.data());
  } else {
    console.log("Document not found");
  }
};
  if (id) {
    getAsset();
  }
}, [id]);
  return (
    <div className="rounded-4 p-4 mt-5 bg-[#17223b]">

    <h4 className="text-white mb-4">
        🛡 Report a Breakdown
    </h4>

    <label className="text-white mb-2">
        Description
    </label>

    <textarea
        rows="5"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        placeholder="Describe the issue..."
        className="form-control bg-dark text-white"
    />

    <div className="mt-4">

        <label className="text-white mb-2">
            Upload Evidence
        </label>

        <input
            type="file"
            className="form-control"
            onChange={(e)=>setImage(e.target.files[0])}
        />

    </div>

    <button
        onClick={submitReport}
        className="btn w-100 mt-4 text-white"
        style={{
            background:"linear-gradient(90deg,#EC4899,#4F46E5)"
        }}
    >

        Submit Report

    </button>

</div>
  )
}

export default Report