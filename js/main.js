const destinos = [];
const alojamientos = [];
let reserva = {
    destino: null,
    alojamiento: null,
    noches: 0,
    costoTotal: 0
};

async function cargarDatos() {
    try {
        const [destinosResponse, alojamientosResponse] = await Promise.all([
            fetch('data/destinos.json'), 
            fetch('data/alojamientos.json') 
        ]);
        
        if (!destinosResponse.ok || !alojamientosResponse.ok) {
            throw new Error('Error en la carga de datos');
        }

        const destinosData = await destinosResponse.json();
        const alojamientosData = await alojamientosResponse.json();

        destinos.push(...destinosData);
        alojamientos.push(...alojamientosData);

        cargarSelects();
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        alert('No se pudieron cargar los datos. Por favor, intenta de nuevo más tarde.');
    }
}

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

function guardarReservaEnLocalStorage() {
    localStorage.setItem('reserva', JSON.stringify(reserva));
}

function mostrarResultados() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `
        <p>Destino: ${reserva.destino.nombre}</p>
        <p>Alojamiento: ${reserva.alojamiento.tipo}</p>
        <p>Noches: ${reserva.noches}</p>
        <p>Costo total: $${reserva.costoTotal}</p>
    `;
}

function calcularCostoTotal() {
    const costoDestino = reserva.destino.precioPorNoche * reserva.noches;
    const costoAlojamiento = reserva.alojamiento.precioPorNoche * reserva.noches;
    reserva.costoTotal = costoDestino + costoAlojamiento;

    guardarReservaEnLocalStorage();
    mostrarResultados();
}

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


window.onload = cargarDatos;