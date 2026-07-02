// Datos en memoria (simulación de actividades.csv)
const items = [
  { id: 1, titulo: "Sistema ERP", empresa: "Empresa ABC", monto: " $120,000.00 ", prioridad: "Alta", estado: "Nuevo" },
  { id: 2, titulo: "Dashboard Power BI", empresa: "Grupo Norte", monto: " $45,000.00 ", prioridad: "Media", estado: "Contactado" },
  { id: 3, titulo: "Automatización Excel", empresa: "Corporativo Delta", monto: " $28,000.00 ", prioridad: "Baja", estado: "Propuesta" },
  { id: 4, titulo: "CRM Comercial", empresa: "Innovatech", monto: " $95,000.00 ", prioridad: "Alta", estado: "Nuevo" },
  { id: 5, titulo: "Portal Web", empresa: "Logística MX", monto: " $60,000.00 ", prioridad: "Media", estado: "Cerrado" },
  { id: 6, titulo: "App Inventarios", empresa: "Distribuidora Central", monto: " $35,000.00 ", prioridad: "Baja", estado: "Nuevo" },
  { id: 7, titulo: "Dashboard Ventas", empresa: "Comercial López", monto: " $55,000.00 ", prioridad: "Media", estado: "Propuesta" }
];

let cardArrastrada = null;

// Inicialización de la demo
document.addEventListener("DOMContentLoaded", () => {
  renderTable();
  renderKanban();
  iniciarKanban();
});

function renderTable() {
  const tbody = document.querySelector('#activity-table tbody');
  tbody.innerHTML = '';
  items.forEach(item => {
    const tr = document.createElement('tr');
    tr.dataset.id = item.id;
    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.titulo}</td>
      <td>${item.empresa}</td>
      <td>${item.monto}</td>
      <td>${item.prioridad}</td>
      <td class="status-cell">${item.estado}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderKanban() {
  // Limpia todas las columnas
  const columnas = document.querySelectorAll('.cards');
  columnas.forEach(col => {
    col.innerHTML = '';
  });

  // Distribuir las tarjetas
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;
    card.dataset.id = item.id.toString();

    card.innerHTML = `
      <div class="card-title">${item.titulo}</div>
      <div class="card-company">${item.empresa}</div>
      <div class="card-footer">
          <span>${item.monto}</span>
          <span class="priority ${item.prioridad.toLowerCase()}">
            ${item.prioridad.toUpperCase()}
          </span>
      </div>
    `;

    card.addEventListener('dragstart', () => {
      cardArrastrada = card;
      card.classList.add('dragging');
    });

    card.addEventListener('dragend', () => {
      cardArrastrada = null;
      card.classList.remove('dragging');
    });

    const targetColumn = document.getElementById(item.estado);
    if (targetColumn) {
      targetColumn.appendChild(card);
    }
  });

  actualizarContadores();
}

function iniciarKanban() {
  const columnas = document.querySelectorAll('.cards');
  columnas.forEach(columna => {
    columna.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    columna.addEventListener('drop', () => {
      if (!cardArrastrada) return;

      const id = Number(cardArrastrada.dataset.id);
      const item = items.find(x => x.id === id);
      if (!item) return;

      const nuevoEstado = columna.id; // "Nuevo", "Contactado", etc.
      item.estado = nuevoEstado;

      // Actualizar visualmente la tabla de Excel (celda Estado) con efecto visual
      const row = document.querySelector(`#activity-table tbody tr[data-id="${id}"]`);
      if (row) {
        const statusCell = row.querySelector('.status-cell');
        statusCell.textContent = nuevoEstado;
        statusCell.classList.add('updated-cell');
        setTimeout(() => {
          statusCell.classList.remove('updated-cell');
        }, 1000);
      }

      renderKanban();
    });
  });

  const refreshButton = document.getElementById('btnRefresh');
  if (refreshButton) {
    refreshButton.addEventListener('click', () => {
      // Simular actualizar el Kanban a partir de los datos que estén en la tabla de Excel
      const rows = document.querySelectorAll('#activity-table tbody tr');
      rows.forEach(row => {
        const id = Number(row.dataset.id);
        const estado = row.querySelector('.status-cell').textContent.trim();
        const item = items.find(x => x.id === id);
        if (item) {
          item.estado = estado;
        }
      });
      renderKanban();
    });
  }
}

function actualizarContadores() {
  const estados = ['nuevo', 'contactado', 'propuesta', 'cerrado'];
  estados.forEach(estado => {
    const badge = document.getElementById(`count-${estado}`);
    if (!badge) return;
    const total = items.filter(x => x.estado.toLowerCase() === estado.toLowerCase()).length;
    badge.textContent = total.toString();
  });
}
