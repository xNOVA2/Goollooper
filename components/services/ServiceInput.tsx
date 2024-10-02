import { Input } from "../ui/input";

interface ServiceInputProps {
  title?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const ServiceInput: React.FC<ServiceInputProps> = ({
  title,
  value,
  onChange,
}) => {
  return (
    <div className="mt-3">
      {title && (
        <h4 className="text-[0.625rem] leading-[0.938rem] font-normal">
          {title}
        </h4>
      )}
      <Input
        placeholder="type here"
        className="h-[4.125rem] mt-[0.1rem] mb-[1.25rem] pl-[2.375rem] pt-[1.313rem] pb-[1.313rem] text-[0.875rem] leading-[1.313rem] shadow-custom bg-white border border-border focus-visible:outline-none focus-visible:ring-0"
        onChange={(e) => onChange && onChange(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default ServiceInput;
