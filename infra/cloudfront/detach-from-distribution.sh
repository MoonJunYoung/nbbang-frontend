#!/usr/bin/env bash
# CloudFront 배포에서 Function 연결 해제 (롤백용)
# 사용법: ./detach-from-distribution.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=/dev/null
source "${SCRIPT_DIR}/config.env"

if ! command -v jq >/dev/null 2>&1; then
    echo "jq is required. Install with: brew install jq" >&2
    exit 1
fi

echo "==> Fetching distribution config: ${DISTRIBUTION_ID}"
ETAG="$(aws cloudfront get-distribution-config --id "${DISTRIBUTION_ID}" --query 'ETag' --output text)"
aws cloudfront get-distribution-config --id "${DISTRIBUTION_ID}" --query 'DistributionConfig' \
    > /tmp/nbbang-dist-config.json

echo "==> Removing function from DefaultCacheBehavior..."
jq '
    .DefaultCacheBehavior.FunctionAssociations = {
        "Quantity": 0,
        "Items": []
    }
' /tmp/nbbang-dist-config.json > /tmp/nbbang-dist-config-updated.json

aws cloudfront update-distribution \
    --id "${DISTRIBUTION_ID}" \
    --if-match "${ETAG}" \
    --distribution-config file:///tmp/nbbang-dist-config-updated.json \
    --query 'Distribution.{Id:Id,Status:Status}' \
    --output table

rm -f /tmp/nbbang-dist-config.json /tmp/nbbang-dist-config-updated.json

echo "Done. Function 연결이 해제되었습니다."
