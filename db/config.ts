import { column, defineDb, defineTable, NOW } from 'astro:db';

const HistoricalRecord = defineTable({
  columns: {
    // Coordenadas: latitud y longitud (valores decimales).
    latitude: column.number(),
    longitude: column.number(),

    // Nombre y apellidos de la persona.
    first_name: column.text(),
    last_name: column.text(),

    // URL o ruta de la foto de la persona.
    photo_url: column.text(),

    // Historia o registro histórico de la persona.
    history: column.text(),

    // Fecha de defunción (opcional).
    date_of_death: column.date(),

    // Fecha en que la persona viajó a ese punto.
    travel_date: column.date(),

    // Notas adicionales o hechos destacados.
    additional_notes: column.text(),

    // Fecha de creación del registro (se define automáticamente al crearse).
    created_at: column.date({ default: NOW }),

    // Fecha de la última actualización.
    updated_at: column.date(),
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    HistoricalRecord},
});
