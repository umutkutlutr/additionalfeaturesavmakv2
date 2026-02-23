import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { 
  Settings2, 
  Building2, 
  Hash, 
  FileText, 
  ArrowLeft,
  Upload,
  CheckCircle2,
  Plane,
  Hotel,
  Car,
  DollarSign,
  Truck,
  FileCheck,
  Ship,
  Shield,
  MapPin,
  Package,
  Send,
  Plus,
  Trash2,
  X
} from "lucide-react";
import { toast } from "sonner";
import React from "react";

type Project = {
  id: string;
  name: string;
  status: string;
  customer: string;
  hasIncompleteCosts: boolean;
  machineType: string;
  brand: string;
  serialNo: string;
  createdDate: string;
  year: number;
};

type CostDetailType = {
  machinePurchase: {
    purchasePrice: string;
    purchaseCurrency: string;
    purchaseInvoice: File | null;
    externalCommission: string;
    externalCommissionCurrency: string;
    externalCommissionInvoice: File | null;
    machineCondition: "new" | "used" | "";
    paymentMethod: "capital" | "credit" | "leasing" | "";
    paymentAmount: string;
    interestRate: string;
  };
  machineVisit: {
    visited: boolean;
    flight: string;
    flightCurrency: string;
    flightInvoice: File | null;
    hotel: string;
    hotelCurrency: string;
    hotelInvoice: File | null;
    carRental: string;
    carRentalCurrency: string;
    carRentalInvoice: File | null;
    additionalExpense: string;
    additionalExpenseCurrency: string;
    additionalExpenseInvoice: File | null;
  };
  logistics: any;
  customs: any;
  transfer: any;
  generalCosts: any;
};

interface CostDetailFormProps {
  project: Project;
  costDetails: CostDetailType;
  setCostDetails: React.Dispatch<React.SetStateAction<CostDetailType>>;
  onBack: () => void;
  handleFileUpload: (section: string, field: string, file: File | null) => void;
}

export function CostDetailFormHeader({ 
  project, 
  onBack 
}: { 
  project: Project; 
  onBack: () => void;
}) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="px-8 py-6">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBack}
            className="hover:bg-gray-50 border-gray-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{project.id}</h1>
              <Badge className="bg-gradient-to-r from-black to-gray-700 text-white px-4 py-1.5 text-sm">
                Maliyet Girişi
              </Badge>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-gray-400" />
                <span className="font-medium">{project.machineType}</span>
              </span>
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-400" />
                <span className="font-medium">{project.brand}</span>
              </span>
              <span className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-gray-400" />
                <span className="font-mono text-xs">{project.serialNo}</span>
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Oluşturma Tarihi</p>
            <p className="text-lg font-semibold text-gray-900">{project.createdDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SectionHeader({ 
  number, 
  title, 
  subtitle, 
  icon: Icon 
}: { 
  number: number; 
  title: string; 
  subtitle: string; 
  icon: any;
}) {
  return (
    <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6 rounded-t-xl shadow-lg">
      <div className="flex items-center gap-3">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2.5">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{number}. {title}</h2>
          <p className="text-white/80 text-sm mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export function PremiumCard({ 
  title, 
  icon: Icon,
  children 
}: { 
  title: string; 
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-6 space-y-6 hover:border-gray-300 hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="bg-gradient-to-br from-black to-gray-700 text-white rounded-lg p-2">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export function PremiumInput({ 
  label, 
  required, 
  ...props 
}: { 
  label: string; 
  required?: boolean;
  [key: string]: any;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input 
        {...props} 
        className="border-gray-300 focus:border-black focus:ring-black transition-colors"
      />
    </div>
  );
}

export function PremiumSelect({ 
  label, 
  required, 
  value,
  onValueChange,
  options
}: { 
  label: string; 
  required?: boolean;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="border-gray-300 focus:border-black focus:ring-black">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(opt => (
            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function PremiumFileUpload({ 
  label, 
  required,
  file,
  onChange 
}: { 
  label: string;
  required?: boolean;
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
          className="sr-only"
        />
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-10">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center justify-center h-full px-4 bg-black text-white text-sm font-medium cursor-pointer hover:bg-gray-800 transition-colors whitespace-nowrap shrink-0"
          >
            Dosya Seç
          </button>
          <span className="px-3 text-sm text-gray-500 truncate">
            {file ? file.name : "Dosya seçilmedi"}
          </span>
        </div>
        {file && (
          <div className="flex items-center gap-2 mt-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-md">
            <CheckCircle2 className="h-4 w-4" />
            <span>Dosya yüklendi: {file.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}

const currencySymbols: Record<string, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  TRY: "₺"
};

export function CurrencyInput({
  amountLabel,
  amount,
  onAmountChange,
  currency,
  onCurrencyChange,
  required,
  exchangeRate,
  onExchangeRateChange
}: {
  amountLabel: string;
  amount: string;
  onAmountChange: (value: string) => void;
  currency: string;
  onCurrencyChange: (value: string) => void;
  required?: boolean;
  exchangeRate?: number;
  onExchangeRateChange?: (rate: number) => void;
}) {
  const showRate = currency && currency !== "TRY" && exchangeRate !== undefined;
  const tryEquivalent = showRate && amount ? (parseFloat(amount) * (exchangeRate || 0)).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : null;

  return (
    <div className="space-y-0">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <PremiumInput
            label={amountLabel}
            required={required}
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e: any) => onAmountChange(e.target.value)}
          />
        </div>
        <div>
          <PremiumSelect
            label="Para Birimi"
            value={currency}
            onValueChange={onCurrencyChange}
            options={[
              { value: "EUR", label: "EUR €" },
              { value: "USD", label: "USD $" },
              { value: "GBP", label: "GBP £" },
              { value: "TRY", label: "TRY ₺" }
            ]}
          />
        </div>
      </div>

      {showRate && (
        <div className="flex items-center gap-3 mt-2.5 px-1">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">
            <span className="text-xs text-gray-500 whitespace-nowrap">1 {currency} =</span>
            <input
              type="number"
              step="0.01"
              value={exchangeRate}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                if (!isNaN(val) && onExchangeRateChange) {
                  onExchangeRateChange(val);
                }
              }}
              className="w-20 text-xs font-semibold text-gray-900 bg-white border border-gray-300 rounded-md px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-xs text-gray-500">₺</span>
          </div>
          {tryEquivalent && parseFloat(amount) > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span>≈</span>
              <span className="font-semibold text-gray-700">{tryEquivalent} ₺</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Jenerik Ek Maliyet Kalemi Sistemi ────────────────────────────────────

export type AdditionalCostItem = {
  id: string;
  name: string;
  amount: string;
  currency: string;
  invoice: File | null;
};

export function AdditionalCostItems({
  items,
  onAdd,
  onUpdate,
  onRemove,
  getRate,
  setRate
}: {
  items: AdditionalCostItem[];
  onAdd: () => void;
  onUpdate: (index: number, field: keyof AdditionalCostItem, value: any) => void;
  onRemove: (index: number) => void;
  getRate: (currency: string) => number;
  setRate: (currency: string) => (rate: number) => void;
}) {
  return (
    <div className="space-y-4 pt-2">
      <Separator />
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Ek Maliyet Kalemleri</p>
        <Button
          size="sm"
          variant="outline"
          onClick={onAdd}
          className="gap-1.5 text-xs border-dashed border-gray-400 text-gray-600 hover:text-black hover:border-black"
        >
          <Plus className="h-3.5 w-3.5" />
          Ek Kalem Ekle
        </Button>
      </div>

      {items.length === 0 && (
        <p className="text-xs text-gray-400 italic text-center py-2">Henüz ek maliyet kalemi eklenmedi</p>
      )}

      {items.map((item, index) => (
        <div
          key={item.id}
          className="relative p-5 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200 space-y-4 group"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <PremiumInput
                label="Maliyet Kalemi Adı"
                required
                placeholder="Örn: Forklift ücreti, Montaj masrafı..."
                value={item.name}
                onChange={(e: any) => onUpdate(index, "name", e.target.value)}
              />
            </div>
            <button
              onClick={() => onRemove(index)}
              className="mt-7 p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Kalemi sil"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <CurrencyInput
            amountLabel="Tutar"
            amount={item.amount}
            onAmountChange={(value) => onUpdate(index, "amount", value)}
            currency={item.currency}
            onCurrencyChange={(value) => onUpdate(index, "currency", value)}
            exchangeRate={getRate(item.currency)}
            onExchangeRateChange={setRate(item.currency)}
          />

          <PremiumFileUpload
            label="Fatura / Belge"
            file={item.invoice}
            onChange={(file) => onUpdate(index, "invoice", file)}
          />
        </div>
      ))}
    </div>
  );
}