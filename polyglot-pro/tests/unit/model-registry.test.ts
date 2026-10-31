import { describe, expect, it } from 'vitest';
import { chooseBestModel, EMERGENCY_MODEL_FALLBACK } from '../src/lib/model-registry';

describe('model registry', () => {
  it('falls back safely when no models are available', () => {
    expect(chooseBestModel([], 'page')).toEqual(EMERGENCY_MODEL_FALLBACK);
  });

  it('prefers supported models with stronger support for the requested task', () => {
    const models = [
      {
        id: 'expensive-model',
        displayName: 'Expensive model',
        source: 'api-metadata' as const,
        capabilities: {
          supportsTextInput: true,
          supportsMultimodal: true,
          supportsStructuredOutput: true,
          supportsStreaming: true,
          status: 'supported' as const
        }
      },
      {
        id: 'basic-model',
        displayName: 'Basic model',
        source: 'api-metadata' as const,
        capabilities: {
          supportsTextInput: true,
          supportsMultimodal: false,
          supportsStructuredOutput: false,
          supportsStreaming: false,
          status: 'supported' as const
        }
      }
    ];

    expect(chooseBestModel(models, 'page').id).toBe('expensive-model');
  });
});
