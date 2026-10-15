import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatCurrency, formatDate } from './formatters';

/**
 * Generates and downloads a clean, branded PDF financial statement
 * for the user's transactions with KPI summary blocks and a structured ledger table.
 */
export const exportTransactionsToPDF = ({
  transactions = [],
  user = null,
  filterScope = 'All Records',
}) => {
  if (!transactions || transactions.length === 0) {
    alert('No transactions available to export.');
    return;
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Branding Colors
  const primaryColor = [79, 70, 229]; // Indigo-600 #4f46e5
  const slateDark = [30, 41, 59]; // Slate-800
  const slateLight = [100, 116, 139]; // Slate-500
  const greenColor = [16, 185, 129]; // Emerald-500
  const roseColor = [244, 63, 94]; // Rose-500

  // 1. Top Decorative Brand Accent Strip
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 5, 'F');

  // 2. Header Brand Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...primaryColor);
  doc.text('ExpenseFlow', 14, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...slateLight);
  doc.text('Personal Expense & Budget Tracker', 14, 23);

  // Statement Title on Right
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...slateDark);
  doc.text('FINANCIAL STATEMENT', pageWidth - 14, 18, { align: 'right' });

  const todayStr = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...slateLight);
  doc.text(`Generated: ${todayStr}`, pageWidth - 14, 23, { align: 'right' });
  doc.text(`Report Scope: ${filterScope}`, pageWidth - 14, 28, { align: 'right' });

  // Divider Line
  doc.setDrawColor(226, 232, 240); // Slate-200
  doc.setLineWidth(0.4);
  doc.line(14, 32, pageWidth - 14, 32);

  // 3. User Details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...slateDark);
  doc.text('Account Holder:', 14, 39);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...slateDark);
  const userName = user?.name || 'Authorized Member';
  const userEmail = user?.email || 'N/A';
  doc.text(`${userName} (${userEmail})`, 44, 39);

  // 4. Financial Summary Cards (Inflow, Outflow, Net Balance)
  const totalInflow = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const totalOutflow = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const netBalance = totalInflow - totalOutflow;

  const boxY = 44;
  const boxWidth = (pageWidth - 28 - 8) / 3;
  const boxHeight = 17;

  // Box 1: Total Inflow
  doc.setFillColor(240, 253, 244); // Green-50
  doc.setDrawColor(187, 247, 208); // Green-200
  doc.roundedRect(14, boxY, boxWidth, boxHeight, 2, 2, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...slateLight);
  doc.text('TOTAL INFLOW', 18, boxY + 5.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...greenColor);
  doc.text(`+${formatCurrency(totalInflow)}`, 18, boxY + 12);

  // Box 2: Total Outflow
  const box2X = 14 + boxWidth + 4;
  doc.setFillColor(255, 241, 242); // Rose-50
  doc.setDrawColor(254, 205, 211); // Rose-200
  doc.roundedRect(box2X, boxY, boxWidth, boxHeight, 2, 2, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...slateLight);
  doc.text('TOTAL OUTFLOW', box2X + 4, boxY + 5.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...roseColor);
  doc.text(`-${formatCurrency(totalOutflow)}`, box2X + 4, boxY + 12);

  // Box 3: Net Balance
  const box3X = box2X + boxWidth + 4;
  doc.setFillColor(248, 250, 252); // Slate-50
  doc.setDrawColor(226, 232, 240); // Slate-200
  doc.roundedRect(box3X, boxY, boxWidth, boxHeight, 2, 2, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...slateLight);
  doc.text('NET PERIOD BALANCE', box3X + 4, boxY + 5.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(
    netBalance >= 0 ? greenColor[0] : roseColor[0],
    netBalance >= 0 ? greenColor[1] : roseColor[1],
    netBalance >= 0 ? greenColor[2] : roseColor[2]
  );
  doc.text(formatCurrency(netBalance), box3X + 4, boxY + 12);

  // 5. Table of Transactions
  const tableData = transactions.map((t) => {
    const isIncome = t.type === 'income';
    const amountStr = isIncome ? `+${formatCurrency(t.amount)}` : `-${formatCurrency(t.amount)}`;
    return [
      formatDate(t.date),
      t.title || t.category,
      t.type.toUpperCase(),
      t.category,
      amountStr,
    ];
  });

  autoTable(doc, {
    startY: boxY + boxHeight + 7,
    head: [['Date', 'Description', 'Type', 'Category', 'Amount (LKR)']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8.5,
      cellPadding: 2.5,
    },
    bodyStyles: {
      fontSize: 8,
      textColor: slateDark,
      cellPadding: 2.5,
    },
    columnStyles: {
      0: { cellWidth: 26 },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 22, halign: 'center' },
      3: { cellWidth: 32 },
      4: { cellWidth: 36, halign: 'right', fontStyle: 'bold' },
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    didDrawPage: (data) => {
      // Footer on every page
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184); // Slate-400
      doc.text(
        'ExpenseFlow • Confidential Financial Statement • Generated by Expense & Budget Tracker',
        14,
        pageHeight - 8
      );
      doc.text(
        `Page ${data.pageNumber}`,
        pageWidth - 14,
        pageHeight - 8,
        { align: 'right' }
      );
    },
    margin: { left: 14, right: 14, bottom: 14 },
  });

  const fileDate = new Date().toISOString().split('T')[0];
  doc.save(`ExpenseFlow_Statement_${fileDate}.pdf`);
};
