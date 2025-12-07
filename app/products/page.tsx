"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Form submitting turned of due to misuse");

  const categories = ["Vegetables", "Dairy", "Fruits", "Instant", "Drinks"];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 4);
    setImages((prev) => [...prev, ...files].slice(0, 4));
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="  px-6 py-[29px]  bg-white rounded-lg shadow border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center tracking-tight">
        Add New Product
      </h2>

      {message && (
        <p className="mb-4 text-center mx-auto w-max px-10 text-xl animate-bounce font-semibold text-red-500 bg-red-300/20 py-2 rounded-md">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name & Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Name */}
          <div className="relative group">
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
              placeholder="Product Name"
            />
          </div>

          {/* Price */}
          <div className="relative group">
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
              placeholder="Price"
            />
          </div>
          {/* Category */}
          <div className="relative group">
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition appearance-none bg-white"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="relative group">
          <textarea
            name="description"
            rows={1}
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
            placeholder="Description"
          />
          
        </div>

        {/* Image Upload */}
        <div>
          <p className="mb-3 text-gray-700 font-medium">
            Upload Images (Max 4)
          </p>

          <div className="flex gap-4 flex-wrap">
            {images.map((file, idx) => (
              <div
                key={idx}
                className="relative h-28 w-28 rounded-xl overflow-hidden shadow-md border border-gray-200"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`preview-${idx}`}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-white text-red-600 rounded-full p-1 shadow hover:bg-red-600 hover:text-white transition"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            {images.length < 4 && (
              <label className="h-28 w-28 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Plus size={26} className="text-gray-400" />
                <span className="text-xs text-gray-400 mt-1">Add Image</span>
              </label>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full  bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold text-lg py-3 rounded-xl shadow-lg transition transform hover:scale-[1.02]"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
