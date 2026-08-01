// // import { getFirestore } from "firebase/firestore/lite";
// import QRCode from "react-qr-code";
// import { FaCopy, FaDownload } from "react-icons/fa";
import {
  Search,
  // Package,
  // MapPin,
  // Hash,
  // Tag,
  // QrCode,
  // Copy,
  Plus,
  Laptop,
  Package,
  CircleDot,
  Barcode,
  MapPin,
  Calendar,
  ChevronDown,
  RefreshCcw,
  // ChevronDown,
} from "lucide-react";
// import {
//   collection,
//   addDoc,A\
//   getDocs,
//   deleteDoc,
//   doc,
//   updateDoc,
//   serverTimestamp,
// } from "firebase/firestore";

import { db } from "./Firebase";
import { useEffect, useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import { addDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore";
import AssetCard from "./Card";

// import QRCode from "react-qr-code";

function Assets() {

  const [show, setShow] = useState(null)
  const [assetName, setAssetName] = useState("")
  const [category, setCategory] = useState("")
  const [status, setStatus] = useState("")
  const [serialNumber, setSerialNumber] = useState("")
  const [location, setLocation] = useState("")
  const [maintenanceDate, setMaintenanceDate] = useState("")
  const [assests, setAssets] = useState([])


  const addAsset = async () => {
    try {
      const docRef = await addDoc(collection(db, "assests"), {
        assetName,
        category,
        status,
        serialNumber,
        location,
        maintenanceDate,
        createAt: serverTimestamp(),

      });
      setAssetName("");
      setCategory("");
      setStatus("");
      setSerialNumber("");
      setLocation("");
      setMaintenanceDate("");
      setAssets([])
      handleClose()

      alert("Assets Registered Successfully")
      console.log(docRef)

      console.log("Document ID:", docRef.id);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "assests"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAssets(data);
    });
    return () => unsubscribe()
  }, [])

  const handleClose = () => {
    setShow(false)
  }
  return (
       <div className="min-h-screen lg:ml-64 p-4 sm:p-6 lg:p-8">


      {/* Header */}

     <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">

        <div>
     <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2563EB]">
  Asset Management
</h1>

<p className="text-base sm:text-lg text-black mt-2">
  Total assets registered
</p>
        </div>

     <button
  onClick={() => setShow(true)}
  className="w-full sm:w-auto flex justify-center items-center gap-2 bg-[#2563EB] px-6 py-3 text-white rounded-xl font-semibold hover:scale-105 duration-300"
>
  <Plus size={20} />
  Register Asset
</button>
      </div>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header
          closeButton
          className="bg-white border-b border-slate-200 px-8 py-6"
        >
          <div>
            <Modal.Title className="text-3xl font-bold text-slate-800">
              Register New Asset
            </Modal.Title>

            <p className="text-slate-500 mt-1">
              Add a new asset to your inventory
            </p>
          </div>
        </Modal.Header>

        <Modal.Body className="bg-white px-8 py-6">

          <div className="mb-3">
            <label className="form-label">Asset Name</label>
            <div className="relative">
              <Laptop
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2563EB]" required
              />

              <input
                type="text"
                className="form-control bg-[#2563EB] text-gray-200 border-secondary !pl-10 ps-10"
                placeholder="e.g. HP ProBook 450"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)} required
              />
            </div>
          </div>

          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="form-label">Category</label>
              <div className="relative">
                <Package
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2563EB]"
                />
                <select className="form-select bg-[#2563EB] text-gray-200 border-secondary !pl-10 ps-10" value={category} onChange={(e) => { setCategory(e.target.value) }}>
                  <option>Electronics</option>
                  <option>Furniture</option>
                  <option>Vehicle</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Status</label>
              <div className="relative">
                <CircleDot size={20} className=" absolute left-3 top-1/2 -translate-y-1/2 text-[#2563EB]" />
                <select className="form-select bg-[#2563EB] text-gray-200 border-secondary !pl-10" value={status} onChange={(e) => { setStatus(e.target.value) }}>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Maintenance</option>
                </select>
              </div>
            </div>

          </div>

          <div className="mb-3">
            <label className="form-label">Serial Number</label>
            <div className="relative">
              <Barcode size={20} className=" absolute left-3 top-1/2 -translate-y-1/2 text-black" />
              <input
                type="text"
                className="form-control bg-[#2563EB] text-gray-500 border-secondary !pl-10"
                placeholder="e.g. SN-2024-00158" value={serialNumber} onChange={(e) => { setSerialNumber(e.target.value) }} required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <div className="relative">
              <MapPin size={20} className=" absolute left-3 top-1/2 -translate-y-1/2 text-[#2563EB]" />
              <input
                type="text"
                className="form-control bg-[#2563EB] text-gray-200 border-secondary !pl-10"
                placeholder="e.g. Building A, Floor 3" value={location} onChange={(e) => { setLocation(e.target.value) }} required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Next Maintenance Date
              <span className="text-black"> (Optional)</span>
            </label>
            <div className="relative">
              <Calendar size={20} className=" absolute left-3 top-1/2 -translate-y-1/2 text-[#2563EB]" />
              <input
                type="date"
                className="form-control bg-[#2563EB] text-black border-secondary !pl-10" value={maintenanceDate} onChange={(e) => { setMaintenanceDate(e.target.value) }} required
              />
            </div>
          </div>

        </Modal.Body>

        <Modal.Footer className="bg-[#3B82F6] ">
          <Button variant="outline-light" className="text-black border-secondary" onClick={handleClose}>
            Cancel
          </Button>

          <div className="relative">
            <Plus size={20} className=" absolute left-3 top-1/2 -translate-y-1/2 text-white" />
            <Button
              onClick={addAsset}
              style={{
                background: "#2563EB ",
                border: "none",
              }}
              className="!pl-10"
            >
              Register Asset
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Search */}

      <div className="flex gap-4 mt-10">

        <div className="flex-1 relative">

          <Search
            size={20}
            className="absolute left-5 top-4 text-black"
          />

          <input
            type="text"
            placeholder="Search assets by name, serial or location..."
            className="w-full border border-gray-700 text-black rounded-xl py-3 pl-14 pr-4 outline-none focus:border-black"
          />

        </div>

        <div className="relative">
          <Package
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white pointer-events-none"
          />

          <select
            className="w-full bg-[#2563EB] border border-slate-700 text-white rounded-xl py-3 pl-10 pr-10 appearance-none"
          >
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Furniture</option>
            <option>Vehicle</option>
          </select>

          <ChevronDown
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none z-10"
          />
        </div>

        <div className="relative">
          <RefreshCcw
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white pointer-events-none"
          />
          <select className="bg-[#2563EB] border border-slate-700 text-white rounded-xl py-3 pl-10 pr-10 appearance-none">
            <option>All Status</option>
          </select>
          <ChevronDown
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none z-10"
          />
        </div>
      </div>

<div className="flex flex-wrap justify-content-center gap-10 mt-6">
{assests.map((item) => (
  <AssetCard key={item.id} item={item} />
))}
</div>


    </div>
  );
}

export default Assets;