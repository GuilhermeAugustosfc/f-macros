import React, { useState, useMemo, type RefObject } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

import { TransitionContainer } from './TransitionContainer';
import { useTranslation } from '@ftdata/core';
import {
  DownloadGrossoIcon,
  EmailIcon,
  ExcelIcon,
  GraficoIcon,
  HelperIcon,
  PDFIcon,
  RelatoriosIcon,
} from 'src/pages/MacrosReport/components/svg';
import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';
import { Checkbox, Button } from '@ftdata/ui';
import { useToast } from 'src/contexts/toast';
import { useSettings } from '@ftdata/core';
import { getAddress, type IaddressReverseResponse } from 'src/components/Tracking/utils/common';
import { type ContentHandle } from '../Content';

interface Props {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  hasPDF?: boolean;
  params?: any;
  contentRef?: RefObject<ContentHandle>;
}

interface ExportOptions {
  isPDFSelected: boolean;
  isRelatoriosSelected: boolean;
  isGraficosSelected: boolean;
  isXLSSelected: boolean;
  exportByDownload: boolean;
  exportByEmail: boolean;
}

interface PDFOptions {
  scale: number;
  useCORS: boolean;
  logging: boolean;
  allowTaint: boolean;
  backgroundColor: string;
}

export const DownloadModal: React.FC<Props> = ({
  isOpen,
  open,
  close,
  hasPDF = true,
  params,
  contentRef,
}: Props) => {
  const { t } = useTranslation('114');
  const { user } = useSettings();
  const unidadeVolume = user?.unit_volume == 'litro' ? 'L' : 'Gal';
  const unidadeMedida = user?.unit_length == 'quilometro' ? 'km' : 'mi';
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    isPDFSelected: false,
    isRelatoriosSelected: false,
    isGraficosSelected: false,
    isXLSSelected: false,
    exportByDownload: false,
    exportByEmail: false,
  });

  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const toggleOption = (key: keyof ExportOptions) => {
    setExportOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isExportAvailable = useMemo(() => {
    const { isPDFSelected, isXLSSelected, exportByDownload, exportByEmail } = exportOptions;
    return (isPDFSelected || isXLSSelected) && (exportByDownload || exportByEmail);
  }, [exportOptions]);

  const handleExport = async () => {
    setLoading(true);
    const { exportByDownload, exportByEmail } = exportOptions;

    try {
      if (exportByDownload) {
        await handleDownload();
      }
      if (exportByEmail) {
        await handleEmail();
      }
      close();
    } catch (error) {
      console.error('Erro ao exportar:', error);
      // Aqui você pode adicionar um toast/notificação de erro
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    const { isPDFSelected, isXLSSelected, isGraficosSelected, isRelatoriosSelected } =
      exportOptions;

    // Se o usuário deseja exportar gráficos, prepara a aba e garante carregamento
    if (isGraficosSelected && contentRef?.current) {
      // Prepara os gráficos para exportação
      // Os dados já cacheados serão utilizados automaticamente pelo React Query
      // Isso evita requisições desnecessárias se os gráficos já foram abertos antes
      await contentRef.current.prepareGraphicsForExport();
    }

    // Exportações em PDF
    if (isPDFSelected) {
      // Gráficos
      if (isGraficosSelected) {
        await generatePDF();
      }

      // Relatórios tabulares
      if (isRelatoriosSelected && params) {
        await generatePDFWithAutoTable();
      }
    }

    // Exportação em Excel (somente relatórios)
    if (isXLSSelected && params) {
      await generateExcel(params);
    }

    // Reseta estilos de exportação
    if (isGraficosSelected && contentRef?.current?.resetExportStyles) {
      contentRef.current.resetExportStyles();
    }
  };

  const generatePDF = async () => {
    // Captura de PDFs por gráfico individual, garantindo múltiplas páginas
    const chartElements = document.querySelectorAll<HTMLDivElement>('.vehicle-chart-export');
    if (chartElements.length === 0) return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // Margem de 10mm de cada lado
    const pdfHeight = pdf.internal.pageSize.getHeight() - 20; // Margem de 10mm superior/inferior
    let currentY = 10; // Início após margem superior

    const pdfOptions: PDFOptions = {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
      backgroundColor: '#ffffff',
    };

    try {
      for (let i = 0; i < chartElements.length; i++) {
        const el = chartElements[i];
        const canvas = await html2canvas(el, pdfOptions);
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Adiciona nova página se não couber na página atual
        if (currentY + imgHeight > pdfHeight + 10) {
          pdf.addPage();
          currentY = 10;
        }

        pdf.addImage(imgData, 'JPEG', 10, currentY, imgWidth, imgHeight, undefined, 'FAST');
        currentY += imgHeight + 10; // 10mm de espaço entre gráficos
      }

      pdf.save('relatorio-graficos.pdf');

      showToast({
        title: 'Sucesso!',
        message: 'Download do PDF finalizado com sucesso.',
        subMessage: 'Verifique a caixa de entrada do seu computador.',
        timeInfo: 'Gerado agora mesmo',
        type: 'success',
      });
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      showToast({
        title: 'Erro!',
        message: 'Não foi possível gerar o PDF',
        timeInfo: 'Agora',
        type: 'error',
      });
    }
  };

  const handleEmail = async () => {
    await sendEmail();
  };

  function sendEmail() {
    console.log(
      `send email ${exportOptions.isXLSSelected ? 'XLS' : ''} ${exportOptions.isPDFSelected ? 'PDF' : ''}`,
    );
  }

  // Novo método para gerar PDF com jsPDF + autoTable
  const generatePDFWithAutoTable = async () => {
    try {
      if (!params) return;
      // Fazer a requisição para obter os dados usando exportReport
      const response = await exportReport(params);
      const data = response.data;

      // Criar o documento PDF
      const doc = new jsPDF('l', 'mm', 'a4');
      let currentY = 10;

      // Cabeçalho do relatório
      doc.setFontSize(14);
      doc.text('Relatório de Combustível', 14, currentY);
      currentY += 10;

      // Mapeamento de colunas
      const columnMapping = {
        abastecimentos: { header: t('supply'), key: 'supply_liters' },
        consumo_desligado: { header: t('consumption_off'), key: 'consuption_off' },
        consumo_km_hora: {
          header: `${t('consumption')} ${unidadeMedida}/h`,
          key: 'comsuption_km_h',
        },
        consumo_litro_hora: { header: `${t('consumption')} L/H`, key: 'consumption_l_h' },
        consumo_movimento: { header: t('consumption_on_the_move'), key: 'movement_comsuption' },
        consumo_ocioso: { header: t('idle_consumption'), key: 'idle_comsuption' },
        drenagens: { header: t('drainage'), key: 'draining_liters' },
        hodometro: { header: t('hodometro'), key: 'odometer' },
        horimetro: { header: t('horimeter'), key: 'hourmeter' },
        volume_total_consumido: { header: t('consumption'), key: 'comsuption' },
      };

      for (const item of data) {
        // Filtrar colunas selecionadas
        const selectedColumns = Object.entries(params.options.colunas)
          .filter(([_, value]) => value === 1)
          .map(([key]) => key);

        // Criar headers e rows apenas com as colunas selecionadas
        const mainHeaders = [
          t('vehicle'),
          t('plate'),
          t('tank'),
          ...selectedColumns.map((col) => columnMapping[col]?.header || col),
        ];
        const mainRow = [
          item.tabela.ativo_desc,
          item.tabela.ativo_plate,
          item.tabela.tanks_name.join(', '),
          ...selectedColumns.map((col) => item.tabela[columnMapping[col]?.key || col]),
        ];

        autoTable(doc, {
          head: [mainHeaders],
          body: [mainRow],
          startY: currentY,
          theme: 'grid',
          headStyles: {
            fontSize: 8,
            fillColor: [44, 62, 80],
            textColor: 255,
            halign: 'center',
            valign: 'middle',
            fontStyle: 'bold',
          },
          styles: {
            fontSize: 7,
            cellPadding: 2,
            halign: 'center',
            valign: 'middle',
          },
          alternateRowStyles: { fillColor: [240, 240, 240] },
          margin: { left: 14, right: 14 },
          didDrawPage: (data) => {
            if (data.cursor) {
              currentY = data.cursor.y + 10;
            }
          },
        });

        // Sub-tabela com os logs
        if (item.tabela.subtabela && item.tabela.subtabela.length > 0) {
          // Título da sub-tabela
          doc.setFontSize(12);
          doc.text(
            `${t('vehicle')}: ${item.tabela.ativo_desc} (${item.tabela.ativo_plate})`,
            14,
            currentY,
          );
          currentY += 6;

          // Definir colunas da sub-tabela com base nas opções selecionadas
          const subHeaders = [
            t('dt_gps'),
            t('driver'),
            t('status'),
            `${t('speed')} ${unidadeMedida}/h`,
            `${t('supply')} ${unidadeVolume}`,
            `${t('drainage')} ${unidadeVolume}`,
            t('address'),
            `${t('fuel_level')} ${unidadeVolume}`,
            `${t('tank_capacity2')} ${unidadeVolume}`,
          ];

          // Adicionar colunas condicionais
          if (params.options.fence === 1) {
            subHeaders.push(t('fence'));
          }
          if (params.options.ponto_referencia === 1) {
            subHeaders.push(t('reference_point'));
          }
          if (params.options.preco_combustivel === 1) {
            subHeaders.push(t('cost'));
          }

          // Preparar os dados para conversão de endereços
          const addressParams = item.tabela.subtabela.map((log: Subtabela, index: number) => ({
            code: index,
            latitude: log.loc[0],
            longitude: log.loc[1],
          }));

          // Converter coordenadas em endereços
          const addressFormated = await new Promise<IaddressReverseResponse>((resolve) => {
            getAddress(addressParams, (addresses) => {
              resolve(addresses);
            });
          });

          const subRows = item.tabela.subtabela.map((log: Subtabela, index: number) => {
            const driver = log.driver === 'PADRAO' ? '-' : log.driver;
            let rowColor: string | undefined = undefined;
            if (log.events === 'supply') {
              rowColor = '#DAF1E9';
            } else if (log.events === 'draining') {
              rowColor = '#FBE5E9';
            }
            // Status traduzido
            let statusDesc = '-';
            if (log.status === 0) statusDesc = t('off_status');
            else if (log.status === 1) statusDesc = t('on_status');
            else if (log.status === 2) statusDesc = t('moving_status');
            const baseRow = [
              log.data,
              driver,
              statusDesc,
              log.speed,
              log.supply,
              log.draining,
              addressFormated[index] || '',
              log.fuel_level,
              log.capacity,
            ];
            if (params.options.fence === 1) {
              baseRow.push(log.fence?.length ? log.fence.join(', ') : '-');
            }
            if (params.options.ponto_referencia === 1) {
              baseRow.push(log.reference_point?.length ? log.reference_point.join(', ') : '-');
            }
            if (params.options.preco_combustivel === 1) {
              baseRow.push(`$${log.coust}`);
            }
            return { row: baseRow, rowColor };
          });

          autoTable(doc, {
            head: [subHeaders],
            body: subRows.map((r) => r.row),
            startY: currentY,
            theme: 'striped',
            styles: { fontSize: 7 },
            margin: { left: 14, right: 14 },
            didDrawPage: (data) => {
              if (data.cursor) {
                currentY = data.cursor.y + 10;
              }
            },
            didParseCell: function (data) {
              if (data.section === 'body') {
                const rowIndex = data.row.index;
                const rowColor = subRows[rowIndex]?.rowColor;
                if (rowColor) {
                  data.cell.styles.fillColor = rowColor;
                }
              }
            },
          });
        }
      }

      // Salvar o PDF
      doc.save('relatorio-combustivel.pdf');

      showToast({
        title: 'Sucesso!',
        message: 'Download finalizado com sucesso.',
        subMessage: 'Verifique a caixa de entrada do seu computador.',
        timeInfo: 'Gerado agora mesmo',
        type: 'success',
      });
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      showToast({
        title: 'Erro!',
        message: 'Não foi possível gerar o PDF',
        timeInfo: 'Agora',
        type: 'error',
      });
    }
  };

  // Função para exportar Excel
  const generateExcel = async (params: ReportInsertData) => {
    try {
      // Buscar os dados
      const response = await exportReport(params);
      const data = response.data;
      if (!data || data.length === 0) {
        showToast({
          title: 'Erro!',
          message: 'Nenhum dado para exportar.',
          type: 'error',
        });
        return;
      }

      // Mapeamento de colunas
      const columnMapping = {
        abastecimentos: { header: t('supply'), key: 'supply_liters' },
        consumo_desligado: { header: t('consumption_off'), key: 'consuption_off' },
        consumo_km_hora: {
          header: `${t('consumption')} ${unidadeMedida}/h`,
          key: 'comsuption_km_h',
        },
        consumo_litro_hora: { header: `${t('consumption')} L/H`, key: 'consumption_l_h' },
        consumo_movimento: { header: t('consumption_on_the_move'), key: 'movement_comsuption' },
        consumo_ocioso: { header: t('idle_consumption'), key: 'idle_comsuption' },
        drenagens: { header: t('drainage'), key: 'draining_liters' },
        hodometro: { header: t('odometer'), key: 'odometer' },
        horimetro: { header: t('hourmeter'), key: 'hourmeter' },
        volume_total_consumido: { header: t('consumption'), key: 'comsuption' },
      };

      // Cabeçalhos da sub-tabela (logs)
      const subHeaders = [
        t('dt_gps'),
        t('driver'),
        t('status'),
        `${t('speed')} ${unidadeMedida}/h`,
        `${t('supply')} ${unidadeVolume}`,
        `${t('drainage')} ${unidadeVolume}`,
        t('address'),
        `${t('fuel_level')} ${unidadeVolume}`,
        `${t('tank_capacity2')} ${unidadeVolume}`,
      ];

      // Adicionar colunas condicionais aos subHeaders
      if (params.options.fence === 1) {
        subHeaders.push(t('fence'));
      }
      if (params.options.ponto_referencia === 1) {
        subHeaders.push(t('reference_point'));
      }
      if (params.options.preco_combustivel === 1) {
        subHeaders.push(t('cost'));
      }

      // Definir colunas selecionadas do cabeçalho principal
      const selectedColumns = Object.entries(params.options.colunas)
        .filter(([_, value]) => value === 1)
        .map(([key]) => key)
        .filter((col) => col !== 'events');

      // Criar array com todos os cabeçalhos principais
      const mainHeadersArray = [
        t('vehicle'),
        t('plate'),
        ...selectedColumns.map((col) => columnMapping[col]?.header || col),
      ];

      // Determinar o número máximo de colunas entre cabeçalho principal e subtabela
      const maxColumns = Math.max(mainHeadersArray.length, subHeaders.length);

      // Montar as linhas para o Excel
      const rows: any[][] = [];

      // Cabeçalho principal (apenas uma vez) - ajustado para ter o número máximo de colunas
      const mainHeaderRow = [...mainHeadersArray];
      while (mainHeaderRow.length < maxColumns) {
        mainHeaderRow.push(''); // Preencher com vazio até ter o número máximo de colunas
      }
      rows.push(mainHeaderRow);

      for (const item of data) {
        // Linha principal do veículo - ajustada para ter o número máximo de colunas
        const mainRow = [
          item.tabela.ativo_desc,
          item.tabela.ativo_plate,
          ...selectedColumns.map((col) => {
            let value = item.tabela[columnMapping[col]?.key || col];
            if (col === 'driver' && value === 'PADRAO') value = '-';
            return value;
          }),
        ];
        while (mainRow.length < maxColumns) {
          mainRow.push(''); // Preencher com vazio até ter o número máximo de colunas
        }
        rows.push(mainRow);

        // Se houver subtabela (logs), buscar endereços e adicionar cabeçalho e linhas
        if (item.tabela.subtabela && item.tabela.subtabela.length > 0) {
          // Cabeçalho da sub-tabela - ajustado para ter o número máximo de colunas
          const subHeaderRow = [...subHeaders];
          while (subHeaderRow.length < maxColumns) {
            subHeaderRow.push(''); // Preencher com vazio até ter o número máximo de colunas
          }
          rows.push(subHeaderRow);

          // Buscar endereços
          const addressParams = item.tabela.subtabela.map((log: Subtabela, index: number) => ({
            code: index,
            latitude: log.loc[0],
            longitude: log.loc[1],
          }));

          const addressFormated = await new Promise<IaddressReverseResponse>((resolve) => {
            getAddress(addressParams, (addresses) => {
              resolve(addresses);
            });
          });

          // Adiciona linhas dos logs
          for (let logIdx = 0; logIdx < item.tabela.subtabela.length; logIdx++) {
            const log = item.tabela.subtabela[logIdx];
            const driver = log.driver === 'PADRAO' ? '-' : log.driver;
            // Status traduzido
            let statusDesc = '-';
            if (log.status === 0) statusDesc = t('off');
            else if (log.status === 1) statusDesc = t('on');
            else if (log.status === 2) statusDesc = t('moving');
            // Descrição do evento
            let eventDesc = 'normal';
            if (log.events === 'supply') eventDesc = t('supply');
            else if (log.events === 'drainage') eventDesc = t('drainage');

            const logRow = [
              log.data,
              driver,
              statusDesc,
              log.speed,
              log.supply,
              log.draining,
              addressFormated[logIdx] || '',
              log.fuel_level,
              log.capacity,
              eventDesc,
            ];

            // Adicionar colunas condicionais
            if (params.options.fence === 1) {
              logRow.push(log.fence?.length ? log.fence.join(', ') : '-');
            }
            if (params.options.ponto_referencia === 1) {
              logRow.push(log.reference_point?.length ? log.reference_point.join(', ') : '-');
            }
            if (params.options.preco_combustivel === 1) {
              logRow.push(`$${log.coust}`);
            }

            // Ajustar para ter o número máximo de colunas
            while (logRow.length < maxColumns) {
              logRow.push(''); // Preencher com vazio até ter o número máximo de colunas
            }

            rows.push(logRow);
          }
        }
      }

      // Criar a planilha usando array bidimensional
      const worksheet = XLSX.utils.aoa_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, 'relatorio-combustivel.xlsx');
      showToast({
        title: 'Sucesso!',
        message: 'Download do Excel finalizado com sucesso.',
        type: 'success',
      });
    } catch (error) {
      console.error('Erro ao gerar Excel:', error);
      showToast({
        title: 'Erro!',
        message: 'Não foi possível gerar o Excel',
        type: 'error',
      });
    }
  };

  return (
    <StyledTransitionContainer isOpen={isOpen} close={close} open={open}>
      <StyledContainer>
        <StyledFormControl>
          <StyledTitle>{t('document_you_want_to_export')}</StyledTitle>
          <StyledFlexContainer>
            <StyledCheckboxContainer onClick={() => toggleOption('isRelatoriosSelected')}>
              <StyledInputContainer>
                <Checkbox
                  label=""
                  onChange={() => toggleOption('isRelatoriosSelected')}
                  checked={exportOptions.isRelatoriosSelected}
                />
                <RelatoriosIcon /> {t('reports')}
              </StyledInputContainer>
            </StyledCheckboxContainer>
            <StyledCheckboxContainer onClick={() => toggleOption('isGraficosSelected')}>
              <StyledInputContainer>
                <Checkbox
                  label=""
                  onChange={() => toggleOption('isGraficosSelected')}
                  checked={exportOptions.isGraficosSelected}
                />
                <GraficoIcon /> {t('graphics')}
              </StyledInputContainer>
            </StyledCheckboxContainer>
          </StyledFlexContainer>
        </StyledFormControl>

        <StyledFormControl>
          <StyledLabel htmlFor="">
            {t('shipping_format')} <StyledSpan>*</StyledSpan>
          </StyledLabel>
          <StyledInputsContainer>
            {hasPDF && (
              <StyledInputContainer onClick={() => toggleOption('isPDFSelected')}>
                <Checkbox
                  onChange={() => toggleOption('isPDFSelected')}
                  label=""
                  checked={exportOptions.isPDFSelected}
                />
                PDF <PDFIcon />
              </StyledInputContainer>
            )}
            {!exportOptions.isGraficosSelected && (
              <StyledInputContainer onClick={() => toggleOption('isXLSSelected')}>
                <Checkbox
                  onChange={() => toggleOption('isXLSSelected')}
                  label=""
                  checked={exportOptions.isXLSSelected}
                />
                Excel <ExcelIcon />
              </StyledInputContainer>
            )}
          </StyledInputsContainer>
        </StyledFormControl>

        <StyledFormControl>
          <StyledLabel>
            {t('actions')}: <StyledSpan>*</StyledSpan>
          </StyledLabel>

          <StyledInputsContainer>
            <StyledInputBox onClick={() => toggleOption('exportByDownload')}>
              <div style={{ display: 'block', paddingLeft: '16px' }}>
                <Checkbox
                  onChange={() => toggleOption('exportByDownload')}
                  label=""
                  checked={exportOptions.exportByDownload}
                />
              </div>
              <DownloadContainer>
                <DownloadGrossoIcon stroke="#6B757C" />
                {t('download')}
              </DownloadContainer>
            </StyledInputBox>

            <StyledInputBox onClick={() => toggleOption('exportByEmail')}>
              <div style={{ display: 'block', paddingLeft: '16px' }}>
                <Checkbox
                  label=""
                  onChange={() => toggleOption('exportByEmail')}
                  checked={exportOptions.exportByEmail}
                />
              </div>
              <EmailContainer>
                <EmailIcon />
                {t('email')}
              </EmailContainer>
            </StyledInputBox>
          </StyledInputsContainer>
        </StyledFormControl>

        {exportOptions.exportByEmail && (
          <StyledEmailBox>
            <StyledLabel htmlFor="emails">E-mails</StyledLabel>
            <StyledTextArea name="emails" />
            <StyledHelperText>
              <HelperIcon />
              {t('separate_the_emails_to_add_with_a_comma')}
            </StyledHelperText>
          </StyledEmailBox>
        )}

        <Button
          style={{ width: '100%', marginBottom: '1rem' }}
          variant="primary"
          disabled={!isExportAvailable || loading}
          loading={loading}
          onClick={handleExport}
        >
          {t('complete')}
        </Button>

        <Button
          style={{ width: '100%', marginBottom: '1rem' }}
          variant="secondary"
          onClick={close}
          disabled={loading}
        >
          {t('cancel')}
        </Button>
      </StyledContainer>
    </StyledTransitionContainer>
  );
};

const StyledCheckboxContainer = styled.div`
  cursor: pointer;
`;

const StyledTransitionContainer = styled(TransitionContainer)``;

const StyledContainer = styled.div`
  padding: 1.5rem;
  width: 100%;
`;

const StyledFormControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const StyledTitle = styled.div`
  color: #26333b;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  margin-bottom: 24px;
`;

const StyledFlexContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const StyledInputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const StyledLabel = styled.label`
  color: ${styleguide.COLOR_NEUTRAL_DUSK};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 120%;
  margin-bottom: 2rem;
`;

const StyledSpan = styled.span`
  color: ${styleguide.COLOR_DANGER_MEDIUM};
`;

const StyledInputsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;
  cursor: pointer;
`;

const StyledInputBox = styled.div`
  border-radius: 0.25rem;
  border: 1px solid #d5d8da;
  height: 8rem;
  width: 100%;
  align-items: flex-start;
  flex: 1;
  position: relative;
  gap: 0.5rem;

  color: ${styleguide.COLOR_NEUTRAL_DUSK};
  font-weight: 500;
  line-height: 150%;
  padding-top: 6px;
`;

const StyledEmailBox = styled.div``;

const StyledTextArea = styled.textarea`
  border-radius: 4px;
  border: 1px solid ${styleguide.COLOR_NEUTRAL_MEDIUM};
  resize: none;
  display: flex;
  height: 7.5rem;
  padding: 1rem;
  width: 100%;
  margin: 0.5rem 0;
`;

const StyledHelperText = styled.span`
  color: #8e969b;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
`;

const DownloadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg,
  path {
    stroke: #6b757c;
  }

  svg {
    width: 40px;
    height: 40px;
  }
`;

const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  svg,
  path {
    stroke: #6b757c;
  }

  svg {
    width: 40px;
    height: 40px;
  }
`;
