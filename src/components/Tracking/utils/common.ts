import type { ICustomSelectOption } from '@ftdata/ui';
import { type QueryObserverResult, useQuery } from 'react-query';
import instance from 'src/services/instance';
import { getClients } from 'src/services/reports/filter';

export const getClientsReactQuery = (): QueryObserverResult<ICustomSelectOption[], unknown> => {
  return useQuery<ICustomSelectOption[]>('clients', getClients, {
    staleTime: 1000 * 60 * 30, // 30 minutos
  });
};

type IaddressReverse = {
  label?: string | undefined;
  code: number;
};

export type IaddressReverseResponse = {
  [code: number]: string;
};

type paramnsAddress = {
  code: number;
  latitude: number;
  longitude: number;
};

type Endereco = {
  code: number;
  latitude: number;
  longitude: number;
};

export const chunk = (arr: Endereco[], chunkSize: number): Endereco[][] => {
  if (chunkSize <= 0) throw 'Invalid chunk size';
  const chunkArray: Endereco[][] = [];
  for (let i = 0, len = arr.length; i < len; i += chunkSize)
    chunkArray.push(arr.slice(i, i + chunkSize));
  return chunkArray;
};

export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const getAddress = (
  paramnsAdress: paramnsAddress[],
  cb: (addressFormated: IaddressReverseResponse) => void,
): void => {
  const addressPromises = chunk(paramnsAdress, 1000).map((address) => {
    return new Promise((resolve: (value: IaddressReverse[]) => void, reject) => {
      instance
        .post('/address/v1/reverse/', address)
        .then((response) => {
          if (response) {
            const reverseAddress: IaddressReverse[] = response.data;
            resolve(reverseAddress);
          }
          reject(null);
        })
        .catch(() => {
          reject(null);
        });
    });
  });

  Promise.all(addressPromises)
    .then((reverseAddress: IaddressReverse[][]) => {
      const addressFormated = reverseAddress.reduce((init, value) => {
        return [...init, ...value];
      }, []);

      const addressCodeFormated: IaddressReverseResponse = {};

      for (const i in addressFormated) {
        const address = addressFormated[i];
        addressCodeFormated[address.code] = addressFormated[i].label || '';
      }

      cb(addressCodeFormated);
    })
    .catch(() => {
      cb([]);
    });
};

export const formatNumber = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
