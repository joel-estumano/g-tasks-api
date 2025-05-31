import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export const API_BEARER_AUTH_SCHEME = 'access-token';

export function ApiAuth() {
    return applyDecorators(ApiBearerAuth(API_BEARER_AUTH_SCHEME));
}
