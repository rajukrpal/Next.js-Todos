
// "use client";
// import React, { useEffect, useState } from 'react';

// function Todo() {
//   const [inputField, setInputField] = useState("");
//   const [allData, setAllData] = useState([]);
//   const [filter, setFilter] = useState("All");
//   const [selectAll, setSelectAll] = useState(false);

//   const addTodo = () => {
//     if (inputField.trim() !== "") {
//       setAllData([...allData, { text: inputField, completed: false }]);
//       setInputField("");
//       setSelectAll(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       addTodo();
//     }
//   };

//   const toggleComplete = (index) => {
//     const updatedData = allData.map((item, i) =>
//       i === index ? { ...item, completed: !item.completed } : item
//     );
//     setAllData(updatedData);
//     if (updatedData.every(item => item.completed)) {
//       setSelectAll(true);
//     } else {
//       setSelectAll(false);
//     }
//   };

//   const toggleSelectAll = () => {
//     const allCompleted = !selectAll;
//     const updatedData = allData.map((item) => ({
//       ...item,
//       completed: allCompleted,
//     }));
//     setAllData(updatedData);
//     setSelectAll(allCompleted);
//   };

//   const filteredData = () => {
//     if (filter === "Active") {
//       return allData.filter(item => !item.completed);
//     }
//     if (filter === "Completed") {
//       return allData.filter(item => item.completed);
//     }
//     return allData;
//   };

//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(allData));
//   }, [allData]);

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100">
//       <h1 className="text-7xl text-red-800 text-center mb-6">todos</h1>
//       <div className="bg-white shadow-md rounded-lg p-8 w-[500px]">
//         <div className="flex mb-4 relative">

//           {allData.length > 0 && (
//             <div className="flex flex-col items-center justify-center b mr-1 px-2">
//               <input
//                 className="mr-"
//                 type="checkbox"
//                 checked={selectAll}
//                 onChange={toggleSelectAll}
//               />
//             </div>
//           )}
//           <input
//             className="border border-gray-300 w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             type="text"
//             placeholder="What needs to be done?"
//             value={inputField}
//             onChange={(e) => setInputField(e.target.value)}
//             onKeyDown={handleKeyDown}
//           />
//         </div>

//         <div className="flex flex-col space-y-2">
//           {filteredData().map((item, index) => (
//             <div
//               key={index}
//               className={`flex items-center p-2 border border-gray-300 rounded-md ${item.completed ? "text-gray-400" : ""
//                 }`}
//             >
//               <input
//                 className="mr-3"
//                 type="checkbox"
//                 checked={item.completed}
//                 onChange={() => toggleComplete(index)}
//               />
//               <div className={`flex-1 ${item.completed ? "line-through" : ""}`}>
//                 {item.text}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-between items-center mt-4 text-gray-600">
//           <button className="text-sm cursor-default">
//             {allData.filter(item => !item.completed).length} item(s) left
//           </button>
//           <div className="flex space-x-3">
//             <button
//               className={`text-sm ${filter === "All" ? "text-black" : "hover:text-black"}`}
//               onClick={() => setFilter("All")}
//             >
//               All
//             </button>
//             <button
//               className={`text-sm ${filter === "Active" ? "text-black" : "hover:text-black"}`}
//               onClick={() => setFilter("Active")}
//             >
//               Active
//             </button>
//             <button
//               className={`text-sm ${filter === "Completed" ? "text-black" : "hover:text-black"}`}
//               onClick={() => setFilter("Completed")}
//             >
//               Completed
//             </button>
//           </div>
//           <button
//             className="text-sm hover:text-red-600"
//             onClick={() => setAllData(allData.filter((item) => !item.completed))}
//           >
//             Clear completed
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Todo;

"use client";
import React, { useEffect, useState } from 'react';

function Todo() {
  const [inputField, setInputField] = useState("");
  const [allData, setAllData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectAll, setSelectAll] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (inputField.trim() !== "") {
      setAllData([...allData, { text: inputField, completed: false }]);
      setInputField("");
      setSelectAll(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (editIndex !== null) {
        saveEdit();
      } else {
        addTodo();
      }
    }
  };

  const toggleComplete = (index) => {
    const updatedData = allData.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setAllData(updatedData);
    if (updatedData.every(item => item.completed)) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };

  const toggleSelectAll = () => {
    const allCompleted = !selectAll;
    const updatedData = allData.map((item) => ({
      ...item,
      completed: allCompleted,
    }));
    setAllData(updatedData);
    setSelectAll(allCompleted);
  };

  const filteredData = () => {
    if (filter === "Active") {
      return allData.filter(item => !item.completed);
    }
    if (filter === "Completed") {
      return allData.filter(item => item.completed);
    }
    return allData;
  };

  const deleteItem = (index) => {
    setAllData(allData.filter((_, i) => i !== index));
  };

  const editItem = (index) => {
    setEditIndex(index);
    setEditText(allData[index].text);
  };

  const saveEdit = () => {
    if (editText.trim() !== "") {
      const updatedData = allData.map((item, i) =>
        i === editIndex ? { ...item, text: editText } : item
      );
      setAllData(updatedData);
    }
    setEditIndex(null);
    setEditText("");
  };

  // const saveEdit = () => {
  //   const updatedData = allData.map((item, i) =>
  //     i === editIndex ? { ...item, text: editText } : item
  //   );
  //   setAllData(updatedData);
  //   setEditIndex(null);
  //   setEditText("");
  // };


  const handleBlur = () => {
    saveEdit();
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(allData));
  }, [allData]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <h1 className="md:text-7xl text-5xl text-red-800 text-center mb-6">todos</h1>
      <div className="bg-white shadow-md rounded-lg p-8 md:w-[500px]">
        <div className="flex mb-4 relative">
          {allData.length > 0 && (
            <div className="flex flex-col items-center justify-center b mr-1 px-2">
              <input
                className="mr-"
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
            </div>
          )}
          <input
            className="border border-gray-300 w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="What needs to be done?"
            value={inputField}
            onChange={(e) => setInputField(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="flex flex-col space-y-2">
          {filteredData().map((item, index) => (
            <div
              key={index}
              className={`flex items-center p-2 border border-gray-300 rounded-md ${item.completed ? "text-gray-400" : ""
                }`}
            >
              <input
                className="mr-3"
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleComplete(index)}
              />
              {editIndex === index ? (
                <input
                  className="flex-1 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500"
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              ) : (
                <div
                  className={`flex-1 ${item.completed ? "line-through" : ""}`}
                  onDoubleClick={() => editItem(index)}
                >
                  {item.text}
                </div>
              )}
              <button
                className="ml-4 text-red-500"
                onClick={() => deleteItem(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>

        <div className="md:flex justify-between items-center mt-4 text-gray-600">
          <button className="text-sm cursor-default">
            {allData.filter(item => !item.completed).length} item(s) left
          </button>
          <div className="flex space-x-3">
            <button
              className={`text-sm ${filter === "All" ? "text-black" : "hover:text-black"}`}
              onClick={() => setFilter("All")}
            >
              All
            </button>
            <button
              className={`text-sm ${filter === "Active" ? "text-black" : "hover:text-black"}`}
              onClick={() => setFilter("Active")}
            >
              Active
            </button>
            <button
              className={`text-sm ${filter === "Completed" ? "text-black" : "hover:text-black"}`}
              onClick={() => setFilter("Completed")}
            >
              Completed
            </button>
          </div>
          <button
            className="text-sm hover:text-red-600"
            onClick={() => setAllData(allData.filter((item) => !item.completed))}
          >
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
