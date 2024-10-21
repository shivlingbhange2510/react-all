// Array of row objects (initial data)
let rows = [
    { id: 1, name: "Row 1", data: "Data 1" },
    { id: 2, name: "Row 2", data: "Data 2" },
    { id: 3, name: "Row 3", data: "Data 3" },
    { id: 4, name: "Row 4", data: "Data 4" },
    { id: 5, name: "Row 5", data: "Data 5" }
];

// Function to add a new row and show the last 3 rows
function addRowAndDisplayLastThree(newRow) {
    
    // Add the new row to the rows array
    rows.push(newRow);
    
    // Get the last 3 rows from the previous data
    const lastThreeRows = rows.slice(-4, -1); // -4 because we need 3 previous rows before the newly added one

    // Combine last 3 rows with the newly added row
    const displayedRows = [...lastThreeRows, newRow];
    
    // Clear the table and render the rows (just an example of rendering)
    // renderTable();
    console.log("displayedRows", displayedRows);
}



// Example usage:
const newRow = { id: 6, name: "Row 6", data: "Data 6" };
addRowAndDisplayLastThree(newRow);
