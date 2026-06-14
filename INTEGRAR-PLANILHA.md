# Atualizar a integração com Google Planilhas

A URL do App da Web já permanece configurada no arquivo `config.js`.

## Atualizar o código da planilha

1. Abra a planilha usada pelo site.
2. Clique em **Extensões > Apps Script**.
3. Apague o código anterior.
4. Copie todo o conteúdo do novo arquivo `google-apps-script.gs`.
5. Cole e salve.

## Publicar a nova versão

Para manter a mesma URL `/exec`:

1. Clique em **Implantar > Gerenciar implantações**.
2. Clique no lápis da implantação atual.
3. Em **Versão**, escolha **Nova versão**.
4. Clique em **Implantar**.

Não é necessário trocar a URL no `config.js` quando a implantação existente é atualizada.

## Novas colunas

Os novos campos serão acrescentados no final da aba `Respostas`:

- Nome completo;
- Sexo;
- Instituição de ensino.

Eles ficam no final para preservar a posição dos dados antigos.

## Atualizar o Supabase

No SQL Editor, execute uma vez:

```text
supabase-atualizacao-v2.sql
```

Depois faça um envio de teste pelo site e confira a planilha e o Supabase.
