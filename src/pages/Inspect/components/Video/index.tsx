import React, { useContext, useEffect, useRef, useState, type JSX } from 'react';
import { ContainerCardInformation, ContainterVideo } from './style';
import { Button } from '@ftdata/ui';
import { Icon } from '@ftdata/f-icons';
import { geturlVideo } from 'src/services/reports/playback';
import { TableContext } from 'src/contexts/table';
// import { capitalizeFirstLetter } from 'src/components/Tracking/utils/common';
import moment from 'moment';
import { t } from 'src/App';
import { capitalizeFirstLetter } from 'src/components/Tracking/utils/common';

type PropsVideo = {
  videoUrl: string | null;
  downloadVideos: (videoId: string[]) => void;
  setVideoUrl: React.Dispatch<React.SetStateAction<string | null>>;
};

const VideoComponent = ({ setVideoUrl, videoUrl, downloadVideos }: PropsVideo): JSX.Element => {
  const { dataSelected } = useContext(TableContext);
  const windowWidth = window.innerWidth - 470;
  const windowHeight = window.innerHeight - 410;

  const [position, setPosition] = useState({ x: windowWidth, y: windowHeight });
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [url, setUrl] = useState<string | null>(null);

  const getUrlVideoPlayback = async (videoUrl: string) => {
    try {
      const data = await geturlVideo(videoUrl);
      if (data.status == 200 && data.data && data.data.url) {
        setUrl(data.data.url);
      }
    } catch (error) {}
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsDragging(true);

    setInitialMousePos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - initialMousePos.x;
    const newY = e.clientY - initialMousePos.y;

    const limitadoX = Math.max(0, Math.min(newX, windowWidth));
    const limitadoY = Math.max(0, Math.min(newY, windowHeight));

    setPosition({ x: limitadoX, y: limitadoY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    function updateSize() {
      const limitadoX = Math.max(0, Math.min(position.x, windowWidth));
      const limitadoY = Math.max(0, Math.min(position.y, windowHeight));

      setPosition({
        x: limitadoX,
        y: limitadoY,
      });
    }

    window.addEventListener('resize', updateSize);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', updateSize);
    };
  }, [isDragging, position]);

  useEffect(() => {
    if (videoUrl == null) {
      setUrl(videoUrl);
      return;
    }

    if (videoRef.current && videoRef.current instanceof HTMLVideoElement) {
      videoRef.current?.load(); // Força o recarregamento do vídeo
    }

    if (videoUrl && videoUrl.length > 0) {
      getUrlVideoPlayback(videoUrl);
    }
  }, [videoUrl]);

  return url !== null && dataSelected !== null ? (
    <ContainterVideo
      positionX={position.x}
      positionY={position.y}
      dragging={isDragging}
      onMouseDown={handleMouseDown}
    >
      <div>
        <video width="300" ref={videoRef} src={url} preload="auto" controls autoPlay>
          <source src={url} type="video/mp4" />
          Seu navegador não suporta o elemento <code>video</code>.
        </video>
      </div>

      <ContainerCardInformation>
        <span>
          {dataSelected.ativo} - {dataSelected.plate} / {dataSelected.equipament_id}
        </span>
        <span> {dataSelected.channel_name} </span>
        <span>
          {capitalizeFirstLetter(
            moment(dataSelected.date_start, 'DD/MM/YYYY HH:mm:ss').format(
              'dddd, D [de] MMMM [de] YYYY',
            ),
          )}
        </span>
        <span>
          {moment(dataSelected.date_start, 'DD/MM/YYYY HH:mm:ss').format('HH:mm:ss')} -
          {moment(dataSelected.date_end, 'DD/MM/YYYY HH:mm:ss').format('HH:mm:ss')}
        </span>
      </ContainerCardInformation>

      <div>
        <Button variant="primary" onClick={() => downloadVideos(videoUrl ? [videoUrl] : [])}>
          <a download={true}>
            <Icon name="ui download-save-simple" color="#fff" />
            {t('download')}
          </a>
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setVideoUrl(null);
            setUrl(null);
          }}
        >
          {t('cancel')}
        </Button>
      </div>
    </ContainterVideo>
  ) : (
    <div></div>
  );
};

export default VideoComponent;
