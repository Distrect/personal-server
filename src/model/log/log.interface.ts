interface KeyValue {
  [key: string]: any;
}

export interface IRequestParams {
  method: string;
  params: KeyValue;
  body: KeyValue;
  query: KeyValue;
}

export interface ICreateLog {
  activity: string;
  requestParams: IRequestParams;
  timestamp: Date;
}
