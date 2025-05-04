
import React, { useState } from "react";

const SmartMoneyLender = () => {
  const [day, setDay] = useState(1);
  const [capital, setCapital] = useState(0);
  const [borrowers, setBorrowers] = useState(
    Array(50).fill({ daysLeft: 40 })
  );
  const [totalBorrowers, setTotalBorrowers] = useState(50);
  const [log, setLog] = useState([]);

  const simulateDay = () => {
    let dailyCollection = 0;
    let updatedBorrowers = borrowers.map((b) => {
      if (b.daysLeft > 0) {
        dailyCollection += 3;
        return { ...b, daysLeft: b.daysLeft - 1 };
      }
      return b;
    });
    updatedBorrowers = updatedBorrowers.filter((b) => b.daysLeft > 0);

    let available = capital + dailyCollection;
    let newBorrowers = 0;

    while (available >= 100) {
      available -= 100;
      updatedBorrowers.push({ daysLeft: 40 });
      newBorrowers++;
    }

    setCapital(available);
    setBorrowers(updatedBorrowers);
    setTotalBorrowers((prev) => prev + newBorrowers);
    setDay(day + 1);

    setLog((prev) => [
      ...prev,
      {
        day,
        collected: dailyCollection,
        newBorrowers,
        activeLoans: updatedBorrowers.length,
        capital: available.toFixed(2),
      },
    ]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold">Smart Money Lending Simulator</h2>
        <p><strong>Day:</strong> {day}</p>
        <p><strong>Capital (Available Cash):</strong> ${capital.toFixed(2)}</p>
        <p><strong>Total Borrowers:</strong> {totalBorrowers}</p>
        <p><strong>Active Loans:</strong> {borrowers.length}</p>
        <button
          onClick={simulateDay}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Simulate Next Day
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded h-96 overflow-y-auto text-sm">
        {log.map((entry, index) => (
          <div key={index} className="mb-1">
            Day {entry.day}: Collected ${entry.collected}, New Borrowers: {entry.newBorrowers}, Active Loans: {entry.activeLoans}, Capital: ${entry.capital}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartMoneyLender;
