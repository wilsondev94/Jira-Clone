export interface AvatarProps {
  image?: string;
  name: string;
  className?: string;
  fallbackClassName?: string;
}

export interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date) => void;
  className?: string;
  placeholder?: string;
}
