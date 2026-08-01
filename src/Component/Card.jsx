import {
  Laptop,
  MapPin,
  Tag,
  Calendar,
  Copy,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import QRCode from "react-qr-code";

export default function AssetCard({ item }) {
    const copySerial = () => {
    navigator.clipboard.writeText(`${window.location.origin}/report/${item.id}`);

    alert("Serial Number Copied");
}
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">

      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <Laptop className="text-blue-600" size={24} />
          </div>

          <div>
            <h2 className="font-bold text-lg">{item.assetName}</h2>

            <p className="text-sm text-gray-500">
              {item.serialNumber}
            </p>
          </div>
        </div>

        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
          ● {item.status}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">

        <div>
          <h3 className="font-semibold text-gray-800">
            {item.assetName}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">

          <div className="flex items-center gap-2">
            <Tag size={16} className="text-blue-600" />
            <span>{item.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <Tag size={16} className="text-purple-600" />
            <span>{item.serialNumber}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-red-500" />
            <span>{item.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-emerald-600" />
            <span>{item.maintenanceDate}</span>
          </div>

        </div>

        {/* QR */}
        <div className="border rounded-xl p-5 flex justify-center bg-gray-50">
          <QRCode
            value={`${window.location.origin}/report/${item.id}`}
            size={110}
          />
        </div>

      


        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800" onClick={copySerial}>
          <Copy size={18} />
          <span className="text-sm">Copy</span>
        </button>


</div>
    </div>
  );
}