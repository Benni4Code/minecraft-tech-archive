async function loadDesign() {

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    const response = await fetch("data/designs.json");

    const designs = await response.json();

    const design = designs.find(d => d.id === id);

    if (!design) {

        document.getElementById("design").innerHTML = `
            <h1>Design not found</h1>
        `;

        return;
    }

    displayDesign(design);
}


function displayDesign(design) {

    const container = document.getElementById("design");

    container.innerHTML = `

        <h1>${design.title}</h1>

        <p>
            By <strong>${design.author}</strong>
        </p>

        <p>
            ${design.description}
        </p>

        <h2>Compatibility</h2>

        <p>
            Minecraft ${design.minecraft.edition}
        </p>

        <p>
            Versions:
            ${design.minecraft.versions.join(", ")}
        </p>

        <h2>Dimensions</h2>

        <p>
            ${design.dimensions.x} ×
            ${design.dimensions.y} ×
            ${design.dimensions.z}
        </p>

        <h2>Tags</h2>

        <p class="tags">
            ${design.tags.join(" • ")}
        </p>

        <h2>Downloads</h2>

        <div id="downloads"></div>
    `;


    const downloads = document.getElementById("downloads");

    for (const file of design.files) {

        const link = document.createElement("a");

        link.href = file.url;
        link.download = "";

        link.textContent = `Download ${file.name}`;

        link.style.display = "block";
        link.style.marginBottom = "10px";

        downloads.appendChild(link);
    }
}


loadDesign();
