"use client";
import React, { useEffect } from "react";
import { useStore } from "../../store/index";

const DataTable: React.FC = () => {
  const formData = useStore((state) => state.formData);

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      const parsedData = JSON.parse(storedFormData);
      const storedFormDataArray = Array.isArray(parsedData)
        ? parsedData
        : [parsedData];
      const mergedData = [...formData, ...storedFormDataArray];
      useStore.setState({ formData: mergedData });
    }
  }, []);

  return (
    <div>
      <h2 className="text-2xl mt-5 border-b text-center py-5 max-w-100 font-bold mb-4">
        Submitted Form Data
      </h2>
      {formData.length > 0 ? (
        <table className="table-auto" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Age</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((data, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{data.name}</td>
                <td className="border px-4 py-2">{data.email}</td>
                <td className="border px-4 py-2">{data.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No form data submitted yet.</p>
      )}
    </div>
  );
};

export default DataTable;
