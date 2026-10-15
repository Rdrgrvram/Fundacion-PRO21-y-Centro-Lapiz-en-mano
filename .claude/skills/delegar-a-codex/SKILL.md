---
name: delegar-a-codex
description: Usar en este proyecto cuando haya que REVISAR código, un diff, el CMS, la paridad es/en o la cobertura de pruebas, o tras un commit que toca interfaz, CMS o pruebas. Delega la revisión de solo lectura a Codex (barato en tokens, corre en segundo plano) en lugar de leerlo todo uno mismo.
---

# Delegar revisiones a Codex

Codex es el **revisor** del proyecto (AGENTS.md): lee, razona y reporta; **no edita**. Delegarle la lectura masiva ahorra tokens y tiempo, porque corre en segundo plano mientras sigues con otra cosa.

## Cuándo delegar (sí)
- Revisar el `git diff` de una rama o de varios commits contra `AGENTS.md` y la spec (tras un lote grande de cambios o antes de abrir un PR).
- **Consistencia del CMS**: `public/admin/config.yml` ↔ `lib/cms-schemas.ts` ↔ `content/**` (campos huérfanos, `required` desalineado, íconos/slugs inexistentes).
- **Paridad es/en**: cada `.es.md` con su `.en.md`, claves de `content/settings/*.yml`, campos sin `i18n`.
- Cobertura y fragilidad de pruebas (selectores, timeouts, pruebas que aprueban sin comprobar nada).
- Accesibilidad estática (roles ARIA, foco, encabezados, contraste con tokens existentes).
- Seguridad básica del diff: enlaces externos sin `rel`, URLs sin validar, secretos o datos de menores en archivos versionados.

## Cuándo NO delegar
- Cambios triviales (un texto, un commit solo de documentación).
- **Editar archivos**: Codex corre en `read-only`; las correcciones las aplicas tú.
- **Ejecutar pruebas, builds o servidores**: no puede y no debe (comparten el puerto 3000 con Playwright).
- Cosas que requieren ver la página renderizada o el panel real: usa un subagente de Claude de solo lectura con capturas (ver más abajo).
- Nada que incluya secretos, `.env.local`, `Documentacion/` (datos de menores) ni material del BCP.

## Cómo
1. Escribe la tarea con: alcance exacto (rama/commits/archivos), qué buscar y el formato esperado. Mientras más concreta, mejor el informe.
2. Lánzalo **en segundo plano** (Bash con `run_in_background`, o `( … &)`):
   `scripts/codex-revisar.sh <nombre> "<tarea>"`  (o `-f archivo` para tareas largas)
   El informe queda en `$TEMP/codex-<nombre>.txt`. El script ya pone las reglas de revisor y cierra stdin (`< /dev/null`; sin eso Codex se cuelga).
3. Sigue con otro trabajo. No hagas sondeos: al terminar lee **solo el final** del archivo (`tail -c 9000`); el informe completo está al fondo, antes de las líneas de uso de tokens.
4. **Verifica cada hallazgo antes de aplicarlo.** Codex hace análisis estático y puede equivocarse (por ejemplo, afirmar que una prueba fallaría cuando la suite ya pasó). Clasifica: aplica / descarta con razón / preexistente (solo anótalo).
5. Aplica las correcciones tú, con su prueba, y cuéntale al usuario qué se aplicó, qué se descartó y por qué.

## Plantilla de tarea
```
Revisa <qué> (<rama o commits>) buscando <lista concreta>. Ignora <lo que no importa>.
Entrega por severidad (bloqueante / importante / menor) con archivo:línea y escenario de fallo.
```

## Alternativa: subagente de Claude de solo lectura
Si la tarea necesita **capturas de pantalla, navegar el sitio o el panel**, usa un subagente (Agent) con las mismas reglas de solo lectura, guardando capturas fuera del repo.

## Reglas fijas
- No pedir ediciones a Codex, ni darle permisos de escritura.
- No lanzar Codex y una suite completa de Playwright "esperando" resultados del otro: son independientes, pero no mezcles sus conclusiones.
- Un commit trivial no justifica una revisión. Un lote de más de ~10 archivos o que toque CMS, esquemas o accesibilidad, sí.
