---
title: "Hermes Profiles Are Perfect for Family Home Automation"
slug: hermes-profiles-family-home-automation
date: 2026-05-26
tags: [hermes, home-assistant, whatsapp, ai-agents, smart-home, raspberry-pi]
category: guide
---

> **Disclosure:** GPT-5.5 wrote the original long version. Grok 4.3 rewrote it into the current shorter form. Both models were running inside Hermes Agent — the harness, profile system, tool layer, gateway, and memory that actually does the work. The setup is real. The mistakes were real. The OAuth tokens were dramatic. The profile name was changed to protect the guilty.

I wanted my mom to have a tiny AI that could control the house from WhatsApp.

Not a general-purpose agent. Not something that can edit files, run shell commands, browse the web, or develop opinions about JavaScript frameworks. Just something that understands "turn off the lights" and "start the vacuum."

Hermes profiles turned out to be the right tool for this.

## The goal

A narrow, cheap, boring profile that:

- only talks to WhatsApp
- only has Home Assistant tools
- uses a small inexpensive model
- answers briefly in Polish
- cannot do anything dangerous

Everything else — terminal, code execution, browser, subagents, cron jobs, file access — stays disabled.

That separation is the point. My profile can be powerful and chaotic. My mom's profile should be small, predictable, and aggressively uninteresting.

## Step 1: Create a clean profile

Do not clone your main profile.

```bash
hermes profile create family-home
```

Then set a cheap model for the profile:

```bash
hermes --profile family-home config set model.provider nous
hermes --profile family-home config set model.default deepseek/deepseek-v4-flash:free
```

The exact model is not sacred. The important part is that this profile does not inherit the expensive, tool-heavy setup you use for yourself.

## Step 2: Lock down WhatsApp ownership early

This is where most of the pain lives.

The default profile must not touch WhatsApp. If two Hermes profiles try to own the same WhatsApp bridge or session, one of them will steal it and the wrong agent will answer messages. That is funny exactly once.

Remove WhatsApp from the default profile:

- delete or comment out `WHATSAPP_ENABLED`, `WHATSAPP_MODE`, and `WHATSAPP_ALLOWED_USERS` from `~/.hermes/.env`
- make sure `platforms.whatsapp.enabled` is `false` in the main config

Then configure the family profile with its own bridge port and session path:

```yaml
# ~/.hermes/profiles/family-home/config.yaml
platforms:
  whatsapp:
    enabled: true
    extra:
      bridge_port: 3001
      session_path: /home/pi/.hermes/profiles/family-home/whatsapp/session
```

Do not blindly use port `3000`. In my setup, that belonged to `hermes-workspace` / Vite. WhatsApp got `3001` so the bridge would not fight the dev server like two raccoons in a duct.

Use an allowlist. Only country codes shown here:

```env
WHATSAPP_ENABLED=true
WHATSAPP_MODE=bot
WHATSAPP_ALLOWED_USERS=+48...,+44...
```

Start the family gateway first, then the default one. Verify ownership with:

```bash
ps -eo cmd | grep whatsapp-bridge
```

You should only see the family profile's WhatsApp session path.

## Step 3: Give the profile proper authentication

A new profile has isolated config and runtime state. That is good for safety, but it also means it may not have model credentials.

If you are using a hosted provider through Hermes auth, the fastest fix is usually to copy the auth store from the default profile:

```bash
cp ~/.hermes/auth.json ~/.hermes/profiles/family-home/auth.json
chmod 600 ~/.hermes/profiles/family-home/auth.json
```

Then test the profile directly:

```bash
hermes --profile family-home chat -q 'Reply only: OK' --provider nous
```

If this works, restart the family gateway so the running process picks up the new auth.

## Step 4: Write a direct, boring prompt

The prompt should speak *to* the user, not *about* the user.

Bad version, which produced nonsense like "mamie mogę":

```markdown
You are a home assistant for an older person (mom).
```

Good version:

```markdown
You are a simple home assistant.

You speak directly to the user in Polish.
Do not refer to the user as "mom" or use third-person forms.

Your only job is controlling the house through Home Assistant.

Available devices:
- Vacuum: vacuum.robot_cleaner
- Lights: light.living_room, light.kitchen, light.hallway
- Purifier: fan.bedroom_purifier

Answer briefly. If you do not understand, say so.
Occasionally add a short, tasteful compliment when it fits. Never be flirty.
```

Keep it short. Small models do better with fewer instructions and less poetry.

## Step 5: Restrict the tool surface

Only enable what the profile actually needs:

- `homeassistant`
- `messaging`
- `memory` if you want lightweight continuity
- `web` only if you have a real reason

Disable everything else: terminal, file, code execution, browser, delegation, cron jobs, skills, GitHub, and any other adult machinery.

This is not about trusting or distrusting the model. It is about not offering sharp objects to a workflow that only needs a light switch.

## Step 6: Be careful with smart plugs

Home Assistant tokens do not give you fine-grained entity ACLs through the generic service-call path.

If you want to be safe, do one of these:

- expose only safe Home Assistant scripts, such as `script.family_turn_off_lights`
- add an agent-side allowlist that blocks `switch.*` or only permits specific safe plugs
- do not mention smart plugs in the prompt at all

Raw `ha_call_service` access to `switch.turn_on` and `switch.turn_off` is too broad for a family helper profile.

## Step 7: Test the messaging path

The `pass-message` skill is documentation. It is not magic.

If the profile needs to send you a message, the real `send_message` tool must be available through the `messaging` toolset.

Test something like:

> "przekaż Damianowi: odkurzacz się zepsuł"

If the agent says it cannot send messages, the issue is probably not the prompt. Check whether the tool is actually enabled for that profile.

## Quick failure checklist

- Wrong profile owns WhatsApp → check the bridge process and session path
- Port collision → do not put WhatsApp on `3000` if `hermes-workspace` / Vite is using it
- Old WhatsApp session has stale prompt/context → clear the family profile's WhatsApp session
- Auth errors → copy `auth.json` or re-authenticate the profile
- Weird Polish phrasing → remove third-person references from the prompt
- Smart plugs appearing → add an allowlist or expose scripts instead

## The result

You end up with two very different Hermes instances:

- one powerful, noisy, tool-rich profile for yourself
- one small, cheap, boring profile for family home automation

Hermes profiles make that split easy.

And for this use case, the boring profile is the feature.
