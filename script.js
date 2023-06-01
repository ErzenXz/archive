function kerko() {
    var kerkimi = document.querySelector("#kerko").value;
    var emratKanaleve = document.querySelectorAll(".emri");
    for (var i = 0; i < emratKanaleve.length; i++) {
        if (!emratKanaleve[i].textContent.toUpperCase().includes(kerkimi.toUpperCase())) {
            emratKanaleve[i].parentNode.style.display = "none";
        } else {
            emratKanaleve[i].parentNode.style.display = "block";
        }
    }
}


const links = document.querySelectorAll("a");
const previewContainer = document.getElementById("preview-container");
const previewIframe = document.getElementById("preview-iframe");
const previewLoading = document.getElementById("preview-loading");

let isMouseInsideLink = false;
let isMouseInsideIframe = false;
let showPreviewTimeout;

// Add mouseenter event listener to each link
links.forEach((link) => {
    link.addEventListener("mouseenter", (event) => {
        isMouseInsideLink = true;
        const source = link.getAttribute("href");
        showPreviewTimeout = setTimeout(() => {
            showPreview(event.clientX, event.clientY);
            setPreviewSource(source);
        }, 500); // Delay before showing the preview (in milliseconds)
    });
});

// Add mouseleave event listener to each link
links.forEach((link) => {
    link.addEventListener("mouseleave", () => {
        isMouseInsideLink = false;
        clearTimeout(showPreviewTimeout);
        hidePreview();
    });
});

// Add mouseenter and mouseleave event listeners to the preview iframe
previewIframe.addEventListener("mouseenter", () => {
    isMouseInsideIframe = true;
});

previewIframe.addEventListener("mouseleave", () => {
    isMouseInsideIframe = false;
    hidePreview();
});

// Add mousemove event listener to the document
document.addEventListener("mousemove", (event) => {
    if (!isMouseInsideLink && !isMouseInsideIframe) {
        hidePreview();
    }

    // Update the position of the preview container if the mouse is inside a link
    if (isMouseInsideLink) {
        previewContainer.style.left = event.clientX + "px";
        previewContainer.style.top = event.clientY + "px";
    }
});

// Hide the preview container
function hidePreview() {
    previewContainer.style.display = "none";
    previewIframe.src = "";
}

// Show the loading icon and position the preview container
function showPreview(x, y) {
    previewContainer.style.left = x + "px";
    previewContainer.style.top = y + "px";
    previewContainer.style.display = "block";
    previewLoading.style.display = "flex";
}

// Set the preview iframe source and hide the loading icon when it finishes loading
function setPreviewSource(source) {
    previewIframe.src = source;
    previewIframe.addEventListener("load", () => {
        previewLoading.style.display = "none";
    });
}