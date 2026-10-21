const button = document.getElementById("detailsButton");
const message = document.getElementById("message");

button.addEventListener("click", () => {
    message.textContent =
        "Produção estimada: 850 hectares × 62 sacas/ha = 52.700 sacas.";
});
