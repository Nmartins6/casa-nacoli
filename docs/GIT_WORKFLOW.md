# Workflow Git

## Início

```bash
git init
git add .
git commit -m "docs: add casa nacoli project specification"
git branch -M main
git switch -c feat/site-inicial
```

## Commits

Usar Conventional Commits:

- `chore`: configuração;
- `feat`: funcionalidade;
- `fix`: correção;
- `test`: testes;
- `docs`: documentação;
- `refactor`: reorganização sem mudança funcional;
- `perf`: melhoria mensurável de performance.

Cada commit deve:

- ter um objetivo;
- deixar o projeto em estado verificável;
- incluir testes relacionados;
- evitar arquivos não relacionados;
- explicar decisões relevantes no corpo quando necessário.

## Branches futuras

- `feat/<escopo>`
- `fix/<escopo>`
- `chore/<escopo>`
- `docs/<escopo>`

## CI

Criar workflow para:

1. checkout;
2. setup do Node compatível;
3. setup pnpm;
4. instalação com lockfile;
5. format check;
6. lint;
7. typecheck;
8. testes;
9. build;
10. Playwright em etapa apropriada.

## Releases

Marcar a primeira versão publicável como `v1.0.0` somente após:

- dados comerciais confirmados;
- domínio configurado;
- revisão de fotos;
- auditoria mobile;
- Search Console;
- analytics ou medição escolhida;
- política de privacidade revisada.
