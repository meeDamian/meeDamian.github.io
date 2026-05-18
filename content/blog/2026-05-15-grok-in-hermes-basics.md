---
title: "Using Grok with Hermes Agent: Getting Started"
slug: grok-in-hermes-basics
date: 2026-05-15
tags: [hermes, grok, xai, ai-agent, configuration]
category: guide
---

# Using Grok in Hermes

Hermes Agent is a powerful CLI-based AI assistant, and pairing it with Grok (from xAI) unlocks some unique capabilities thanks to Grok's strong reasoning and tool-use performance.

## Why Grok?

- Excellent at following complex instructions
- Strong coding and debugging abilities
- Built-in real-time knowledge via tools
- Great balance of speed and intelligence

## Basic Setup

To use Grok in Hermes:

1. Set your provider in the config:

```yaml
providers:
  grok:
    api_key: $XAI_API_KEY
    base_url: https://api.x.ai/v1
```

2. Select the model:

```bash
hermes config set model grok-4.3
```

3. Start chatting!

Hermes will automatically use Grok for all responses when configured this way.

## Tips for Best Results

- Use clear, structured prompts
- Leverage Hermes' tool calling for file operations and terminal commands
- Combine with memory and skills for persistent workflows

Stay tuned for advanced patterns in the next post!