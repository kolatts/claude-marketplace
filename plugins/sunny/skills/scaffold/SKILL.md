# sunny:scaffold — Project Scaffold

<!--
allowed-tools: Bash, Write, Read
disable-model-invocation: true
-->

Scaffold a new project structure based on the project type passed as `$ARGUMENTS`.

## Usage

```
/sunny:scaffold <type> [project-name]
```

Examples:
- `/sunny:scaffold react-app my-dashboard`
- `/sunny:scaffold node-ts api-service`
- `/sunny:scaffold dotnet MyCompany.Api`
- `/sunny:scaffold python data-pipeline`

## Steps

1. Parse `$ARGUMENTS`:
   - First token = project type (required)
   - Second token = project name (optional; default to the type if omitted)
2. If no type is provided, list supported types and ask the user to pick one.
3. Confirm with the user: **"Scaffold a `<type>` project named `<name>` in the current directory? (yes / cancel)"**
4. If confirmed, create the directory and scaffold the structure for that type (see below).
5. Print a summary of what was created and the next steps.

## Supported Types

### `react-app`
Standard React + TypeScript + Vite app.
```
<name>/
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── index.html
├── package.json        (react, react-dom, typescript, vite, @vitejs/plugin-react)
├── tsconfig.json
└── vite.config.ts
```

### `node-ts`
Node.js service with TypeScript, Express, and ts-node-dev.
```
<name>/
├── src/
│   ├── routes/
│   ├── middleware/
│   └── index.ts
├── .gitignore
├── package.json        (express, typescript, ts-node-dev, @types/*)
└── tsconfig.json
```

### `dotnet`
.NET Web API project.
```
Run: dotnet new webapi -n <name> --no-openapi
Then add .gitignore for .NET.
```

### `python`
Python project with pyproject.toml and src layout.
```
<name>/
├── src/
│   └── <name>/
│       └── __init__.py
├── tests/
├── .gitignore
├── pyproject.toml
└── README.md
```

## Rules

- Always confirm before creating files.
- Use the project name as the directory name.
- Create a `.gitignore` appropriate for the stack.
- Print the exact directory tree that was created.
- Do not install packages or run `npm install` / `pip install` — just scaffold the files.
