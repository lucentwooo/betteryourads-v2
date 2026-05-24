# OpenRouter Model Selection

This system needs models that are good at:

- Long-context webpage analysis.
- Structured JSON output.
- Conservative extraction from evidence.
- Brand, offer, customer, and claim reasoning.
- Cost-efficient repeated crawls.

## Default

Use:

```text
deepseek/deepseek-v4-flash
```

Reason:

- Strong current OpenRouter usage for programming and agent workflows.
- 1M-token context window.
- Supports `response_format` and `structured_outputs`.
- Low listed pricing relative to premium frontier models.
- Good fit for repeated Website DNA extraction jobs where most inputs are long page text.

## Higher-Quality Option

Use:

```text
deepseek/deepseek-v4-pro
```

Reason:

- Stronger reasoning model in the same DeepSeek family.
- 1M-token context.
- Supports `response_format` and `structured_outputs`.
- Better fit for important client runs where quality matters more than cost.

## Budget Alternative

Use:

```text
inclusionai/ling-2.6-flash
```

Reason:

- Very low listed pricing.
- Designed for real-world agents that need fast responses and token efficiency.
- 262K context is enough for many crawls if page text is trimmed.
- Supports `response_format` and `structured_outputs` in the current OpenRouter model list.

## Free Testing Alternative

Use:

```text
nvidia/nemotron-3-super-120b-a12b:free
```

Reason:

- Free option for development and smoke tests.
- Supports structured outputs in the current OpenRouter model list.
- Free endpoints can be rate-limited or less reliable, so do not use as the production default.

## Expensive Frontier Options

Consider only for premium or manual review runs:

```text
anthropic/claude-sonnet-4.6
google/gemini-3.1-pro-preview
openai/gpt-5.5
```

Reason:

- Stronger broad reasoning and agent reliability.
- Much higher cost than DeepSeek V4 Flash.
- Usually not necessary for the first automated extraction pass.
