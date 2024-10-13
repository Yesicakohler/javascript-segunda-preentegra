const destinos = [
    { nombre: "Bariloche", precioPorNoche: 100 },
    { nombre: "Calafate", precioPorNoche: 150 },
    { nombre: "Cataratas del Iguazú", precioPorNoche: 200 }
];

const alojamientos = [
    { tipo: "Hotel Sol Bariloche", precioPorNoche: 80 },
    { tipo: "Hotel Mirador del Lago", precioPorNoche: 50 },
    { tipo: "Hotel Iguazú", precioPorNoche: 120 }
];

let reserva = {
    destino: null,
    alojamiento: null,
    noches: 0,
    costoTotal: 0
};

// Cargar destinos y alojamientos en los selects
function cargarSelects() {
    const destinoSelect = document.getElementById("destinoSelect");
    const alojamientoSelect = document.getElementById("alojamientoSelect");

    destinos.forEach((destino, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${destino.nombre} - $${destino.precioPorNoche} por noche`;
        destinoSelect.appendChild(option);
    });

    alojamientos.forEach((alojamiento, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${alojamiento.tipo} - $${alojamiento.precioPorNoche} por noche`;
        alojamientoSelect.appendChild(option);
    });
}

// Almacenar reserva en localStorage
function guardarReservaEnLocalStorage() {
    localStorage.setItem('reserva', JSON.stringify(reserva));
}

// Mostrar resultados en el DOM
function mostrarResultados() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `
        <p>Destino: ${reserva.destino.nombre}</p>
        <p>Alojamiento: ${reserva.alojamiento.tipo}</p>
        <p>Noches: ${reserva.noches}</p>
        <p>Costo total: $${reserva.costoTotal}</p>
    `;
}

// Calcular costo total
function calcularCostoTotal() {
    const costoDestino = reserva.destino.precioPorNoche * reserva.noches;
    const costoAlojamiento = reserva.alojamiento.precioPorNoche * reserva.noches;
    reserva.costoTotal = costoDestino + costoAlojamiento;

    guardarReservaEnLocalStorage();
    mostrarResultados();
}

// Manejar el evento de reserva
document.getElementById("reservarBtn").addEventListener("click", () => {
    const destinoSelect = document.getElementById("destinoSelect");
    const alojamientoSelect = document.getElementById("alojamientoSelect");
    const nochesInput = document.getElementById("nochesInput").value;

    reserva.destino = destinos[destinoSelect.value];
    reserva.alojamiento = alojamientos[alojamientoSelect.value];
    reserva.noches = parseInt(nochesInput);

    if (reserva.destino && reserva.alojamiento && reserva.noches > 0) {
        calcularCostoTotal();
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Cargar los selects al cargar la página
window.onload = cargarSelects;
