'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import '../globals.css'; 

export default function ImportPage() {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Importation de fichiers Excel</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <div>
        <h2>Données importées :</h2>
        {data.length > 0 ? (
          <table className="styled-table">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucune donnée importée pour l'instant.</p>
        )}
      </div>
    </div>
  );
}
