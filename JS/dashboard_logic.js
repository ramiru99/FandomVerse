// Wait for the HTML to finish loading before running code
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SETUP: Load existing data ---
    // We run this immediately so the table shows items you added previously
    loadTableFromStorage();

    // --- 2. "ADD ITEM" BUTTON LOGIC ---
    const addItemBtn = document.getElementById('addItemBtn');
    
    // Only run this if the button actually exists on the page
    if(addItemBtn) {
        addItemBtn.addEventListener('click', function() {
            
            // A. Grab all the text the user typed
            const id = document.getElementById('itemId').value;
            const name = document.getElementById('itemName').value;
            const price = document.getElementById('itemPrice').value;
            const category = document.getElementById('itemCategory').value;
            const subCategory = document.getElementById('itemSubCategory').value;
            const isLimited = document.getElementById('itemLimited').checked;
            const image = document.getElementById('itemImage').value; 

            // B. validation: Stop if important fields are empty
            if (!id || !name || !price || !image) {
                alert("Please fill in ID, Name, Price, and Image Filename.");
                return; // Stop the function here
            }

            // C. Create a "Product Object" (A bundle of data)
            const newProduct = {
                id: id,
                name: name,
                price: price,
                category: category,
                subCategory: subCategory,
                isLimited: isLimited,
                image: image
            };

            // D. Save this bundle to LocalStorage
            saveProductToStorage(newProduct);

            // E. Refresh the table so we see the new item immediately
            loadTableFromStorage();

            // F. Clear the text boxes for the next item
            clearInputs();
            
            alert("Item Added and Saved!");
        });
    }
});

// --- HELPER FUNCTIONS (The logic behind the scenes) ---

function saveProductToStorage(product) {
    // 1. Get the current list from memory. 
    // JSON.parse turns the text string back into a JavaScript Array.
    // "|| []" means "if memory is empty, create a new empty list".
    const products = JSON.parse(localStorage.getItem('fandomProducts')) || [];
    
    // 2. Add the new product to the list
    products.push(product);
    
    // 3. Save it back to memory.
    // JSON.stringify turns the Array into a text string (Storage only accepts strings).
    localStorage.setItem('fandomProducts', JSON.stringify(products));
}

function loadTableFromStorage() {
    const tableBody = document.getElementById('itemsTableBody');
    if(!tableBody) return; // specific check to avoid errors

    tableBody.innerHTML = ''; // Wipe the table clean first

    // Get the data
    const products = JSON.parse(localStorage.getItem('fandomProducts')) || [];

    // Loop through every product and build a table row <tr>
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        
        const badge = product.isLimited 
            ? '<span class="badge-yes">Yes</span>' 
            : '<span class="badge-no">No</span>';

        // We insert the data into the HTML
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.subCategory}</td>
            <td>${badge}</td>
            <td>$${product.price}</td>
            <td><button class="remove-btn" onclick="removeProduct(${index})">Remove</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function clearInputs() {
    document.getElementById('itemId').value = "";
    document.getElementById('itemName').value = "";
    document.getElementById('itemPrice').value = "";
    document.getElementById('itemImage').value = "";
    document.getElementById('itemLimited').checked = false;
}

// Global function for the Remove button
window.removeProduct = function(index) {
    const products = JSON.parse(localStorage.getItem('fandomProducts')) || [];
    products.splice(index, 1); // Remove 1 item at position 'index'
    localStorage.setItem('fandomProducts', JSON.stringify(products)); // Update memory
    loadTableFromStorage(); // Refresh screen
};