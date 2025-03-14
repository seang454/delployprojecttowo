
import { useState } from "react";
import Column from "./Column";
import AddMemberForm from "../Components/MemberCard"; // ✅ Fixed import

const DEFAULT_CARDS = [
  { title: "Look into render bug in dashboard",description:"Start implementing the backend with API in ISTAD's API Group", id: "1", column: "todo", createdDate: "2025-02-28",checklist: "2/5",category: "Design", dueDate: "2021-03-10", link: ["https://docs.google.com"], },
  { title: "SOX compliance checklist", id: "2",description:"Start implementing the backend with API in ISTAD's API Group", column: "todo", createdDate: "2025-02-12",category: "Design",checklist: "9/10", dueDate: "2022-03-10" },
  { title: "[SPIKE] Migrate to Azure", id: "3",description:"Start implementing the backend with API in ISTAD's API Group", column: "doing", createdDate: "2025-02-17",category: "Design", dueDate: "2023-03-10" },
  { title: "Document Notifications service", id: "4",description:"Start implementing the backend with API in ISTAD's API Group", column: "done", createdDate: "2025-02-10",category: "Design", dueDate: "2024-03-10" },
];

function Kanban() {
  const [cards, setCards] = useState(DEFAULT_CARDS);
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ Manage modal state

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-5 bg-gray-100 dark:bg-[#121321]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 ml-10">
        <div className="text-[20px] bg-gray-200 p-2 rounded-[100px] font-bold text-gray-800 dark:text-white hover:shadow-sm">Final Project of Foundation G3</div>

        {/* Add Member Button */}
        <div className="flex space-x-4">
          <button
            onClick={openModal} // ✅ Open modal on click
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
    </div>
  );
}

export default Kanban;
