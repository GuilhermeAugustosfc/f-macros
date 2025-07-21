import { Loading } from '@ftdata/ui';
import { ComponentLoading } from './styles';
import type { JSX } from 'react';

export default function LoadingFallback(): JSX.Element {
  return (
    <ComponentLoading className="loading-fallback">
      <div>
        <Loading
          id="loading"
          style={{
            position: 'relative',
            color: '#3b485b',
          }}
          size="xl"
          variant="light"
        />
      </div>
    </ComponentLoading>
  );
}
