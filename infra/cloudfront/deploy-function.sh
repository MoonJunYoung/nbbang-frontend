#!/usr/bin/env bash
# CloudFront Function 생성 및 LIVE 배포
# 사용법: ./deploy-function.sh
# 사전 조건: AWS CLI 설정 완료 (aws configure)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=/dev/null
source "${SCRIPT_DIR}/config.env"

HANDLER_FILE="${SCRIPT_DIR}/legacy-domain-redirect.handler.js"
FUNCTION_CONFIG="Comment=nbbang.shop to nbbang.cloud redirect,Runtime=cloudfront-js-2.0"

if [[ ! -f "${HANDLER_FILE}" ]]; then
    echo "Handler file not found: ${HANDLER_FILE}" >&2
    exit 1
fi

echo "==> CloudFront Function: ${FUNCTION_NAME}"

if aws cloudfront describe-function --name "${FUNCTION_NAME}" >/dev/null 2>&1; then
    echo "    Function exists. Updating code..."
    ETAG="$(aws cloudfront describe-function --name "${FUNCTION_NAME}" --query 'ETag' --output text)"
    aws cloudfront update-function \
        --name "${FUNCTION_NAME}" \
        --if-match "${ETAG}" \
        --function-config "${FUNCTION_CONFIG}" \
        --function-code "fileb://${HANDLER_FILE}" \
        --query 'FunctionSummary.{Name:Name,Status:Status,Stage:Stage}' \
        --output table
else
    echo "    Creating new function..."
    aws cloudfront create-function \
        --name "${FUNCTION_NAME}" \
        --function-config "${FUNCTION_CONFIG}" \
        --function-code "fileb://${HANDLER_FILE}" \
        --query 'FunctionSummary.{Name:Name,Status:Status,Stage:Stage}' \
        --output table
fi

echo "==> Publishing to LIVE stage..."
ETAG="$(aws cloudfront describe-function --name "${FUNCTION_NAME}" --query 'ETag' --output text)"
aws cloudfront publish-function \
    --name "${FUNCTION_NAME}" \
    --if-match "${ETAG}" \
    --query 'FunctionSummary.{Name:Name,Status:Status,Stage:Stage}' \
    --output table

FUNCTION_ARN="$(aws cloudfront describe-function --name "${FUNCTION_NAME}" --stage LIVE \
    --query 'FunctionSummary.FunctionMetadata.FunctionARN' --output text)"

echo ""
echo "Done. Function is published (LIVE)."
echo "Function ARN: ${FUNCTION_ARN}"
echo ""
echo "앱 업데이트 완료 후 연결:"
echo "  ./attach-to-distribution.sh"
