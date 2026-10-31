export type MessageType =
  | 'PING'
  | 'CAPABILITIES_REQUEST'
  | 'SET_API_KEY'
  | 'CLEAR_API_KEY'
  | 'GET_STORAGE_MODE'
  | 'SAVE_STORAGE_MODE'
  | 'GET_FEATURE_FLAGS'
  | 'SET_FEATURE_FLAG'
  | 'PAGE_TRANSLATE';

export interface TypedMessage<T = unknown> {
  type: MessageType;
  payload?: T;
  requestId?: string;
}

export const MESSAGE_SCHEMA: Record<MessageType, { required: string[] }> = {
  PING: { required: [] },
  CAPABILITIES_REQUEST: { required: [] },
  SET_API_KEY: { required: ['value'] },
  CLEAR_API_KEY: { required: [] },
  GET_STORAGE_MODE: { required: [] },
  SAVE_STORAGE_MODE: { required: ['mode'] },
  GET_FEATURE_FLAGS: { required: [] },
  SET_FEATURE_FLAG: { required: ['name', 'enabled'] },
  PAGE_TRANSLATE: { required: ['sourceText', 'targetLanguage'] }
};

export function validateMessage(msg: unknown): msg is TypedMessage {
  if (!msg || typeof msg !== 'object' || !('type' in msg)) {
    return false;
  }

  const typed = msg as Record<string, unknown>;
  const type = typed.type as MessageType;
  const schema = MESSAGE_SCHEMA[type];

  if (!schema) {
    return false;
  }

  return schema.required.every((field) => field in typed || field in (typed.payload ?? {}));
}
