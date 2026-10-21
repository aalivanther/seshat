package main

import (
	"encoding/json"
	"fmt"
	"os"
	"regexp"
	"strings"
	"testing"
)

// P43: el README de la raíz describía un curso A1–B1 y citaba planes que ya
// no están. Quien lo lea para «completar el A2» rehace un nivel que el drop
// ya trae. El README público es breve y en inglés, pero sus tres números
// tienen que ser los del validador, que los deja escritos en el snapshot, y
// si promete simulacros tiene que haberlos en todos los niveles de los dos idiomas.
func TestReadmeDescribeElCurso(t *testing.T) {
	readme, err := os.ReadFile("../README.md")
	if err != nil {
		t.Fatal(err)
	}
	doc := string(readme)

	snapRaw, err := os.ReadFile("../web/scripts/content-ids.snapshot.json")
	if err != nil {
		t.Fatal(err)
	}
	var snap struct {
		LessonIds   []string `json:"lessonIds"`
		ExerciseIds []string `json:"exerciseIds"`
		PhaseIds    []string `json:"phaseIds"`
	}
	if err := json.Unmarshal(snapRaw, &snap); err != nil {
		t.Fatal(err)
	}
	cifras := fmt.Sprintf("%s phases, %s lessons and %s exercises", miles(len(snap.PhaseIds)), miles(len(snap.LessonIds)), miles(len(snap.ExerciseIds)))
	if !strings.Contains(doc, cifras) {
		t.Fatalf("el README no lleva las cifras del validador (%s)", cifras)
	}

	// El README habla de simulacros: cada nivel de cada idioma debe tener al menos uno.
	simulacrosPorNivel(t)
	for _, s := range []string{"A1 to B2", "mock exams", "Goethe", "LanguageCert"} {
		if !strings.Contains(doc, s) {
			t.Fatalf("el README no dice %q", s)
		}
	}
	for _, s := range []string{
		"72 módulos",
		"612 micro-lecciones",
		"7199 ejercicios",
		"`PLAN.md`",
		"`PLAN-EN.md`",
		"`PLAN-B1.md`",
		"`PLAN-STREET-TALK.md`",
		"`PULIDO.md`",
		"`DEUDA-TECNICA.md`",
	} {
		if strings.Contains(doc, s) {
			t.Fatalf("el README sigue diciendo %q", s)
		}
	}

	// PULIDO.md y PLAN-STREET-TALK.md pueden volver cuando el dueño los escriba:
	// el README no los cita, y .gitignore impide que viajen.
	for _, f := range []string{"../PLAN.md", "../PLAN-EN.md", "../PLAN-B1.md", "../DEUDA-TECNICA.md"} {
		if _, err := os.Stat(f); !os.IsNotExist(err) {
			t.Fatalf("%s no debería estar en el árbol (o el Stat falló por otra causa: %v)", f, err)
		}
	}

	pkgRaw, err := os.ReadFile("../web/package.json")
	if err != nil {
		t.Fatal(err)
	}
	var pkg struct {
		Name    string `json:"name"`
		Version string `json:"version"`
	}
	if err := json.Unmarshal(pkgRaw, &pkg); err != nil {
		t.Fatal(err)
	}
	// Ningún script cita el nombre. La versión comercial va en los ldflags,
	// no aquí: cambiar el nombre no autoriza a subir este 1.0.0.
	if pkg.Name == "deutsch-a1" || pkg.Name == "" {
		t.Fatalf("package.json sigue llamándose %q", pkg.Name)
	}
	if pkg.Name != "seshat" {
		t.Fatalf("package.json se llama %q; el nombre acordado es seshat", pkg.Name)
	}
	if pkg.Version != "1.0.0" {
		t.Fatalf("package.json pasó a %s; la versión del binario no vive aquí", pkg.Version)
	}
}

// miles escribe un número con separador de miles a la inglesa (9324 → «9,324»), como en el README.
func miles(n int) string {
	digits := fmt.Sprintf("%d", n)
	var out strings.Builder
	for i, d := range digits {
		if i > 0 && (len(digits)-i)%3 == 0 {
			out.WriteByte(',')
		}
		out.WriteRune(d)
	}
	return out.String()
}

// simulacrosPorNivel lee genExamsByLang y el `level` de cada set. Si aparece
// un set nuevo, el README tiene que decir el recuento nuevo: el test no
// lleva los números a mano.
func simulacrosPorNivel(t *testing.T) (de, en map[string]int) {
	t.Helper()
	src, err := os.ReadFile("../web/data/course.gen.ts")
	if err != nil {
		t.Fatal(err)
	}
	code := string(src)
	imports := map[string]string{}
	reImp := regexp.MustCompile(`import\s+\{\s*([A-Za-z0-9_]+)\s*\}\s+from\s+"\./([^"]+)"`)
	for _, m := range reImp.FindAllStringSubmatch(code, -1) {
		imports[m[1]] = m[2]
	}
	i := strings.Index(code, "export const genExamsByLang")
	if i < 0 {
		t.Fatal("course.gen.ts ya no publica genExamsByLang")
	}
	block := code[i:]
	if j := strings.Index(block, "};"); j > 0 {
		block = block[:j]
	}
	reLang := regexp.MustCompile(`(?m)^\s+(de|en):\s+\[([^\]]+)\]`)
	found := map[string]map[string]int{}
	reLevel := regexp.MustCompile(`level:\s*"(a1|a2|b1|b2)"`)
	for _, m := range reLang.FindAllStringSubmatch(block, -1) {
		lang := m[1]
		counts := map[string]int{}
		for _, name := range strings.Split(m[2], ",") {
			name = strings.TrimSpace(name)
			if name == "" {
				continue
			}
			path, ok := imports[name]
			if !ok {
				t.Fatalf("simulacro %s no tiene import en course.gen.ts", name)
			}
			body, err := os.ReadFile("../web/data/" + path + ".ts")
			if err != nil {
				t.Fatal(err)
			}
			lv := reLevel.FindStringSubmatch(string(body))
			if lv == nil {
				t.Fatalf("%s no declara level", path)
			}
			counts[lv[1]]++
		}
		found[lang] = counts
	}
	if found["de"] == nil || found["en"] == nil {
		t.Fatal("genExamsByLang no lista de y en")
	}
	for _, lang := range []string{"de", "en"} {
		for _, lv := range []string{"a1", "a2", "b1", "b2"} {
			if found[lang][lv] == 0 {
				t.Fatalf("el %s no tiene simulacro de %s y el README no puede decir que el nivel está", lang, lv)
			}
		}
	}
	return found["de"], found["en"]
}
