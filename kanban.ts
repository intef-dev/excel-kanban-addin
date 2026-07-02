//document.getElementById("run").addEventListener("click", () => tryCatch(run));

async function run() {
  await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();

    console.log("Your code goes here");

    await context.sync();
  });
}

/** Default helper for invoking an action and handling errors. */
async function tryCatch(callback) {
  try {
    await callback();
  } catch (error) {
    // Note: In a production add-in, you'd want to notify the user through your add-in's UI.
    console.error(error);
  }
}

// ------------------------ KANBAN ----------------------------------------------------- //

interface Item {
  id: number;
  titulo: string;
  empresa: string;
  monto: number;
  prioridad: "Alta" | "Media" | "Baja";
  estado: "Nuevo" | "Contactado" | "Propuesta" | "Cerrado";
}

let items: Item[] = [];

Office.onReady(async () => {
  await cargarItems();
  iniciarKanban();
});

async function cargarItems(): Promise<void> {
  // Se encarga de escribir los valores de la tabla de excel a la variable items
  await Excel.run(async (context) => {
    // Obtener los valores de la tabla
    //#region
    const table = context.workbook.tables.getItem("tblKanban");
    const bodyRange = table.getDataBodyRange();
    bodyRange.load("values");
    await context.sync();
    //#endregion

    //Escribirlos en la variable items
    //#region
    items = bodyRange.values.map((row: any[]) => {
      return {
        id: Number(row[0]),
        titulo: String(row[1]),
        empresa: String(row[2]),
        monto: Number(row[3]),
        prioridad: row[4] as Item["prioridad"],
        estado: row[5] as Item["estado"],
      };
    });
    //#endregion
  });
}

let cardArrastrada: HTMLElement | null = null;
function iniciarKanban(): void {
  // Establecer acción al botón "Actualizar desde excel"
  //#region
  const refreshButton = document.getElementById("btnRefresh");
  refreshButton.addEventListener("click", async () => {
    await cargarItems();
    renderizarKanban();
  });
  //#endregion

  // Distribuir las tarjetas en el kanban
  //#region
  renderizarKanban();
  //endregion

  // Establecer las acciones al arrastrar y soltar las tarjetas (drag and drop)
  //#region
  const columnas = document.querySelectorAll<HTMLElement>(".cards");

  //Recorrer cada columna
  columnas.forEach((columna) => {
    // Desactivar el evento dragover para que el navegador permita soltar los elementos
    columna.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    // Acciones al realizar cuando el usuario suelte el elemento
    columna.addEventListener("drop", async () => {
      // Validar que una tarjeta fue arrastrada
      if (!cardArrastrada) {
        return;
      }
      // Obtener el id y el item
      const id = Number(cardArrastrada.dataset.id);
      const item = items.find((x) => x.id === id);
      //Validar que el item existe
      if (!item) {
        return;
      }
      //Actualizar estado
      item.estado = columna.id as Item["estado"];
      // Pendiente: Guardar en la tabla original
      guardarEstado(item.id, item.estado);
      renderizarKanban();
    });
  });
  //#endregion
}

async function guardarEstado(id: number, status: string): Promise<void> {
  // Guarda el estado correspondiente buscando el valor en la columna ID de la tabla
  // Importante, los valores de ID y Estado se espera localizados en la columnas 0 y 5 respectivamente
  await Excel.run(async (context) => {
    // Cargar los datos de la tabla de excel
    //#region
    const tabla = context.workbook.tables.getItem("tblKanban");
    const rango = tabla.getDataBodyRange();

    rango.load("values");
    await context.sync();
    const valores = rango.values;
    //#endregion

    // Buscar el id en la columna 0 y escribir el estado en la columna 5
    //#region
    for (let i = 0; i < valores.length; i++) {
      if (Number(valores[i][0]) === id) {
        valores[i][5] = status;
        break;
      }
    }
    //#endregion

    // Reescribir la tabla con los nuevos valores
    //#region
    rango.values = valores;
    await context.sync();
    //#endregion
  });
}

function renderizarKanban(): void {
  // Se encarga de crear las tarjetas y distribuirlas en las columnas del kanban

  // Limpia toda las columnas
  //#region
  const columnas = document.querySelectorAll<HTMLElement>(".cards");
  columnas.forEach((col) => {
    col.innerHTML = "";
  });
  //#endregion

  // Recorre la variable items crea las tarjetas HTML en su columna correspondiente
  //#region
  items.forEach((item) => {
    const card = document.createElement("div");

    card.className = "card";
    card.draggable = true;
    card.dataset.id = item.id.toString();

    card.innerHTML = `
      <div class="card-title">${item.titulo}</div>
      <div class="card-company">${item.empresa}</div>

      <div class="card-footer">
          <span>${item.monto.toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
          })}</span>
          <span class="priority ${item.prioridad}">
            ${item.prioridad.toUpperCase()}
          </span>
      </div>
    `;

    card.addEventListener("dragstart", () => {
      cardArrastrada = card;
    });

    card.addEventListener("dragend", () => {
      cardArrastrada = null;
    });

    const targetColumn = document.getElementById(item.estado);

    if (targetColumn) {
      targetColumn.appendChild(card);
    }
  });
  //#endregion

  // Actualizar Contador
  actualizarContadores();
}

function actualizarContadores(): void {
  // Recorrer cada estado y obtener el conteo de items de cada uno
  const estados = ["nuevo", "contactado", "propuesta", "cerrado"];
  estados.forEach((estado) => {
    // Referencia del elemento HTML que mostrará el conteo
    const badge = document.getElementById(`count-${estado}`);
    if (!badge) return;
    // Obtener el conteo de elementos perteneciente al estado
    const total = items.filter((x) => x.estado.toLowerCase() === estado.toLowerCase()).length;
    //Actualizar el texto del elemento HTML
    badge.textContent = total.toString();
  });
}
