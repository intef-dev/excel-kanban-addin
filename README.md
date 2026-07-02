# 📊 Tablero Kanban Interactivo en Excel

¡Bienvenido a este proyecto! Este repositorio contiene todo el código necesario para implementar un **Tablero Kanban interactivo** directamente dentro de tus hojas de cálculo de Excel utilizando el complemento gratuito **Script Lab**.

Este recurso complementa el tutorial paso a paso que subí a mi canal de YouTube. Si quieres ver cómo lo construimos desde cero, configurar la tabla y hacer que todo funcione, te invito a ver el video completo.

---

## 🎥 Video Tutorial Paso a Paso

Mira el desarrollo paso a paso y aprende cómo configurarlo en tu Excel:
👉 **[Ver Video en YouTube - HAZ CLIC AQUÍ](https://youtu.be/Ax2BjjpZQro?sub_confirmation=1)**

¡Si te sirve este contenido, no olvides dejar tu **Like**, **comentar** si tienes dudas y **suscribirte al canal** para no perderte futuros tutoriales!

---

## 🌐 Demo en Vivo

Puedes ver una simulación interactiva de cómo funciona este Kanban (sincronizándose con una tabla de Excel interactiva) sin necesidad de abrir Excel, haciendo clic aquí:
👉 **[Ver Demo Interactiva en Vivo](https://intef-dev.github.io/excel-kanban-addin/demo/)**

---

## 📥 Descarga Rápida del Proyecto

Si prefieres descargar todos los archivos juntos en un archivo comprimido ZIP para importarlos de golpe, haz clic en el siguiente botón:

[![Descargar ZIP](https://img.shields.io/badge/Descargar-Proyecto_ZIP-blue?style=for-the-badge&logo=github)](https://github.com/intef-dev/excel-kanban-addin/releases/download/v1.0/kanban-addin.zip)

---

## 🚀 Cómo utilizar este complemento en tu Excel

### Requisitos:

1. Tener instalado el complemento gratuito **Script Lab** en Excel (búscalo en la tienda oficial de Microsoft dentro de Excel → pestaña _Insertar_ → _Obtener complementos_).

### Paso a Paso para la Configuración:

1. Abre **Excel**.
2. Ve a la pestaña **Script Lab** y haz clic en **Code**.
3. En el panel que se abre a la derecha, haz clic en **Nuevo proyecto** (New Snippet).
4. Copia y pega el código de los siguientes archivos en sus respectivas pestañas de Script Lab:
   - **HTML**: Abre [`kanban.html`](/kanban.html) (puedes usar el botón **Raw** para copiar todo fácilmente) e insértalo en la pestaña HTML de Script Lab.
   - **CSS**: Abre [`kanban.css`](/kanban.css) (o su versión [Raw](/raw/main/kanban.css)) e insértalo en la pestaña CSS de Script Lab.
   - **TypeScript**: Abre [`kanban.ts`](/kanban.ts) (o su versión [Raw](/raw/main/kanban.ts)) e insértalo en la pestaña Script de Script Lab.
5. Asegúrate de tener una tabla en tu hoja de cálculo llamada **`tblKanban`** que contenga las siguientes columnas (puedes usar como ejemplo de datos el archivo [`actividades.csv`](/actividades.csv)):
   - `ID`, `TITULO`, `EMPRESA`, `MONTO`, `PRIORIDAD`, `ESTADO`
6. Haz clic en **Run** en Script Lab y ¡listo! Ya puedes arrastrar tus tarjetas para que cambien de estado en la tabla de Excel en tiempo real.

---

## 📱 ¡Únete a la Comunidad! Sígueme en mis Redes

Para enterarte de nuevos tutoriales, trucos rápidos de Excel, macros y automatizaciones gratis, sígueme en mis canales oficiales:

- 🎥 **YouTube:** [Suscríbete a mi Canal de YouTube](https://www.youtube.com/InteligenciaEficiente)
- 📸 **Instagram:** [@inteligenciaeficiente](https://www.instagram.com/inteligenciaeficiente/)
- 👤 **Facebook:** [Página Oficial de Facebook](https://www.facebook.com/InteligenciaEficiente/)
- 💼 **Sitio Web:** [Sitio Web Oficial](https://inteficiente.com/)

---

## ☕ Apoya este proyecto

Si este complemento te ha sido de utilidad y quieres apoyar la creación de más contenido gratuito y plantillas automatizadas, puedes realizar una donación voluntaria en los siguientes enlaces:

- 💳 **PayPal:** [Donar por PayPal.Me](https://www.paypal.com/paypalme/INTEFDonativo)
- ☕ **Buy Me a Coffee:** [Apoyar en Buy Me a Coffee](https://buymeacoffee.com/inteligenciaeficiente)

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**, lo que significa que eres libre de usar, modificar y distribuir el código como desees, incluso para fines comerciales. Consulta el archivo [LICENSE](/LICENSE) para más detalles.
