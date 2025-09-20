import { type JSX } from 'react';
import { Button } from '@ftdata/ui';

interface MyButtonProps {
  action: () => void;
  iconType?: 'add' | 'delete' | 'edit';
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  backgroundColor?: string;
}

export function MyButton({
  action,
  iconType,
  title,
  variant = 'primary',
  backgroundColor,
}: MyButtonProps): JSX.Element {
  // Definir cor de fundo baseada no variant ou iconType
  if (variant === 'danger') {
    backgroundColor = '#C13E4A';
  } else if (iconType === 'delete') {
    backgroundColor = '#C13E4A';
  } else {
    backgroundColor = backgroundColor || '';
  }

  return (
    <Button
      style={{
        backgroundColor: backgroundColor,
        height: '40px',
        outline: 'none',
        color: variant === 'danger' ? '#FFFFFF' : undefined,
      }}
      variant={variant === 'danger' ? 'primary' : variant}
      onClick={action}
    >
      {title}
    </Button>
  );
}
