import { Search } from "lucide-react";
import React from "react";

function SearchBar() {
  return (
    <div>
      <div className="w-full max-w-xl bg-gray-100 rounded-xl px-4 py-3 flex items-center gap-3">
        <Search color="orange"/>
        <input
          type="text"
          placeholder="Search here..."
          className="w-full bg-transparent outline-none text-gray-500 placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}

export default SearchBar;
