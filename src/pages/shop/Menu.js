import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await fetch("http://127.0.0.1:3001/api/v1/menus");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const {data} = await response.json();
        console.log("Data fetched successfully:", data);
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Low-High":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "High-Low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-[#FCFCFC]">
      {/* Menu banner */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 pt-56">
        <div className="py-12 flex flex-col justify-center items-center space-y-10 text-center">
          <h2 className="md:text-5xl text-4xl font-bold leading-snug">
            For The Love Of Delicious
            <span className="text-greenish"> Food</span>
          </h2>

          <p className="text-grey-400 font-medium px-16">
            Come with family and feel the joy of mouthwatering food such as
            Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas
            Rellenas and more for a moderate cost.
          </p>

          <button className="bg-greenish rounded-full text-white font-semibold px-7 py-3">
            Order Now
          </button>
        </div>
      </div>

      {/* menu shop */}
      <div className="pt-28 flex md:justify-between flex-wrap pb-16">
        {/* buttons */}
        <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4">
          <button
            onClick={showAll}
            className={selectedCategory === "all" ? "text-greenish underline" : ""}
          >
            All
          </button>
          <button
            onClick={() => filterItems("salad")}
            className={selectedCategory === "salad" ? "text-greenish underline" : ""}
          >
            Salad
          </button>
          <button
            onClick={() => filterItems("pizza")}
            className={selectedCategory === "pizza" ? "text-greenish underline" : ""}
          >
            Pizza
          </button>
          <button
            onClick={() => filterItems("soup")}
            className={selectedCategory === "soup" ? "text-greenish underline" : ""}
          >
            Soup
          </button>
          <button
            onClick={() => filterItems("dessert")}
            className={selectedCategory === "dessert" ? "text-greenish underline" : ""}
          >
            Desserts
          </button>
          <button
            onClick={() => filterItems("drinks")}
            className={selectedCategory === "drinks" ? "text-greenish underline" : ""}
          >
            Drinks
          </button>
        </div>

        {/* sorting and filtering */}
        <div className="flex md:flex-row flex-row flex-wrap justify-end md:items-center">
          <div className="p-2">
            <FaFilter className="h-5 w-5 text-greenish bg-white" />
          </div>
          <select
            name="sort"
            id="sort"
            onChange={(e) => handleSortChange(e.target.value)}
            value={sortOption}
            className="p-2 border rounded bg-white"
          >
            <option value="default">Default</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="Low-High">Low-High</option>
            <option value="High-Low">High-Low</option>
          </select>
        </div>
      </div>

      {/* product cards */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 flex-wrap pb-5">
        {currentItems.map((item) => (
          <Cards className="p-2" key={item._id} item={item} />
        ))}
      </div>

      {/* pagination */}
      <div className="flex justify-center space-x-2 pb-10">
        {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-greenish text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Menu;
