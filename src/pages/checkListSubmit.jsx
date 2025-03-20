import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import {
  useDeleteCheckListMutation,
  useGetCheckListQuery,
  usePatchCheckListMutation,
} from "../features/addTaskApi";

const CheckListSubmit = ({ taskPosition }) => {
  const { data: filter } = useGetCheckListQuery();
  const [items, setItems] = useState([]);
  const [patchData] = usePatchCheckListMutation();
  const [deleteData] = useDeleteCheckListMutation(); // ✅ Correct hook usage

  // Load checklist items based on task position
  useEffect(() => {
    if (filter) {
      console.log("API Response (filter):", filter); // ✅ Debug API response

      const filteredItems = filter.filter(
        (item) => item.position === taskPosition
      );

      console.log("Filtered Items:", filteredItems); // ✅ Check if ID exists
      setItems(filteredItems);
    }
  }, [filter, taskPosition]);

  // Toggle checkbox selection
  const toggleCheck = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, idx) =>
        idx === index ? { ...item, is_checked: !item.is_checked } : item
      )
    );
  };

  // Handle individual checklist item submission
  const handleSingleSubmit = async (index) => {
    const item = items[index];
    console.log('item  :>> ', item );

    if (!item.id) {
      console.error("Cannot submit item without an ID", item);
      return;
    }

    const updatedItem = {
      title: item.title,
      is_checked: item.is_checked,
      position: item.position,
    };

    try {
      console.log("Updating Item:", item.id, updatedItem);
      const response = await patchData({
        id: item.id,
        body: updatedItem,
      }).unwrap();

      console.log("Updated Response:", response);
      alert(`Checklist item "${item.title}" summited successfully!`);
    } catch (e) {
      console.error("Error updating checklist item:", e);
    }
  };


  const handleDelete = async (index) => {
    const item = items[index];
    console.log('item  :>> ', item );

    if (!item.id) {
      console.error("Cannot submit item without an ID", item);
      return;
    }

    const updatedItem = {
      title: item.title,
      is_checked: item.is_checked,
      position: item.position,
    };

    try {
      console.log("Updating Item:", item.id, updatedItem);
      const response = await deleteData({
        id: item.id,
        body: updatedItem,
      }).unwrap();

      console.log("Updated Response:", response);
      alert(`Checklist item "${item.title}" deleted successfully!`);
    } catch (e) {
      console.error("Error updating checklist item:", e);
    }
  };



  

  return (
    <Formik
      enableReinitialize
      initialValues={{
        checklist: items.map((item) => item.is_checked),
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-4">
          <section className="mt-1 bg-white shadow-lg dark:bg-gray-800 rounded-xl">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
              Checklist
            </h2>
            <ul>
              {items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 border-b border-gray-300 dark:border-gray-600 last:border-none"
                >
                  <div className="flex items-center">
                    <Field
                      type="checkbox"
                      name={`checklist[${index}]`}
                      checked={values.checklist[index]} // Bind checkbox state
                      onChange={() => {
                        toggleCheck(index);
                        setFieldValue(
                          `checklist[${index}]`,
                          !values.checklist[index]
                        );
                      }}
                      className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400"
                    />
                    <span
                      className={
                        values.checklist[index]
                          ? "line-through text-gray-500 dark:text-gray-400"
                          : "text-gray-900 dark:text-gray-100"
                      }
                    >
                      {item.position}. {item.title}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleSingleSubmit(index)}
                      className="px-2 py-1 text-sm font-semibold text-white rounded bg-primary hover:to-blue-800-700"
                    >
                      Submit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className="px-2 py-1 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </Form>
      )}
    </Formik>
  );
};

export default CheckListSubmit;
