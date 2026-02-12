# Invoice Generator

A modern, professional invoice generator built with Angular 20 that allows you to create, customize, and download invoices in PDF format. Perfect for freelancers, small businesses, and anyone who needs to generate professional invoices quickly.

## ✨ Features

### Core Functionality
- **Real-time Invoice Preview** - See your invoice update in real-time as you make changes
- **PDF Export** - Download high-quality PDF invoices with a single click
- **Multi-page Support** - Automatically handles invoices with many items across multiple pages
- **Customizable Theme** - Change invoice color scheme to match your brand

### Invoice Components
- **Company Information** - Add sender and receiver details (name, mobile, address)
- **Invoice Metadata** - Set invoice number, date, due date, and custom title
- **Flexible Items** - Add items with quantities and prices
- **Sub-items Support** - Group related items under main items for better organization
- **Tax Calculation** - Configurable tax rate with automatic calculations
- **Bank Details** - Include banking information for payments
- **Logo & Signature** - Upload and include company logo and signature

### User Experience
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI** - Clean, professional interface built with Tailwind CSS
- **Live Calculations** - Automatic subtotal, tax, and total calculations
- **Smart Pagination** - Intelligent item distribution across pages

## 🚀 Technology Stack

- **Framework**: Angular 20.3
- **Styling**: Tailwind CSS 4.1
- **Forms**: Angular Reactive Forms
- **PDF Generation**: jsPDF + html2canvas
- **Server-Side Rendering**: Angular SSR
- **Deployment**: Vercel
- **Build Tool**: Angular CLI

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/junaidsultanxyz/invoice-generator.git
   cd invoice-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

The application will automatically reload when you make changes to the source files.

## 📖 Usage

### Creating an Invoice

1. **Configure Settings**
   - Choose your preferred theme color
   - Upload company logo (optional)
   - Upload signature (optional)

2. **Enter Invoice Details**
   - Fill in invoice number, date, and due date
   - Customize the invoice title if needed

3. **Add Sender & Receiver Information**
   - Enter sender details (your business/personal info)
   - Enter receiver details (client information)

4. **Add Items**
   - Click "Add Item" to add invoice line items
   - For each item, specify:
     - Item name/description
     - Quantity
     - Unit price
   - Add sub-items if needed for detailed breakdowns

5. **Configure Tax & Banking**
   - Set tax rate (percentage)
   - Add bank details for payment instructions

6. **Download PDF**
   - Click "Download PDF" button
   - Your invoice will be generated and downloaded automatically

### Tips
- The invoice preview updates in real-time as you make changes
- Use sub-items to group related charges under a main item
- Maximum of 20 total items (including sub-items) per invoice
- Multi-page invoices are automatically formatted

## 📁 Project Structure

```
invoice-generator/
├── src/
│   ├── app/
│   │   ├── invoice-generator/
│   │   │   ├── components/
│   │   │   │   ├── invoice-bank/          # Bank details component
│   │   │   │   ├── invoice-items/         # Items management
│   │   │   │   ├── invoice-meta/          # Invoice metadata
│   │   │   │   ├── invoice-people/        # Sender/receiver info
│   │   │   │   ├── invoice-preview/       # Live preview
│   │   │   │   ├── invoice-settings/      # Theme & customization
│   │   │   │   └── invoice-tax/           # Tax configuration
│   │   │   ├── invoice-generator.ts       # Main component logic
│   │   │   ├── invoice-generator.html     # Main template
│   │   │   └── invoice-generator.css      # Component styles
│   │   ├── app.ts                         # Root component
│   │   └── app.routes.ts                  # Application routes
│   ├── styles.css                         # Global styles
│   └── index.html                         # Main HTML file
├── public/                                # Static assets
├── angular.json                           # Angular configuration
├── package.json                           # Dependencies
├── tailwind.config.js                     # Tailwind configuration
├── tsconfig.json                          # TypeScript configuration
└── vercel.json                            # Vercel deployment config
```

## 🔧 Development

### Available Scripts

- `npm start` - Start development server (alias for `ng serve`)
- `npm run build` - Build for production
- `npm run watch` - Build in watch mode for development
- `npm test` - Run unit tests

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory, optimized for production deployment.

### Running Tests

```bash
npm test
```

Tests are executed using [Karma](https://karma-runner.github.io) test runner with Jasmine framework.

## 🎨 Customization

### Changing Theme Colors

The application uses CSS custom properties for theming. You can modify colors in the component or through the UI color picker.

### Modifying Page Limits

The pagination logic can be adjusted in `invoice-generator.ts`:
- `PAGE_1_LIMIT`: Maximum items on first page (default: 8)
- `OTHER_PAGE_LIMIT`: Maximum items on subsequent pages (default: 12)

### PDF Quality Settings

PDF generation settings can be adjusted in the `downloadPDF()` method:
- `scale`: Canvas scale for rendering (default: 2.5)
- `quality`: JPEG compression quality (default: 0.75)

## 🌐 Deployment

This project is configured for deployment on [Vercel](https://vercel.com). Simply connect your repository to Vercel, and it will automatically deploy on every push.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/junaidsultanxyz/invoice-generator)

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` directory to your hosting service

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Bug Reports

If you find a bug, please open an issue with:
- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Junaid Sultan**

- Website: [devjuni.com](https://devjuni.com)
- LinkedIn: [linkedin.com/in/junaidxyz](https://linkedin.com/in/junaidxyz)
- GitHub: [@junaidsultanxyz](https://github.com/junaidsultanxyz)

## 🙏 Acknowledgments

- Built with [Angular](https://angular.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- PDF generation powered by [jsPDF](https://github.com/parallax/jsPDF) and [html2canvas](https://html2canvas.hertzen.com)
- Font: [Montserrat](https://fonts.google.com/specimen/Montserrat) from Google Fonts

## 📸 Screenshots

*Live preview shows your invoice in real-time as you edit*

---

Made with ❤️ by Junaid Sultan
