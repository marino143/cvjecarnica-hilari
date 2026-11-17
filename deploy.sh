#!/bin/bash
# Deploy origin/main to cvjecarnica-hilari.hr through the cPanel UAPI
# (same as Git Version Control → Update from Remote → Deploy HEAD Commit).
# Runs from the Mac mini: the host's bot protection blocks GitHub Actions IPs.
# Token: macOS Keychain item "hilari-cpanel-deploy" (cPanel API token "openclaw-deploy").
set -euo pipefail

HOST="s040.cubrad.eu"
USER_NAME="cvjecarn"
ROOT="/home/cvjecarn/repositories/cvjecarnica-hilari"
TOKEN=$(security find-generic-password -a "$USER_NAME" -s hilari-cpanel-deploy -w)

cd "$(dirname "$0")"
git fetch -q origin main
if [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ]; then
  echo "Local HEAD differs from origin/main; push first." >&2
  exit 1
fi
want=$(git rev-parse origin/main)

api() {
  curl -fsS -G -H "Authorization: cpanel $USER_NAME:$TOKEN" "https://$HOST:2083/execute/$1" "${@:2}"
}

resp=$(api VersionControl/update --data-urlencode "repository_root=$ROOT" --data-urlencode "branch=main")
echo "$resp" | jq -e '.status == 1' > /dev/null || { echo "Update failed: $(echo "$resp" | jq -c '.errors')" >&2; exit 1; }
got=$(echo "$resp" | jq -r '.data.last_update.identifier')
[ "$got" = "$want" ] || { echo "cPanel pulled $got, expected $want" >&2; exit 1; }

resp=$(api VersionControlDeployment/create --data-urlencode "repository_root=$ROOT")
echo "$resp" | jq -e '.status == 1' > /dev/null || { echo "Deploy failed: $(echo "$resp" | jq -c '.errors')" >&2; exit 1; }
id=$(echo "$resp" | jq -r '.data.deploy_id')

for _ in $(seq 1 30); do
  sleep 2
  d=$(api VersionControlDeployment/retrieve | jq -c --argjson id "$id" '.data[] | select(.deploy_id == $id)')
  if echo "$d" | jq -e '.timestamps.succeeded' > /dev/null; then echo "Deployed ${want:0:7}"; exit 0; fi
  if echo "$d" | jq -e '.timestamps.failed' > /dev/null; then echo "Deploy failed: $d" >&2; exit 1; fi
done
echo "Deploy $id still running after 60 s; check cPanel." >&2
exit 1
