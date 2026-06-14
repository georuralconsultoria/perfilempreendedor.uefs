# Estrutura do projeto — versão 2

Todos os arquivos desta versão foram preparados para ficar na raiz do repositório do GitHub:

```text
perfil-empreendedor-v2/
├── index.html
├── style.css
├── script.js
├── config.js
├── logo.svg
├── uefs-logo.png
├── banner-estudantes.svg
├── google-apps-script.gs
├── modelo-planilha-respostas.xlsx
├── supabase-setup.sql
├── supabase-atualizacao-v2.sql
└── ATUALIZAR-VERSAO-2.txt
```

## O que mudou

- Nome completo.
- Sexo.
- Instituição de ensino com sugestões e digitação livre.
- Curso com digitação livre.
- Logo da UEFS em posição discreta no rodapé.
- Animação de envio.
- Animação de conclusão.
- Créditos de Marciel Santos & Gabriel Arcanjo.
- Novas colunas na planilha e no Supabase.

## Arquivos principais

- `index.html`: estrutura, textos e perguntas.
- `style.css`: aparência e animações.
- `script.js`: validação, envio e resultado.
- `config.js`: Supabase e URL do Apps Script.
- `google-apps-script.gs`: grava as respostas na planilha.
- `supabase-atualizacao-v2.sql`: adiciona os novos campos à tabela existente.
- `modelo-planilha-respostas.xlsx`: modelo atualizado.

## Publicar no GitHub

Envie todos os arquivos para a raiz do repositório e substitua os antigos.

```text
Settings
→ Pages
→ Deploy from a branch
→ main
→ / (root)
```

Aguarde a marca verde em `Actions` e pressione `Ctrl + F5`.
