import React from 'react';

export default function Home() {
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const json = await res.json();
    if (res.ok) {
      alert(`Uploaded ${json.insertedCount} rows to MongoDB Atlas!`);
    } else {
      alert(`Error: ${json.error}`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload CSV to MongoDB Atlas</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
}
