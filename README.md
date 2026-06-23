# Transparency Hub

A comprehensive platform for tracking and analyzing platform  policies over time.

🌐 **Live Site**: [https://hub.transparency.berkmancenter.org](https://hub.transparency.berkmancenter.org)

📚 **Project Page**: [https://asml.cyber.harvard.edu/transparency-hub/](https://asml.cyber.harvard.edu/transparency-hub/)

## About

Transparency Hub is an open-source initiative by the Berkman Klein Center for Internet & Society at Harvard University. It provides researchers, journalists, and the public with tools to:

- Track policy changes across major platforms
- Compare policies between different platforms
- Access historical policy documents
- Analyze transparency report data

## Features

- **Policy Index**: Browse and search platform policies by company
- **Comparison Tool**: Side-by-side comparison of policies across platforms
- **Project Database**: Explore research projects related to platform transparency
- **WARC Archive Integration**: Access archived policy documents
- **Change Tracking**: Monitor when policies are updated

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Database**: MongoDB
- **Storage**: Google Cloud Storage
- **Styling**: Tailwind CSS
- **Analytics**: Vercel Analytics

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB instance
- Google Cloud Storage bucket (for WARC files)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/berkmancenter/transparency-hub.git
   cd transparency_hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` with your configuration (see [Configuration](#configuration) below).

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3002](http://localhost:3002) in your browser.

### Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Configuration
NEXT_ATLAS_URI=mongodb://localhost:27017
NEXT_ATLAS_DATABASE=transparency_hub

# Google Cloud Storage (optional, for WARC proxy)
GOOGLE_APPLICATION_CREDENTIALS=/path/to/credentials.json
GCS_BUCKET_NAME=your-bucket-name
```

See [.env.example](.env.example) for more details.

To request access to the live Transparency Hub data, please fill out [this form](https://docs.google.com/forms/d/e/1FAIpQLSdkIOP62Xq437gYeFnN4rNNUtI1j32imXfE0G5TIaOanfet7w/viewform) 

## Project Structure

```
transparency_hub/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── policy_index/      # Policy browsing pages
│   ├── comparison_tool/   # Policy comparison interface
│   ├── projects/          # Research projects showcase
│   └── lib/               # Database connections
├── components/            # React components
│   ├── ui/               # UI components
│   └── lib/              # Shared component utilities
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## Development

### Available Scripts

- `npm run dev` - Start development server on port 3002
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

This project uses:
- ESLint for code linting
- TypeScript for type safety
- Prettier-style formatting

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Data Collection

The platform aggregates data from publicly available sources. For information about our data collection practices, see our [Privacy Policy](https://hub.transparency.berkmancenter.org/legal/privacy).

## License

This project is licensed under the [GNU Affero General Public License v3.0](LICENSE) (AGPL-3.0). That license applies to the source code only. This project depends on caniuse-lite, a dataset licensed under CC BY 4.0 by caniuse.com. The CC BY 4.0 license applies to that dataset; the AGPL 3.0 license does not.

The AGPL-3.0 license requires that:
- Source code must be made available when the software is run as a network service
- Modifications must also be released under AGPL-3.0
- Users interacting with the software over a network must be able to access the source code

## Related Repositories

This project is part of the Transparency Hub ecosystem:

| Repository | Description |
|-----------|-------------|
| **[Transparency Hub](https://github.com/berkmancenter/transparency-hub)** (this repo) | Next.js frontend — the public-facing website |
| **[Transparency Archiver](https://github.com/berkmancenter/transparency-hub-engine)** | Python pipeline that crawls and archives policy documents |
| **[Browsertrix Crawler Fork](https://github.com/berkmancenter/transparency-hub-browsertrix-crawler)** | Custom fork of Browsertrix Crawler used by the archiver |

## Acknowledgments

- Developed by the [Berkman Klein Center for Internet & Society](https://cyber.harvard.edu/)
- A project of the [Applied Social Media Lab](https://asml.cyber.harvard.edu/) initiative

## Contact

For questions or collaboration inquiries, please visit our [project page](https://asml.cyber.harvard.edu/transparency-hub/) or open an issue on GitHub.

## Links

- [Website](https://hub.transparency.berkmancenter.org)
- [About Researchers](https://hub.transparency.berkmancenter.org/about/researchers)
- [Terms of Service](https://hub.transparency.berkmancenter.org/legal/terms)
- [Privacy Policy](https://hub.transparency.berkmancenter.org/legal/privacy)
