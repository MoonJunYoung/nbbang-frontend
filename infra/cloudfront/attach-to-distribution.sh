#!/usr/bin/env bash
# CloudFront 배포에 Function을 viewer-request로 연결
# 사용법: ./attach-to-distribution.sh
# 사전 조건: deploy-function.sh 실행 완료 + 앱 1.1.0 스토어 배포 완료

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=/dev/null
source "${SCRIPT_DIR}/config.env"

if ! command -v jq >/dev/null 2>&1; then
    echo "jq is required. Install with: brew install jq" >&2
    exit 1
fi

echo "==> Resolving LIVE function ARN..."
FUNCTION_ARN="$(aws cloudfront describe-function --name "${FUNCTION_NAME}" --stage LIVE \
    --query 'FunctionSummary.FunctionMetadata.FunctionARN' --output text)"

if [[ -z "${FUNCTION_ARN}" || "${FUNCTION_ARN}" == "None" ]]; then
    echo "Function not found or not published. Run ./deploy-function.sh first." >&2
    exit 1
fi

echo "    ${FUNCTION_ARN}"

echo "==> Fetching distribution config: ${DISTRIBUTION_ID}"
ETAG="$(aws cloudfront get-distribution-config --id "${DISTRIBUTION_ID}" --query 'ETag' --output text)"
aws cloudfront get-distribution-config --id "${DISTRIBUTION_ID}" --query 'DistributionConfig' \
    > /tmp/nbbang-dist-config.json

echo "==> Attaching function to DefaultCacheBehavior (viewer-request)..."
jq --arg arn "${FUNCTION_ARN}" '
    .DefaultCacheBehavior.FunctionAssociations = {
        "Quantity": 1,
        "Items": [
            {
                "FunctionARN": $arn,
                "EventType": "viewer-request"
            }
        ]
    }
' /tmp/nbbang-dist-config.json > /tmp/nbbang-dist-config-updated.json

aws cloudfront update-distribution \
    --id "${DISTRIBUTION_ID}" \
    --if-match "${ETAG}" \
    --distribution-config file:///tmp/nbbang-dist-config-updated.json \
    --query 'Distribution.{Id:Id,Status:Status,DomainName:DomainName}' \
    --output table

rm -f /tmp/nbbang-dist-config.json /tmp/nbbang-dist-config-updated.json

echo ""
echo "Done. CloudFront 배포 업데이트가 진행 중입니다 (보통 수 분 소요)."
echo "배포 완료 후 nbbang.shop 접속 시 nbbang.cloud 로 리다이렉트됩니다."
