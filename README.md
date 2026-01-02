# TDP Documentation

Internal documentation site for The Design Project team.

## Running Locally

```bash
bun install
bun run dev
```

Open http://localhost:3000 with your browser.

## Documentation Structure

### Organization (`/docs/organization`)
Company-level structure and processes:
- **Overview** — Org chart and core principles
- **Leadership Roles** — Alex (Director), Dianne (Commercial), Mica (Customer Success & Ops)
- **Design Team Structure** — Team Leads (Luli & Delfi) and Junior Designers
- **Key Processes** — Escalation flows, design reviews, quality checks, sales handoff

### Lead & Associate SOP (`/docs/sop`)
Standard operating procedures for the Lead/Associate designer model:
- **Process Workflow** — Steps 0-6 from kickoff to delivery, including meeting cadence and communication standards
- **Roles** — Lead and Associate responsibilities
- **Playbooks** — Operational workflows (Daily Status communication)
- **Tools & Templates** — Required tools, Asana setup, standard templates
- **Growth Framework** — Associate skill progression (Month 1-12)
- **Management** — Risk escalation, success metrics, continuous improvement
- **Resources** — Q&A, prompt library, troubleshooting

## Content Location

All documentation content lives in `content/docs/`:

```
content/docs/
├── index.mdx                    # Landing page
├── organization/                # Company structure
│   ├── index.mdx
│   ├── leadership.mdx
│   ├── design-team.mdx
│   └── processes.mdx
└── sop/                         # Lead & Associate SOP
    ├── index.mdx
    ├── tools-templates.mdx
    ├── growth-framework.mdx
    ├── process/
    ├── roles/
    ├── playbooks/
    ├── management/
    └── resources/
```

## Adding Content

1. Create `.mdx` files in the appropriate folder
2. Add frontmatter with `title` and `description`
3. Update `meta.json` in the folder to control navigation order

## Tech Stack

- [Next.js](https://nextjs.org/) — Framework
- [Fumadocs](https://fumadocs.dev) — Documentation framework
- [Supabase](https://supabase.com) — Authentication
- [Tailwind CSS](https://tailwindcss.com) — Styling
