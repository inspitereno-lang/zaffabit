import React, { useState } from "react";
import { useStore } from "../store/useStore";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  SlidersHorizontal,
  Layers,
  ShieldCheck,
  Hourglass,
  TrendingUp,
} from "lucide-react";

export const ServiceManagementView: React.FC = () => {
  const servicesCatalog = useStore((state) => state.servicesCatalog);
  const addService = useStore((state) => state.addService);
  const updateService = useStore((state) => state.updateService);
  const deleteService = useStore((state) => state.deleteService);
  const toggleServiceStatus = useStore((state) => state.toggleServiceStatus);

  const serviceSearch = useStore((state) => state.serviceSearch);
  const setServiceSearch = useStore((state) => state.setServiceSearch);
  const serviceCategoryFilter = useStore((state) => state.serviceCategoryFilter);
  const setServiceCategoryFilter = useStore((state) => state.setServiceCategoryFilter);

  // Local editing states
  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null);
  const [editServiceName, setEditServiceName] = useState("");
  const [editServiceCategory, setEditServiceCategory] = useState("HOME");
  const [editServiceBasePrice, setEditServiceBasePrice] = useState("");
  const [editServicePeakPrice, setEditServicePeakPrice] = useState("");
  const [editServiceStatus, setEditServiceStatus] = useState(true);

  const handleEditServiceClick = (index: number) => {
    setEditingServiceIndex(index);
    setEditServiceName(servicesCatalog[index].name);
    setEditServiceCategory(servicesCatalog[index].category);
    setEditServiceBasePrice(servicesCatalog[index].basePrice);
    setEditServicePeakPrice(servicesCatalog[index].peakPrice);
    setEditServiceStatus(servicesCatalog[index].status);
  };

  const handleSaveServiceClick = (index: number) => {
    if (!editServiceName.trim()) return;
    updateService(index, {
      id: servicesCatalog[index].id,
      name: editServiceName,
      category: editServiceCategory,
      basePrice: editServiceBasePrice.startsWith("₹") ? editServiceBasePrice : `₹${editServiceBasePrice}`,
      peakPrice: editServicePeakPrice.startsWith("₹") ? editServicePeakPrice : `₹${editServicePeakPrice}`,
      status: editServiceStatus,
    });
    setEditingServiceIndex(null);
  };

  const handleAddServiceClick = () => {
    const newServiceId = `SVC-${String(servicesCatalog.length + 1).padStart(3, "0")}`;
    const newService = {
      id: newServiceId,
      name: "New Service Offered",
      category: "HOME",
      basePrice: "₹150.00",
      peakPrice: "₹180.00",
      status: true,
    };
    addService(newService);
    setEditingServiceIndex(servicesCatalog.length);
    setEditServiceName(newService.name);
    setEditServiceCategory(newService.category);
    setEditServiceBasePrice(newService.basePrice);
    setEditServicePeakPrice(newService.peakPrice);
    setEditServiceStatus(newService.status);
  };

  return (
    <div className="p-8 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">
      
      {/* Breadcrumb & Title */}
      <div className="flex flex-col text-left gap-1">
        <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
          <span>Dashboard</span>
          <span className="opacity-50">/</span>
          <span className="text-slate-500">Service Management</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-lg font-bold text-slate-900 font-display">Service Management</h1>
            <p className="text-xs text-slate-400 font-light">
              Configure and monitor your service offerings and pricing tiers.
            </p>
          </div>
          <button
            onClick={handleAddServiceClick}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-xs font-semibold shadow-sm shadow-[#6c5ce7]/15 transition-all duration-150 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {/* ==================== 4 KPI CARDS ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: ACTIVE SERVICES */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-indigo-50 text-[#6c5ce7]">
              <Layers className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
              Active
            </span>
          </div>
          <div className="mt-4 text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total Services</span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">
              {servicesCatalog.length + 37}
            </h3>
          </div>
        </div>

        {/* Card 2: QUALITY SCORE */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-emerald-50 text-emerald-500">
              <ShieldCheck className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
              98% CSAT
            </span>
          </div>
          <div className="mt-4 text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Average Rating</span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">4.85 / 5</h3>
          </div>
        </div>

        {/* Card 3: BASE PRICE RANGE */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-amber-50 text-amber-500">
              <TrendingUp className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-600">
              Peak Active
            </span>
          </div>
          <div className="mt-4 text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Avg Base Price</span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">₹348.00</h3>
          </div>
        </div>

        {/* Card 4: FULFILLMENT RATE */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-rose-50 text-rose-500">
              <Hourglass className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
              ↗ 99.4%
            </span>
          </div>
          <div className="mt-4 text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Fulfillment Rate</span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">99.2%</h3>
          </div>
        </div>
      </div>

      {/* ==================== SERVICE CATALOG WIDGET ==================== */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.005)] overflow-hidden">
        
        {/* Header with Search and Category Select */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col text-left">
            <h3 className="text-sm font-bold text-slate-800 font-display">Service Offerings</h3>
            <p className="text-[11px] text-slate-400 font-light">Monitor catalog entries, base/peak prices, categories, and status tags.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Box */}
            <div className="relative min-w-[200px]">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-3.5 w-3.5 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder="Search service name..."
                className="pl-9 pr-4 py-1.5 w-full text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#6c5ce7] focus:border-[#6c5ce7] placeholder:text-slate-400 text-slate-800 transition-colors"
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              className="text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#6c5ce7] cursor-pointer"
              value={serviceCategoryFilter}
              onChange={(e) => setServiceCategoryFilter(e.target.value)}
            >
              <option value="ALL">All Categories</option>
              <option value="HOME">HOME</option>
              <option value="OFFICE">OFFICE</option>
              <option value="INDUSTRIAL">INDUSTRIAL</option>
            </select>

            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-[10px] font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Filter & Export</span>
            </button>
          </div>
        </div>

        {/* Catalog Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/30">
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">SERVICE ID</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">SERVICE NAME</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">CATEGORY</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">BASE PRICE</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">PEAK PRICE</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">ACTIVE STATUS</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {servicesCatalog
                .filter((s) => {
                  const matchesSearch = s.name.toLowerCase().includes(serviceSearch.toLowerCase());
                  const matchesCategory = serviceCategoryFilter === "ALL" || s.category === serviceCategoryFilter;
                  return matchesSearch && matchesCategory;
                })
                .map((service, idx) => (
                  <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/10">
                    {editingServiceIndex === idx ? (
                      <>
                        <td className="py-3 px-6 text-[11px] font-bold text-slate-400">{service.id}</td>
                        <td className="py-3 px-6">
                          <input
                            className="w-full text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-[#6c5ce7]"
                            value={editServiceName}
                            onChange={(e) => setEditServiceName(e.target.value)}
                          />
                        </td>
                        <td className="py-3 px-6">
                          <select
                            className="text-[11px] text-slate-600 bg-slate-50 border border-slate-200 rounded px-1.5 py-1 focus:outline-none focus:border-[#6c5ce7]"
                            value={editServiceCategory}
                            onChange={(e) => setEditServiceCategory(e.target.value)}
                          >
                            <option value="HOME">HOME</option>
                            <option value="OFFICE">OFFICE</option>
                            <option value="INDUSTRIAL">INDUSTRIAL</option>
                          </select>
                        </td>
                        <td className="py-3 px-6">
                          <input
                            className="w-full text-[11px] text-slate-600 bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-[#6c5ce7]"
                            value={editServiceBasePrice}
                            onChange={(e) => setEditServiceBasePrice(e.target.value)}
                          />
                        </td>
                        <td className="py-3 px-6">
                          <input
                            className="w-full text-[11px] text-slate-600 bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-[#6c5ce7]"
                            value={editServicePeakPrice}
                            onChange={(e) => setEditServicePeakPrice(e.target.value)}
                          />
                        </td>
                        <td className="py-3 px-6">
                          <select
                            className="text-[11px] text-slate-600 bg-slate-50 border border-slate-200 rounded px-1.5 py-1 focus:outline-none focus:border-[#6c5ce7]"
                            value={String(editServiceStatus)}
                            onChange={(e) => setEditServiceStatus(e.target.value === "true")}
                          >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                          </select>
                        </td>
                        <td className="py-3 px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleSaveServiceClick(idx)}
                              className="p-1.5 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100/60 cursor-pointer"
                              title="Save Changes"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingServiceIndex(null)}
                              className="p-1.5 rounded bg-rose-50 text-rose-600 hover:bg-rose-100/60 cursor-pointer"
                              title="Cancel"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3.5 px-6 text-[11px] font-bold text-slate-400">{service.id}</td>
                        <td className="py-3.5 px-6">
                          <span className="text-[11px] font-bold text-slate-700">{service.name}</span>
                        </td>
                        <td className="py-3.5 px-6">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold tracking-wider leading-none inline-flex items-center ${
                            service.category === "HOME"
                              ? "bg-purple-50 text-purple-600 border border-purple-100"
                              : service.category === "OFFICE"
                              ? "bg-blue-50 text-blue-600 border border-blue-100"
                              : "bg-amber-50 text-amber-600 border border-amber-100"
                          }`}>
                            {service.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-6">
                          <span className="text-[11px] font-bold text-slate-800">{service.basePrice}</span>
                        </td>
                        <td className="py-3.5 px-6">
                          <span className="text-[11px] text-slate-500 font-semibold">{service.peakPrice}</span>
                        </td>
                        <td className="py-3.5 px-6">
                          {/* Sliding Active Switch Element */}
                          <div className="flex items-center">
                            <button
                              onClick={() => toggleServiceStatus(idx)}
                              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                service.status ? "bg-emerald-500" : "bg-slate-200"
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  service.status ? "translate-x-4" : "translate-x-0"
                                }`}
                              />
                            </button>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider ml-2 w-10 text-left">
                              {service.status ? "Active" : "Off"}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleEditServiceClick(idx)}
                              className="p-1.5 rounded bg-slate-50 text-slate-400 hover:text-[#6c5ce7] hover:bg-indigo-50/50 cursor-pointer"
                              title="Edit Offering"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteService(idx)}
                              className="p-1.5 rounded bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 cursor-pointer"
                              title="Delete Offering"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Catalog Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 bg-slate-50/10">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Showing 1-{servicesCatalog.length} of {servicesCatalog.length + 37} Offerings
          </span>
          <div className="flex items-center gap-1.5">
            <button className="px-2.5 py-1 text-[10px] rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 cursor-pointer font-bold">
              &lt;
            </button>
            <button className="px-2.5 py-1 text-[10px] rounded-lg bg-[#6c5ce7] text-white font-bold cursor-pointer">
              1
            </button>
            <button className="px-2.5 py-1 text-[10px] rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 cursor-pointer">
              2
            </button>
            <button className="px-2.5 py-1 text-[10px] rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 cursor-pointer">
              3
            </button>
            <span className="text-slate-400 text-[10px] px-1 font-semibold">...</span>
            <button className="px-2.5 py-1 text-[10px] rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 cursor-pointer font-bold">
              5
            </button>
            <button className="px-2.5 py-1 text-[10px] rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 cursor-pointer font-bold">
              &gt;
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
