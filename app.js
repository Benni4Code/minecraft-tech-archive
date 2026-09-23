let designs = [];

async function loadDesigns() {
    const response = await fetch("data/designs.json");
    designs = await response.json();

    displayDesigns(designs);
}


function displayDesigns(results) {

    const container = document.getElementById("results");

    container.innerHTML = "";

    for (const design of results) {

        const element = document.createElement("div");

        element.className = "entry";

        element.innerHTML = `
            <h2>${design.title}</h2>

            <p>${design.description}</p>

            <p>
                <strong>${design.type}</strong>
            </p>

            <p class="tags">
                ${design.tags.join(" • ")}
            </p>

            <a href="design.html?id=${design.id}">
                View Design →
            </a>
        `;

        container.appendChild(element);
    }
}


document.getElementById("search").addEventListener("input", function () {

    const query = this.value.toLowerCase();

    const results = designs.filter(design => {

        const searchableText = `
            ${design.title}
            ${design.description}
            ${design.type}
            ${design.tags.join(" ")}
        `.toLowerCase();

        return searchableText.includes(query);
    });

    displayDesigns(results);
});


loadDesigns();
