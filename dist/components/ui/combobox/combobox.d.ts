import * as React from 'react';
export interface ComboboxOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export interface ComboboxProps {
    options: ComboboxOption[];
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    className?: string;
    disabled?: boolean;
}
declare const Combobox: React.ForwardRefExoticComponent<ComboboxProps & React.RefAttributes<HTMLButtonElement>>;
export interface ComboboxMultiProps {
    options: ComboboxOption[];
    value?: string[];
    onValueChange?: (value: string[]) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    className?: string;
    disabled?: boolean;
    maxSelected?: number;
}
declare const ComboboxMulti: React.ForwardRefExoticComponent<ComboboxMultiProps & React.RefAttributes<HTMLButtonElement>>;
export { Combobox, ComboboxMulti };
//# sourceMappingURL=combobox.d.ts.map