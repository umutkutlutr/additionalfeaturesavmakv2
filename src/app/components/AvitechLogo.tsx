import avitechLogo from "../../assets/avitech-logo.png";

export function AvitechLogo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <img
      src={avitechLogo}
      alt="Avitech Metal Teknolojileri"
      className={className}
    />
  );
}
