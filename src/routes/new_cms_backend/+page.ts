// src/lib/api.ts
export async function load() {
    const res = await fetch('http://localhost:1337/api/articles?populate=*');
    if (!res.ok) throw new Error('Fehler beim Laden der Daten');
    const data = await res.json();

    return data;
}
