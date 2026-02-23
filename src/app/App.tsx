import { useState, useMemo, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Switch } from "./components/ui/switch";
import { Separator } from "./components/ui/separator";
import { ScrollArea } from "./components/ui/scroll-area";
import { Badge } from "./components/ui/badge";
import { Alert, AlertDescription } from "./components/ui/alert";
import { Checkbox } from "./components/ui/checkbox";
import { Tooltip, TooltipTrigger, TooltipContent } from "./components/ui/tooltip";
import { Calendar as CalendarComponent } from "./components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { 
  FolderOpen, 
  FileText, 
  CheckCircle, 
  Settings, 
  Users, 
  Building2, 
  BookOpen, 
  XCircle,
  Plus,
  Upload,
  AlertTriangle,
  ArrowLeft,
  Eye,
  Settings2,
  Calendar,
  Hash,
  Send,
  Info,
  Plane,
  Hotel,
  Car,
  Truck,
  Ship,
  Shield,
  Package,
  CheckCircle2,
  Bell,
  X,
  Edit,
  Trash2,
  Mail,
  ChevronRight,
  ChevronLeft,
  CalendarIcon,
  Search,
  Filter,
  Cog,
  Sparkles,
  Copy,
  ChevronDown,
  ChevronUp,
  AtSign,
  MailOpen
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { AvitechLogo } from "./components/AvitechLogo";
import { 
  CostDetailFormHeader, 
  SectionHeader, 
  PremiumCard,
  PremiumInput,
  PremiumSelect,
  PremiumFileUpload,
  CurrencyInput,
  AdditionalCostItems,
  type AdditionalCostItem
} from "./components/CostDetailForm";

// Customer type
type Customer = {
  id: string;
  name: string;
  email: string;
  company: string;
};

// Mock customers data
const mockCustomers: Customer[] = [
  { id: "MUS-001", name: "Ahmet Yılmaz", email: "ahmet.yilmaz@abc.com.tr", company: "ABC Makina" },
  { id: "MUS-002", name: "Mehmet Demir", email: "mehmet.demir@xyz.com", company: "XYZ Sanayi" },
  { id: "MUS-003", name: "Ayşe Kaya", email: "ayse.kaya@def.com.tr", company: "DEF Ltd." },
  { id: "MUS-004", name: "Fatma Şahin", email: "fatma.sahin@ghi.com", company: "GHI A.Ş." },
  { id: "MUS-005", name: "Ali Çelik", email: "ali.celik@jkl.com.tr", company: "JKL Endüstri" },
  { id: "MUS-006", name: "Zeynep Arslan", email: "zeynep.arslan@mno.com", company: "MNO Ltd." },
  { id: "MUS-007", name: "Mustafa Koç", email: "mustafa.koc@pqr.com.tr", company: "PQR Makina" },
  { id: "MUS-008", name: "Elif Özkan", email: "elif.ozkan@stu.com", company: "STU Sanayi" },
];

// Campaign type
type Campaign = {
  id: string;
  name: string;
  customerSelection: "all" | "selected";
  description: string;
  createdDate: string;
  isSent?: boolean;
  selectedMachines?: string[];
  selectedCustomers?: string[];
};

// Mock campaigns data
const mockCampaigns: Campaign[] = [
  {
    id: "TNTM-001",
    name: "Yaz Stok Tanıtımı 2025",
    customerSelection: "all",
    description: "Yaz sezonunda stoktaki makinelerin müşterilere e-posta ile tanıtılması",
    createdDate: "15.05.2025",
    isSent: true,
    selectedMachines: ["AVMAK-001", "AVMAK-002", "AVMAK-003"],
    selectedCustomers: ["MUS-001", "MUS-002", "MUS-003"]
  },
  {
    id: "TNTM-002",
    name: "VIP Müşteri Stok Bildirimi",
    customerSelection: "selected",
    description: "Seçili VIP müşterilere stoktaki makinelerin tanıtılması",
    createdDate: "20.12.2024",
    isSent: true,
    selectedMachines: ["AVMAK-001", "AVMAK-004"],
    selectedCustomers: ["MUS-001", "MUS-005"]
  },
  {
    id: "TNTM-003",
    name: "Bahar Dönemi Stok Bildirimi",
    customerSelection: "selected",
    description: "Bahar döneminde stoktaki makinelerin seçili müşterilere bildirilmesi",
    createdDate: "10.02.2025",
    isSent: true,
    selectedMachines: ["AVMAK-002", "AVMAK-005"],
    selectedCustomers: ["MUS-003", "MUS-007"]
  },
  {
    id: "TNTM-004",
    name: "Kurumsal Stok Bildirimi",
    customerSelection: "selected",
    description: "Kurumsal müşterilere stoktaki makinelerin e-posta ile bildirilmesi",
    createdDate: "01.01.2025",
    isSent: true,
    selectedMachines: ["AVMAK-001", "AVMAK-003", "AVMAK-004"],
    selectedCustomers: ["MUS-002", "MUS-006"]
  }
];

// Mock project data
const mockProjects = [
  { 
    id: "AVMAK-001", 
    name: "CNC Torna Makinesi", 
    status: "active", 
    customer: "ABC Makine",
    machineType: "DMU 85 MONOBLOCK",
    brand: "DMG MORI",
    serialNo: "12180005733",
    createdDate: "23.12.2025",
    year: 2013
  },
  { 
    id: "AVMAK-002", 
    name: "Freze Makinesi", 
    status: "active", 
    customer: "XYZ Ltd.",
    machineType: "DMU 75 MONOBLOCK",
    brand: "DMG MORI",
    serialNo: "12430001473",
    createdDate: "23.12.2025",
    year: 2014
  },
  { 
    id: "AVMAK-003", 
    name: "Lazer Kesim", 
    status: "completed", 
    customer: "DEF San.",
    machineType: "DMU 60 MONOBLOCK",
    brand: "DMG MORI",
    serialNo: "11580006426",
    createdDate: "23.12.2025",
    year: 2007
  },
  { 
    id: "AVMAK-004", 
    name: "Enjeksiyon Makinesi", 
    status: "active", 
    customer: "GHI A.Ş.",
    machineType: "DMC 635 V ecoline",
    brand: "DMG MORI",
    serialNo: "15370007834",
    createdDate: "23.12.2025",
    year: 2013
  },
  { 
    id: "AVMAK-005", 
    name: "CNC Freze", 
    status: "active", 
    customer: "JKL Makine",
    machineType: "DMU 60 MONOBLOCK",
    brand: "DMG MORI",
    serialNo: "11580008073",
    createdDate: "23.12.2025",
    year: 2008
  },
  { 
    id: "AVMAK-006", 
    name: "Dikey İşleme", 
    status: "completed", 
    customer: "MNO Ltd.",
    machineType: "DMU 75 MONOBLOCK",
    brand: "DMG MORI",
    serialNo: "12430000713",
    createdDate: "23.12.2025",
    year: 2016
  },
  { 
    id: "AVMAK-007", 
    name: "Yatay İşleme Merkezi", 
    status: "active", 
    customer: "PQR Makina",
    machineType: "NHX 4000",
    brand: "DMG MORI",
    serialNo: "18290004512",
    createdDate: "10.01.2026",
    year: 2019
  },
  { 
    id: "AVMAK-008", 
    name: "5 Eksen CNC", 
    status: "active", 
    customer: "STU Sanayi",
    machineType: "DMU 50 3rd Gen",
    brand: "DMG MORI",
    serialNo: "16740009281",
    createdDate: "15.01.2026",
    year: 2021
  },
  { 
    id: "AVMAK-009", 
    name: "Torna Merkezi", 
    status: "completed", 
    customer: "VWX Endüstri",
    machineType: "CTX beta 1250 TC",
    brand: "DMG MORI",
    serialNo: "14520003647",
    createdDate: "20.01.2026",
    year: 2017
  },
  { 
    id: "AVMAK-010", 
    name: "Otomat Torna", 
    status: "active", 
    customer: "YZA Mühendislik",
    machineType: "SPRINT 20|8",
    brand: "DMG MORI",
    serialNo: "19810006753",
    createdDate: "01.02.2026",
    year: 2020
  },
];

type PageType = "dashboard" | "aktif-projeler" | "proje-muhasebesi" | "teklifler" | "tamamlanan" | "yonetici" | "kampanya-yonetimi" | "kullanici" | "firmalar" | "kilavuz" | "iptal";

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
  logistics: {
    agreedCompany: string;
    vehiclePlate: string;
    freightCost: string;
    freightCurrency: string;
    freightInvoice: File | null;
    additionalLogisticsCost: string;
    additionalLogisticsCurrency: string;
    additionalLogisticsInvoice: File | null;
    brandingCost: string;
    brandingCurrency: string;
    brandingInvoice: File | null;
    ex1Document: File | null;
    t1t2Document: File | null;
    smrDocument: File | null;
    atrDocument: File | null;
    packingListDocument: File | null;
    insuranceDone: boolean;
    insuranceCost: string;
    insuranceCurrency: string;
    insuranceDocument: File | null;
  };
  customs: {
    entryCustomsCost: string;
    entryCustomsCurrency: string;
    entryCustomsInvoice: File | null;
    declarationDocument: File | null;
    countReportDocument: File | null;
    warehouseUnloadingCost: string;
    warehouseUnloadingCurrency: string;
    warehouseUnloadingInvoice: File | null;
    storageCost: string;
    storageCurrency: string;
    storageInvoice: File | null;
    warehousePaidByBuyer: boolean;
  };
  transfer: {
    transferCost: string;
    transferCurrency: string;
    transferInvoice: File | null;
    transferDeclaration: File | null;
    transferCountReport: File | null;
  };
  generalCosts: {
    salesPrice: string;
    salesCurrency: string;
    financingMonths: string;
    salesInvoice: File | null;
    contract: File | null;
    allDocumentsConfirmed: boolean;
  };
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("proje-muhasebesi");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [costDetails, setCostDetails] = useState<CostDetailType>({
    machinePurchase: {
      purchasePrice: "",
      purchaseCurrency: "EUR",
      purchaseInvoice: null,
      externalCommission: "",
      externalCommissionCurrency: "EUR",
      externalCommissionInvoice: null,
      machineCondition: "",
      paymentMethod: "",
      paymentAmount: "",
      interestRate: "",
    },
    machineVisit: {
      visited: false,
      flight: "",
      flightCurrency: "EUR",
      flightInvoice: null,
      hotel: "",
      hotelCurrency: "EUR",
      hotelInvoice: null,
      carRental: "",
      carRentalCurrency: "EUR",
      carRentalInvoice: null,
      additionalExpense: "",
      additionalExpenseCurrency: "EUR",
      additionalExpenseInvoice: null,
    },
    logistics: {
      agreedCompany: "",
      vehiclePlate: "",
      freightCost: "",
      freightCurrency: "EUR",
      freightInvoice: null,
      additionalLogisticsCost: "",
      additionalLogisticsCurrency: "EUR",
      additionalLogisticsInvoice: null,
      brandingCost: "",
      brandingCurrency: "EUR",
      brandingInvoice: null,
      ex1Document: null,
      t1t2Document: null,
      smrDocument: null,
      atrDocument: null,
      packingListDocument: null,
      insuranceDone: false,
      insuranceCost: "",
      insuranceCurrency: "EUR",
      insuranceDocument: null,
    },
    customs: {
      entryCustomsCost: "",
      entryCustomsCurrency: "EUR",
      entryCustomsInvoice: null,
      declarationDocument: null,
      countReportDocument: null,
      warehouseUnloadingCost: "",
      warehouseUnloadingCurrency: "EUR",
      warehouseUnloadingInvoice: null,
      storageCost: "",
      storageCurrency: "EUR",
      storageInvoice: null,
      warehousePaidByBuyer: false,
    },
    transfer: {
      transferCost: "",
      transferCurrency: "EUR",
      transferInvoice: null,
      transferDeclaration: null,
      transferCountReport: null,
    },
    generalCosts: {
      salesPrice: "",
      salesCurrency: "EUR",
      financingMonths: "",
      salesInvoice: null,
      contract: null,
      allDocumentsConfirmed: false,
    },
  });
  const [showCostSummary, setShowCostSummary] = useState(false);
  const [showProfitAnalysis, setShowProfitAnalysis] = useState(false);
  
  // Döviz kurları — anlık varsayılan değerler, kullanıcı düzenleyebilir
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({
    EUR: 38.50,
    USD: 36.20,
    GBP: 45.80
  });
  const getRate = (currency: string) => exchangeRates[currency] || 1;
  const setRate = (currency: string) => (rate: number) => {
    setExchangeRates(prev => ({ ...prev, [currency]: rate }));
  };

  // Jenerik ek maliyet kalemleri — her PremiumCard alt başlığı için
  const [additionalCosts, setAdditionalCosts] = useState<Record<string, AdditionalCostItem[]>>({});

  const addAdditionalCost = (sectionKey: string) => {
    setAdditionalCosts(prev => ({
      ...prev,
      [sectionKey]: [
        ...(prev[sectionKey] || []),
        { id: crypto.randomUUID(), name: "", amount: "", currency: "EUR", invoice: null }
      ]
    }));
  };

  const updateAdditionalCost = (sectionKey: string, index: number, field: keyof AdditionalCostItem, value: any) => {
    setAdditionalCosts(prev => {
      const items = [...(prev[sectionKey] || [])];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, [sectionKey]: items };
    });
  };

  const removeAdditionalCost = (sectionKey: string, index: number) => {
    setAdditionalCosts(prev => {
      const items = [...(prev[sectionKey] || [])];
      items.splice(index, 1);
      return { ...prev, [sectionKey]: items };
    });
    toast.success("Maliyet kalemi silindi");
  };

  // Proje Muhasebesi arama & sayfalandırma
  const [projectSearchQuery, setProjectSearchQuery] = useState("");
  const [projectCurrentPage, setProjectCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const filteredProjects = useMemo(() => {
    if (!projectSearchQuery.trim()) return mockProjects;
    const q = projectSearchQuery.toLowerCase();
    return mockProjects.filter(p =>
      p.id.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.machineType.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.serialNo.toLowerCase().includes(q) ||
      p.customer.toLowerCase().includes(q)
    );
  }, [projectSearchQuery]);

  const totalProjectPages = Math.max(1, Math.ceil(filteredProjects.length / projectsPerPage));
  const paginatedProjects = useMemo(() => {
    const start = (projectCurrentPage - 1) * projectsPerPage;
    return filteredProjects.slice(start, start + projectsPerPage);
  }, [filteredProjects, projectCurrentPage]);

  // Arama değiştiğinde 1. sayfaya dön
  useEffect(() => {
    setProjectCurrentPage(1);
  }, [projectSearchQuery]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showCampaignDetailsModal, setShowCampaignDetailsModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  
  // Notifications state - her proje için eksik alanları takip eder
  type Notification = {
    projectId: string;
    missingFields: string[];
    resolved: boolean;
    timestamp: Date;
  };
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      projectId: "AVMAK-002",
      missingFields: ["Makine Alım Bedeli", "Ex-1 Belgesi", "Gümrük Bedeli"],
      resolved: false,
      timestamp: new Date()
    }
  ]);

  // Eksik alanları hesaplayan yardımcı fonksiyon
  const getMissingFields = useCallback((): string[] => {
    const emptyFields: string[] = [];
    
    // Check machine purchase
    if (!costDetails.machinePurchase.purchasePrice) emptyFields.push("Makine Alım Bedeli");
    if (!costDetails.machinePurchase.machineCondition) emptyFields.push("Makine Durumu (2.el/Sıfır)");
    if (!costDetails.machinePurchase.paymentMethod) emptyFields.push("Ödeme Yöntemi");
    
    // Check logistics documents
    if (!costDetails.logistics.ex1Document) emptyFields.push("Ex-1 Belgesi");
    if (!costDetails.logistics.t1t2Document) emptyFields.push("T1-T2 Belgesi");
    if (!costDetails.logistics.smrDocument) emptyFields.push("SMR Belgesi");
    if (!costDetails.logistics.atrDocument) emptyFields.push("ATR Belgesi");
    if (!costDetails.logistics.packingListDocument) emptyFields.push("Packing List");
    
    // Check customs
    if (!costDetails.customs.entryCustomsCost) emptyFields.push("Gümrük Bedeli");
    if (!costDetails.customs.declarationDocument) emptyFields.push("Beyanname");
    if (!costDetails.customs.countReportDocument) emptyFields.push("Sayım Tutanağı");
    
    // Check sales price
    if (!costDetails.generalCosts.salesPrice) emptyFields.push("Satış Fiyatı");
    
    return emptyFields;
  }, [costDetails]);

  const validateForm = () => {
    const emptyFields = getMissingFields();
    
    if (emptyFields.length > 0) {
      toast.error(`${selectedProject} - Eksik alanlar: ${emptyFields.join(", ")}`);
      return false;
    }
    
    return true;
  };

  // Seçili projede costDetails değiştikçe bildirimi otomatik güncelle
  useEffect(() => {
    if (!selectedProject) return;
    const notif = notifications.find(n => n.projectId === selectedProject);
    if (!notif) return;
    
    const currentMissing = getMissingFields();
    const isNowResolved = currentMissing.length === 0;
    
    // Sadece değişim varsa state güncelle (sonsuz döngü önleme)
    const fieldsChanged = JSON.stringify(currentMissing) !== JSON.stringify(notif.missingFields);
    const resolvedChanged = isNowResolved !== notif.resolved;
    
    if (fieldsChanged || resolvedChanged) {
      setNotifications(prev => prev.map(n => 
        n.projectId === selectedProject
          ? { ...n, missingFields: currentMissing, resolved: isNowResolved }
          : n
      ));
    }
  }, [selectedProject, getMissingFields]);

  const removeNotification = (projectId: string) => {
    const notif = notifications.find(n => n.projectId === projectId);
    if (notif && !notif.resolved) {
      toast.error("Eksik alanlar tamamlanmadan bildirim silinemez!");
      return;
    }
    setNotifications(prev => prev.filter(n => n.projectId !== projectId));
    toast.success("Bildirim silindi");
  };
  
  const hasNotification = (projectId: string) => {
    return notifications.some(n => n.projectId === projectId && !n.resolved);
  };
  
  const getNotification = (projectId: string) => {
    return notifications.find(n => n.projectId === projectId);
  };
  
  const unresolvedCount = useMemo(() => notifications.filter(n => !n.resolved).length, [notifications]);
  const resolvedCount = useMemo(() => notifications.filter(n => n.resolved).length, [notifications]);

  const handleComplete = () => {
    if (!costDetails.generalCosts.allDocumentsConfirmed) {
      toast.error("Lütfen tüm evrakların eklendiğini onaylayın");
      return;
    }
    
    if (validateForm()) {
      // Bildirim varsa (resolved olmuştur) — temizle
      if (selectedProject) {
        const notif = getNotification(selectedProject);
        if (notif) {
          setNotifications(prev => prev.filter(n => n.projectId !== selectedProject));
        }
      }
      setShowCostSummary(true);
      toast.success("Maliyet detayları tamamlandı!");
    }
  };

  const handleFileUpload = (section: string, field: string, file: File | null) => {
    setCostDetails(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof CostDetailType],
        [field]: file
      }
    }));
    if (file) {
      toast.success(`${file.name} yüklendi`);
    }
  };



  const renderNotificationPanel = () => {
    const hasResolved = resolvedCount > 0;
    const headerBg = unresolvedCount > 0
      ? "bg-gradient-to-r from-red-50 to-orange-50"
      : "bg-gradient-to-r from-green-50 to-emerald-50";

    return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={() => setShowNotifications(false)}
      />
      
      {/* Panel */}
      <div className="absolute top-16 right-8 w-[420px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[560px] overflow-hidden flex flex-col animate-in fade-in-50 slide-in-from-top-5 duration-300">
      <div className={`p-4 border-b border-gray-200 ${headerBg}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Bell className={`h-5 w-5 ${unresolvedCount > 0 ? "text-red-600" : "text-green-600"}`} />
            Bildirimler
            {notifications.length > 0 && (
              <span className="flex items-center gap-1.5 ml-1">
                {unresolvedCount > 0 && (
                  <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-red-600 text-white text-[10px] font-bold">
                    {unresolvedCount}
                  </span>
                )}
                {resolvedCount > 0 && (
                  <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-green-600 text-white text-[10px] font-bold">
                    {resolvedCount}
                  </span>
                )}
              </span>
            )}
          </h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowNotifications(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        {hasResolved && (
          <Button 
            variant="outline" 
            size="sm"
            className="w-full text-xs border-green-300 hover:bg-green-100 text-green-700"
            onClick={() => {
              setNotifications(prev => prev.filter(n => !n.resolved));
              toast.success("Tamamlanan bildirimler temizlendi");
            }}
          >
            <CheckCircle2 className="h-3 w-3 mr-1.5" />
            Tamamlananları Temizle ({resolvedCount})
          </Button>
        )}
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <p className="text-gray-500">Tüm projeler tamamlandı!</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const project = mockProjects.find(p => p.id === notification.projectId);
              const isResolved = notification.resolved;
              
              return (
                <div 
                  key={notification.projectId}
                  className={`rounded-lg p-4 space-y-3 transition-all duration-300 ${
                    isResolved
                      ? "bg-green-50 border border-green-200 hover:bg-green-100"
                      : "bg-red-50 border border-red-200 hover:bg-red-100"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {isResolved ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        )}
                        <span className={`font-semibold ${isResolved ? "text-green-900" : "text-red-900"}`}>
                          {notification.projectId}
                        </span>
                        {isResolved && (
                          <Badge className="bg-green-100 text-green-700 border border-green-300 text-[10px] px-2 py-0">
                            TAMAMLANDI
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{project?.machineType}</p>
                      
                      {isResolved ? (
                        <div className="flex items-center gap-2 p-2 bg-green-100 rounded-md">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                          <p className="text-xs text-green-800 font-medium">Tüm zorunlu alanlar tamamlandı</p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-red-800">
                            Eksik Alanlar ({notification.missingFields.length}):
                          </p>
                          {notification.missingFields.map((field, idx) => (
                            <p key={idx} className="text-xs text-red-700 pl-2">• {field}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className={`flex gap-2 pt-2 border-t ${isResolved ? "border-green-200" : "border-red-200"}`}>
                    {isResolved ? (
                      <>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => {
                            setSelectedProject(notification.projectId);
                            setShowNotifications(false);
                            setCurrentPage("proje-muhasebesi");
                          }}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Görüntüle
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="px-3 border-green-300 hover:bg-green-100 text-green-700"
                          onClick={() => removeNotification(notification.projectId)}
                          title="Bildirimi kaldır"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => {
                            setSelectedProject(notification.projectId);
                            setShowNotifications(false);
                            setCurrentPage("proje-muhasebesi");
                          }}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Tamamla
                        </Button>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="px-3 border-gray-200 text-gray-300 cursor-not-allowed"
                                disabled
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="left" className="max-w-[200px]">
                            <p className="text-xs">Eksik alanlar tamamlanmadan bildirim silinemez</p>
                          </TooltipContent>
                        </Tooltip>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
    </>
    );
  };

  const renderSidebar = () => (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6">
        <AvitechLogo className="h-12 w-auto" />
        <p className="text-xs text-gray-500 mt-2">PROJE İŞLEMLERİ</p>
      </div>
      
      <nav className="flex-1 px-4">
        <Button
          variant="ghost"
          className="w-full justify-start mb-2"
          onClick={() => setCurrentPage("dashboard")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Yeni Proje Oluştur
        </Button>
        
        <Button
          variant={currentPage === "aktif-projeler" ? "secondary" : "ghost"}
          className="w-full justify-start mb-2"
          onClick={() => setCurrentPage("aktif-projeler")}
        >
          <FolderOpen className="mr-2 h-4 w-4" />
          Aktif Projeler
        </Button>
        
        <Button
          variant={currentPage === "proje-muhasebesi" ? "secondary" : "ghost"}
          className="w-full justify-start mb-2"
          onClick={() => {
            setCurrentPage("proje-muhasebesi");
            setSelectedProject(null);
            setShowCostSummary(false);
            setShowNotifications(false);
          }}
        >
          <FileText className="mr-2 h-4 w-4" />
          Proje Muhasebesi
        </Button>
        
        <Button
          variant={currentPage === "teklifler" ? "secondary" : "ghost"}
          className="w-full justify-start mb-2"
          onClick={() => setCurrentPage("teklifler")}
        >
          <FileText className="mr-2 h-4 w-4" />
          Teklifler
        </Button>
        
        <Button
          variant={currentPage === "tamamlanan" ? "secondary" : "ghost"}
          className="w-full justify-start mb-2"
          onClick={() => setCurrentPage("tamamlanan")}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Tamamlanan Projeler
        </Button>
        
        <Button
          variant={currentPage === "kampanya-yonetimi" ? "secondary" : "ghost"}
          className="w-full justify-start mb-2"
          onClick={() => setCurrentPage("kampanya-yonetimi")}
        >
          <Send className="mr-2 h-4 w-4" />
          Stok Tanıtım Gönderimi
        </Button>
        
        <Separator className="my-4" />
        <p className="text-xs text-gray-500 mb-2 px-2">KULLANICI İŞLEMLERİ</p>
        
        <Button
          variant={currentPage === "yonetici" ? "secondary" : "ghost"}
          className="w-full justify-start mb-2"
          onClick={() => setCurrentPage("yonetici")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Yönetici Paneli
        </Button>
        
        <Button
          variant={currentPage === "kullanici" ? "secondary" : "ghost"}
          className="w-full justify-start mb-2"
          onClick={() => setCurrentPage("kullanici")}
        >
          <Users className="mr-2 h-4 w-4" />
          Kullanıcı İşlemleri
        </Button>
        
        <Separator className="my-4" />
        <p className="text-xs text-gray-500 mb-2 px-2">DİĞER İÇERİKLER</p>
        
        <Button
          variant={currentPage === "firmalar" ? "secondary" : "ghost"}
          className="w-full justify-start mb-2"
          onClick={() => setCurrentPage("firmalar")}
        >
          <Building2 className="mr-2 h-4 w-4" />
          Kayıtlı Firmalar
        </Button>
        
        <Button
          variant={currentPage === "kilavuz" ? "secondary" : "ghost"}
          className="w-full justify-start mb-2"
          onClick={() => setCurrentPage("kilavuz")}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Kullanım Kılavuzu
        </Button>
        
        <Button
          variant={currentPage === "iptal" ? "secondary" : "ghost"}
          className="w-full justify-start mb-2"
          onClick={() => setCurrentPage("iptal")}
        >
          <XCircle className="mr-2 h-4 w-4" />
          İptal Edilen Projeler
        </Button>
      </nav>
      
      <div className="p-4">
        <Button variant="destructive" className="w-full">
          Çıkış Yap
        </Button>
      </div>
    </div>
  );

  const renderProjectCards = () => (
    <ScrollArea className="h-screen">
    <div className="p-8 bg-gray-50 relative">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Proje Muhasebesi</h1>
          <p className="text-gray-500 mt-2">Projelere tıklayarak maliyet detaylarını girebilirsiniz</p>
        </div>
        
        {/* Notification Button */}
        <div className="relative">
          <Button
            variant="outline"
            size="lg"
            className="relative border-2 hover:bg-gray-50"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5 mr-2" />
            Bildirimler
            {unresolvedCount > 0 && (
              <div className="absolute -top-2 -right-2 h-6 w-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-lg animate-pulse">
                {unresolvedCount}
              </div>
            )}
            {unresolvedCount === 0 && resolvedCount > 0 && (
              <div className="absolute -top-2 -right-2 h-6 w-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-lg">
                {resolvedCount}
              </div>
            )}
          </Button>
          
          {/* Notification Panel */}
          {showNotifications && renderNotificationPanel()}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Proje ID, makine adı, marka, seri no, müşteri ara..."
            value={projectSearchQuery}
            onChange={(e) => setProjectSearchQuery(e.target.value)}
            className="pl-10 bg-white border-gray-200 focus:border-gray-400 h-11"
          />
          {projectSearchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => setProjectSearchQuery("")}
            >
              <X className="h-4 w-4 text-gray-400" />
            </Button>
          )}
        </div>
        {projectSearchQuery && (
          <p className="text-xs text-gray-500 mt-2">
            {filteredProjects.length} sonuç bulundu
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProjects.map(project => {
          const hasAlert = hasNotification(project.id);
          const projectNotif = getNotification(project.id);
          const isResolved = projectNotif?.resolved === true;
          return (
            <div 
              key={project.id} 
              className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden group relative"
              onClick={() => {
                setSelectedProject(project.id);
                setShowCostSummary(false);
              }}
            >
              {/* Notification Indicator - Kırmızı (eksik) veya Yeşil (tamamlandı) */}
              {hasAlert && (
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="relative">
                    <div className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                      <Bell className="h-4 w-4 text-white" />
                    </div>
                    <div className="absolute inset-0 h-8 w-8 bg-red-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>
              )}
              {!hasAlert && isResolved && (
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
              
              {/* Header */}
              <div className="p-5 pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{project.id}</h3>
                  <Badge 
                    variant={project.status === "active" ? "default" : "secondary"}
                    className={`${project.status === "active" ? "bg-gray-100 text-gray-700" : "bg-gray-50 text-gray-600"} text-xs px-3 py-1`}
                  >
                    {project.status === "active" ? "AKTİF" : "TAMAMLANDI"}
                  </Badge>
                </div>
                
                {hasAlert && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-md border border-red-200">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-xs text-red-700 font-medium">Eksik Maliyet Detayı</span>
                  </div>
                )}
                {!hasAlert && isResolved && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-md border border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-green-700 font-medium">Maliyet Detayları Tamamlandı</span>
                  </div>
                )}
              </div>
            
            {/* Machine Details */}
            <div className="p-5 space-y-3">
              <div className="flex items-start gap-2">
                <Settings2 className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500">Makine Tipi</p>
                  <p className="font-medium text-gray-900 truncate">{project.machineType}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Building2 className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500">Marka</p>
                  <p className="font-medium text-gray-900">{project.brand}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Hash className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500">Seri No</p>
                  <p className="font-mono text-sm text-gray-900">{project.serialNo}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{project.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{project.createdDate}</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="p-5 pt-0 flex gap-3">
              <Button 
                className="flex-1 bg-black hover:bg-gray-800 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(project.id);
                  setShowCostSummary(false);
                }}
              >
                <FileText className="h-4 w-4 mr-2" />
                Maliyet Gir
              </Button>
              <Button 
                variant="outline"
                className="px-4 border-gray-200 hover:bg-gray-50"
                onClick={(e) => {
                  e.stopPropagation();
                  toast.info(`${project.id} detayları görüntüleniyor...`);
                }}
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        })}
      </div>

      {/* Empty search state */}
      {filteredProjects.length === 0 && projectSearchQuery && (
        <div className="text-center py-16">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">"{projectSearchQuery}" için sonuç bulunamadı</p>
          <p className="text-gray-400 text-sm mt-1">Farklı anahtar kelimeler deneyebilirsiniz</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setProjectSearchQuery("")}
          >
            Aramayı Temizle
          </Button>
        </div>
      )}

      {/* Pagination Controls */}
      {filteredProjects.length > projectsPerPage && (
        <div className="flex items-center justify-between mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">
            {filteredProjects.length} projeden {(projectCurrentPage - 1) * projectsPerPage + 1}–{Math.min(projectCurrentPage * projectsPerPage, filteredProjects.length)} arası gösteriliyor
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={projectCurrentPage === 1}
              onClick={() => setProjectCurrentPage(prev => Math.max(1, prev - 1))}
              className="h-9 px-3"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Önceki
            </Button>
            {Array.from({ length: totalProjectPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={page === projectCurrentPage ? "default" : "outline"}
                size="sm"
                className={`h-9 w-9 p-0 ${page === projectCurrentPage ? "bg-gray-900 text-white" : ""}`}
                onClick={() => setProjectCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={projectCurrentPage === totalProjectPages}
              onClick={() => setProjectCurrentPage(prev => Math.min(totalProjectPages, prev + 1))}
              className="h-9 px-3"
            >
              Sonraki
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
      
      {unresolvedCount > 0 && (
        <Alert variant="destructive" className="mt-8 bg-red-50 border-red-200">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-base font-semibold text-red-900">
            {unresolvedCount} PROJE İÇİN MALİYET DETAYI EKSİKTİR - LÜTFEN TAMAMLAYINIZ
          </AlertDescription>
        </Alert>
      )}
      {unresolvedCount === 0 && resolvedCount > 0 && (
        <Alert className="mt-8 bg-green-50 border-green-200">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-base font-semibold text-green-900">
            {resolvedCount} PROJENİN MALİYET DETAYLARI TAMAMLANDI
          </AlertDescription>
        </Alert>
      )}
    </div>
    </ScrollArea>
  );

  const renderCostDetailForm = () => {
    const project = mockProjects.find(p => p.id === selectedProject);
    
    if (showProfitAnalysis) {
      return renderProfitAnalysis();
    }
    
    if (showCostSummary) {
      return renderCostSummary();
    }
    
    return (
      <ScrollArea className="h-screen">
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <CostDetailFormHeader 
            project={project!} 
            onBack={() => setSelectedProject(null)} 
          />
          
          <div className="p-8 max-w-7xl mx-auto space-y-8">
            {/* Section 1: Machine Purchase */}
            <div>
              <SectionHeader
                number={1}
                title="Makine Satın Alım Bilgileri"
                subtitle="Makine alımı ve ziyaret masrafları"
                icon={Settings2}
              />
              
              <div className="bg-white rounded-b-xl shadow-lg border border-gray-100 p-8 space-y-8">
                {/* Box 1: Purchase Details */}
                <PremiumCard title="Satın Alım Detayları" icon={FileText}>
                  <CurrencyInput
                    amountLabel="Makine Alım Bedeli"
                    required
                    amount={costDetails.machinePurchase.purchasePrice}
                    onAmountChange={(value) => setCostDetails(prev => ({
                      ...prev,
                      machinePurchase: { ...prev.machinePurchase, purchasePrice: value }
                    }))}
                    currency={costDetails.machinePurchase.purchaseCurrency}
                    onCurrencyChange={(value) => setCostDetails(prev => ({
                      ...prev,
                      machinePurchase: { ...prev.machinePurchase, purchaseCurrency: value }
                    }))}
                    exchangeRate={getRate(costDetails.machinePurchase.purchaseCurrency)}
                    onExchangeRateChange={setRate(costDetails.machinePurchase.purchaseCurrency)}
                  />
                  
                  <PremiumFileUpload
                    label="Fatura Yükle"
                    file={costDetails.machinePurchase.purchaseInvoice}
                    onChange={(file) => handleFileUpload('machinePurchase', 'purchaseInvoice', file)}
                  />
                  
                  <Separator className="my-6" />
                  
                  <CurrencyInput
                    amountLabel="Dış Firma Komisyonu"
                    amount={costDetails.machinePurchase.externalCommission}
                    onAmountChange={(value) => setCostDetails(prev => ({
                      ...prev,
                      machinePurchase: { ...prev.machinePurchase, externalCommission: value }
                    }))}
                    currency={costDetails.machinePurchase.externalCommissionCurrency}
                    onCurrencyChange={(value) => setCostDetails(prev => ({
                      ...prev,
                      machinePurchase: { ...prev.machinePurchase, externalCommissionCurrency: value }
                    }))}
                    exchangeRate={getRate(costDetails.machinePurchase.externalCommissionCurrency)}
                    onExchangeRateChange={setRate(costDetails.machinePurchase.externalCommissionCurrency)}
                  />
                  
                  <PremiumFileUpload
                    label="Komisyon Faturası Yükle"
                    file={costDetails.machinePurchase.externalCommissionInvoice}
                    onChange={(file) => handleFileUpload('machinePurchase', 'externalCommissionInvoice', file)}
                  />
                  
                  <Separator className="my-6" />
                  
                  <div className="grid grid-cols-2 gap-6">
                    <PremiumSelect
                      label="Makine Durumu"
                      required
                      value={costDetails.machinePurchase.machineCondition}
                      onValueChange={(value: "new" | "used") => setCostDetails(prev => ({
                        ...prev,
                        machinePurchase: { ...prev.machinePurchase, machineCondition: value }
                      }))}
                      options={[
                        { value: "new", label: "Sıfır" },
                        { value: "used", label: "2. El" }
                      ]}
                    />
                    
                    <PremiumSelect
                      label="Ödeme Yöntemi"
                      required
                      value={costDetails.machinePurchase.paymentMethod}
                      onValueChange={(value: "capital" | "credit" | "leasing") => setCostDetails(prev => ({
                        ...prev,
                        machinePurchase: { ...prev.machinePurchase, paymentMethod: value }
                      }))}
                      options={[
                        { value: "capital", label: "Sermaye" },
                        { value: "credit", label: "Kredi" },
                        { value: "leasing", label: "Leasing" }
                      ]}
                    />
                  </div>
                  
                  {(costDetails.machinePurchase.paymentMethod === "credit" || costDetails.machinePurchase.paymentMethod === "leasing") && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 space-y-4">
                      <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Finansman Detayları
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <PremiumInput
                          label="Alınan Miktar"
                          type="number"
                          placeholder="0.00"
                          value={costDetails.machinePurchase.paymentAmount}
                          onChange={(e: any) => setCostDetails(prev => ({
                            ...prev,
                            machinePurchase: { ...prev.machinePurchase, paymentAmount: e.target.value }
                          }))}
                        />
                        <PremiumInput
                          label="Faiz Oranı (%)"
                          type="number"
                          placeholder="0.00"
                          value={costDetails.machinePurchase.interestRate}
                          onChange={(e: any) => setCostDetails(prev => ({
                            ...prev,
                            machinePurchase: { ...prev.machinePurchase, interestRate: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                  )}

                  <AdditionalCostItems
                    items={additionalCosts["purchase"] || []}
                    onAdd={() => addAdditionalCost("purchase")}
                    onUpdate={(idx, field, val) => updateAdditionalCost("purchase", idx, field, val)}
                    onRemove={(idx) => removeAdditionalCost("purchase", idx)}
                    getRate={getRate}
                    setRate={setRate}
                  />
                </PremiumCard>
                
                {/* Box 2: Machine Visit */}
                <PremiumCard title="Makineye Ziyaret Masrafları" icon={Plane}>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
                    <span className="font-medium text-gray-700">Ziyaret Edildi mi?</span>
                    <Switch
                      checked={costDetails.machineVisit.visited}
                      onCheckedChange={(checked) => setCostDetails(prev => ({
                        ...prev,
                        machineVisit: { ...prev.machineVisit, visited: checked }
                      }))}
                    />
                  </div>
                  
                  {costDetails.machineVisit.visited && (
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg space-y-4 border border-blue-100">
                        <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                          <Plane className="h-4 w-4" />
                          Uçak Bileti
                        </h4>
                        <CurrencyInput
                          amountLabel="Uçak Ücreti"
                          amount={costDetails.machineVisit.flight}
                          onAmountChange={(value) => setCostDetails(prev => ({
                            ...prev,
                            machineVisit: { ...prev.machineVisit, flight: value }
                          }))}
                          currency={costDetails.machineVisit.flightCurrency}
                          onCurrencyChange={(value) => setCostDetails(prev => ({
                            ...prev,
                            machineVisit: { ...prev.machineVisit, flightCurrency: value }
                          }))}
                          exchangeRate={getRate(costDetails.machineVisit.flightCurrency)}
                          onExchangeRateChange={setRate(costDetails.machineVisit.flightCurrency)}
                        />
                        <PremiumFileUpload
                          label="Fatura"
                          file={costDetails.machineVisit.flightInvoice}
                          onChange={(file) => handleFileUpload('machineVisit', 'flightInvoice', file)}
                        />
                      </div>
                      
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-lg space-y-4 border border-purple-100">
                        <h4 className="font-semibold text-purple-900 flex items-center gap-2">
                          <Hotel className="h-4 w-4" />
                          Otel Konaklama
                        </h4>
                        <CurrencyInput
                          amountLabel="Otel Ücreti"
                          amount={costDetails.machineVisit.hotel}
                          onAmountChange={(value) => setCostDetails(prev => ({
                            ...prev,
                            machineVisit: { ...prev.machineVisit, hotel: value }
                          }))}
                          currency={costDetails.machineVisit.hotelCurrency}
                          onCurrencyChange={(value) => setCostDetails(prev => ({
                            ...prev,
                            machineVisit: { ...prev.machineVisit, hotelCurrency: value }
                          }))}
                          exchangeRate={exchangeRates[costDetails.machineVisit.hotelCurrency]}
                          onExchangeRateChange={(rate) => setExchangeRates(prev => ({ ...prev, [costDetails.machineVisit.hotelCurrency]: rate }))}
                        />
                        <PremiumFileUpload
                          label="Fatura"
                          file={costDetails.machineVisit.hotelInvoice}
                          onChange={(file) => handleFileUpload('machineVisit', 'hotelInvoice', file)}
                        />
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-lg space-y-4 border border-green-100">
                        <h4 className="font-semibold text-green-900 flex items-center gap-2">
                          <Car className="h-4 w-4" />
                          Araç Kirası
                        </h4>
                        <CurrencyInput
                          amountLabel="Araç Kirası"
                          amount={costDetails.machineVisit.carRental}
                          onAmountChange={(value) => setCostDetails(prev => ({
                            ...prev,
                            machineVisit: { ...prev.machineVisit, carRental: value }
                          }))}
                          currency={costDetails.machineVisit.carRentalCurrency}
                          onCurrencyChange={(value) => setCostDetails(prev => ({
                            ...prev,
                            machineVisit: { ...prev.machineVisit, carRentalCurrency: value }
                          }))}
                          exchangeRate={getRate(costDetails.machineVisit.carRentalCurrency)}
                          onExchangeRateChange={setRate(costDetails.machineVisit.carRentalCurrency)}
                        />
                        <PremiumFileUpload
                          label="Fatura"
                          file={costDetails.machineVisit.carRentalInvoice}
                          onChange={(file) => handleFileUpload('machineVisit', 'carRentalInvoice', file)}
                        />
                      </div>
                      
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-lg space-y-4 border border-amber-100">
                        <h4 className="font-semibold text-amber-900 flex items-center gap-2">
                          <Info className="h-4 w-4" />
                          Ek Masraflar
                        </h4>
                        <CurrencyInput
                          amountLabel="Ek Masraf"
                          amount={costDetails.machineVisit.additionalExpense}
                          onAmountChange={(value) => setCostDetails(prev => ({
                            ...prev,
                            machineVisit: { ...prev.machineVisit, additionalExpense: value }
                          }))}
                          currency={costDetails.machineVisit.additionalExpenseCurrency}
                          onCurrencyChange={(value) => setCostDetails(prev => ({
                            ...prev,
                            machineVisit: { ...prev.machineVisit, additionalExpenseCurrency: value }
                          }))}
                          exchangeRate={getRate(costDetails.machineVisit.additionalExpenseCurrency)}
                          onExchangeRateChange={setRate(costDetails.machineVisit.additionalExpenseCurrency)}
                        />
                        <PremiumFileUpload
                          label="Fatura"
                          file={costDetails.machineVisit.additionalExpenseInvoice}
                          onChange={(file) => handleFileUpload('machineVisit', 'additionalExpenseInvoice', file)}
                        />
                      </div>
                    </div>
                  )}

                  <AdditionalCostItems
                    items={additionalCosts["visit"] || []}
                    onAdd={() => addAdditionalCost("visit")}
                    onUpdate={(idx, field, val) => updateAdditionalCost("visit", idx, field, val)}
                    onRemove={(idx) => removeAdditionalCost("visit", idx)}
                    getRate={getRate}
                    setRate={setRate}
                  />
                </PremiumCard>
              </div>
            </div>
          
          {/* Section 2: Logistics */}
          <div className="mb-8">
            <SectionHeader
              number={2}
              title="Lojistik"
              subtitle="Nakliye, evrak ve sigorta bilgileri"
              icon={Truck}
            />
            
            <div className="bg-white rounded-b-xl shadow-lg border border-gray-100 p-8 space-y-8">
              {/* Part 1: Transport */}
              <PremiumCard title="Nakliye Bilgileri" icon={Ship}>
                <div className="space-y-6">
                  <PremiumInput
                    label="Anlaşılan Firma"
                    placeholder="Firma adı"
                    value={costDetails.logistics.agreedCompany}
                    onChange={(e: any) => setCostDetails(prev => ({
                      ...prev,
                      logistics: { ...prev.logistics, agreedCompany: e.target.value }
                    }))}
                  />
                  
                  <PremiumInput
                    label="Yüklenecek Araç Plakası"
                    placeholder="Plaka"
                    value={costDetails.logistics.vehiclePlate}
                    onChange={(e: any) => setCostDetails(prev => ({
                      ...prev,
                      logistics: { ...prev.logistics, vehiclePlate: e.target.value }
                    }))}
                  />
                  
                  <CurrencyInput
                    amountLabel="Navlun Bedeli"
                    amount={costDetails.logistics.freightCost}
                    onAmountChange={(value) => setCostDetails(prev => ({
                      ...prev,
                      logistics: { ...prev.logistics, freightCost: value }
                    }))}
                    currency={costDetails.logistics.freightCurrency}
                    onCurrencyChange={(value) => setCostDetails(prev => ({
                      ...prev,
                      logistics: { ...prev.logistics, freightCurrency: value }
                    }))}
                    exchangeRate={getRate(costDetails.logistics.freightCurrency)}
                    onExchangeRateChange={setRate(costDetails.logistics.freightCurrency)}
                  />
                  
                  <PremiumFileUpload
                    label="Navlun Faturası"
                    file={costDetails.logistics.freightInvoice}
                    onChange={(file) => handleFileUpload('logistics', 'freightInvoice', file)}
                  />

                  <AdditionalCostItems
                    items={additionalCosts["transport"] || []}
                    onAdd={() => addAdditionalCost("transport")}
                    onUpdate={(idx, field, val) => updateAdditionalCost("transport", idx, field, val)}
                    onRemove={(idx) => removeAdditionalCost("transport", idx)}
                    getRate={getRate}
                    setRate={setRate}
                  />
                </div>
              </PremiumCard>
              
              {/* Part 2: Additional Logistics */}
              <PremiumCard title="Ek Lojistik Masrafları" icon={Package}>
                <div className="space-y-6">
                  <CurrencyInput
                    amountLabel="Ek Lojistik Masrafı"
                    amount={costDetails.logistics.additionalLogisticsCost}
                    onAmountChange={(value) => setCostDetails(prev => ({
                      ...prev,
                      logistics: { ...prev.logistics, additionalLogisticsCost: value }
                    }))}
                    currency={costDetails.logistics.additionalLogisticsCurrency}
                    onCurrencyChange={(value) => setCostDetails(prev => ({
                      ...prev,
                      logistics: { ...prev.logistics, additionalLogisticsCurrency: value }
                    }))}
                    exchangeRate={getRate(costDetails.logistics.additionalLogisticsCurrency)}
                    onExchangeRateChange={setRate(costDetails.logistics.additionalLogisticsCurrency)}
                  />
                  
                  <PremiumFileUpload
                    label="Fatura"
                    file={costDetails.logistics.additionalLogisticsInvoice}
                    onChange={(file) => handleFileUpload('logistics', 'additionalLogisticsInvoice', file)}
                  />
                  
                  <CurrencyInput
                    amountLabel="Brandalama / Bekleme Maliyeti"
                    amount={costDetails.logistics.brandingCost}
                    onAmountChange={(value) => setCostDetails(prev => ({
                      ...prev,
                      logistics: { ...prev.logistics, brandingCost: value }
                    }))}
                    currency={costDetails.logistics.brandingCurrency}
                    onCurrencyChange={(value) => setCostDetails(prev => ({
                      ...prev,
                      logistics: { ...prev.logistics, brandingCurrency: value }
                    }))}
                    exchangeRate={getRate(costDetails.logistics.brandingCurrency)}
                    onExchangeRateChange={setRate(costDetails.logistics.brandingCurrency)}
                  />
                  
                  <PremiumFileUpload
                    label="Fatura"
                    file={costDetails.logistics.brandingInvoice}
                    onChange={(file) => handleFileUpload('logistics', 'brandingInvoice', file)}
                  />

                  <AdditionalCostItems
                    items={additionalCosts["additionalLogistics"] || []}
                    onAdd={() => addAdditionalCost("additionalLogistics")}
                    onUpdate={(idx, field, val) => updateAdditionalCost("additionalLogistics", idx, field, val)}
                    onRemove={(idx) => removeAdditionalCost("additionalLogistics", idx)}
                    getRate={getRate}
                    setRate={setRate}
                  />
                </div>
              </PremiumCard>
              
              {/* Part 3: Transport Documents */}
              <PremiumCard title="Nakliye Evrakları" icon={FileText}>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">Tüm belgeler yüklenmeden sistem kapatılamaz</p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <PremiumFileUpload
                      label="Ex-1 Belgesi"
                      file={costDetails.logistics.ex1Document}
                      onChange={(file) => handleFileUpload('logistics', 'ex1Document', file)}
                      required
                    />
                    
                    <PremiumFileUpload
                      label="T1-T2 Belgesi"
                      file={costDetails.logistics.t1t2Document}
                      onChange={(file) => handleFileUpload('logistics', 't1t2Document', file)}
                      required
                    />
                    
                    <PremiumFileUpload
                      label="SMR Belgesi"
                      file={costDetails.logistics.smrDocument}
                      onChange={(file) => handleFileUpload('logistics', 'smrDocument', file)}
                      required
                    />
                    
                    <PremiumFileUpload
                      label="ATR Belgesi"
                      file={costDetails.logistics.atrDocument}
                      onChange={(file) => handleFileUpload('logistics', 'atrDocument', file)}
                      required
                    />
                    
                    <PremiumFileUpload
                      label="Packing List"
                      file={costDetails.logistics.packingListDocument}
                      onChange={(file) => handleFileUpload('logistics', 'packingListDocument', file)}
                      required
                    />
                  </div>
                </div>
              </PremiumCard>
              
              {/* Part 4: Insurance */}
              <PremiumCard title="Nakliye Sigortası" icon={Shield}>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border border-gray-200">
                    <Label className="text-base font-medium">Sigorta Yapıldı mı?</Label>
                    <Switch
                      checked={costDetails.logistics.insuranceDone}
                      onCheckedChange={(checked) => setCostDetails(prev => ({
                        ...prev,
                        logistics: { ...prev.logistics, insuranceDone: checked }
                      }))}
                    />
                  </div>
                  
                  {costDetails.logistics.insuranceDone && (
                    <div className="space-y-6 animate-in fade-in-50 duration-300">
                      <CurrencyInput
                        amountLabel="Sigorta Bedeli"
                        amount={costDetails.logistics.insuranceCost}
                        onAmountChange={(value) => setCostDetails(prev => ({
                          ...prev,
                          logistics: { ...prev.logistics, insuranceCost: value }
                        }))}
                        currency={costDetails.logistics.insuranceCurrency}
                        onCurrencyChange={(value) => setCostDetails(prev => ({
                          ...prev,
                          logistics: { ...prev.logistics, insuranceCurrency: value }
                        }))}
                        exchangeRate={getRate(costDetails.logistics.insuranceCurrency)}
                        onExchangeRateChange={setRate(costDetails.logistics.insuranceCurrency)}
                      />
                      
                      <PremiumFileUpload
                        label="Sigorta Belgesi"
                        file={costDetails.logistics.insuranceDocument}
                        onChange={(file) => handleFileUpload('logistics', 'insuranceDocument', file)}
                      />
                    </div>
                  )}

                  <AdditionalCostItems
                    items={additionalCosts["insurance"] || []}
                    onAdd={() => addAdditionalCost("insurance")}
                    onUpdate={(idx, field, val) => updateAdditionalCost("insurance", idx, field, val)}
                    onRemove={(idx) => removeAdditionalCost("insurance", idx)}
                    getRate={getRate}
                    setRate={setRate}
                  />
                </div>
              </PremiumCard>
            </div>
          </div>
          
          {/* Section 3: Customs */}
          <div className="mb-8">
            <SectionHeader
              number={3}
              title="Gümrük"
              subtitle="Gümrük işlemleri, antrepo ve ardiye masrafları"
              icon={Shield}
            />
            
            <div className="bg-white rounded-b-xl shadow-lg border border-gray-100 p-8 space-y-8">
              {/* Part 1: Entry Customs */}
              <PremiumCard title="Giriş Gümrüğü" icon={FileText}>
                <div className="space-y-6">
                  <CurrencyInput
                    amountLabel="Gümrük Bedeli"
                    required
                    amount={costDetails.customs.entryCustomsCost}
                    onAmountChange={(value) => setCostDetails(prev => ({
                      ...prev,
                      customs: { ...prev.customs, entryCustomsCost: value }
                    }))}
                    currency={costDetails.customs.entryCustomsCurrency}
                    exchangeRate={getRate(costDetails.customs.entryCustomsCurrency)}
                    onExchangeRateChange={setRate(costDetails.customs.entryCustomsCurrency)}
                    onCurrencyChange={(value) => setCostDetails(prev => ({
                      ...prev,
                      customs: { ...prev.customs, entryCustomsCurrency: value }
                    }))}
                  />
                  
                  <PremiumFileUpload
                    label="Gümrük Faturası"
                    file={costDetails.customs.entryCustomsInvoice}
                    onChange={(file) => handleFileUpload('customs', 'entryCustomsInvoice', file)}
                  />
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 font-medium">Zorunlu Belgeler</p>
                    
                    <PremiumFileUpload
                      label="Beyanname"
                      file={costDetails.customs.declarationDocument}
                      onChange={(file) => handleFileUpload('customs', 'declarationDocument', file)}
                      required
                    />
                    
                    <PremiumFileUpload
                      label="Sayım Tutanağı"
                      file={costDetails.customs.countReportDocument}
                      onChange={(file) => handleFileUpload('customs', 'countReportDocument', file)}
                      required
                    />
                  </div>

                  <AdditionalCostItems
                    items={additionalCosts["entryCustoms"] || []}
                    onAdd={() => addAdditionalCost("entryCustoms")}
                    onUpdate={(idx, field, val) => updateAdditionalCost("entryCustoms", idx, field, val)}
                    onRemove={(idx) => removeAdditionalCost("entryCustoms", idx)}
                    getRate={getRate}
                    setRate={setRate}
                  />
                </div>
              </PremiumCard>
              
              {/* Part 2: Warehouse Unloading */}
              <PremiumCard title="Antrepo İndirme" icon={Package}>
                <div className="space-y-6">
                  <CurrencyInput
                    amountLabel="İndirme Vinç Masrafı"
                    amount={costDetails.customs.warehouseUnloadingCost}
                    onAmountChange={(value) => setCostDetails(prev => ({
                      ...prev,
                      customs: { ...prev.customs, warehouseUnloadingCost: value }
                    }))}
                    currency={costDetails.customs.warehouseUnloadingCurrency}
                    onCurrencyChange={(value) => setCostDetails(prev => ({
                      ...prev,
                      customs: { ...prev.customs, warehouseUnloadingCurrency: value }
                    }))}
                    exchangeRate={getRate(costDetails.customs.warehouseUnloadingCurrency)}
                    onExchangeRateChange={setRate(costDetails.customs.warehouseUnloadingCurrency)}
                  />
                  
                  <PremiumFileUpload
                    label="Fatura"
                    file={costDetails.customs.warehouseUnloadingInvoice}
                    onChange={(file) => handleFileUpload('customs', 'warehouseUnloadingInvoice', file)}
                  />

                  <AdditionalCostItems
                    items={additionalCosts["warehouseUnloading"] || []}
                    onAdd={() => addAdditionalCost("warehouseUnloading")}
                    onUpdate={(idx, field, val) => updateAdditionalCost("warehouseUnloading", idx, field, val)}
                    onRemove={(idx) => removeAdditionalCost("warehouseUnloading", idx)}
                    getRate={getRate}
                    setRate={setRate}
                  />
                </div>
              </PremiumCard>
              
              {/* Part 3: Warehouse Loading */}
              <PremiumCard title="Antrepo Bindirme" icon={Truck}>
                <div className="space-y-6">
                  <p className="text-sm text-gray-600">Bindirme masrafları için ek kalem ekleyebilirsiniz.</p>

                  <AdditionalCostItems
                    items={additionalCosts["warehouseLoading"] || []}
                    onAdd={() => addAdditionalCost("warehouseLoading")}
                    onUpdate={(idx, field, val) => updateAdditionalCost("warehouseLoading", idx, field, val)}
                    onRemove={(idx) => removeAdditionalCost("warehouseLoading", idx)}
                    getRate={getRate}
                    setRate={setRate}
                  />
                </div>
              </PremiumCard>
              
              {/* Part 4: Storage */}
              <PremiumCard title="Ardiye Bedeli" icon={Building2}>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border border-gray-200">
                    <Label className="text-base font-medium">Alıcı Ödüyor mu?</Label>
                    <Switch
                      checked={costDetails.customs.warehousePaidByBuyer}
                      onCheckedChange={(checked) => setCostDetails(prev => ({
                        ...prev,
                        customs: { ...prev.customs, warehousePaidByBuyer: checked }
                      }))}
                    />
                  </div>
                  
                  {!costDetails.customs.warehousePaidByBuyer && (
                    <div className="space-y-6 animate-in fade-in-50 duration-300">
                      <CurrencyInput
                        amountLabel="Ardiye Maliyeti"
                        amount={costDetails.customs.storageCost}
                        onAmountChange={(value) => setCostDetails(prev => ({
                          ...prev,
                          customs: { ...prev.customs, storageCost: value }
                        }))}
                        currency={costDetails.customs.storageCurrency}
                        onCurrencyChange={(value) => setCostDetails(prev => ({
                          ...prev,
                          customs: { ...prev.customs, storageCurrency: value }
                        }))}
                        exchangeRate={getRate(costDetails.customs.storageCurrency)}
                        onExchangeRateChange={setRate(costDetails.customs.storageCurrency)}
                      />
                      
                      <PremiumFileUpload
                        label="Fatura"
                        file={costDetails.customs.storageInvoice}
                        onChange={(file) => handleFileUpload('customs', 'storageInvoice', file)}
                      />
                    </div>
                  )}
                  
                  {costDetails.customs.warehousePaidByBuyer && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800 font-medium">✓ Ardiye bedeli alıcı tarafından ödenecektir</p>
                    </div>
                  )}

                  <AdditionalCostItems
                    items={additionalCosts["storage"] || []}
                    onAdd={() => addAdditionalCost("storage")}
                    onUpdate={(idx, field, val) => updateAdditionalCost("storage", idx, field, val)}
                    onRemove={(idx) => removeAdditionalCost("storage", idx)}
                    getRate={getRate}
                    setRate={setRate}
                  />
                </div>
              </PremiumCard>
            </div>
          </div>
          
          {/* Section 4: Transfer */}
          <div className="mb-8">
            <SectionHeader
              number={4}
              title="Devir"
              subtitle="Devir işlemleri ve belgeler"
              icon={Send}
            />
            
            <div className="bg-white rounded-b-xl shadow-lg border border-gray-100 p-8 space-y-8">
              <PremiumCard title="Devir Bilgileri" icon={FileText}>
                <div className="space-y-6">
                  <CurrencyInput
                    amountLabel="Devir Bedeli"
                    amount={costDetails.transfer.transferCost}
                    onAmountChange={(value) => setCostDetails(prev => ({
                      ...prev,
                      transfer: { ...prev.transfer, transferCost: value }
                    }))}
                    currency={costDetails.transfer.transferCurrency}
                    onCurrencyChange={(value) => setCostDetails(prev => ({
                      ...prev,
                      transfer: { ...prev.transfer, transferCurrency: value }
                    }))}
                    exchangeRate={getRate(costDetails.transfer.transferCurrency)}
                    onExchangeRateChange={setRate(costDetails.transfer.transferCurrency)}
                  />
                  
                  <PremiumFileUpload
                    label="Devir Faturası"
                    file={costDetails.transfer.transferInvoice}
                    onChange={(file) => handleFileUpload('transfer', 'transferInvoice', file)}
                  />
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 font-medium">Devir Belgeleri</p>
                    
                    <PremiumFileUpload
                      label="Devir Beyannamesi"
                      file={costDetails.transfer.transferDeclaration}
                      onChange={(file) => handleFileUpload('transfer', 'transferDeclaration', file)}
                    />
                    
                    <PremiumFileUpload
                      label="Devir Sayım Tutanağı"
                      file={costDetails.transfer.transferCountReport}
                      onChange={(file) => handleFileUpload('transfer', 'transferCountReport', file)}
                    />
                  </div>

                  <AdditionalCostItems
                    items={additionalCosts["transfer"] || []}
                    onAdd={() => addAdditionalCost("transfer")}
                    onUpdate={(idx, field, val) => updateAdditionalCost("transfer", idx, field, val)}
                    onRemove={(idx) => removeAdditionalCost("transfer", idx)}
                    getRate={getRate}
                    setRate={setRate}
                  />
                </div>
              </PremiumCard>
            </div>
          </div>
          
          {/* Section 5: General Costs and Sales */}
          <div className="mb-8">
            <SectionHeader
              number={5}
              title="Satış Fiyatı ve Tamamlama"
              subtitle="Satış bilgileri, belgeler ve maliyet özeti"
              icon={CheckCircle2}
            />
            
            <div className="bg-white rounded-b-xl shadow-lg border border-gray-100 p-8 space-y-8">
              <PremiumCard title="Satış Bilgileri" icon={FileText}>
                <div className="space-y-6">
                  <CurrencyInput
                    amountLabel="Satış Fiyatı"
                    required
                    amount={costDetails.generalCosts.salesPrice}
                    onAmountChange={(value) => setCostDetails(prev => ({
                      ...prev,
                      generalCosts: { ...prev.generalCosts, salesPrice: value }
                    }))}
                    currency={costDetails.generalCosts.salesCurrency}
                    onCurrencyChange={(value) => setCostDetails(prev => ({
                      ...prev,
                      generalCosts: { ...prev.generalCosts, salesCurrency: value }
                    }))}
                    exchangeRate={getRate(costDetails.generalCosts.salesCurrency)}
                    onExchangeRateChange={setRate(costDetails.generalCosts.salesCurrency)}
                  />
                  
                  <PremiumInput
                    label="Finansman Kaç Ayda Alındı?"
                    type="number"
                    placeholder="Ay sayısı"
                    value={costDetails.generalCosts.financingMonths}
                    onChange={(e: any) => setCostDetails(prev => ({
                      ...prev,
                      generalCosts: { ...prev.generalCosts, financingMonths: e.target.value }
                    }))}
                  />
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 font-medium">Satış Belgeleri</p>
                    
                    <PremiumFileUpload
                      label="Satış Faturası"
                      file={costDetails.generalCosts.salesInvoice}
                      onChange={(file) => handleFileUpload('generalCosts', 'salesInvoice', file)}
                    />
                    
                    <PremiumFileUpload
                      label="Sözleşme"
                      file={costDetails.generalCosts.contract}
                      onChange={(file) => handleFileUpload('generalCosts', 'contract', file)}
                    />
                  </div>

                  <AdditionalCostItems
                    items={additionalCosts["sales"] || []}
                    onAdd={() => addAdditionalCost("sales")}
                    onUpdate={(idx, field, val) => updateAdditionalCost("sales", idx, field, val)}
                    onRemove={(idx) => removeAdditionalCost("sales", idx)}
                    getRate={getRate}
                    setRate={setRate}
                  />
                </div>
              </PremiumCard>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    costDetails.generalCosts.allDocumentsConfirmed 
                      ? 'bg-green-500' 
                      : 'bg-gray-300'
                  }`}>
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Son Kontrol</h3>
                    <p className="text-sm text-gray-600">Tüm evrakların eklendiğini onaylayın</p>
                  </div>
                  <Switch
                    checked={costDetails.generalCosts.allDocumentsConfirmed}
                    onCheckedChange={(checked) => setCostDetails(prev => ({
                      ...prev,
                      generalCosts: { ...prev.generalCosts, allDocumentsConfirmed: checked }
                    }))}
                  />
                </div>
                
                {!costDetails.generalCosts.allDocumentsConfirmed && (
                  <Alert className="bg-amber-50 border-amber-200">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-800">
                      Lütfen tüm evrakların eklendiğini onaylayın
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg" 
                size="lg"
                onClick={handleComplete}
                disabled={!costDetails.generalCosts.allDocumentsConfirmed}
              >
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Tamamla ve Maliyet Özeti Görüntüle
              </Button>
            </div>
          </div>
        </div>
        </div>
      </ScrollArea>
    );
  };

  const renderCostSummary = () => {
    const project = mockProjects.find(p => p.id === selectedProject);
    
    // Mock data for demonstration - gerçek uygulamada kur çevrimleri yapılacak
    const mockTotalCost = "₺3.250.000";
    const mockSalesPrice = costDetails.generalCosts.salesPrice || "150000";
    const mockProfit = "₺750.000";
    
    const renderAdditionalCostsForSummary = (...sectionKeys: string[]) => {
      const allItems = sectionKeys.flatMap(key => (additionalCosts[key] || []).filter(c => c.amount));
      if (allItems.length === 0) return null;
      return allItems.map((cost) => (
        <div key={cost.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-700">{cost.name || "Ek Kalem"}</span>
          <span className="font-semibold text-lg">{cost.amount} {cost.currency}</span>
        </div>
      ));
    };

    return (
      <ScrollArea className="h-screen">
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => setShowCostSummary(false)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Düzenlemeye Dön
                </Button>
                <div>
                  <h1 className="text-3xl font-semibold text-gray-900">Maliyet Özeti</h1>
                  <p className="text-gray-500 mt-1">{project?.id} - {project?.machineType}</p>
                </div>
              </div>
              <Button 
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                onClick={() => setShowProfitAnalysis(true)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Kar Analizi Görüntüle
              </Button>
            </div>
            
            {/* Cost Summary Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* 1. Machine Purchase */}
              <Card className="shadow-lg border-gray-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                  <CardTitle className="flex items-center gap-2">
                    <Settings2 className="h-5 w-5 text-blue-600" />
                    1. Makine Satın Alım
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Alım Bedeli</span>
                    <span className="font-semibold text-lg">{costDetails.machinePurchase.purchasePrice} {costDetails.machinePurchase.purchaseCurrency}</span>
                  </div>
                  {costDetails.machinePurchase.externalCommission && (
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Dış Firma Komisyonu</span>
                      <span className="font-semibold text-lg">{costDetails.machinePurchase.externalCommission} {costDetails.machinePurchase.externalCommissionCurrency}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-gray-600">Makine Durumu</span>
                    <Badge className="bg-blue-100 text-blue-700">{costDetails.machinePurchase.machineCondition === "new" ? "Sıfır" : "2. El"}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Ödeme Yöntemi</span>
                    <Badge className="bg-green-100 text-green-700">
                      {costDetails.machinePurchase.paymentMethod === "capital" ? "Sermaye" : 
                       costDetails.machinePurchase.paymentMethod === "credit" ? "Kredi" : "Leasing"}
                    </Badge>
                  </div>
                  {renderAdditionalCostsForSummary("purchase")}
                </CardContent>
              </Card>
              
              {/* 2. Logistics */}
              <Card className="shadow-lg border-gray-200">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-purple-600" />
                    2. Lojistik
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  {costDetails.logistics.agreedCompany && (
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Anlaşılan Firma</span>
                      <span className="font-semibold">{costDetails.logistics.agreedCompany}</span>
                    </div>
                  )}
                  {costDetails.logistics.freightCost && (
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Navlun Bedeli</span>
                      <span className="font-semibold text-lg">{costDetails.logistics.freightCost} {costDetails.logistics.freightCurrency}</span>
                    </div>
                  )}
                  {costDetails.logistics.insuranceDone && costDetails.logistics.insuranceCost && (
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Sigorta</span>
                      <span className="font-semibold text-lg">{costDetails.logistics.insuranceCost} {costDetails.logistics.insuranceCurrency}</span>
                    </div>
                  )}
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-semibold text-green-800 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Nakliye Evrakları Tamamlandı
                    </p>
                  </div>
                  {renderAdditionalCostsForSummary("transport", "additionalLogistics", "insurance", "visit")}
                </CardContent>
              </Card>
              
              {/* 3. Customs */}
              <Card className="shadow-lg border-gray-200">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-200">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-amber-600" />
                    3. Gümrük
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  {costDetails.customs.entryCustomsCost && (
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Giriş Gümrüğü</span>
                      <span className="font-semibold text-lg">{costDetails.customs.entryCustomsCost} {costDetails.customs.entryCustomsCurrency}</span>
                    </div>
                  )}
                  {costDetails.customs.warehouseUnloadingCost && (
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Antrepo İndirme</span>
                      <span className="font-semibold text-lg">{costDetails.customs.warehouseUnloadingCost} {costDetails.customs.warehouseUnloadingCurrency}</span>
                    </div>
                  )}
                  {!costDetails.customs.warehousePaidByBuyer && costDetails.customs.storageCost && (
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Ardiye Bedeli</span>
                      <span className="font-semibold text-lg">{costDetails.customs.storageCost} {costDetails.customs.storageCurrency}</span>
                    </div>
                  )}
                  {costDetails.customs.warehousePaidByBuyer && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <Badge variant="outline" className="bg-white">Ardiye Alıcı Tarafından Ödeniyor</Badge>
                    </div>
                  )}
                  {renderAdditionalCostsForSummary("entryCustoms", "warehouseUnloading", "warehouseLoading", "storage")}
                </CardContent>
              </Card>
              
              {/* 4. Transfer */}
              {costDetails.transfer.transferCost && (
                <Card className="shadow-lg border-gray-200">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
                    <CardTitle className="flex items-center gap-2">
                      <Send className="h-5 w-5 text-green-600" />
                      4. Devir
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Devir Bedeli</span>
                      <span className="font-semibold text-lg">{costDetails.transfer.transferCost} {costDetails.transfer.transferCurrency}</span>
                    </div>
                    {renderAdditionalCostsForSummary("transfer")}
                  </CardContent>
                </Card>
              )}
              
              {/* 5. Sales Info */}
              <Card className="shadow-lg border-gray-200">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                    5. Satış Bilgileri
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <span className="text-gray-700 font-medium">Satış Fiyatı</span>
                    <span className="font-bold text-xl text-green-700">{costDetails.generalCosts.salesPrice} {costDetails.generalCosts.salesCurrency}</span>
                  </div>
                  {costDetails.generalCosts.financingMonths && (
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Finansman Süresi</span>
                      <span className="font-semibold">{costDetails.generalCosts.financingMonths} Ay</span>
                    </div>
                  )}
                  {renderAdditionalCostsForSummary("sales")}
                </CardContent>
              </Card>
            </div>
            
            {/* Summary Card */}
            <Card className="shadow-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900">Özet Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-sm text-gray-600 mb-2">Tahmini Toplam Maliyet</p>
                    <p className="text-2xl font-bold text-gray-900">{mockTotalCost}</p>
                    <p className="text-xs text-gray-500 mt-1">*Örnek hesaplama</p>
                  </div>
                  <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-sm text-gray-600 mb-2">Satış Fiyatı</p>
                    <p className="text-2xl font-bold text-green-700">{mockSalesPrice} {costDetails.generalCosts.salesCurrency}</p>
                  </div>
                  <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-sm text-gray-600 mb-2">Tahmini Kar</p>
                    <p className="text-2xl font-bold text-emerald-600">{mockProfit}</p>
                    <p className="text-xs text-gray-500 mt-1">*Örnek hesaplama</p>
                  </div>
                </div>
                
                <Alert className="bg-blue-100 border-blue-300">
                  <Info className="h-5 w-5 text-blue-700" />
                  <AlertDescription className="text-blue-900">
                    Detaylı kar analizi için "Kar Analizi Görüntüle" butonuna tıklayın
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>
    );
  };
  
  const renderCampaignManagement = () => {
    return (
      <ScrollArea className="h-screen">
        <div className="min-h-screen bg-gray-50 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">Stok Tanıtım Gönderimi</h1>
                <p className="text-gray-500 mt-2">Stoktaki makinelerinizi müşterilere e-posta ile tanıtın</p>
              </div>
              <Button 
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white shadow-lg"
                onClick={() => openCampaignModal(null)}
              >
                <Plus className="h-5 w-5 mr-2" />
                Yeni Tanıtım Oluştur
              </Button>
            </div>

            {/* Summary Bar */}
            <div className="bg-white rounded-xl shadow-lg border-0 p-5 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-900 rounded-lg flex items-center justify-center">
                      <Send className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
                      <p className="text-xs text-gray-500">Toplam Tanıtım</p>
                    </div>
                  </div>
                  <Separator orientation="vertical" className="h-10" />
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                      <span className="text-sm text-gray-600">{campaigns.filter(c => c.isSent).length} Gönderilmiş</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="text-sm text-gray-600">{campaigns.filter(c => !c.isSent).length} Taslak</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5">
                    <Package className="h-3.5 w-3.5 mr-1.5" />
                    {mockProjects.filter(p => p.status === "active").length} Makine Stokta
                  </Badge>
                </div>
              </div>
            </div>

            {/* Campaigns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden group">
                  {/* Sent/Draft Banner */}
                  <div className={`h-2 ${campaign.isSent ? "bg-green-600" : "bg-amber-400"}`} />
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{campaign.name}</CardTitle>
                        <p className="text-sm text-gray-500">{campaign.id}</p>
                      </div>
                      <Badge 
                        variant={campaign.isSent ? "default" : "secondary"}
                        className={`${campaign.isSent ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"} text-xs px-3 py-1`}
                      >
                        {campaign.isSent ? "GÖNDERİLDİ" : "TASLAK"}
                      </Badge>
                    </div>
                    
                    {/* Machine Count Badge */}
                    <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                      <Package className="h-5 w-5 text-gray-700" />
                      <span className="text-2xl font-bold text-gray-900">{campaign.selectedMachines?.length || 0}</span>
                      <span className="text-sm text-gray-600">Makine</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Müşteriler:</span>
                        <span className="font-semibold text-gray-900">{campaign.customerSelection === "all" ? "Tüm Müşteriler" : `${campaign.selectedCustomers?.length || 0} Müşteri`}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Oluşturulma:</span>
                        <span className="font-semibold text-gray-900">{campaign.createdDate}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">{campaign.description}</p>

                    <div className="flex gap-2 pt-2">
                      {campaign.isSent ? (
                        // Gönderilmiş tanıtımlar için sadece detay butonu
                        <Button 
                          variant="outline" 
                          className="flex-1 border-gray-300 hover:bg-gray-50 text-gray-700"
                          onClick={() => openCampaignDetailsModal(campaign)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Tanıtım Detayları
                        </Button>
                      ) : (
                        // Henüz gönderilmemiş tanıtımlar için düzenle butonu
                        <Button 
                          variant="outline" 
                          className="flex-1 border-gray-300 hover:bg-gray-50 text-gray-700"
                          onClick={() => openCampaignModal(campaign)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Düzenle
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        className="px-3 border-red-200 hover:bg-red-50 text-red-600"
                        onClick={() => {
                          setCampaigns(prev => prev.filter(c => c.id !== campaign.id));
                          toast.success("Tanıtım gönderimi silindi");
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {campaigns.length === 0 && (
              <div className="text-center py-20">
                <Send className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Henüz Tanıtım Gönderimi Yok</h3>
                <p className="text-gray-500 mb-6">Stoktaki makinelerinizi müşterilere tanıtmak için yeni bir gönderim oluşturun</p>
                <Button 
                  size="lg"
                  className="bg-gray-900 hover:bg-gray-800 text-white"
                  onClick={() => openCampaignModal(null)}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  İlk Tanıtım Gönderiminizi Oluşturun
                </Button>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    );
  };

  const renderProfitAnalysis = () => {
    const project = mockProjects.find(p => p.id === selectedProject);
    
    // Mock data - gerçek uygulamada kur çevrimleri ve hesaplamalar yapılacak
    const mockData = {
      machineCost: { amount: 95000, currency: "EUR", try: 3325000 },
      visitCost: { amount: 2500, currency: "EUR", try: 87500 },
      logisticsCost: { amount: 8500, currency: "EUR", try: 297500 },
      customsCost: { amount: 15000, currency: "TRY", try: 15000 },
      transferCost: { amount: 5000, currency: "TRY", try: 5000 },
      totalCost: 3730000,
      salesPrice: { amount: parseFloat(costDetails.generalCosts.salesPrice) || 150000, currency: costDetails.generalCosts.salesCurrency, try: 5250000 },
      profit: 1520000,
      profitMargin: 28.95,
      exchangeRates: { EUR: 35, USD: 33 }
    };
    
    return (
      <ScrollArea className="h-screen">
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => setShowProfitAnalysis(false)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Maliyet Özetine Dön
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Kar Analizi</h1>
                  <p className="text-gray-600 mt-1">{project?.id} - {project?.machineType}</p>
                </div>
              </div>
            </div>
            
            {/* Profit Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="shadow-xl bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Toplam Maliyet
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-red-900">₺{mockData.totalCost.toLocaleString('tr-TR')}</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Satış Fiyatı
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-blue-900">₺{mockData.salesPrice.try.toLocaleString('tr-TR')}</p>
                  <p className="text-sm text-blue-700 mt-2">{mockData.salesPrice.amount} {mockData.salesPrice.currency}</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Net Kar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-green-900">₺{mockData.profit.toLocaleString('tr-TR')}</p>
                  <p className="text-sm text-green-700 mt-2">Kar Marjı: %{mockData.profitMargin}</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Cost Breakdown */}
            <Card className="shadow-xl mb-8 border-gray-200">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-200">
                <CardTitle className="text-2xl">Maliyet Dağılımı</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3">
                      <Settings2 className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Makine Satın Alım</p>
                        <p className="text-sm text-gray-600">{mockData.machineCost.amount} {mockData.machineCost.currency}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">₺{mockData.machineCost.try.toLocaleString('tr-TR')}</p>
                      <p className="text-sm text-gray-600">{((mockData.machineCost.try / mockData.totalCost) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-3">
                      <Plane className="h-6 w-6 text-purple-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Ziyaret Masrafları</p>
                        <p className="text-sm text-gray-600">{mockData.visitCost.amount} {mockData.visitCost.currency}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">₺{mockData.visitCost.try.toLocaleString('tr-TR')}</p>
                      <p className="text-sm text-gray-600">{((mockData.visitCost.try / mockData.totalCost) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <Truck className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Lojistik</p>
                        <p className="text-sm text-gray-600">{mockData.logisticsCost.amount} {mockData.logisticsCost.currency}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">₺{mockData.logisticsCost.try.toLocaleString('tr-TR')}</p>
                      <p className="text-sm text-gray-600">{((mockData.logisticsCost.try / mockData.totalCost) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-3">
                      <Shield className="h-6 w-6 text-amber-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Gümrük</p>
                        <p className="text-sm text-gray-600">{mockData.customsCost.amount} {mockData.customsCost.currency}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">₺{mockData.customsCost.try.toLocaleString('tr-TR')}</p>
                      <p className="text-sm text-gray-600">{((mockData.customsCost.try / mockData.totalCost) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="flex items-center gap-3">
                      <Send className="h-6 w-6 text-indigo-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Devir</p>
                        <p className="text-sm text-gray-600">{mockData.transferCost.amount} {mockData.transferCost.currency}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">₺{mockData.transferCost.try.toLocaleString('tr-TR')}</p>
                      <p className="text-sm text-gray-600">{((mockData.transferCost.try / mockData.totalCost) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="flex justify-between items-center p-5 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg text-white">
                  <p className="text-xl font-bold">TOPLAM MALİYET</p>
                  <p className="text-3xl font-bold">₺{mockData.totalCost.toLocaleString('tr-TR')}</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Exchange Rates */}
            <Card className="shadow-xl bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  Kullanılan Kurlar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600">EUR / TRY</p>
                    <p className="text-2xl font-bold text-gray-900">₺{mockData.exchangeRates.EUR}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600">USD / TRY</p>
                    <p className="text-2xl font-bold text-gray-900">₺{mockData.exchangeRates.USD}</p>
                  </div>
                </div>
                <Alert className="mt-4 bg-yellow-50 border-yellow-200">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800 text-sm">
                    Bu sayfa örnek verilerle çalışmaktadır. Gerçek uygulamada güncel kurlar kullanılacaktır.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>
    );
  };

  // Campaign Modal Form State
  const [campaignStep, setCampaignStep] = useState(1);
  const [machineSearchQuery, setMachineSearchQuery] = useState("");
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [step3SummaryExpanded, setStep3SummaryExpanded] = useState(false);
  const [campaignForm, setCampaignForm] = useState({
    name: "",
    customerSelection: "all" as "all" | "selected",
    description: "",
    selectedMachines: [] as string[],
    selectedCustomers: [] as string[],
    emailSubject: "",
    emailContent: ""
  });

  // Filtered machines for Step 2 — sadece aktif (stoktaki) makineler
  const stockMachines = useMemo(() => mockProjects.filter(p => p.status === "active"), []);
  const filteredMachines = useMemo(() => {
    return stockMachines.filter(project => {
      const matchesSearch = machineSearchQuery.trim() === "" || 
        project.name.toLowerCase().includes(machineSearchQuery.toLowerCase()) ||
        project.id.toLowerCase().includes(machineSearchQuery.toLowerCase()) ||
        project.machineType.toLowerCase().includes(machineSearchQuery.toLowerCase()) ||
        project.brand.toLowerCase().includes(machineSearchQuery.toLowerCase()) ||
        project.serialNo.toLowerCase().includes(machineSearchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [machineSearchQuery, stockMachines]);

  const generateEmailContent = () => {
    const machineList = campaignForm.selectedMachines.map(machineId => {
      const machine = mockProjects.find(p => p.id === machineId);
      return machine ? `  - ${machine.brand} ${machine.machineType} (${machine.year})` : "";
    }).filter(Boolean).join("\n");

    const content = `Değerli Müşterimiz,

Stoğumuzda bulunan aşağıdaki makinelerimizi bilginize sunmak isteriz:

${machineList}

İlgilendiğiniz makineler hakkında teknik detaylar, fiyat bilgisi ve yerinde inceleme imkanı için bizimle iletişime geçmekten çekinmeyiniz.

Saygılarımızla,
Avitech Metal Teknolojileri`;

    const subject = `${campaignForm.name} - Stoktaki Makinelerimiz`;
    
    setCampaignForm(prev => ({
      ...prev,
      emailSubject: subject,
      emailContent: content
    }));
    toast.success("E-posta içeriği otomatik oluşturuldu");
  };

  const copyEmailToClipboard = () => {
    const fullContent = `Konu: ${campaignForm.emailSubject}\n\n${campaignForm.emailContent}`;
    navigator.clipboard.writeText(fullContent).then(() => {
      toast.success("E-posta içeriği panoya kopyalandı");
    }).catch(() => {
      toast.error("Kopyalama başarısız oldu");
    });
  };

  const handleSaveCampaign = () => {
    if (!campaignForm.name) {
      toast.error("Lütfen tanıtım adını doldurun");
      return;
    }

    if (campaignForm.selectedMachines.length === 0) {
      toast.error("Lütfen en az bir makine seçin");
      return;
    }

    const finalCustomers = campaignForm.customerSelection === "all" 
      ? mockCustomers.map(c => c.id) 
      : campaignForm.selectedCustomers;

    if (finalCustomers.length === 0) {
      toast.error("Lütfen en az bir müşteri seçin");
      return;
    }

    if (!campaignForm.emailSubject || !campaignForm.emailContent) {
      toast.error("Lütfen e-posta konusu ve içeriğini doldurun");
      return;
    }

    if (selectedCampaign) {
      // Update existing campaign
      setCampaigns(prev => prev.map(c => 
        c.id === selectedCampaign.id 
          ? {
              ...c,
              name: campaignForm.name,
              customerSelection: campaignForm.customerSelection,
              description: campaignForm.description,
              selectedCustomers: finalCustomers
            }
          : c
      ));
      toast.success("Tanıtım gönderimi güncellendi");
    } else {
      // Create new campaign
      const newCampaign: Campaign = {
        id: `TNTM-${String(campaigns.length + 1).padStart(3, '0')}`,
        name: campaignForm.name,
        customerSelection: campaignForm.customerSelection,
        description: campaignForm.description,
        createdDate: new Date().toLocaleDateString('tr-TR'),
        isSent: true,
        selectedMachines: campaignForm.selectedMachines,
        selectedCustomers: finalCustomers
      };
      setCampaigns(prev => [...prev, newCampaign]);
      toast.success(`Stok tanıtımı oluşturuldu ve ${finalCustomers.length} müşteriye e-posta gönderildi!`);
    }

    setShowCampaignModal(false);
    setCampaignStep(1);
    setMachineSearchQuery("");
    setShowEmailPreview(false);
    setStep3SummaryExpanded(false);
    setCampaignForm({
      name: "",
      customerSelection: "all",
      description: "",
      selectedMachines: [],
      selectedCustomers: [],
      emailSubject: "",
      emailContent: ""
    });
  };

  // When opening modal for edit, populate form
  const openCampaignModal = (campaign: Campaign | null) => {
    if (campaign) {
      setCampaignForm({
        name: campaign.name,
        customerSelection: campaign.customerSelection || "all",
        description: campaign.description,
        selectedMachines: campaign.selectedMachines || [],
        selectedCustomers: campaign.selectedCustomers || [],
        emailSubject: `${campaign.name} - Stoktaki Makinelerimiz`,
        emailContent: campaign.description
      });
    } else {
      setCampaignForm({
        name: "",
        customerSelection: "all",
        description: "",
        selectedMachines: [],
        selectedCustomers: [],
        emailSubject: "",
        emailContent: ""
      });
    }
    setCampaignStep(1);
    setMachineSearchQuery("");
    setShowEmailPreview(false);
    setStep3SummaryExpanded(false);
    setSelectedCampaign(campaign);
    setShowCampaignModal(true);
  };

  // Open campaign details modal
  const openCampaignDetailsModal = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowCampaignDetailsModal(true);
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      
      {/* Campaign Modal */}
      {showCampaignModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => {
            setShowCampaignModal(false);
            setCampaignStep(1);
            setMachineSearchQuery("");
            setShowEmailPreview(false);
            setStep3SummaryExpanded(false);
          }} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {selectedCampaign ? "Tanıtım Düzenle" : "Yeni Stok Tanıtımı Oluştur"}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {campaignStep === 1 && "Tanıtım bilgilerini girin"}
                  {campaignStep === 2 && "Tanıtıma dahil edilecek makineleri seçin"}
                  {campaignStep === 3 && "E-posta içeriğini düzenleyin, önizleyin ve gönderin"}
                </p>
                
                {/* Step Indicator */}
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      campaignStep === 1 ? "bg-gray-900 text-white" : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {campaignStep > 1 ? <CheckCircle2 className="h-4 w-4" /> : "1"}
                    </div>
                    <span className={`text-sm ${campaignStep === 1 ? "font-semibold text-gray-900" : campaignStep > 1 ? "text-emerald-700" : "text-gray-600"}`}>
                      Tanıtım Bilgileri
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <div className="flex items-center gap-2">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      campaignStep === 2 ? "bg-gray-900 text-white" : campaignStep > 2 ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-500"
                    }`}>
                      {campaignStep > 2 ? <CheckCircle2 className="h-4 w-4" /> : "2"}
                    </div>
                    <span className={`text-sm ${campaignStep === 2 ? "font-semibold text-gray-900" : campaignStep > 2 ? "text-emerald-700" : "text-gray-600"}`}>
                      Makine Seçimi
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <div className="flex items-center gap-2">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      campaignStep === 3 ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-500"
                    }`}>3</div>
                    <span className={`text-sm ${campaignStep === 3 ? "font-semibold text-gray-900" : "text-gray-600"}`}>
                      Önizleme & Gönderim
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6 min-h-[400px]">
                {/* STEP 1: Campaign Details */}
                {campaignStep === 1 && (
                  <>
                    {/* Campaign Name */}
                    <div>
                      <Label htmlFor="campaignName" className="text-sm font-medium mb-2 block">
                        Tanıtım Adı <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="campaignName"
                        value={campaignForm.name}
                        onChange={(e) => setCampaignForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Örn: Yaz Dönemi Stok Tanıtımı 2025"
                        className="w-full"
                      />
                    </div>

                    {/* Customer Selection */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Hedef Müşteriler <span className="text-red-600">*</span>
                      </Label>
                      <div className="flex gap-3 mb-3">
                        <Button
                          type="button"
                          variant={campaignForm.customerSelection === "all" ? "default" : "outline"}
                          className={campaignForm.customerSelection === "all" ? "bg-gray-900 text-white" : ""}
                          onClick={() => setCampaignForm(prev => ({ ...prev, customerSelection: "all", selectedCustomers: [] }))}
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Tüm Müşteriler
                        </Button>
                        <Button
                          type="button"
                          variant={campaignForm.customerSelection === "selected" ? "default" : "outline"}
                          className={campaignForm.customerSelection === "selected" ? "bg-gray-900 text-white" : ""}
                          onClick={() => setCampaignForm(prev => ({ ...prev, customerSelection: "selected" }))}
                        >
                          <Building2 className="h-4 w-4 mr-2" />
                          Seçili Müşteriler
                        </Button>
                      </div>

                      {campaignForm.customerSelection === "all" && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm text-blue-800">
                            <span className="font-semibold">Tüm kayıtlı müşterilere</span> ({mockCustomers.length} müşteri) gönderilecektir.
                          </p>
                        </div>
                      )}

                      {campaignForm.customerSelection === "selected" && (
                        <div className="space-y-3">
                          <Select
                            onValueChange={(value) => {
                              if (!campaignForm.selectedCustomers.includes(value)) {
                                setCampaignForm(prev => ({
                                  ...prev,
                                  selectedCustomers: [...prev.selectedCustomers, value]
                                }));
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Müşteri seçin..." />
                            </SelectTrigger>
                            <SelectContent className="z-[60]">
                              {mockCustomers
                                .filter(c => !campaignForm.selectedCustomers.includes(c.id))
                                .map(customer => (
                                  <SelectItem key={customer.id} value={customer.id}>
                                    {customer.company} - {customer.name}
                                  </SelectItem>
                                ))
                              }
                            </SelectContent>
                          </Select>

                          {campaignForm.selectedCustomers.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {campaignForm.selectedCustomers.map(custId => {
                                const customer = mockCustomers.find(c => c.id === custId);
                                return customer ? (
                                  <Badge
                                    key={custId}
                                    variant="secondary"
                                    className="px-3 py-1.5 flex items-center gap-2 bg-gray-100 text-gray-800"
                                  >
                                    <Building2 className="h-3 w-3" />
                                    {customer.company}
                                    <button
                                      onClick={() => setCampaignForm(prev => ({
                                        ...prev,
                                        selectedCustomers: prev.selectedCustomers.filter(id => id !== custId)
                                      }))}
                                      className="ml-1 hover:text-red-600 transition-colors"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </Badge>
                                ) : null;
                              })}
                            </div>
                          )}

                          {campaignForm.selectedCustomers.length === 0 && (
                            <p className="text-sm text-gray-500">Henüz müşteri seçilmedi. Yukarıdaki listeden müşteri ekleyin.</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <Label htmlFor="description" className="text-sm font-medium mb-2 block">
                        Açıklama
                      </Label>
                      <textarea
                        id="description"
                        value={campaignForm.description}
                        onChange={(e) => setCampaignForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Stok tanıtımı hakkında detaylı açıklama"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
                        rows={3}
                      />
                    </div>
                  </>
                )}

                {/* STEP 2: Machine Selection */}
                {campaignStep === 2 && (
                  <div className="space-y-5">
                    {/* Info Banner */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
                          <Package className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-0.5">Stoktaki Makineler</p>
                          <p className="text-sm text-gray-600">
                            Aşağıda yalnızca <span className="font-semibold text-gray-800">stokta bulunan (aktif)</span> makineler listelenmektedir. Satılmış makineler bu listede yer almaz. Tanıtım e-postasına dahil etmek istediğiniz makineleri seçin.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={machineSearchQuery}
                        onChange={(e) => setMachineSearchQuery(e.target.value)}
                        placeholder="Makine adı, ID, model veya seri no ile ara..."
                        className="pl-10 w-full"
                      />
                    </div>

                    {/* Select All / Clear Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1">
                          <Package className="h-3 w-3 mr-1.5" />
                          {stockMachines.length} stokta
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {filteredMachines.length} makine listeleniyor
                          {machineSearchQuery ? " (filtreli)" : ""}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-8"
                          onClick={() => {
                            const filteredIds = filteredMachines.map(p => p.id);
                            setCampaignForm(prev => ({
                              ...prev,
                              selectedMachines: [...new Set([...prev.selectedMachines, ...filteredIds])]
                            }));
                          }}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                          {machineSearchQuery ? "Filtreli Seç" : "Tümünü Seç"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-8"
                          onClick={() => setCampaignForm(prev => ({ ...prev, selectedMachines: [] }))}
                          disabled={campaignForm.selectedMachines.length === 0}
                        >
                          <X className="h-3.5 w-3.5 mr-1.5" />
                          Temizle
                        </Button>
                      </div>
                    </div>

                    {/* Machine Cards List */}
                    <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                      {filteredMachines.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <Search className="h-10 w-10 text-gray-300 mb-3" />
                          <p className="text-sm font-medium text-gray-500">Aramanızla eşleşen makine bulunamadı</p>
                          <p className="text-xs text-gray-400 mt-1">Farklı bir arama terimi deneyin</p>
                        </div>
                      ) : (
                        filteredMachines.map((project) => {
                          const isSelected = campaignForm.selectedMachines.includes(project.id);
                          return (
                            <div
                              key={project.id}
                              className={`group relative flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                isSelected
                                  ? "border-gray-900 bg-gray-50 shadow-sm"
                                  : "border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm"
                              }`}
                              onClick={() => {
                                setCampaignForm(prev => ({
                                  ...prev,
                                  selectedMachines: isSelected
                                    ? prev.selectedMachines.filter(id => id !== project.id)
                                    : [...prev.selectedMachines, project.id]
                                }));
                              }}
                            >
                              {/* Checkbox */}
                              <div className="pt-0.5">
                                <Checkbox
                                  checked={isSelected}
                                  onCheckedChange={(checked) => {
                                    setCampaignForm(prev => ({
                                      ...prev,
                                      selectedMachines: checked
                                        ? [...prev.selectedMachines, project.id]
                                        : prev.selectedMachines.filter(id => id !== project.id)
                                    }));
                                  }}
                                  className="h-5 w-5"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>

                              {/* Machine Info */}
                              <div className="flex-1 min-w-0">
                                {/* Row 1: Name + Badges */}
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <span className="font-semibold text-gray-900">{project.name}</span>
                                  <Badge variant="secondary" className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 font-mono">
                                    {project.id}
                                  </Badge>
                                  <Badge variant="secondary" className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    Stokta
                                  </Badge>
                                </div>

                                {/* Row 2: Technical Specs Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1.5">
                                  <div className="flex items-center gap-1.5">
                                    <Building2 className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                                    <span className="text-xs text-gray-500">Marka</span>
                                    <span className="text-xs font-medium text-gray-800 truncate">{project.brand}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <Settings2 className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                                    <span className="text-xs text-gray-500">Model</span>
                                    <span className="text-xs font-medium text-gray-800 truncate">{project.machineType}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <Hash className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                                    <span className="text-xs text-gray-500">Seri No</span>
                                    <span className="text-xs font-medium text-gray-800 font-mono truncate">{project.serialNo}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                                    <span className="text-xs text-gray-500">Yıl</span>
                                    <span className="text-xs font-medium text-gray-800">{project.year}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Selection Indicator */}
                              {isSelected && (
                                <div className="absolute top-2 right-2">
                                  <div className="h-6 w-6 rounded-full bg-gray-900 flex items-center justify-center">
                                    <CheckCircle2 className="h-4 w-4 text-white" />
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Selection Summary */}
                    <div className={`rounded-xl p-4 transition-all ${
                      campaignForm.selectedMachines.length > 0
                        ? "bg-emerald-50 border border-emerald-200"
                        : "bg-amber-50 border border-amber-200"
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            campaignForm.selectedMachines.length > 0
                              ? "bg-emerald-100"
                              : "bg-amber-100"
                          }`}>
                            {campaignForm.selectedMachines.length > 0 ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-amber-700" />
                            )}
                          </div>
                          <div>
                            <p className={`text-sm font-semibold ${
                              campaignForm.selectedMachines.length > 0 ? "text-emerald-900" : "text-amber-900"
                            }`}>
                              {campaignForm.selectedMachines.length > 0
                                ? `${campaignForm.selectedMachines.length} makine tanıtıma dahil edilecek`
                                : "Henüz makine seçilmedi"}
                            </p>
                            <p className={`text-xs ${
                              campaignForm.selectedMachines.length > 0 ? "text-emerald-700" : "text-amber-700"
                            }`}>
                              {campaignForm.selectedMachines.length > 0
                                ? "Devam etmek için sonraki adıma geçebilirsiniz"
                                : "Devam etmek için en az bir makine seçmelisiniz"}
                            </p>
                          </div>
                        </div>
                        {campaignForm.selectedMachines.length > 0 && (
                          <div className="flex -space-x-1">
                            {campaignForm.selectedMachines.slice(0, 3).map(machineId => {
                              const machine = mockProjects.find(p => p.id === machineId);
                              return machine ? (
                                <Tooltip key={machine.id}>
                                  <TooltipTrigger asChild>
                                    <div className="h-8 w-8 rounded-full bg-white border-2 border-emerald-200 flex items-center justify-center text-[10px] font-semibold text-gray-700 shadow-sm">
                                      {machine.name.substring(0, 2).toUpperCase()}
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{machine.name} — {machine.machineType}</p>
                                  </TooltipContent>
                                </Tooltip>
                              ) : null;
                            })}
                            {campaignForm.selectedMachines.length > 3 && (
                              <div className="h-8 w-8 rounded-full bg-gray-800 border-2 border-emerald-200 flex items-center justify-center text-[10px] font-semibold text-white shadow-sm">
                                +{campaignForm.selectedMachines.length - 3}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Email Preview & Send */}
                {campaignStep === 3 && (() => {
                  const recipientCustomers = campaignForm.customerSelection === "all"
                    ? mockCustomers
                    : mockCustomers.filter(c => campaignForm.selectedCustomers.includes(c.id));
                  const selectedMachineObjects = campaignForm.selectedMachines
                    .map(id => mockProjects.find(p => p.id === id))
                    .filter(Boolean);
                  
                  return (
                  <div className="space-y-6">
                    {/* ── Campaign Summary Card ── */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                      {/* Summary Header - always visible */}
                      <button
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100 transition-colors"
                        onClick={() => setStep3SummaryExpanded(prev => !prev)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
                            <FileText className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Tanıtım Özeti</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {campaignForm.name} &middot; {selectedMachineObjects.length} makine &middot; {recipientCustomers.length} alıcı
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-1.5">
                            <Badge variant="secondary" className="text-[10px] px-2 py-0.5 bg-white border border-gray-200">
                              <Cog className="h-3 w-3 mr-1" />
                              {selectedMachineObjects.length}
                            </Badge>
                            <Badge variant="secondary" className="text-[10px] px-2 py-0.5 bg-white border border-gray-200">
                              <Users className="h-3 w-3 mr-1" />
                              {recipientCustomers.length}
                            </Badge>
                          </div>
                          {step3SummaryExpanded ? (
                            <ChevronUp className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </button>

                      {/* Expandable Details */}
                      {step3SummaryExpanded && (
                        <div className="border-t border-gray-200 p-4 space-y-4 bg-white">
                          {/* Row 1: Campaign Info */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Tanıtım Adı</p>
                              <p className="text-sm font-semibold text-gray-900 truncate">{campaignForm.name || "-"}</p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Müşteri Seçimi</p>
                              <p className="text-sm text-gray-800">
                                {campaignForm.customerSelection === "all" ? "Tüm Müşteriler" : "Seçili Müşteriler"}
                              </p>
                            </div>
                          </div>

                          <Separator />

                          {/* Row 2: Machines */}
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">Seçili Makineler ({selectedMachineObjects.length})</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedMachineObjects.map(machine => machine && (
                                <Badge key={machine.id} variant="secondary" className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 border border-gray-200">
                                  {machine.brand} {machine.machineType} ({machine.year})
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          {/* Row 3: Customers */}
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">Alıcı Müşteriler ({recipientCustomers.length})</p>
                            <div className="flex flex-wrap gap-2">
                              {recipientCustomers.map(customer => (
                                <Badge key={customer.id} variant="secondary" className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 border border-gray-200">
                                  <Building2 className="h-3 w-3 mr-1" />
                                  {customer.company}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ── Email Compose / Preview Toggle ── */}
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setShowEmailPreview(false)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                          !showEmailPreview
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <Edit className="h-4 w-4" />
                        Düzenle
                      </button>
                      <button
                        onClick={() => setShowEmailPreview(true)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                          showEmailPreview
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <Eye className="h-4 w-4" />
                        Önizleme
                      </button>
                    </div>

                    {/* ── COMPOSE MODE ── */}
                    {!showEmailPreview && (
                      <div className="space-y-5">
                        {/* Auto Generate Button */}
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">
                            E-posta konu ve içeriğini doldurun veya otomatik oluşturun.
                          </p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs gap-1.5 border-gray-300 hover:bg-gray-50"
                            onClick={generateEmailContent}
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                            Otomatik Oluştur
                          </Button>
                        </div>

                        {/* Email Subject */}
                        <div>
                          <Label htmlFor="emailSubject" className="text-sm font-medium mb-2 block">
                            E-posta Konusu <span className="text-red-600">*</span>
                          </Label>
                          <div className="relative">
                            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="emailSubject"
                              value={campaignForm.emailSubject}
                              onChange={(e) => setCampaignForm(prev => ({ ...prev, emailSubject: e.target.value }))}
                              placeholder="Örn: Stoktaki Makinelerimiz - Stok Tanıtımı"
                              className="w-full pl-10"
                            />
                          </div>
                        </div>

                        {/* Email Content */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label htmlFor="emailContent" className="text-sm font-medium">
                              E-posta İçeriği <span className="text-red-600">*</span>
                            </Label>
                            <span className="text-xs text-gray-400">
                              {campaignForm.emailContent.length} karakter
                            </span>
                          </div>
                          <textarea
                            id="emailContent"
                            value={campaignForm.emailContent}
                            onChange={(e) => setCampaignForm(prev => ({ ...prev, emailContent: e.target.value }))}
                            placeholder={`Değerli Müşterimiz,\n\nStoğumuzdaki makineleri tanıtmak istiyoruz.\n\nDetaylı bilgi için bizimle iletişime geçebilirsiniz.\n\nSaygılarımızla,\nAvitech Metal Teknolojileri`}
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none text-sm"
                            rows={10}
                          />
                          <p className="text-xs text-gray-400 mt-1.5">
                            Makine listesi e-postanın altına otomatik olarak eklenecektir.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* ── PREVIEW MODE ── */}
                    {showEmailPreview && (
                      <div className="space-y-4">
                        {/* Action Bar */}
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs gap-1.5"
                            onClick={copyEmailToClipboard}
                          >
                            <Copy className="h-3.5 w-3.5" />
                            Kopyala
                          </Button>
                        </div>

                        {/* Email Preview Container */}
                        <div className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm">
                          {/* Email Header */}
                          <div className="bg-gray-50 border-b border-gray-200 p-4 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] uppercase tracking-wider text-gray-400 w-16 shrink-0">Gönderen</span>
                              <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-gray-900 flex items-center justify-center">
                                  <Mail className="h-3 w-3 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-800">Avitech Metal Teknolojileri</span>
                                <span className="text-xs text-gray-400">&lt;info@avitech.com.tr&gt;</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] uppercase tracking-wider text-gray-400 w-16 shrink-0">Alıcı</span>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {recipientCustomers.slice(0, 4).map(c => (
                                  <Badge key={c.id} variant="secondary" className="text-[10px] px-2 py-0.5 bg-white border border-gray-200">
                                    {c.email}
                                  </Badge>
                                ))}
                                {recipientCustomers.length > 4 && (
                                  <Badge variant="secondary" className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600">
                                    +{recipientCustomers.length - 4} kişi daha
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] uppercase tracking-wider text-gray-400 w-16 shrink-0">Konu</span>
                              <span className="text-sm font-semibold text-gray-900">
                                {campaignForm.emailSubject || "(Konu girilmedi)"}
                              </span>
                            </div>
                          </div>

                          {/* Email Body */}
                          <div className="bg-white p-6">
                            {/* Company Logo Header */}
                            <div className="flex items-center gap-3 pb-4 mb-5 border-b border-gray-100">
                              <AvitechLogo className="h-8 w-auto" />
                              <div>
                                <p className="text-xs font-semibold text-gray-900">AVİTECH METAL TEKNOLOJİLERİ</p>
                                <p className="text-[10px] text-gray-400">Stok Tanıtım E-Postası</p>
                              </div>
                            </div>

                            {/* Email Text */}
                            <div className="whitespace-pre-wrap text-sm text-gray-700 mb-6">
                              {campaignForm.emailContent || (
                                <span className="text-gray-400 italic">E-posta içeriği "Düzenle" sekmesinden girilebilir.</span>
                              )}
                            </div>

                            {/* Machines Section */}
                            {selectedMachineObjects.length > 0 && (
                              <div className="mt-4 pt-5 border-t border-gray-100">
                                <div className="flex items-center gap-2 mb-4">
                                  <div className="h-7 w-7 rounded-md bg-gray-900 flex items-center justify-center">
                                    <Cog className="h-3.5 w-3.5 text-white" />
                                  </div>
                                  <p className="text-sm font-semibold text-gray-900">
                                    Stoktaki Makinelerimiz ({selectedMachineObjects.length})
                                  </p>
                                </div>
                                <div className="space-y-2.5">
                                  {selectedMachineObjects.map((machine, idx) => machine && (
                                    <div key={machine.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                      <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-start gap-3">
                                          <div className="h-8 w-8 rounded-lg bg-gray-900 flex items-center justify-center text-xs font-semibold text-white shrink-0 mt-0.5">
                                            {idx + 1}
                                          </div>
                                          <div>
                                            <p className="text-sm font-semibold text-gray-900">
                                              {machine.brand} — {machine.name}
                                            </p>
                                            <div className="grid grid-cols-3 gap-x-6 gap-y-1 mt-2">
                                              <div>
                                                <span className="text-[10px] uppercase tracking-wider text-gray-400">Model</span>
                                                <p className="text-xs font-medium text-gray-700">{machine.machineType}</p>
                                              </div>
                                              <div>
                                                <span className="text-[10px] uppercase tracking-wider text-gray-400">Seri No</span>
                                                <p className="text-xs font-medium text-gray-700 font-mono">{machine.serialNo}</p>
                                              </div>
                                              <div>
                                                <span className="text-[10px] uppercase tracking-wider text-gray-400">Üretim Yılı</span>
                                                <p className="text-xs font-medium text-gray-700">{machine.year}</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <Badge variant="secondary" className={`text-[10px] shrink-0 ${
                                          machine.status === "active" 
                                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                                            : "bg-gray-100 text-gray-500"
                                        }`}>
                                          {machine.status === "active" ? "Stokta" : "Tamamlandı"}
                                        </Badge>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Email Footer */}
                            <div className="mt-8 pt-4 border-t border-gray-200">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="text-xs font-semibold text-gray-700">Avitech Metal Teknolojileri</p>
                                  <p className="text-[10px] text-gray-400 mt-0.5">info@avitech.com.tr | +90 (212) 000 00 00</p>
                                  <p className="text-[10px] text-gray-400">İstanbul, Türkiye</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-[10px] text-gray-300">
                                    {campaignForm.name || ""}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── Send Confirmation Summary ── */}
                    <div className={`rounded-xl p-4 transition-all ${
                      campaignForm.emailSubject && campaignForm.emailContent
                        ? "bg-emerald-50 border border-emerald-200"
                        : "bg-amber-50 border border-amber-200"
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          campaignForm.emailSubject && campaignForm.emailContent
                            ? "bg-emerald-100"
                            : "bg-amber-100"
                        }`}>
                          {campaignForm.emailSubject && campaignForm.emailContent ? (
                            <MailOpen className="h-4 w-4 text-emerald-700" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-amber-700" />
                          )}
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${
                            campaignForm.emailSubject && campaignForm.emailContent
                              ? "text-emerald-900" : "text-amber-900"
                          }`}>
                            {campaignForm.emailSubject && campaignForm.emailContent
                              ? `${recipientCustomers.length} müşteriye stok tanıtım e-postası gönderilmeye hazır`
                              : "E-posta konusu ve içeriği doldurulmalıdır"}
                          </p>
                          <p className={`text-xs ${
                            campaignForm.emailSubject && campaignForm.emailContent
                              ? "text-emerald-700" : "text-amber-700"
                          }`}>
                            {campaignForm.emailSubject && campaignForm.emailContent
                              ? `${selectedMachineObjects.length} makine tanıtıma dahil edildi — "Oluştur ve Gönder" ile tamamlayabilirsiniz`
                              : `"Düzenle" sekmesinden e-posta bilgilerini girin veya "Otomatik Oluştur" butonunu kullanın`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })()}
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3 justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCampaignModal(false);
                    setCampaignStep(1);
                    setMachineSearchQuery("");
                    setShowEmailPreview(false);
                    setStep3SummaryExpanded(false);
                  }}
                >
                  İptal
                </Button>
                
                <div className="flex gap-3">
                  {campaignStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => setCampaignStep(prev => prev - 1)}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Geri
                    </Button>
                  )}
                  
                  {campaignStep < 3 ? (
                    <Button
                      className="bg-gray-900 hover:bg-gray-800 text-white"
                      onClick={() => {
                        if (campaignStep === 1) {
                          if (!campaignForm.name) {
                            toast.error("Lütfen tanıtım adını doldurun");
                            return;
                          }
                          if (campaignForm.customerSelection === "selected" && campaignForm.selectedCustomers.length === 0) {
                            toast.error("Lütfen en az bir müşteri seçin");
                            return;
                          }
                        }
                        if (campaignStep === 2 && campaignForm.selectedMachines.length === 0) {
                          toast.error("Lütfen en az bir makine seçin");
                          return;
                        }
                        setCampaignStep(prev => prev + 1);
                      }}
                    >
                      Devam Et
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  ) : (
                    <Button
                      className="bg-gray-900 hover:bg-gray-800 text-white"
                      onClick={handleSaveCampaign}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {selectedCampaign ? "Güncelle ve Gönder" : "Oluştur ve Gönder"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Campaign Details Modal */}
      {showCampaignDetailsModal && selectedCampaign && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowCampaignDetailsModal(false)} />
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden pointer-events-auto" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-6 flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">Tanıtım Gönderim Detayları</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    onClick={() => setShowCampaignDetailsModal(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-gray-200 text-sm">
                  Tanıtım bilgilerini görüntüleyin
                </p>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Tanıtım Adı</Label>
                      <p className="font-semibold text-gray-900">{selectedCampaign.name}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Tanıtım ID</Label>
                      <p className="font-semibold text-gray-900">{selectedCampaign.id}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Gönderim Durumu and Customer Selection */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label className="text-xs text-gray-500 mb-2 block">Gönderim Durumu</Label>
                      <Badge 
                        variant={selectedCampaign.isSent ? "default" : "secondary"}
                        className={`${selectedCampaign.isSent ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"} text-sm px-4 py-2`}
                      >
                        {selectedCampaign.isSent ? "GÖNDERİLDİ" : "TASLAK"}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-2 block">Müşteri Hedefi</Label>
                      <Badge 
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 text-sm px-4 py-2"
                      >
                        {selectedCampaign.customerSelection === "all" ? "Tüm Müşteriler" : "Seçili Müşteriler"}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  {/* Campaign Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-gray-500 mb-1 block">Oluşturulma Tarihi</Label>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          <span className="font-semibold text-gray-900">{selectedCampaign.createdDate || "-"}</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500 mb-1 block">Müşteri Seçimi</Label>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span className="font-semibold text-gray-900">{selectedCampaign.customerSelection === "all" ? "Tüm Müşteriler" : `${selectedCampaign.selectedCustomers?.length || 0} Müşteri`}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Selected Machines */}
                  <div>
                    <Label className="text-xs text-gray-500 mb-3 block">Dahil Edilen Makineler</Label>
                    <div className="space-y-3">
                      {selectedCampaign.selectedMachines && selectedCampaign.selectedMachines.length > 0 ? (
                        selectedCampaign.selectedMachines.map(machineId => {
                          const machine = mockProjects.find(p => p.id === machineId);
                          return machine ? (
                            <div key={machine.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Package className="h-4 w-4 text-gray-700" />
                                    <span className="font-semibold text-gray-900">{machine.brand} - {machine.name}</span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 ml-6">
                                    <div>Model: {machine.machineType}</div>
                                    <div>Seri No: {machine.serialNo}</div>
                                    <div>Yıl: {machine.year}</div>
                                    <div>Müşteri: {machine.customer}</div>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="shrink-0"
                                  onClick={() => {
                                    toast.info(`Makine Detayları: ${machine.brand} ${machine.machineType}`);
                                  }}
                                >
                                  <Info className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ) : null;
                        })
                      ) : (
                        <p className="text-gray-500 text-sm">Henüz makine eklenmemiş</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Selected Customers */}
                  <div>
                    <Label className="text-xs text-gray-500 mb-3 block">Gönderilen Müşteriler</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedCampaign.selectedCustomers && selectedCampaign.selectedCustomers.length > 0 ? (
                        selectedCampaign.selectedCustomers.map(customerId => {
                          const customer = mockCustomers.find(c => c.id === customerId);
                          return customer ? (
                            <div key={customer.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Users className="h-4 w-4 text-gray-700" />
                                <span className="font-semibold text-sm text-gray-900">{customer.name}</span>
                              </div>
                              <div className="space-y-1 ml-6">
                                <p className="text-xs text-gray-600">{customer.company}</p>
                                <p className="text-xs text-gray-500">{customer.email}</p>
                              </div>
                            </div>
                          ) : null;
                        })
                      ) : (
                        <p className="text-gray-500 text-sm col-span-2">Henüz müşteri eklenmemiş</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Description */}
                  <div>
                    <Label className="text-xs text-gray-500 mb-2 block">Tanıtım Açıklaması</Label>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">{selectedCampaign.description}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Created Date */}
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Oluşturulma Tarihi</Label>
                    <p className="text-gray-700">{selectedCampaign.createdDate}</p>
                  </div>

                  {/* Sent Status */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-800">Bu tanıtım e-postası müşterilere gönderilmiştir</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end flex-shrink-0">
                <Button
                  className="bg-gray-900 hover:bg-gray-800 text-white"
                  onClick={() => setShowCampaignDetailsModal(false)}
                >
                  Kapat
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      
      <div className="flex h-screen bg-gray-50">
        {renderSidebar()}
        
        <div className="flex-1 overflow-hidden">
          {currentPage === "proje-muhasebesi" && !selectedProject && renderProjectCards()}
          {currentPage === "proje-muhasebesi" && selectedProject && renderCostDetailForm()}
          {currentPage === "kampanya-yonetimi" && renderCampaignManagement()}
          {currentPage !== "proje-muhasebesi" && currentPage !== "kampanya-yonetimi" && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Bu sayfa yapım aşamasındadır</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
