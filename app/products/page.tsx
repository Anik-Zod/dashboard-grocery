"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Plus,
  X,
  Tag,
  DollarSign,
  FileText,
  Layers,
} from "lucide-react";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const message = "Only Super Admin Can use this feature";

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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="px-4 lg:h-[568px] lg:overflow-y-auto sm:px-6 py-6  bg-white rounded-lg shadow border border-gray-100 mx-auto"
    >
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">
        Add New Product
      </h2>

      {message && (
        <motion.p
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="mb-6 text-center px-10 text-lg animate-pulse font-semibold text-red-500 bg-red-100 py-2 rounded-lg"
        >
          {message}
        </motion.p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Name */}
          <div className="relative group">
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-4 pl-11 focus:ring-2 focus:ring-orange-400 outline-none transition text-base"
              placeholder="Product Name"
            />
            <Tag
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-orange-500 transition"
              size={20}
            />
          </div>

          {/* Price */}
          <div className="relative group">
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-4 pl-11 focus:ring-2 focus:ring-orange-400 outline-none transition text-base"
              placeholder="Price"
            />
            <DollarSign
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-orange-500 transition"
              size={20}
            />
          </div>

          {/* Category */}
          <div className="relative group">
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-4 pl-11 focus:ring-2 focus:ring-orange-400 outline-none transition appearance-none bg-white text-base"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <Layers
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-orange-500 transition"
              size={20}
            />
          </div>
        </div>

        {/* Description */}
        <div className="relative group">
          <textarea
            name="description"
            rows={2}
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-4 pl-11 focus:ring-2 focus:ring-orange-400 outline-none transition resize-none text-base"
            placeholder="Description"
          />
          <FileText
            className="absolute left-3 top-4 text-gray-400 group-hover:text-orange-500 transition"
            size={20}
          />
        </div>

        {/* Images */}
        <div>
          <p className="mb-3 text-gray-700 font-medium text-lg">
            Upload Images (Max 4)
          </p>

          <div className="flex gap-4 flex-wrap">
            {images.map((file, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative h-28 w-28 rounded-xl overflow-hidden shadow-md border border-gray-200 group"
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
                  <X size={16} />
                </button>
              </motion.div>
            ))}

            {images.length < 4 && (
              <motion.label
                whileHover={{ scale: 1.05 }}
                className="size-18 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition text-sm font-medium"
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Plus size={26} className="text-gray-400" />
                <span className="mt-1">Add</span>
              </motion.label>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg py-3 rounded-xl shadow-lg transition"
        >
          Add Product
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddProduct;
