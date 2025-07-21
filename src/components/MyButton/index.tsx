import { type JSX } from 'react';
import { Button } from '@ftdata/ui';

interface MyButtonProps {
  action: () => void;
  iconType?: 'add' | 'delete' | 'edit';
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  backgroundColor?: string;
}

export function MyButton({
  action,
  iconType,
  title,
  variant = 'primary',
  backgroundColor,
}: MyButtonProps): JSX.Element {
  backgroundColor = iconType === 'delete' ? '#C13E4A' : '';
  return (
    <Button
      style={{ backgroundColor: backgroundColor, height: '40px', outline: 'none' }}
      variant={variant}
      onClick={action}
    >
      {title}
    </Button>
  );
}
