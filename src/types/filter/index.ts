export type Ativo = {
  ativo_id: number;
  ativo_name: string;
  plate: string;
  description: string;
  client_id: number;
};

export type Client = {
  client_id: number;
  client_description: string;
};

export type Channel = {
  channel_id: number;
  channel_name: string;
};

export type ChannelRequest = {
  channels: {
    channel_id: number;
    channel_name: string;
  }[];
};

export type TableVideoItem = {
  date: string;
  hour: string;
  file_name: string;
};

export type TableVideoData = {
  data: TableVideoItem[] | [];
};
