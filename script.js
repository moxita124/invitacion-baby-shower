document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("open-btn");
    const envelopeContainer = document.getElementById("envelope-container");
    const envelope = document.getElementById("envelope");
    const mainContent = document.getElementById("main-content");

    // Función de apertura con animaciones secuenciales
    openBtn.addEventListener("click", () => {
        // 1. Iniciar la animación de apertura del sobre
        envelope.classList.add("open");
        openBtn.style.opacity = "0"; // Desvanecer el botón
        openBtn.style.pointerEvents = "none"; // Desactivar el botón

        // 2. Esperar a que la tapa se abra (0.4s) y luego desvanecer el sobre
        setTimeout(() => {
            envelopeContainer.style.opacity = "0";
            envelopeContainer.style.transform = "translateY(-100px)";

            // 3. Cuando el sobre casi desaparece, mostrar la invitación
            setTimeout(() => {
                envelopeContainer.style.display = "none"; // Ocultar completamente
                mainContent.classList.remove("hidden"); // Quitar display:none
                mainContent.classList.add("fade-in"); // Activar animación de emergencia

                // Permitir scroll si el contenido es más grande que la pantalla
                document.body.style.overflow = "auto";
            }, 400); // Pequeño solapamiento para fluidez
        }, 600); // Tiempo suficiente para ver abrirse la tapa
    });

    // Lógica de Modales (Mejorada para fluidez)
    const menuButtons = document.querySelectorAll(".menu-btn");
    const modals = document.querySelectorAll(".modal-overlay");
    const closeButtons = document.querySelectorAll(".close-modal");

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add("active");
            document.body.style.overflow = "hidden"; // Previene scroll del fondo
        }
    }

    function closeAllModals() {
        modals.forEach((m) => m.classList.remove("active"));
        // Solo reactivar scroll si el sobre no está visible
        if (envelopeContainer.style.display === "none") {
            document.body.style.overflow = "auto";
        } else {
            document.body.style.overflow = "hidden";
        }
    }

    menuButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-modal");
            openModal(id);
        });
    });

    closeButtons.forEach((btn) => {
        btn.addEventListener("click", closeAllModals);
    });

    // Cerrar al hacer clic fuera del contenido del modal
    modals.forEach((modal) => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });

    // Cerrar con la tecla Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeAllModals();
        }
    });
});
