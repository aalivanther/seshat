#!/usr/bin/env python3
"""Regenera backend/vocab_aliases.go desde web/scripts/vocab-aliases.json.

El registro de alias es la fuente única: el frontend lo usa para validar y el
backend para migrar el progreso guardado. Este script existe para que no haya
que copiar el mapa a mano (y para que el test de deriva tenga algo que arreglar
cuando falle).

Uso:  python3 tools/gen-aliases.py
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REG = os.path.join(ROOT, "web/scripts/vocab-aliases.json")
doc = json.load(open(REG))
al = doc["aliases"]

# CADENAS: si un id retirado apunta a otro que también se retiró después, una
# sola pasada de migración deja el progreso a medio camino. Se aplanan aquí y se
# reescribe el registro, porque el registro es la fuente de la verdad.
flat = 0
for k in list(al):
    seen, v = set(), al[k]
    while v in al and v not in seen:
        seen.add(v)
        v = al[v]
        flat += 1
    al[k] = v
if flat:
    doc["aliases"] = dict(sorted(al.items()))
    json.dump(doc, open(REG, "w"), ensure_ascii=False, indent=2)
    print(f"  {flat} salto(s) de cadena aplanados en el registro")
w = max(len(k) for k in al) + 3  # gofmt alinea los valores del literal
rows = "\n".join(f'\t{(chr(34)+k+chr(34)+":").ljust(w)} "{v}",' for k, v in sorted(al.items()))
out = os.path.join(ROOT, "backend/vocab_aliases.go")
with open(out, "w") as f:
    f.write('''package main

// GENERADO por tools/gen-aliases.py desde web/scripts/vocab-aliases.json.
// No editar a mano: `migrate_items_test.go` compara este mapa con el JSON y
// falla si alguien toca uno sin el otro.
//
// Cada fila es un id retirado (vocabulario, lección o fase) que ahora vive
// en otro. La fusión del progreso solo corre al pasar el esquema de 1 a 2
// (migrate_items.go), no en cada carga.

var vocabAliases = map[string]string{
''' + rows + '''
}
''')
print(f"backend/vocab_aliases.go — {len(al)} alias")
