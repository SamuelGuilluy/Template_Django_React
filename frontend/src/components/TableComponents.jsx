import React from 'react';
import '../styles/TableComponents.css'; // Import the CSS file
import { useNavigate } from "react-router-dom";

function TableComponents({data, onDelete}) {
  
  const navigate = useNavigate();

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Client</th>
            <th>Date</th>
            <th> Description</th>
            <th> Context</th>
            <th> Estimated Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.title}</td>
              <td>{row.client}</td>
              <td>{new Date(row.created_at).toLocaleDateString("en-US")}</td>
              <td>{row.description}</td>
              <td>{row.context}</td>
              <td>{row.estimated_cost}</td>
              {/* add delete row button */}
              <td> 

                <button onClick={() => onDelete(row.id)}>Delete</button> 
                <button onClick={() => navigate(`/project/${row.id}`)}> 
                    Details
                </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default TableComponents;