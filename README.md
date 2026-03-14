# Portfolio

This repository is a Next.js portfolio site with a contact API route that can send messages through SendGrid or Formspree.

## Local development

Install dependencies and start the app:

```bash
npm install
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values you want to use.

Required for production:

- `NEXT_PUBLIC_SITE_URL`: your deployed Vercel URL or custom domain, for example `https://your-domain.vercel.app`

Optional for the contact form:

- `SENDGRID_API_KEY`: enables email delivery through SendGrid
- `CONTACT_EMAIL`: inbox that receives contact form submissions
- `FORMSPREE_ENDPOINT`: alternative to SendGrid; if set, Formspree is used instead

## Vercel deployment

This project is ready to deploy on Vercel as a standard Next.js app.

1. Import the repository into Vercel.
2. Keep the detected framework preset as `Next.js`.
3. Leave the default build settings in place.
4. Add the production environment variables from the list above.
5. Deploy.

The checked-in `vercel.json` keeps the install, build, and dev commands explicit for the project.
