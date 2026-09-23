let entries = [];

async function loadEntries() {
    const response = await fetch("data/entries.json");

    entries = await response.json();

    displayEntries(entries);
}


function displayEntries(results) {

    const container = document.getElementById("results");

    container.innerHTML = "";

    if (results.length === 0) {
        container.innerHTML = "<p>No results found.</p>";
        return;
    }

    for (const entry of results) {

        const element = document.createElement("div");

        element.className = "entry";

        element.innerHTML = `
            <h2>${entry.title}</h2>

            <p>${entry.summary}</p>

            <p>
                <strong>${entry.category}</strong>
            </p>

            <p class="tags">
                ${entry.tags.join(" • ")}
            </p>
        `;

        container.appendChild(element);
    }
}


document.getElementById("search").addEventListener("input", function () {

    const query = this.value.toLowerCase();

    const results = entries.filter(entry => {

        const searchableText = `
            ${entry.title}
            ${entry.category}
            ${entry.summary}
            ${entry.tags.join(" ")}
        `.toLowerCase();

        return searchableText.includes(query);
    });

    displayEntries(results);
});


loadEntries();
