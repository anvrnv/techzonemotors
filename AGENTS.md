<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

Перед нетривиальной задачей читай **`docs/AGENT_PROJECT_CHRONICLE.md`** (карта файлов и конвенции для агентов). Для инфраструктуры и секретов — **`docs/PROJECT_ADMIN.md`**.

После осмысленных правок в коде обновляй хронику через субагента Chronicler (см. **`.cursor/rules/chronicler-doc-update.mdc`** и **`.cursor/agents/chronicler.md`**).

Процесс: после правок кода — **коммит и `git push`** (см. `.cursor/rules/git-push-autodeploy.mdc`), иначе автодеплой с GitHub на сервер не запустится.
