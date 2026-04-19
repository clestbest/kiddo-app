#!/bin/bash
set -euo pipefail

# Only run in remote (web) environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Install Doppler CLI if not already present
if ! command -v doppler &>/dev/null; then
  apt-get update -qq
  apt-get install -y apt-transport-https ca-certificates curl gnupg
  curl -sLf --retry 3 --tlsv1.2 --proto "=https" \
    'https://packages.doppler.com/public/cli/gpg.DE2A7741A397C129.key' \
    | gpg --dearmor -o /usr/share/keyrings/doppler-archive-keyring.gpg
  echo "deb [signed-by=/usr/share/keyrings/doppler-archive-keyring.gpg] https://packages.doppler.com/public/cli/deb/debian any-version main" \
    | tee /etc/apt/sources.list.d/doppler-cli.list
  apt-get update -qq && apt-get install -y doppler
fi

# Fetch SUPABASE_ACCESS_TOKEN from Doppler and persist to session environment
if [ -n "${DOPPLER_TOKEN:-}" ]; then
  SUPABASE_ACCESS_TOKEN=$(doppler secrets get SUPABASE_ACCESS_TOKEN --plain --token "$DOPPLER_TOKEN")
  echo "SUPABASE_ACCESS_TOKEN=$SUPABASE_ACCESS_TOKEN" >> "$CLAUDE_ENV_FILE"
fi

# Install npm dependencies
npm install
