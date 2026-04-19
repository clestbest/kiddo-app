#!/bin/bash
set -euo pipefail

# Only run in remote (web) environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Install Doppler CLI if not already present
if ! command -v doppler &>/dev/null; then
  apt-get update -qq 2>/dev/null || true
  apt-get install -y apt-transport-https ca-certificates curl gnupg
  rm -f /usr/share/keyrings/doppler-archive-keyring.gpg
  curl -sLf --retry 3 --tlsv1.2 --proto "=https" \
    'https://packages.doppler.com/public/cli/gpg.DE2A7741A397C129.key' \
    | gpg --batch --no-tty --dearmor -o /usr/share/keyrings/doppler-archive-keyring.gpg
  echo "deb [signed-by=/usr/share/keyrings/doppler-archive-keyring.gpg] https://packages.doppler.com/public/cli/deb/debian any-version main" \
    | tee /etc/apt/sources.list.d/doppler-cli.list
  apt-get update -qq 2>/dev/null || true
  apt-get install -y doppler
fi

# Fetch SUPABASE_ACCESS_TOKEN from Doppler and persist to session environment
if [ -n "${DOPPLER_TOKEN:-}" ] && [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  SUPABASE_ACCESS_TOKEN=$(doppler secrets get SUPABASE_ACCESS_TOKEN --plain --token "$DOPPLER_TOKEN" 2>/dev/null) || true
  if [ -n "${SUPABASE_ACCESS_TOKEN:-}" ]; then
    echo "export SUPABASE_ACCESS_TOKEN=$SUPABASE_ACCESS_TOKEN" >> "$CLAUDE_ENV_FILE"
  fi
fi

# Install npm dependencies
npm install
