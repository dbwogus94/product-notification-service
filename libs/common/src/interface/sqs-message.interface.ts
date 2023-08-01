type SqsMessageType = string;

export interface SqsMessage {
  type: SqsMessageType;
  body: Record<string, any>;
}
