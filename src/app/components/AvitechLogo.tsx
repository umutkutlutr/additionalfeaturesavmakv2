import avitechLogoImg from "figma:asset/cf35c0c4273075d0a1b3097f51727caa94952ba9.png";

export function AvitechLogo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <img
      src={avitechLogoImg}
      alt="Avitech Metal Teknolojileri"
      className={className}
    />
  );
}
