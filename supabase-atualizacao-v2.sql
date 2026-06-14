-- ==========================================================
-- ATUALIZAÇÃO DA TABELA EXISTENTE — VERSÃO 2
-- Execute este arquivo uma única vez no SQL Editor do Supabase.
-- ==========================================================

alter table public.respostas_perfil_empreendedor
  add column if not exists nome varchar(120);

alter table public.respostas_perfil_empreendedor
  add column if not exists sexo varchar(40);

alter table public.respostas_perfil_empreendedor
  add column if not exists instituicao varchar(150);

comment on column public.respostas_perfil_empreendedor.nome is
  'Nome informado pelo participante, tratado como dado confidencial.';

comment on column public.respostas_perfil_empreendedor.sexo is
  'Opção de sexo informada pelo participante.';

comment on column public.respostas_perfil_empreendedor.instituicao is
  'Instituição de ensino informada pelo participante.';
