
import { useState } from "react";
import Column from "./Column";
import AddMemberForm from "../Components/MemberCard"; 
import AddNewTaskPopUp from "../Components/AddNewTaskPopUp";
import { useParams } from "react-router";
import { useGetWorkspacesQuery } from "../features/workspaceApi";
import { getAceAccessToken } from "../lib/secureLocalStorage";
import { useGetMeQuery } from "../features/auth/authApiSlice";
import { useGetTasksQuery } from "../features/addTaskApi";
const DEFAULT_CARDS = [
  { title: "Look into render bug in dashboard",description:"Start implementing the backend with API in ISTAD's API Group", id: "1", column: "todo", createdDate: "2025-Feb-28",checklist: "2/5",category: "Design", dueDate: "2021-Mar-10", link: ["https://docs.google.com"], },
  { title: "SOX compliance checklist", id: "2",description:"Start implementing the backend with API in ISTAD's API Group", column: "todo", createdDate: "2025-Feb-12",category: "Design",checklist: "9/10", dueDate: "2022-Mar-10" },
  { title: "[SPIKE] Migrate to Azure", id: "3",description:"Start implementing the backend with API in ISTAD's API Group", column: "doing", createdDate: "2025-Feb-17",category: "Design", dueDate: "2023-Jan-10" },
  { title: "Document Notifications service", id: "4",description:"Start implementing the backend with API in ISTAD's API Group", column: "done", createdDate: "2025-02-10",category: "Design", dueDate: "2024-Dec-10" },
];


function Kanban() {
  const {data} = useGetMeQuery();
    const user_id =data?.id;
  const { id } = useParams(); 
  const { data: workspaceList } = useGetWorkspacesQuery(user_id); 



  const workspace = workspaceList?.find((w) => w.id === id)
//   const { data: tasks, error, isLoading } = useGetTasksQuery();
// console.log("API Response1:", { tasks, error, isLoading });
// console.log('tasks', tasks)
console.log('Fetching tasks...');
const { data1, error, isLoading } = useGetTasksQuery({ limit: 10, offset: 0 });
console.log('API Response from kanban:', { data1, error, isLoading });
 
  
  // console.log("Found workspace:", workspace);
  // console.log("API Response:", workspace);

  const [cards, setCards] = useState(DEFAULT_CARDS);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  console.log('workspace', workspace)

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-8 bg-gray-100 dark:bg-[#121321]">
      {/* Header */}
     <div className="flex flex-col md:flex-row  justify-between mb-6 gap-4">
  <div className="text-txt16 md:text-txt20 bg-gray-200 dark:bg-gray-800 p-2 rounded-lg font-bold text-primary dark:text-white hover:shadow-sm text-center">
  {workspace?.title || "Loading..."}
  </div>

  {/* Add Member Button */}
  <div className="flex space-x-2 md:space-x-4">
    <button
      onClick={openModal}
      className="flex items-center px-3 py-2 text-gray-700 transition bg-gray-200 rounded-md hover:bg-gray-300"
    >
      <span className="mr-2">+</span>
      Add Member
    </button>
  </div>
</div>


      {/* Board Columns */}
      <div className="flex gap-3 overflow-x-auto max-w-full">
        <Column
          title="To Do"
          column="todo"
          headingColor="text-yellow-200"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="In Progress"
          column="doing"
          headingColor="text-blue-200"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="Complete"
          column="done"
          headingColor="text-emerald-200"
          cards={cards}
          setCards={setCards}
        />
      </div>

      {/* Add Member Modal */}
      <AddMemberForm isOpen={isModalOpen} closeModal={closeModal} />
      {/* Add task Modal */}
      
    </div>
  );
}

export default Kanban;
