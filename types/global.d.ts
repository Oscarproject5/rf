interface Window {
  track: (eventName: string, payload?: {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: any;
  }) => void;
}