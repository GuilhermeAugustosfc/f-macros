import React from 'react';
import { TimeContainer, TimeLabel, TimeInput } from './styles';

interface TimeSelectorProps {
    label: string;
    time: {
        hour: string;
        minute: string;
        second: string;
    };
    onChange: (time: { hour: string; minute: string; second: string }) => void;
}

export const TimeSelector: React.FC<TimeSelectorProps> = ({ label, time, onChange }) => {
    // Converter o objeto time para formato HH:mm:ss
    const timeValue = `${time.hour.padStart(2, '0')}:${time.minute.padStart(2, '0')}:${time.second.padStart(2, '0')}`;

    const handleTimeChange = (value: string) => {
        // Dividir o valor do input time em horas, minutos e segundos
        const [hour, minute, second] = value.split(':');

        onChange({
            hour: hour || '00',
            minute: minute || '00',
            second: second || '00',
        });
    };

    return (
        <TimeContainer>
            <TimeLabel>{label}</TimeLabel>
            <TimeInput type="time" step="1" value={timeValue} onChange={(e) => handleTimeChange(e.target.value)} />
        </TimeContainer>
    );
};
