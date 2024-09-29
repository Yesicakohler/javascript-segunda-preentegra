const destinos = [
    { nombre: "Bariloche", precioPorNoche: 100 },
    { nombre: "Calafate", precioPorNoche: 150 },
    { nombre: "Cataratas del iguazu", precioPorNoche: 200 }
];

const alojamientos = [
    { tipo: "Hotel Sol Bariloche", precioPorNoche: 80 },
    { tipo: "Hotel Mirador del Lago", precioPorNoche: 50 },
    { tipo: "Hotel Iguazu", precioPorNoche: 120 }
];

let reserva = {
    destino: null,
    alojamiento: null,
    noches: 0,
    costoTotal: 0
};

function seleccionarDestino() {
    const destinosDisponibles = destinos.map((destino, index) => `${index + 1}. ${destino.nombre} - $${destino.precioPorNoche} por noche`).join('\n');
    const seleccion = prompt(`Selecciona un destino:\n${destinosDisponibles}`);
    const index = parseInt(seleccion) - 1;

    if (index >= 0 && index < destinos.length) {
        reserva.destino = destinos[index];
        alert(`Destino seleccionado: ${reserva.destino.nombre}`);
    } else {
        alert('Selección inválida.');
    }
}

function seleccionarAlojamiento() {
    const alojamientosDisponibles = alojamientos.map((alojamiento, index) => `${index + 1}. ${alojamiento.tipo} - $${alojamiento.precioPorNoche} por noche`).join('\n');
    const seleccion = prompt(`Selecciona un tipo de alojamiento:\n${alojamientosDisponibles}`);
    const index = parseInt(seleccion) - 1;

    if (index >= 0 && index < alojamientos.length) {
        reserva.alojamiento = alojamientos[index];
        alert(`Alojamiento seleccionado: ${reserva.alojamiento.tipo}`);
    } else {
        alert('Selección inválida.');
    }
}

function ingresarNoches() {
    const nochesInput = prompt('¿Cuántas noches te quedarás?');
    const noches = parseInt(nochesInput);

    if (!isNaN(noches) && noches > 0) {
        reserva.noches = noches;
        calcularCostoTotal();
    } else {
        alert('Número de noches inválido.');
    }
}

function calcularCostoTotal() {
    if (reserva.destino && reserva.alojamiento && reserva.noches > 0) {
        const costoDestino = reserva.destino.precioPorNoche * reserva.noches;
        const costoAlojamiento = reserva.alojamiento.precioPorNoche * reserva.noches;
        reserva.costoTotal = costoDestino + costoAlojamiento;

        alert(`El costo total del viaje a ${reserva.destino.nombre} con alojamiento en ${reserva.alojamiento.tipo} por ${reserva.noches} noches es: $${reserva.costoTotal}`);
    } else {
        alert('Debes seleccionar un destino, un alojamiento y el número de noches primero.');
    }
}

function runSimulator() {
    alert('--- Simulador de Reservas de Viaje ---');
    seleccionarDestino();
    seleccionarAlojamiento();
    ingresarNoches();
}

window.onload = runSimulator;
